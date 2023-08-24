import { useTheme } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type Props = {
  name: "boleto" | "pix" | "cash" | "card" | "deposit";
};

export function PaymentIcons({ name }: Props) {
  const { colors } = useTheme();

  switch (name) {
    case "deposit":
      return <Bank size={18} color={colors.gray[700]} />;
    case "boleto":
      return <Barcode size={18} color={colors.gray[700]} />;
    case "card":
      return <CreditCard size={18} color={colors.gray[700]} />;
    case "cash":
      return <Money size={18} color={colors.gray[700]} />;
    case "pix":
      return <QrCode size={18} color={colors.gray[700]} />;
    default:
      return <Money size={18} color={colors.gray[700]} />;
  }
}
