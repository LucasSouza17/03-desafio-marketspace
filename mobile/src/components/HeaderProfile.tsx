import { HStack, Image, Text, VStack, View } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./Button";
import { Plus } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function HeaderProfile() {
  const { top } = useSafeAreaInsets();

  return (
    <HStack flexDir="row" pt={top + 20} justifyContent="space-between" space="8">
      <TouchableOpacity activeOpacity={0.7}>
        <HStack space="2">
          <Image
            src="https://avatars.githubusercontent.com/u/62787018?v=4"
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
              Lucas!
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
