import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold, Karla_300Light } from "@expo-google-fonts/karla";

import { AuthContextProvider } from "@contexts/AuthContext";
import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";

import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_300Light,
    Karla_400Regular,
    Karla_700Bold,
  });

  return (
      <NativeBaseProvider theme={THEME}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <AuthContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthContextProvider>
      </NativeBaseProvider>
  );
}
