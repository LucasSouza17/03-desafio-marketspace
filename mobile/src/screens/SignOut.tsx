import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Center, Flex, HStack, Spinner, Text, VStack, useTheme } from "native-base";
import { HandWaving } from "phosphor-react-native";

import { useAuth } from "@hooks/useAuth";

import { UserAvatar } from "@components/UserAvatar";

export function SignOut() {
  const { top } = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const {colors} = useTheme();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        signOut();
      }, 2000);
    }, [])
  );

  return (
    <Center flex={1} px={6} pt={top + 20}>
      <HStack
        w="100%"
        space="4"
        alignItems="center"
        bg="gray.100"
        py="2"
        px="4"
        rounded="md"
        shadow="2"
      >
        <UserAvatar avatar={user.avatar} sizeImage={16} />
        <VStack alignItems="flex-start">
          <Text textAlign="center" fontSize="lg" fontFamily="body" color="gray.600">
            Até mais
          </Text>
          <Text
            textAlign="center"
            fontSize="lg"
            fontFamily="heading"
            color="gray.600"
            mt="-2"
          >
            {user.name}!
          </Text>
        </VStack>
        <Flex flex={1} alignItems="flex-end">
          <HandWaving size={36} color={colors.blue[300]} />
        </Flex>
      </HStack>
      <HStack mt="4">
        <Text textAlign="center" fontSize="lg" fontFamily="body" color="gray.600">
          Saindo...
        </Text>
        <Spinner color="gray.600" ml="4" />
      </HStack>
    </Center>
  );
}
