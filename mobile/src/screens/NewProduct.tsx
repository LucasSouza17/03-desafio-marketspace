import { Button } from "@components/Button";
import { DismissKeyboard } from "@components/DismissKeyboard";
import { HeaderRoutes } from "@components/HeaderRoutes";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Flex, HStack, ScrollView, Text, VStack, View } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function NewProduct() {
  const { bottom } = useSafeAreaInsets();

  return (
    <DismissKeyboard>
      <View flex={1} bg="gray.200">
        <Flex px={6}>
          <HeaderRoutes goBackButton title="Criar anúncio" />
        </Flex>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack px={6} mt={6} space={8}>
            <Flex>
              <Text fontSize="md" fontFamily="heading" color="gray.600">
                Imagens
              </Text>
              <Text fontSize="sm" fontFamily="body" color="gray.500">
                Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
              </Text>
            </Flex>
            <VStack>
              <Text fontSize="md" fontFamily="heading" color="gray.600" mb={4}>
                Sobre o produto
              </Text>
              <Input placeholder="Título do anúncio" />
              <Input
                placeholder="Descrição do produto"
                h={40}
                numberOfLines={4}
                multiline
                py={4}
              />
              <Radio
                name="is_new"
                options={[
                  { label: "Produto novo", value: "true" },
                  { label: "Produto usado", value: "false" },
                ]}
              />
            </VStack>
            <VStack>
              <Text fontSize="md" fontFamily="heading" color="gray.600" mb={4}>
                Venda
              </Text>
              <Input placeholder="Valor do produto" />
            </VStack>
          </VStack>
        </ScrollView>
        <HStack
          pb={bottom / 4 + 20}
          bg="gray.100"
          p={6}
          space={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <Button flex={1} title="Cancelar" variant="gray" />
          <Button flex={1} title="Avançar" variant="black" />
        </HStack>
      </View>
    </DismissKeyboard>
  );
}
