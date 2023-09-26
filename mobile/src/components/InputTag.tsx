import { Center, HStack, Text, View, useTheme } from "native-base";
import { X } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type Props = {
  isActive: boolean | null;
  label: string;
  onChange: () => void;
  onRemove: () => void;
};

export function InputTag({ isActive, label, onChange, onRemove }: Props) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onChange}>
      <HStack p={1.5} pl={4} pr={isActive ? 2 : 4} background={isActive ? "blue.300" : "gray.300"} borderRadius="full">
        <HStack alignItems="center" space={3}>
          <Text
            fontSize="sm"
            color={isActive ? "#FFFFFF" : "gray.500"}
            fontFamily="heading"
          >
            {label}
          </Text>
          {isActive && (
            <TouchableOpacity activeOpacity={0.7} onPress={onRemove}>
              <Center background="gray.100" borderRadius="full" w={4} h={4}>
                  <X size={12} color={colors.blue[300]} weight="bold" />
              </Center>
            </TouchableOpacity>
          )}
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}
