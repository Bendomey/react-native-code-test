import { ITheme } from "../interfaces/misc";

const lightTheme = {
  background: "#fff",
  "background-alternative": "dark-content",
};
const darkTheme = {
  background: "#000",
  "background-alternative": "light-content",
};

export const theme = (theme: ITheme) =>
  theme === "dark" ? darkTheme : lightTheme;
