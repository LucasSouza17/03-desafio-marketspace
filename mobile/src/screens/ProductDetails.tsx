import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Center,
  Flex,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";

import { AppError } from "@utils/AppError";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";

import { HeaderRoutes } from "@components/HeaderRoutes";
import { SliderImage } from "@components/SliderImage";
import { Loading } from "@components/Loading";
import { UserAvatar } from "@components/UserAvatar";
import { FormatCurrency } from "@utils/FormatCurrency";
import { PaymentIcons } from "@components/PaymentIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@components/Button";
import { WhatsappLogo } from "phosphor-react-native";

type RouteParamsProps = {
  productId: number;
};

export function ProductDetails() {
  const { bottom } = useSafeAreaInsets();
  const toast = useToast();

  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

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

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <View flex={1} bg="gray.200">
      <Flex px={6}>
        <HeaderRoutes goBackButton />
      </Flex>

      {isLoadingProduct ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Flex mt={3}>
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
                  fontFamily={!product?.is_active ? "body" : "heading"}
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
                  <HStack alignItems="center" space={2}>
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
      )}
      <HStack
        pb={bottom / 4 + 20}
        bg="gray.100"
        p={6}
        space={14}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          fontSize="xl"
          fontFamily={!product?.is_active ? "body" : "heading"}
          color="blue.700"
        >
          <Text fontSize="sm">R$</Text> {FormatCurrency(product.price)}
        </Text>
        <Button
          flex={1}
          title="Entrar em contato"
          leftIcon={<WhatsappLogo color="white" weight="fill" size={18} />}
        />
      </HStack>
    </View>
  );
}
