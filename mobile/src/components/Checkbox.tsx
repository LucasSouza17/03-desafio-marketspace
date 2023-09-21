import { FormControl, Checkbox as NativeBaseCheckbox, VStack } from "native-base";
import { useEffect, useState } from "react";

type ValueProps = {
  key: string;
  name: string;
};

type Props = {
  errorMessage?: string | null;
  options: Array<{
    label: string;
    value: string;
  }>;
  isInvalid?: boolean;
  onChange: (values: ValueProps[]) => void;
  selectedValues: ValueProps[];
};

export function Checkbox({
  errorMessage,
  options,
  isInvalid,
  onChange,
  selectedValues,
}: Props) {
  const invalid = !!errorMessage || isInvalid;
  const [values, setValues] = useState<ValueProps[]>(selectedValues);

  function onValChange(value: ValueProps) {
    let newValues = values;
    const verifyIfExists = values.map((item) => item.key).includes(value.key);

    if (verifyIfExists) {
      let index = newValues.indexOf(value);
      newValues.splice(index, 1);

      setValues(newValues);
      onChange(newValues);
    } else {
      newValues.push(value);
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
              onValChange({ key: option.value, name: option.label });
            }}
            defaultIsChecked={values.map(item => item.key).includes(option.value)}
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
