import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { House, Tag, SignOut as SignOutPhosphor } from "phosphor-react-native";

import { Home } from "@screens/Home";
import { MyProducts } from "@screens/MyProducts";
import { SignOut } from "@screens/SignOut";

type TabRoutes = {
  home: undefined;
  my_products: undefined;
  signOut: undefined;
};

export type TabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<TabRoutes>();

export function TabRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[600],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: Platform.OS === "android" ? sizes[8] : sizes[12],
          paddingTop: sizes[8],
          paddingHorizontal: 20,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House color={color} size={iconSize} weight={focused ? "bold" : "regular"} />
          ),
        }}
      />
      <Screen
        name="my_products"
        component={MyProducts}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag color={color} size={iconSize} weight={focused ? "bold" : "regular"} />
          ),
        }}
      />
      <Screen
        name="signOut"
        component={SignOut}
        options={{
          tabBarIcon: ({ focused }) => (
            <SignOutPhosphor
              color="#E07878"
              size={iconSize}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
    </Navigator>
  );
}
