import { useNavigation } from "@react-navigation/native";
import { Box, Flex, HStack, Hidden, Text, View, useTheme } from "native-base";
import { ArrowLeft, IconContext } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title?: string;
  goBackButton?: boolean;
  actionButton?: React.ReactNode;
};

export function HeaderRoutes({ actionButton, goBackButton, title }: Props) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack
      w="100%"
      pt={top + 20}
      justifyContent="space-between"
      alignItems="center"
    >
      <IconContext.Provider
        value={{
          color: colors.gray[700],
          size: 24,
          weight: "regular",
        }}
      >
        {goBackButton && (
          <View flex={0}>
            <TouchableOpacity onPress={handleGoBack}>
              <ArrowLeft size={24} color={colors.gray[700]} />
            </TouchableOpacity>
          </View>
        )}
        {title && (
          <View flex={1} ml={!goBackButton ? 6 : 0} mr={!actionButton ? 6 : 0}>
            <Text textAlign="center" fontSize="lg" fontFamily="heading" color="gray.700">
              {title}
            </Text>
          </View>
        )}
        {actionButton && <View flex={0}>{actionButton}</View>}
      </IconContext.Provider>
    </HStack>
  );
}
