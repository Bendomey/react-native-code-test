import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthStackProps } from "./types";

import { Login } from "./login";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@ui-kitten/components";

const Stack = createStackNavigator<AuthStackProps>();

export const AuthNavigator = () => {
  const theme = useTheme();
  return (
    <>
      <Stack.Navigator initialRouteName={"login"}>
        <Stack.Screen
          name={"login"}
          component={Login}
          options={({ navigation }) => ({
            title: "",
            // headerShown: false,
            headerLeft: () => (
              <>
                <View style={{ marginLeft: RFValue(20) }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Main", { screen: "home" })
                    }
                  >
                    <Ionicons
                      name={"ios-arrow-back"}
                      size={RFValue(25)}
                      color={theme["background-alternative"]}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ),
            headerStyle: {
              backgroundColor: theme["background"],
            },
          })}
        />
      </Stack.Navigator>
    </>
  );
};
