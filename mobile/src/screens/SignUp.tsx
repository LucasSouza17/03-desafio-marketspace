import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Text, VStack, View, useToast } from "native-base";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";

import LogoSvg from "@assets/logo.svg";
import { DismissKeyboard } from "@components/DismissKeyboard";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhotoSelect } from "@components/UserPhotoSelect";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { ImageDTO } from "@dtos/ImageDTO";

type FormDataProps = {
  avatar: ImageDTO;
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
};

const phoneRegex = /^\d{11}$/;

const signUpSchema: z.ZodType<FormDataProps> = z.object({
  avatar: z.object(
    {
      fileExtension: z.string(),
      uri: z.string(),
      type: z.string(),
    },
    { required_error: "Informe o avatar" }
  ),
  name: z
    .string({ required_error: "Informe o nome" })
    .min(1, { message: "Informe o nome" }),
  email: z
    .string({ required_error: "Informe o e-mail" })
    .email({ message: "E-mail inválido" }),
  tel: z
    .string({ required_error: "Informe o seu telefone celular" })
    .max(11)
    .refine((value) => phoneRegex.test(value), {
      message:
        "Formato de telefone inválido. Use 11 dígitos sem espaços ou caracteres especiais.",
    }),
  password: z
    .string({ required_error: "Informe sua senha" })
    .min(6, { message: "Digite uma senha de pelo menos 6 digitos" }),
  password_confirm: z
    .string({ required_error: "Confirme sua senha" })
    .refine((schema: any) => schema.password === schema.password_confirm, {
      message: "As senhas não coincidem.",
    }),
});

export function SignUp() {
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
    resolver: zodResolver(signUpSchema),
  });

  async function handleSignUp({ avatar, name, email, tel, password }: FormDataProps) {
    try {
      setIsLoading(true);

      const photoFile = {
        name: `${name.replaceAll(" ", "")}.${avatar.fileExtension}`.toLowerCase(),
        uri: avatar.uri,
        type: avatar.type,
      } as any;

      const userFormData = new FormData();
      userFormData.append("avatar", photoFile);
      userFormData.append("name", name);
      userFormData.append("email", email);
      userFormData.append("tel", tel);
      userFormData.append("password", password);

      await api.post("/users", userFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await signIn(email, password);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View flex={1} bg="gray.200" pt={top + 20} px="12">
          <VStack width="100%" alignItems="center" space="2" mb="2">
            <LogoSvg width={60} height={40} />
            <VStack>
              <Text fontSize="lg" fontFamily="heading" textAlign="center">
                Boas vindas!
              </Text>
              <Text
                fontSize="sm"
                fontFamily="body"
                color="gray.600"
                textAlign="center"
              >
                Crie sua conta e use o espaço para comprar itens variados e vender seus
                produtos
              </Text>
            </VStack>
          </VStack>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 24,
              paddingTop: 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            <VStack alignItems="center" space={4}>
              <Controller
                control={control}
                name="avatar"
                render={({ field: { onChange, value } }) => (
                  <UserPhotoSelect
                    onChange={(value) => onChange(value)}
                    value={value?.uri}
                    errorMessage={errors.avatar?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
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
                  />
                )}
              />
              <Controller
                control={control}
                name="tel"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Telefone"
                    keyboardType="phone-pad"
                    maxLength={11}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.tel?.message}
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
                    errorMessage={errors.password?.message}
                    textContentType="oneTimeCode"
                  />
                )}
              />

              <Controller
                control={control}
                name="password_confirm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Confirme a senha"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    returnKeyType="send"
                    errorMessage={errors.password_confirm?.message}
                    textContentType="oneTimeCode"
                  />
                )}
              />

              <Button
                title="Criar"
                variant="black"
                marginTop="2"
                onPress={handleSubmit(handleSignUp)}
                isLoading={isLoading}
              />
            </VStack>

            <VStack mt="12" space="4">
              <Text textAlign="center">Já tem uma conta</Text>
              <Button title="Ir para o login" variant="gray" onPress={handleGoBack} />
            </VStack>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
  );
}
