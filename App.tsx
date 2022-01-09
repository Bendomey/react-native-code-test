import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Appearance } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import mapping from "./mapping.json";
import { useFonts } from "expo-font";
import { ITheme } from "./src/interfaces/misc";
import { getFromStorage } from "./src/services/store";
import { THEME_MANAGER } from "./src/constants";
import { AppNavigator } from "./src/navigation";
import { theme as myTheme } from "./src/constants/theme";

const App = () => {
  const [theme, setTheme] = useState<ITheme>("light");
  const [loaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const getTheme = async () => {
      let themeFromStorage = await getFromStorage(THEME_MANAGER);
      if (themeFromStorage) setTheme(themeFromStorage as ITheme);
      else setTheme(Appearance.getColorScheme() as ITheme);
    };
    getTheme();
  }, []);

  if (!loaded) {
    // TODO: I will change this to a loader :)
    return null;
  }

  return (
    <ApplicationProvider
      {...eva}
      theme={
        theme === "light"
          ? { ...eva.light, ...myTheme(theme) }
          : { ...eva.dark, ...myTheme(theme) }
      }
      // theme={{ ...eva.dark, ...myTheme("dark") }}
      // theme={{ ...eva.light, ...myTheme("light") }}
      customMapping={{ ...eva.mapping, ...mapping }}
    >
      <AppNavigator />
    </ApplicationProvider>
  );
};

export default App;
