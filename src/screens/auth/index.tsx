import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthStackProps } from "./types";

import { Login } from "./login";

const Stack = createStackNavigator<AuthStackProps>();

export const AuthNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={"login"}>
        <Stack.Screen
          name={"login"}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
