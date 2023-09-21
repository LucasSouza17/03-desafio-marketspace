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
  productId: string;
  olderImagesIds: string[]
};

export function EditProductPreview() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { bottom, top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const toast = useToast();

  const route = useRoute();
  const { product, productId, olderImagesIds } = route.params as RouteParamsProps;

  const [isLoading, setIsLoading] = useState(false);

  function handleGoBackToEdit() {
    navigation.goBack();
  }

  async function handleEditProduct() {
    try {
      setIsLoading(true);
      const body = {
        ...product,
        images: undefined,
        payment_methods: product.payment_methods.map((item) => item.key),
        is_new: parseBool(product.is_new)
      };

      const responseProduct = await api.put(`products/${productId}`, body);

      if (responseProduct.status === 204) {
        const photosFile = product.images.map((image) => {
          return {
            ...image,
            name: `${product.name.replaceAll(" ", "")}.${
              image.fileExtension
            }`.toLowerCase(),
          };
        }).filter(item => item.uri.startsWith("file"));

        if(photosFile.length > 0) {
          const productImageFormData = new FormData();
          productImageFormData.append("product_id", productId);
          photosFile.forEach((photoFile) => {
            productImageFormData.append("images", photoFile as any);
          });
  
          await api.post("products/images", productImageFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }


        const actualImages = product.images.map(item => item.type);
        const imagesToDelete = olderImagesIds.filter(item => !actualImages.includes(item))

        if(imagesToDelete.length > 0) {
          await api.delete("products/images", {
            data: {
              productImagesIds: imagesToDelete
            }
          })
        }
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
          onPress={handleEditProduct}
        />
      </HStack>
    </View>
  );
}
