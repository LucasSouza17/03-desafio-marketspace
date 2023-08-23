import { Select as SelectBase, ISelectProps, CheckIcon } from "native-base";
import { ArrowDown, CaretDown, CaretUp } from "phosphor-react-native";
import { Platform } from "react-native";

type Props = ISelectProps & {
  items: {
    label: string;
    value: string;
  }[];
};

export function Select({ items, ...rest }: Props) {
  return (
    <SelectBase
      minW="32"
      variant="outline"
      accessibilityLabel="Choose Service"
      dropdownCloseIcon={<CaretDown size={16} style={{ marginRight: 8 }} />}
      dropdownOpenIcon={<CaretUp size={16} style={{ marginRight: 8 }} />}
      selectedValue={items[0].value}
      _selectedItem={{
        _text: {
          fontFamily: "heading",
        },
      }}
      h="9"
      _item={{
        _pressed: {
          bg: "gray.200",
        },
        rounded: "md",
      }}
      _actionSheet={{
        useRNModal: true,
      }}
      {...rest}
    >
      {items.map((item) => (
        <SelectBase.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </SelectBase>
  );
}
