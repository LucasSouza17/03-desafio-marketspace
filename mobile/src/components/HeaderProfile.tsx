import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HStack, Image, Text, VStack, View } from "native-base";
import { Plus } from "phosphor-react-native";

import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

import { Button } from "./Button";

export function HeaderProfile() {
  const { top } = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <HStack flexDir="row" pt={top + 20} justifyContent="space-between" space="8">
      <TouchableOpacity activeOpacity={0.7}>
        <HStack space="2">
          <Image
            source={{uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
            alt="profile"
            w={12}
            h={12}
            rounded="full"
            borderWidth={2}
            borderColor="blue.300"
          />
          <VStack justifyContent="center">
            <Text fontFamily="body" fontSize="md" color="gray.700">
              Boas vindas,
            </Text>
            <Text fontFamily="heading" fontSize="md" mt="-1" color="gray.700">
              {user.name.split(" ")[0]}!
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
      <Button
        flex={1}
        title="Criar anúncio"
        variant="black"
        leftIcon={<Plus color="white" size={16} />}
      />
    </HStack>
  );
}
