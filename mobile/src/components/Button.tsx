import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "blue" | "black" | "gray";
};

export function Button({ title, variant = "blue", ...rest }: Props) {
  const groupColorUsed = () => {
    if (variant === "blue") {
      return ["blue.300", "gray.100"];
    } else if (variant === "black") {
      return ["gray.700", "gray.100"];
    } else {
      return ["gray.300", "gray.600"];
    }
  };

  return (
    <NativeBaseButton
      w="full"
      h={12}
      bg={groupColorUsed()[0]}
      rounded="md"
      _pressed={{
        opacity: 0.8,
        bg: groupColorUsed()[0]
      }}
      {...rest}
    >
      <Text color={groupColorUsed()[1]} fontFamily="heading" fontSize="sm">
        {title}
      </Text>
    </NativeBaseButton>
  );
}
