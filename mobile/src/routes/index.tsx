import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useTheme } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[200];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
