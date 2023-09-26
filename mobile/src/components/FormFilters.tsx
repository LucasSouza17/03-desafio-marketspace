import { useState } from "react";
import { ScrollView } from "react-native";
import { HStack, Text, VStack, View } from "native-base";

import { PAYMENT_METHODS } from "@data/paymentMethods";

import { Button } from "./Button";
import { Switch } from "./Switch";
import { Checkbox } from "./Checkbox";
import { InputTag } from "./InputTag";
import { FiltersDTO } from "@dtos/FiltersDTO";

type FilterProps = {
  accept_trade?: string;
  is_new?: string;
};

type PaymentMethodsProps = Array<{
  name: string;
  key: string;
}>;

type Props = {
  onChange: (filters: FiltersDTO | null) => void;
};

export function FormFilters({ onChange }: Props) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsProps>([]);
  const [acceptTrade, setAcceptTrade] = useState<string | undefined>();
  const [isNew, setIsNew] = useState<string | undefined>();

  const [reset, setReset] = useState(false);

  function handleResetFilters() {
    setAcceptTrade(undefined);
    setIsNew(undefined);
    setPaymentMethods([]);
    setReset(!reset)
  }

  function handleApplyFilters() {
    const formattedFilter: FiltersDTO = {
      accept_trade: acceptTrade,
      is_new: isNew,
      payment_methods: paymentMethods.map((item) => item.key),
    };

    onChange(formattedFilter);
  }

  return (
    <View flex={1} justifyContent="space-between">
      <ScrollView>
        <VStack mt={6} space={6}>
          <VStack space={3}>
            <Text fontSize="md" fontFamily="heading" color="gray.600">
              Condição
            </Text>
            <HStack space={2}>
              <InputTag
                label="NOVO"
                isActive={isNew === "true" ? true : false}
                onChange={() => setIsNew("true")}
                onRemove={() => setIsNew(undefined)}
              />
              <InputTag
                label="USADO"
                isActive={isNew === "false" ? true : false}
                onChange={() => setIsNew("false")}
                onRemove={() => setIsNew(undefined)}
              />
            </HStack>
          </VStack>

          <VStack space={3}>
            <Text fontSize="md" fontFamily="heading" color="gray.600">
              Aceita troca?
            </Text>
            <Switch
              onToggle={(value) => setAcceptTrade(value)}
              value={Boolean(acceptTrade)}
            />
          </VStack>

          <VStack space={3}>
            <Text fontSize="md" fontFamily="heading" color="gray.600">
              Meios de pagamento aceitos
            </Text>
            <Checkbox
              key={String(reset)}
              options={PAYMENT_METHODS}
              onChange={(values) => setPaymentMethods(values)}
              selectedValues={paymentMethods}
            />
          </VStack>
        </VStack>
      </ScrollView>

      <HStack space={2} alignItems="center" justifyContent="space-between">
        <Button
          flex={1}
          variant="gray"
          title="Resetar filtros"
          onPress={handleResetFilters}
        />
        <Button
          flex={1}
          variant="black"
          title="Aplicar filtros"
          onPress={handleApplyFilters}
        />
      </HStack>
    </View>
  );
}
