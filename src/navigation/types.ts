import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackProps } from "../screens/auth/types";
// import {MainNavigatorProps} from '../screens/main/types';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackProps>;
  // Main: NavigatorScreenParams<MainNavigatorProps>;
};
