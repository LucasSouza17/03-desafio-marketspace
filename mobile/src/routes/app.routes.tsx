import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import { Home } from "@screens/Home";
import { House, SignOut, Tag } from "phosphor-react-native";

type AppRoutes = {
  home: undefined;
  my_products: undefined;
  signOut: undefined;
};

export type HomeNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
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
          tabBarIcon: ({ color, focused }) => <House color={color} size={iconSize} weight={focused ? "bold" : "regular"} />,
        }}
      />
      <Screen
        name="my_products"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => <Tag color={color} size={iconSize} weight={focused ? "bold" : "regular"} />,
        }}
      />
      <Screen
        name="signOut"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <SignOut color="#E07878" size={iconSize} weight={focused ? "bold" : "regular"} />,
        }}
      />
    </Navigator>
  );
}
