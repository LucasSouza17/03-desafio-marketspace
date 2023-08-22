import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Text, VStack, View, useToast } from "native-base";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { DismissKeyboard } from "@components/DismissKeyboard";
import { Button } from "@components/Button";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema: z.ZodType<FormDataProps> = z.object({
  email: z
    .string({ required_error: "Informe o e-mail" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ required_error: "Informe sua senha" })
    .min(6, { message: "Digite uma senha de pelo menos 6 digitos" }),
});

export function SignIn() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { signIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

      setIsLoading(false);
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View flex={1} bg="gray.100">
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            <VStack
              space="20"
              pb="16"
              pt={top + 64}
              bg="gray.200"
              borderBottomRadius="3xl"
              px="12"
            >
              <VStack width="100%" alignItems="center" space="2">
                <LogoSvg />
                <VStack>
                  <Text fontSize="3xl" fontFamily="heading" textAlign="center">
                    marketspace
                  </Text>
                  <Text
                    fontSize="sm"
                    fontFamily="light"
                    color="gray.500"
                    mt="-1"
                    textAlign="center"
                  >
                    Seu espaço de compra e venda
                  </Text>
                </VStack>
              </VStack>

              <VStack>
                <Text textAlign="center" fontSize="sm" color="gray.600">
                  Acesse sua conta
                </Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="E-mail"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={onChange}
                      value={value}
                      errorMessage={errors.email?.message}
                      mt="4"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Senha"
                      secureTextEntry
                      onChangeText={onChange}
                      value={value}
                      onSubmitEditing={handleSubmit(handleSignIn)}
                      returnKeyType="join"
                      errorMessage={errors.password?.message}
                      textContentType="oneTimeCode"
                    />
                  )}
                />

                <Button
                  title="Entrar"
                  onPress={handleSubmit(handleSignIn)}
                  isLoading={isLoading}
                />
              </VStack>
            </VStack>

            <VStack bg="gray.100" py="12" px="12">
              <Text textAlign="center">Ainda não tem acesso?</Text>
              <Button
                title="Criar uma conta"
                variant="gray"
                mt="3"
                onPress={handleNewAccount}
              />
            </VStack>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}
