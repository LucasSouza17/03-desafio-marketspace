import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { TabRoutes } from "./tab.routes";
import { ProductDetails } from "@screens/ProductDetails";

type AppRoutes = {
  home_navigate: undefined;
  product_details: {
    productId: string
  };
  my_product_details: undefined;
  new_product: undefined;
  new_product_preview: undefined;
  edit_product: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="home_navigate" screenOptions={{ headerShown: false }}>
      <Screen name="home_navigate" component={TabRoutes} />
      <Screen name="product_details" component={ProductDetails} />
    </Navigator>
  );
}
