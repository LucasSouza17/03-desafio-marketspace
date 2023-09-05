import { Box, Center, Flex, HStack, ScrollView, Text, VStack } from "native-base";

import { SliderImage } from "@components/SliderImage";
import { UserAvatar } from "@components/UserAvatar";
import { FormatCurrency } from "@utils/FormatCurrency";
import { PaymentIcons } from "@components/PaymentIcons";
import { FormProductDTO } from "@dtos/FormProductDTO";
import { useAuth } from "@hooks/useAuth";
import { parseBool } from "@utils/ParseBool";

type Props = {
  product: FormProductDTO;
};

export function ProductContentPreview({ product }: Props) {
  const { user } = useAuth();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Flex position="relative">
        <SliderImage images={product.images.map((item) => item.uri)} />
      </Flex>

      <Flex px={6} mt={6}>
        <HStack space={2}>
          <UserAvatar avatar={user.avatar} sizeImage={6} />
          <Text color="gray.700" fontSize="sm">
            {user.name}
          </Text>
        </HStack>

        <VStack mt={6} alignItems="flex-start" space="2">
          <Center bg="gray.300" rounded="full" px="2" py="0.5">
            <Text color="gray.600" fontFamily="heading" fontSize={10}>
              {parseBool(product.is_new) ? "NOVO" : "USADO"}
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
                <PaymentIcons
                  name={item.key as "boleto" | "pix" | "cash" | "card" | "deposit"}
                />
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
