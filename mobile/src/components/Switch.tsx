import { FormControl, ISwitchProps, Switch as NativeBaseSwitch } from "native-base";

type Props = ISwitchProps;

export function Switch({ ...rest }: Props) {
  return (
    <FormControl>
      <NativeBaseSwitch offTrackColor="gray.300" onTrackColor="blue.300" {...rest} />
    </FormControl>
  );
}
