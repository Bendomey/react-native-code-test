import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//import Navigators
import { AuthNavigator } from "../screens/auth";
import { MainNavigator } from "../screens/main";
import { StatusBar } from "react-native";
import { useThemeProvider } from "../services/contexts/theme";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { theme } = useThemeProvider();
  const barStyle = theme === "light" ? "dark-content" : "light-content";

  return (
    <>
      <StatusBar barStyle={barStyle} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Main"}>
          <Stack.Screen
            name={"Main"}
            component={MainNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={"Auth"}
            component={AuthNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
