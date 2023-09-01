import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Flex, HStack, View } from "native-base";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ImageDTO } from "@dtos/ImageDTO";
import { Button } from "@components/Button";
import { HeaderRoutes } from "@components/HeaderRoutes";
import { FormProduct } from "@components/FormProduct";

export type FormDataProps = {
  name: string;
  description: string;
  is_new: string;
  price: string;
  accept_trade: boolean;
  payment_methods: string[];
  images: ImageDTO[];
};

const newProductSchema: z.ZodType<FormDataProps> = z.object({
  name: z.string({ required_error: "Informe o título do anúncio." }),
  description: z.string({ required_error: "Informe uma descrição para o anúncio." }),
  is_new: z.string().min(1, {message: "Informe o estado do produto."}),
  price: z.string({ required_error: "Informe o valor do produto." }),
  accept_trade: z.boolean(),
  payment_methods: z
    .string()
    .array().min(1, {message: "Selecione pelo menos um meio de pagamento."}),
  images: z
    .object(
      {
        fileExtension: z.string(),
        uri: z.string(),
        type: z.string(),
      },
      { required_error: "Informe o avatar" }
    )
    .array().min(1, {message: "Adicione pelo menos uma imagem do produto."}),
});

export function NewProduct() {
  const { bottom } = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      images: []
    }
  });

  async function handleGoToPreview({...data}: FormDataProps) {
    console.log("oi")
  }

  return (
    <View flex={1} bg="gray.200">
      <Flex px={6}>
        <HeaderRoutes goBackButton title="Criar anúncio" />
      </Flex>

      <FormProduct control={control} errors={errors} />

      <HStack
        pb={bottom / 4 + 20}
        bg="gray.100"
        p={6}
        space={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button flex={1} title="Cancelar" variant="gray" />
        <Button flex={1} title="Avançar" variant="black" onPress={handleSubmit(handleGoToPreview)} />
      </HStack>
    </View>
  );
}
