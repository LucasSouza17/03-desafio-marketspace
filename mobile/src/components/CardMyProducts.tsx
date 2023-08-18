import { HStack, Text, VStack, useTheme } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function CardMyProducts() {
  const { colors } = useTheme();

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
              4
            </Text>
            <Text mt="-1" fontSize="xs">
              anúncios ativos
            </Text>
          </VStack>
        </HStack>
        <TouchableOpacity activeOpacity={0.75}>
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
