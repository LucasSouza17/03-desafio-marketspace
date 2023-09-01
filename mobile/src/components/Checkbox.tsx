import { FormControl, Checkbox as NativeBaseCheckbox, VStack } from "native-base";
import { useState } from "react";

type Props = {
  errorMessage?: string | null;
  options: Array<{
    label: string;
    value: string;
  }>;
  isInvalid?: boolean;
  onChange: (values: string[]) => void;
};

export function Checkbox({ errorMessage, options, isInvalid, onChange }: Props) {
  const invalid = !!errorMessage || isInvalid;
  const [values, setValues] = useState<string[]>([]);

  function onValChange(name: string) {
    let newValues = values;
    const verifyIfExists = values.includes(name);

    if (verifyIfExists) {
      let index = newValues.indexOf(name);
      newValues.splice(index, 1);

      setValues(newValues);
      onChange(newValues);
    } else {
      newValues.push(name);
      onChange(newValues);
      setValues(newValues);
    }
  }

  return (
    <FormControl isInvalid={invalid}>
      <VStack w="100%" space={2}>
        {options.map((option) => (
          <NativeBaseCheckbox
            key={option.value}
            value={option.value}
            bg="gray.200"
            borderWidth={1.5}
            onChange={(value) => {
              onValChange(option.value);
            }}
            _checked={{
              bg: "blue.300",
              borderColor: "blue.300",
              _icon: { color: "gray.200" },
            }}
          >
            {option.label}
          </NativeBaseCheckbox>
        ))}
      </VStack>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
