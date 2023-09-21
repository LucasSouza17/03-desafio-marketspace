import { Platform } from "react-native";
import { HStack, KeyboardAvoidingView, ScrollView, Text, VStack } from "native-base";

import {
  Control,
  Controller,
  FieldErrors,
  useController,
  useFieldArray,
} from "react-hook-form";

import { ImageDTO } from "@dtos/ImageDTO";

import { Checkbox } from "@components/Checkbox";
import { ImageInput } from "@components/ImageInput";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Switch } from "@components/Switch";
import { FormProductDTO } from "@dtos/FormProductDTO";

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

type Props = {
  control: Control<FormProductDTO, any>;
  errors: FieldErrors<FormProductDTO>;
};

export function FormProduct({ control, errors }: Props) {
  const {
    field: { value: payment_values },
  } = useController({
    control: control,
    name: "payment_methods",
  });

  const { fields, update, remove } = useFieldArray({
    control,
    name: "images",
  });

  function handleAddImage(index: number, value: ImageDTO) {
    update(index, value);
  }

  async function handleRemoveImage(index: number) {
    remove(index);
  }

  return (
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
              {fields.map((item, index) => (
                <ImageInput
                  key={item.id}
                  onChange={(value) => handleAddImage(index, value)}
                  onRemove={() => handleRemoveImage(index)}
                  value={item.uri}
                  errorMessage={errors.images?.message}
                />
              ))}
              {fields.length < 3 && (
                <ImageInput
                  onChange={(value) => handleAddImage(fields.length, value)}
                  errorMessage={errors.images?.message}
                />
              )}
            </HStack>
          </VStack>

          <VStack>
            <Text fontSize="md" fontFamily="heading" color="gray.600" mb={4}>
              Sobre o produto
            </Text>
            <VStack space={4}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Título do anúncio"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Descrição do produto"
                    h={40}
                    numberOfLines={4}
                    multiline
                    py={4}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="is_new"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Radio
                    name="is_new"
                    options={[
                      { label: "Produto novo", value: "true" },
                      { label: "Produto usado", value: "false" },
                    ]}
                    onChange={onChange}
                    value={value}
                    errorMessage={errors.is_new?.message}
                  />
                )}
              />
            </VStack>
          </VStack>

          <VStack space={4}>
            <VStack space={4}>
              <Text fontSize="md" fontFamily="heading" color="gray.600">
                Venda
              </Text>
              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Valor do produto"
                    InputLeftElement={
                      <Text fontSize="md" ml={4} mr={-2}>
                        R$
                      </Text>
                    }
                    keyboardType="numeric"
                    onChangeText={(value) => onChange(Number(value))}
                    value={value ? String(value) : undefined}
                    errorMessage={errors.price?.message}
                  />
                )}
              />
            </VStack>

            <VStack space={4}>
              <Text fontSize="sm" fontFamily="heading" color="gray.600">
                Aceita troca?
              </Text>
              <Controller
                control={control}
                name="accept_trade"
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <Switch onToggle={(value) => onChange(Boolean(value))} value={value} />
                )}
              />
            </VStack>

            <VStack space={4}>
              <Text fontSize="sm" fontFamily="heading" color="gray.600">
                Meios de pagamento aceitos
              </Text>
              <Controller
                control={control}
                name="payment_methods"
                defaultValue={[]}
                render={({ field: { onChange } }) => (
                  <Checkbox
                    options={PAYMENT_METHODS}
                    onChange={onChange}
                    errorMessage={errors.payment_methods?.message}
                    selectedValues={payment_values || []}
                  />
                )}
              />
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
