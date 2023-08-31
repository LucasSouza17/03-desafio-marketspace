import { useState } from "react";
import {
  IInputProps,
  Input as NativeBaseInput,
  FormControl,
  Pressable,
  Icon,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";

type Props = IInputProps & {
  errorMessage?: string | null;
  isInputPrice?: boolean
};

export function Input({
  errorMessage = null,
  isInvalid,
  secureTextEntry,
  isInputPrice = false,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        bg="gray.100"
        h={12}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray.600"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          bg: "gray.100",
          borderWidth: 1,
          borderColor: "gray.500",
        }}
        type={showPassword || !secureTextEntry ? "text" : "password"}
        InputRightElement={
          secureTextEntry ? (
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon
                as={showPassword ? <Eye /> : <EyeSlash />}
                size={5}
                mr="4"
                color="muted.400"
              />
            </Pressable>
          ) : undefined
        }
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
