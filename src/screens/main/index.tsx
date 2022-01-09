import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { MainStackProps } from "./types";
import { TouchableOpacity, View } from "react-native";

import { Home } from "./home";
import { Blog } from "./blog";
import { useTheme } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const Stack = createStackNavigator<MainStackProps>();

export const MainNavigator = () => {
  const theme = useTheme();
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
        <Stack.Screen
          name={"blog"}
          component={Blog}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: theme["background"],
            },
            title: "",
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
          })}
        />
      </Stack.Navigator>
    </>
  );
};
