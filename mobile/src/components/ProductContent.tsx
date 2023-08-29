import {
  Box,
  Center,
  Flex,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";

import { ProductDTO } from "@dtos/ProductDTO";

import { SliderImage } from "@components/SliderImage";
import { UserAvatar } from "@components/UserAvatar";
import { FormatCurrency } from "@utils/FormatCurrency";
import { PaymentIcons } from "@components/PaymentIcons";

type Props = {
  product: ProductDTO
}

export function ProductContent({product}: Props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 24}}>
      <Flex position="relative" mt={3}>
        {!product.is_active && (
          <Center zIndex={10} position="absolute" bg="rgba(0, 0, 0, 0.40)" w="100%" h="100%">
            <Text fontSize="sm" fontFamily="heading" color="gray.100">ANÚNCIO DESATIVADO</Text>
          </Center> 
        )}
        <SliderImage images={product.product_images.map((item) => item.path)} />
      </Flex>

      <Flex px={6} mt={6}>
        <HStack space={2}>
          <UserAvatar avatar={product.user.avatar} sizeImage={6} />
          <Text color="gray.700" fontSize="sm">
            {product.user.name}
          </Text>
        </HStack>

        <VStack mt={6} alignItems="flex-start" space="2">
          <Center bg="gray.300" rounded="full" px="2" py="0.5">
            <Text color="gray.600" fontFamily="heading" fontSize={10}>
              {product.is_new ? "NOVO" : "USADO"}
            </Text>
          </Center>
          <HStack w="100%" justifyContent="space-between" space="2">
            <Text fontSize="lg" fontFamily="heading" flexShrink={1}>
              {product.name}
            </Text>
            <Text
              alignSelf="flex-end"
              fontSize="lg"
              fontFamily="heading"
              color="blue.300"
            >
              <Text fontSize="sm">R$</Text> {FormatCurrency(product.price)}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {product.description}
          </Text>
        </VStack>

        <VStack mt={6}>
          <Text fontFamily="heading" fontSize="sm">
            Aceita troca?{" "}
            <Text fontFamily="body">{product.accept_trade ? "Sim" : "Não"}</Text>
          </Text>
        </VStack>

        <VStack mt={4} space={2}>
          <Text fontFamily="heading" fontSize="sm">
            Meios de pagamento:
          </Text>
          <VStack>
            {product.payment_methods.map((item) => (
              <HStack key={item.key} alignItems="center" space={2}>
                <PaymentIcons name={item.key} />
                <Text fontFamily="body" fontSize="sm">
                  {item.name}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Flex>
    </ScrollView>
  );
}
