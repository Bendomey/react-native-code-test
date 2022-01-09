import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackProps } from "../screens/auth/types";
import { MainStackProps } from "../screens/main/types";

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackProps>;
  Main: NavigatorScreenParams<MainStackProps>;
};
