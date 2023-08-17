import { TouchableWithoutFeedback, Keyboard } from "react-native";

type Props = {
  children: React.ReactNode;
};

export function DismissKeyboard({ children }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}
