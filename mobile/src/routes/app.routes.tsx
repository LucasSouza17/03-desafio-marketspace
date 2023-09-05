import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { TabRoutes } from "./tab.routes";
import { ProductDetails } from "@screens/ProductDetails";
import { MyProductDetails } from "@screens/MyProductDetails";
import { NewProduct } from "@screens/NewProduct";
import { NewProductPreview } from "@screens/NewProductPreview";
import { FormProductDTO } from "@dtos/FormProductDTO";

type AppRoutes = {
  home_navigate: undefined;
  product_details: {
    productId: string;
  };
  my_product_details: {
    productId: string;
  };
  new_product: undefined;
  new_product_preview: {
    product: FormProductDTO
  };
  edit_product: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="home_navigate" screenOptions={{ headerShown: false }}>
      <Screen name="home_navigate" component={TabRoutes} />
      <Screen name="product_details" component={ProductDetails} />
      <Screen name="my_product_details" component={MyProductDetails} />
      <Screen name="new_product" component={NewProduct} />
      <Screen name="new_product_preview" component={NewProductPreview} />
    </Navigator>
  );
}
