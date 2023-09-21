import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Flex, VStack, View, useTheme, useToast } from "native-base";

import { AppError } from "@utils/AppError";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";

import { HeaderRoutes } from "@components/HeaderRoutes";
import { Loading } from "@components/Loading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@components/Button";
import { PencilSimpleLine, Power, TrashSimple } from "phosphor-react-native";
import { ProductContent } from "@components/ProductContent";
import { TouchableOpacity } from "react-native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type RouteParamsProps = {
  productId: number;
};

export function MyProductDetails() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const toast = useToast();

  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadingActiveAndInactiveProduct, setIsLoadingActiveAndInactiveProduct] =
    useState(false);
  const [isLoadingDeleteProduct, setIsLoadingDeleteProduct] = useState(false);

  const route = useRoute();
  const { productId } = route.params as RouteParamsProps;

  async function fetchProductDetails() {
    try {
      setIsLoadingProduct(true);
      const response = await api.get(`products/${productId}`);

      setProduct(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do produto";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProduct(false);
    }
  }

  async function handleActiveAndInactiveProduct() {
    try {
      setIsLoadingActiveAndInactiveProduct(true);
      await api.patch(`products/${productId}`, {
        is_active: !product.is_active,
      });
      setProduct({
        ...product,
        is_active: !product.is_active,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o produto, tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingActiveAndInactiveProduct(false);
    }
  }

  async function handleDeleteProduct() {
    try {
      setIsLoadingDeleteProduct(true);
      await api.delete(`products/${productId}`);
      navigation.goBack();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar o produto, tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingDeleteProduct(false);
    }
  }

  function handleEditProduct() {
    navigation.navigate('edit_product', {
      product: product
    })
  }

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <View flex={1} bg="gray.200">
      <Flex px={6}>
        <HeaderRoutes
          goBackButton
          actionButton={
            <TouchableOpacity activeOpacity={0.75} onPress={handleEditProduct}>
              <PencilSimpleLine />
            </TouchableOpacity>
          }
        />
      </Flex>

      {isLoadingProduct ? <Loading /> : <ProductContent product={product} />}
      <VStack
        pb={bottom / 4 + 20}
        bg="gray.200"
        px={6}
        space={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          title={product.is_active ? "Desativar anúncio" : "Reativar anúncio"}
          variant={product.is_active ? "black" : "blue"}
          leftIcon={<Power color={colors.gray[100]} size={18} />}
          isLoading={isLoadingActiveAndInactiveProduct}
          onPress={handleActiveAndInactiveProduct}
        />
        <Button
          title="Excluir anúncio"
          variant="gray"
          leftIcon={<TrashSimple color={colors.gray[500]} size={18} />}
          isLoading={isLoadingDeleteProduct}
          onPress={handleDeleteProduct}
        />
      </VStack>
    </View>
  );
}
