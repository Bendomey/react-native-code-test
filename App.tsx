import "react-native-gesture-handler";
import React from "react";
import { useFonts } from "expo-font";
import { AppNavigator } from "./src/navigation";
import { ThemeProvider } from "./src/services/contexts/theme";

const App = () => {
  const [loaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    // TODO: I will change this to a loader :)
    return null;
  }

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
