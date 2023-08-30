import {
  FormControl,
  Radio as NativeBaseRadio,
  IRadioGroupProps,
  Stack,
} from "native-base";

type Props = IRadioGroupProps & {
  errorMessage?: string | null;
  options: Array<{
    label: string;
    value: string;
  }>;
  isVertical?: boolean;
};

export function Radio({
  errorMessage,
  options,
  isVertical = false,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseRadio.Group {...rest}>
        <Stack w="100%" direction={isVertical ? "column" : "row"} space={5}>
          {options.map((option) => (
            <NativeBaseRadio key={option.value} value={option.value} bg="gray.200" borderWidth={1.5} _checked={{borderColor: "blue.300", _icon: {color: "blue.300"}}}>
              {option.label}
            </NativeBaseRadio>
          ))}
        </Stack>
      </NativeBaseRadio.Group>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
