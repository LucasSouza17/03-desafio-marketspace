import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { DismissKeyboard } from "@components/DismissKeyboard";
import { HeaderRoutes } from "@components/HeaderRoutes";
import { ImageInput } from "@components/ImageInput";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Switch } from "@components/Switch";
import {
  Flex,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PAYMENT_METHODS = [
  {
    value: "boleto",
    label: "Boleto",
  },
  {
    value: "pix",
    label: "Pix",
  },
  {
    value: "cash",
    label: "Dinheiro",
  },
  {
    value: "deposit",
    label: "Depósito Bancário",
  },
  {
    value: "card",
    label: "Cartão de Crédito",
  },
];

export function NewProduct() {
  const { bottom } = useSafeAreaInsets();

  return (
    <View flex={1} bg="gray.200">
      <Flex px={6}>
        <HeaderRoutes goBackButton title="Criar anúncio" />
      </Flex>

      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 36 }}
        >
          <VStack px={6} mt={6} space={8}>
            <VStack>
              <Text fontSize="md" fontFamily="heading" color="gray.600">
                Imagens
              </Text>
              <Text fontSize="sm" fontFamily="body" color="gray.500">
                Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
              </Text>
              <HStack space={2} mt={4}>
                <ImageInput onChange={() => null} />
              </HStack>
            </VStack>

            <VStack>
              <Text fontSize="md" fontFamily="heading" color="gray.600" mb={4}>
                Sobre o produto
              </Text>
              <VStack space={4}>
                <Input placeholder="Título do anúncio" />
                <Input
                  placeholder="Descrição do produto"
                  h={40}
                  numberOfLines={4}
                  multiline
                  py={4}
                />
                <Radio
                  name="is_new"
                  options={[
                    { label: "Produto novo", value: "true" },
                    { label: "Produto usado", value: "false" },
                  ]}
                />
              </VStack>
            </VStack>

            <VStack space={4}>
              <VStack space={4}>
                <Text fontSize="md" fontFamily="heading" color="gray.600">
                  Venda
                </Text>
                <Input
                  placeholder="Valor do produto"
                  InputLeftElement={
                    <Text fontSize="md" ml={4} mr={-2}>
                      R$
                    </Text>
                  }
                  keyboardType="numeric"
                />
              </VStack>

              <VStack space={4}>
                <Text fontSize="sm" fontFamily="heading" color="gray.600">
                  Aceita troca?
                </Text>
                <Switch />
              </VStack>

              <VStack space={4}>
                <Text fontSize="sm" fontFamily="heading" color="gray.600">
                  Meios de pagamento aceitos
                </Text>
                <Checkbox
                  options={PAYMENT_METHODS}
                />
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
      <HStack
        pb={bottom / 4 + 20}
        bg="gray.100"
        p={6}
        space={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button flex={1} title="Cancelar" variant="gray" />
        <Button flex={1} title="Avançar" variant="black" />
      </HStack>
    </View>
  );
}
