import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Flex, HStack, Text, VStack, View, useTheme, useToast } from "native-base";
import { ArrowLeft, Tag } from "phosphor-react-native";

import { FormProductDTO } from "@dtos/FormProductDTO";

import { Button } from "@components/Button";
import { ProductContentPreview } from "@components/ProductContentPreview";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { useState } from "react";
import { AppError } from "@utils/AppError";
import { parseBool } from "@utils/ParseBool";

type RouteParamsProps = {
  product: FormProductDTO;
};

export function NewProductPreview() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { bottom, top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const toast = useToast();

  const route = useRoute();
  const { product } = route.params as RouteParamsProps;

  const [isLoading, setIsLoading] = useState(false);

  function handleGoBackToEdit() {
    navigation.goBack();
  }

  async function handleCreateNewProduct() {
    try {
      setIsLoading(true);
      const body = {
        ...product,
        images: undefined,
        payment_methods: product.payment_methods.map((item) => item.key),
        is_new: parseBool(product.is_new)
      };

      const responseProduct = await api.post("products", body);

      if (responseProduct.data.id) {
        const photosFile = product.images.map((image) => {
          return {
            ...image,
            name: `${product.name.replaceAll(" ", "")}.${
              image.fileExtension
            }`.toLowerCase(),
          };
        });

        const productImageFormData = new FormData();
        productImageFormData.append("product_id", responseProduct.data.id);
        photosFile.forEach((photoFile) => {
          productImageFormData.append("images", photoFile as any);
        });

        await api.post("products/images", productImageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigation.navigate("home_navigate");
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar um novo produto, tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View flex={1} bg="gray.200">
      <Flex px={6} bg="blue.300" pt={top + 20} pb={4} alignItems="center">
        <Text textAlign="center" fontSize="md" fontFamily="heading" color="gray.100">
          Pré visualização do anúncio
        </Text>
        <Text textAlign="center" fontSize="sm" fontFamily="body" color="gray.100">
          É assim que seu produto vai aparecer!
        </Text>
      </Flex>

      <ProductContentPreview product={product} />

      <HStack
        pb={bottom / 4 + 20}
        bg="gray.100"
        p={6}
        space={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          flex={1}
          title={"Voltar e editar"}
          variant={"gray"}
          leftIcon={<ArrowLeft color={colors.gray[600]} size={18} />}
          onPress={handleGoBackToEdit}
        />
        <Button
          flex={1}
          title="Publicar"
          variant="blue"
          leftIcon={<Tag color={colors.gray[200]} size={18} />}
          isLoading={isLoading}
          onPress={handleCreateNewProduct}
        />
      </HStack>
    </View>
  );
}
