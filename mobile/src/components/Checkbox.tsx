import {
  FormControl,
  Checkbox as NativeBaseCheckbox,
  ICheckboxGroupProps,
  VStack,
} from "native-base";

type Props = ICheckboxGroupProps & {
  errorMessage?: string | null;
  options: Array<{
    label: string;
    value: string;
  }>;
  isInvalid?: boolean;
};

export function Checkbox({
  errorMessage,
  options,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseCheckbox.Group {...rest}>
        <VStack w="100%" space={2}>
          {options.map((option) => (
            <NativeBaseCheckbox key={option.value} value={option.value} bg="gray.200" borderWidth={1.5} _checked={{bg: "blue.300", borderColor: "blue.300", _icon: {color: "gray.200"}}}>
              {option.label}
            </NativeBaseCheckbox>
          ))}
        </VStack>
      </NativeBaseCheckbox.Group>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
