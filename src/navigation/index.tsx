import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//import Navigators
import { AuthNavigator } from "../screens/auth";
// import MainNavigator from "../screens/main";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Auth"}>
          <Stack.Screen
            name={"Auth"}
            component={AuthNavigator}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name={"Main"}
            component={MainNavigator}
            options={{
              headerShown: false,
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
