import { useCallback, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { Box, HStack, Image, Text, VStack, View, useToast } from "native-base";
import { Plus } from "phosphor-react-native";

import { ProductDTO } from "@dtos/ProductDTO";

import { CardProduct } from "@components/CardProduct";
import { HeaderRoutes } from "@components/HeaderRoutes";
import { Select } from "@components/Select";

import SadEmoji from "../assets/sad-emoji.png";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";

const FILTERS = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Ativos",
    value: "actives",
  },
  {
    label: "Inativos",
    value: "inactives",
  },
];

type Filters = "all" | "actives" | "inactives"

export function MyProducts() {
  const toast = useToast();

  const [selectedFilter, setSelectedFilter] = useState<Filters>("all");
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  async function fetchMyProducts() {
    try {
      setIsLoadingProducts(true);

      const response = await api.get("users/products");

      setProducts(response.data);
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

  function showProductByFilter(products: ProductDTO[]) {
    if(selectedFilter === "all") {
      return products
    }

    return products.filter(product => {
      if(selectedFilter === "actives") {
        return product.is_active
      } else {
        return !product.is_active
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
    }, [])
  );

  return (
    <View flex={1} bg="gray.200" px={6}>
      <HeaderRoutes
        title="Meus anúncios"
        actionButton={
          <TouchableOpacity activeOpacity={0.7}>
            <Plus />
          </TouchableOpacity>
        }
      />

      <HStack mt={10} justifyContent="space-between" alignItems="center">
        <Text color="gray.600" fontSize="sm">
          {showProductByFilter(products).length} anúncios
        </Text>
        <Select
          items={FILTERS}
          selectedValue={selectedFilter}
          onValueChange={(value) => setSelectedFilter(value as Filters)}
        />
      </HStack>

      <FlatList
        data={showProductByFilter(products)}
        keyExtractor={(product) => product.id}
        numColumns={2}
        columnWrapperStyle={{ marginTop: 24 }}
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingProducts}
            onRefresh={() => {
              fetchMyProducts();
            }}
          />
        }
        ListEmptyComponent={
          <VStack flex={1} space="4" justifyContent="center" alignItems="center">
            <Image source={SadEmoji} alt="Emoji com cara de triste" w="24" h="24" />
            <Text textAlign="center">
              Ainda não está vendendo aquele produto que está empoeirado dentro de casa?
              Que tal anunciar ele aqui.
            </Text>
          </VStack>
        }
        renderItem={({ item, index }) => (
          <Box key={item.id} mr={index % 2 === 0 ? "5" : "0"} mb="8">
            <CardProduct product={item} onPressCard={() => null} />
          </Box>
        )}
      />
    </View>
  );
}
