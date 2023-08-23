import { Dimensions } from "react-native";
import { Center, Image, Text, VStack, View } from "native-base";

import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";

import EmptyImage from "../assets/emptyImage.jpg";
import { FormatCurrency } from "@utils/FormatCurrency";
import { UserAvatar } from "./UserAvatar";

type Props = {
  product: ProductDTO;
};

export function CardProduct({ product }: Props) {
  const WIDTH_IMAGE = Dimensions.get("window").width / 2 - 34;
  const isInative = false;

  return (
    <VStack>
      <VStack position="relative" rounded="sm">
        {!product?.is_active && (
          <View
            w={WIDTH_IMAGE}
            h={24}
            position="absolute"
            bg="rgba(0, 0, 0, 0.40)"
            zIndex={10}
            borderRadius="sm"
          />
        )}
        <Image
          source={
            product.product_images.length > 0
              ? {
                  uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`,
                }
              : EmptyImage
          }
          alt="product image"
          w={WIDTH_IMAGE}
          h={24}
          resizeMode="cover"
          rounded="sm"
        />
        {product?.user?.avatar && (
          <UserAvatar
            avatar={product.user.avatar}
            sizeImage={6}
            borderWidth={1}
            borderColor="gray.700"
            position="absolute"
            left="1"
            top="1"
          />
        )}
        <Center
          position="absolute"
          right="1"
          top="1"
          bg={product.is_new ? "blue.700" : "gray.600"}
          rounded="full"
          px="2"
          py="0.5"
        >
          <Text color="white" fontFamily="heading" fontSize={10}>
            {product.is_new ? "NOVO" : "USADO"}
          </Text>
        </Center>
        {!product?.is_active && (
          <Text
            position="absolute"
            bottom="2"
            left="2"
            color="gray.100"
            fontFamily="heading"
            fontSize={11}
            zIndex={10}
          >
            ANÚNCIO DESATIVADO
          </Text>
        )}
      </VStack>
      <VStack mt="1">
        <Text color={!product?.is_active ? "gray.400" : "gray.700"}>{product.name}</Text>
        <Text
          fontSize="md"
          fontFamily={!product?.is_active ? "body" : "heading"}
          mt="-1"
          color={!product?.is_active ? "gray.400" : "gray.700"}
        >
          <Text fontSize="sm">R$</Text> {FormatCurrency(product.price)}
        </Text>
      </VStack>
    </VStack>
  );
}
