import { Platform, ScrollView } from "react-native";
import { Box, HStack, KeyboardAvoidingView, Text, VStack, View } from "native-base";

import { CardMyProducts } from "@components/CardMyProducts";
import { HeaderProfile } from "@components/HeaderProfile";
import { SearchInput } from "@components/SearchInput";
import { DismissKeyboard } from "@components/DismissKeyboard";
import { CardProduct } from "@components/CardProduct";

export function Home() {
  const products = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View flex={1} px={6} bg="gray.200">
        <HeaderProfile />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          <VStack space="8" mt="8">
            <CardMyProducts />
            <VStack space="3">
              <Text color="gray.500" fontSize="sm">
                Seus produtos anunciados para venda
              </Text>
              <SearchInput
                onChangeText={() => null}
                onClickFilters={() => null}
                onClickSearch={() => null}
              />
            </VStack>
          </VStack>

          <HStack flexWrap="wrap" mt="6">
            {products.map((item, index) => (
              <Box key={item} mr={index % 2 === 0 ? "5" : "0"} mb="8">
                <CardProduct />
              </Box>
            ))}
          </HStack>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
