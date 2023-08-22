import { useState } from "react";
import { Box, HStack, IInputProps, Input, useTheme } from "native-base";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type Props = IInputProps & {
  onChangeText: (value: string) => void;
  onClickSearch: () => void;
  onClickFilters: () => void;
};

export function SearchInput({ onChangeText, onClickFilters, onClickSearch, ...rest }: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const { colors } = useTheme();

  return (
    <HStack
      bg="gray.100"
      rounded="md"
      pr="4"
      borderWidth={isFocus ? 1 : 0}
      borderColor={isFocus ? "gray.500" : "transparent"}
    >
      <Input
        flex={1}
        bg="gray.100"
        h={12}
        px={4}
        borderWidth={0}
        placeholder="Buscar anúncio"
        fontSize="md"
        color="gray.600"
        fontFamily="body"
        placeholderTextColor="gray.400"
        _focus={{
          bg: "gray.100",
          borderWidth: 0,
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChangeText={onChangeText}
        {...rest}
      />
      <HStack alignItems="center" space="3">
        <TouchableOpacity activeOpacity={0.7} onPress={onClickSearch}>
          <MagnifyingGlass size={20} color={colors.gray[600]} />
        </TouchableOpacity>
        <Box w="1px" h="4" bg="gray.400" />
        <TouchableOpacity activeOpacity={0.7} onPress={onClickFilters}>
          <Sliders size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}
