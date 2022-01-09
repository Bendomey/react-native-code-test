import "react-native-gesture-handler";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import { ITheme } from "../../interfaces/misc";
import { getFromStorage, saveToStorage } from "../store";
import { THEME_MANAGER } from "../../constants";
import { theme as myTheme } from "../../constants/theme";
import mapping from "../../../mapping.json";

const ThemeContext = createContext<{
  theme: ITheme;
  handleThemeSwitch: () => void;
}>({ theme: "light", handleThemeSwitch: () => {} });

export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>("light");

  useEffect(() => {
    const getTheme = async () => {
      let themeFromStorage = await getFromStorage(THEME_MANAGER);
      if (themeFromStorage) setTheme(JSON.parse(themeFromStorage) as ITheme);
      else setTheme(Appearance.getColorScheme() as ITheme);
    };
    getTheme();
  }, []);

  const handleThemeSwitch = async () => {
    if (theme === "light") {
      setTheme("dark");
      await saveToStorage("dark", THEME_MANAGER);
    } else {
      setTheme("light");
      await saveToStorage("light", THEME_MANAGER);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeSwitch }}>
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
        {children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(ThemeContext);
