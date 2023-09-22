import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback, useState, useRef } from "react";
import { FlatList, RefreshControl } from "react-native";
import { default as BottomSheetComponent } from "@gorhom/bottom-sheet";
import {Portal} from "@gorhom/portal";
import { Box, Image, Text, VStack, View, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ProductDTO } from "@dtos/ProductDTO";
import { FiltersDTO } from "@dtos/FiltersDTO";
import { api } from "@services/api";

import { AppError } from "@utils/AppError";
import { removeEmptyProperties } from "@utils/RemoveEmptyProperties";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { CardMyProducts } from "@components/CardMyProducts";
import { HeaderProfile } from "@components/HeaderProfile";
import { SearchInput } from "@components/SearchInput";
import { CardProduct } from "@components/CardProduct";
import { BottomSheet } from "@components/BottomSheet";

import SadEmoji from "../assets/sad-emoji.png";

export function Home() {
  const bottomSheetRef = useRef<BottomSheetComponent>(null);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [myProductsActive, setMyProductsActive] = useState<number>(0);
  const [filters, setFilters] = useState<FiltersDTO>({} as FiltersDTO);

  async function fetchMyProducts() {
    try {
      const response = await api.get("users/products");

      setMyProductsActive(response.data.length);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar a quantidade de produtos ativos no seu perfil.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const queryParams = removeEmptyProperties(filters);

      const response = await api.get("/products", {
        params: queryParams,
      });

      const productsActive = response.data.map((product: ProductDTO) => {
        return {
          ...product,
          is_active: true,
        };
      });

      setProducts(productsActive);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os produtos.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  }

  async function handleGoToProductDetails(productId: string) {
    navigation.navigate("product_details", {
      productId,
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
      fetchProducts();
    }, [])
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View flex={1} px={6} bg="gray.200">
        <HeaderProfile />
        
          <BottomSheet
            refBottomSheet={bottomSheetRef}
            title="Filtrar anúncios"
          >

          </BottomSheet>
        <FlatList
          data={products}
          keyExtractor={(product) => product.id}
          numColumns={2}
          columnWrapperStyle={{ marginTop: 24 }}
          contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <VStack space="8" mt="8">
              <CardMyProducts productsActive={myProductsActive} />
              <VStack space="3">
                <Text color="gray.500" fontSize="sm">
                  Seus produtos anunciados para venda
                </Text>
                <SearchInput
                  onChangeText={(text) => setFilters({ ...filters, query: text })}
                  value={filters.query}
                  onClickFilters={() => null}
                  onClickSearch={fetchProducts}
                  onSubmitEditing={fetchProducts}
                  returnKeyType="search"
                />
              </VStack>
            </VStack>
          }
          ListEmptyComponent={
            <VStack flex={1} space="4" justifyContent="center" alignItems="center">
              <Image source={SadEmoji} alt="Emoji com cara de triste" w="24" h="24" />
              <Text textAlign="center">
                Não fique triste, em breve terá muitos produtos para comprar.
              </Text>
            </VStack>
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoadingProducts}
              onRefresh={() => {
                fetchProducts();
                fetchMyProducts();
              }}
            />
          }
          renderItem={({ item, index }) => (
            <Box key={item.id} mr={index % 2 === 0 ? "5" : "0"} mb="8">
              <CardProduct
                product={item}
                onPressCard={() => handleGoToProductDetails(item.id)}
              />
            </Box>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}
