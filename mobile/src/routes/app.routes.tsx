import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Home } from "@screens/Home";

type HomeRoutes = {
  home: undefined;
};

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<HomeRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<HomeRoutes>();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  );
}
