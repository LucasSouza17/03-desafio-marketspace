import { Center, HStack, Image, Text, VStack, View } from "native-base";
import { Dimensions } from "react-native";

export function CardProduct() {
  const WIDTH_IMAGE = Dimensions.get("window").width / 2 - 34;
  const isInative = false;

  return (
    <VStack>
      <VStack position="relative" rounded="sm">
        {isInative && (
          <View
            w={WIDTH_IMAGE}
            h={24}
            position="absolute"
            bg="rgba(0, 0, 0, 0.40)"
            zIndex={10}
          />
        )}
        <Image
          src="https://img.olhardigital.com.br/wp-content/uploads/2023/08/Destaque-iPhone-14-Pro-botao-iPhone-15-Pro.jpg"
          alt="product image"
          w={WIDTH_IMAGE}
          h={24}
          resizeMode="cover"
          rounded="sm"
        />
        <Image
          src="https://avatars.githubusercontent.com/u/2254731?v=4"
          alt="user"
          w={6}
          h={6}
          rounded="full"
          borderWidth={1}
          borderColor="gray.700"
          position="absolute"
          left="1"
          top="1"
        />
        <Center
          position="absolute"
          right="1"
          top="1"
          bg="blue.700"
          rounded="full"
          px="2"
          py="0.5"
        >
          <Text color="white" fontFamily="heading" fontSize={10}>
            NOVO
          </Text>
        </Center>
        {isInative && (
          <Text
            position="absolute"
            bottom="2"
            left="2"
            color="gray.100"
            fontFamily="heading"
            fontSize={10}
            zIndex={10}
          >
            ANÚNCIO DESATIVADO
          </Text>
        )}
      </VStack>
      <VStack mt="1">
        <Text color={isInative ? "gray.400" : "gray.700"}>Iphone 15 pro max</Text>
        <Text
          fontSize="md"
          fontFamily={isInative ? "body" : "heading"}
          mt="-1"
          color={isInative ? "gray.400" : "gray.700"}
        >
          <Text fontSize="sm">R$</Text> 7.899,90
        </Text>
      </VStack>
    </VStack>
  );
}
