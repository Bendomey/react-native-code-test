import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { MainStackProps } from "./types";

import { Home } from "./home";

const Stack = createStackNavigator<MainStackProps>();

export const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={"home"}>
        <Stack.Screen
          name={"home"}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
