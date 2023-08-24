import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { HStack, Text, VStack, useTheme } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { TabNavigatorRoutesProps } from "@routes/tab.routes";

type Props = {
  productsActive: number;
};

export function CardMyProducts({ productsActive }: Props) {
  const navigation = useNavigation<TabNavigatorRoutesProps>();
  const { colors } = useTheme();

  function handleGoToMyProducts() {
    navigation.navigate("my_products");
  }

  return (
    <VStack space="3">
      <Text color="gray.500" fontSize="sm">
        Seus produtos anunciados para venda
      </Text>
      <HStack
        px="4"
        py="3"
        bg="rgba(100, 122, 199, 0.1)"
        borderRadius="sm"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack alignItems="center" space="4">
          <Tag size={22} color={colors.blue[700]} />
          <VStack>
            <Text fontSize="lg" fontFamily="heading">
              {productsActive}
            </Text>
            <Text mt="-1" fontSize="xs">
              anúncios ativos
            </Text>
          </VStack>
        </HStack>
        <TouchableOpacity activeOpacity={0.75} onPress={handleGoToMyProducts}>
          <HStack space="2" alignItems="center">
            <Text fontSize="xs" fontFamily="heading" color="blue.700">
              Meus anúncios
            </Text>
            <ArrowRight color={colors.blue[700]} size={16} />
          </HStack>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
