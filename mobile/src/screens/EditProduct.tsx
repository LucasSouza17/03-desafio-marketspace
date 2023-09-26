import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Flex, HStack, View } from "native-base";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FormProductDTO } from "@dtos/FormProductDTO";
import { ProductDTO } from "@dtos/ProductDTO";

import { HeaderRoutes } from "@components/HeaderRoutes";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { FormProduct } from "@components/FormProduct";
import { Button } from "@components/Button";

type RouteParamsProps = {
  product: ProductDTO;
};

const newProductSchema: z.ZodType<FormProductDTO> = z.object({
  name: z.string({ required_error: "Informe o título do anúncio." }),
  description: z.string({ required_error: "Informe uma descrição para o anúncio." }),
  is_new: z.string({ required_error: "Informe o estado do produto." }),
  price: z.number({ required_error: "Informe o valor do produto." }),
  accept_trade: z.boolean(),
  payment_methods: z
    .object({
      key: z.string(),
      name: z.string(),
    })
    .array()
    .min(1, { message: "Selecione pelo menos um meio de pagamento." }),
  images: z
    .object(
      {
        fileExtension: z.string(),
        uri: z.string(),
        type: z.string(),
      },
      { required_error: "Informe o avatar" }
    )
    .array()
    .min(1, { message: "Adicione pelo menos uma imagem do produto." }),
});

export function EditProduct() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { bottom } = useSafeAreaInsets();

  const route = useRoute();
  const { product } = route.params as RouteParamsProps;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProductDTO>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      is_new: String(product.is_new),
      price: product.price,
      accept_trade: Boolean(product.accept_trade),
      payment_methods: product.payment_methods,
      images: product.product_images.map((item) => {
        return {
          uri: item.path,
          fileExtension: '',
          type: item.id
        };
      }),
    },
  });

  async function handleGoToPreview({ ...data }: FormProductDTO) {
    const formatProducts: FormProductDTO = {
      ...data,
      images: data.images.filter(item => item.uri !== '')
    }

    navigation.navigate('edit_product_preview', {
      product: formatProducts,
      productId: product.id,
      olderImagesIds: product.product_images.map(item => item.id)
    })
  }

  function handleCancelNewProduct() {
    navigation.goBack();
  }

  return (
    <View flex={1} bg="gray.200">
      <Flex px={6}>
        <HeaderRoutes title="Editar anúncio" goBackButton />
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
        <Button flex={1} title="Cancelar" variant="gray" onPress={handleCancelNewProduct} />
        <Button
          flex={1}
          title="Avançar"
          variant="black"
          onPress={handleSubmit(handleGoToPreview)}
        />
      </HStack>
    </View>
  );
}
