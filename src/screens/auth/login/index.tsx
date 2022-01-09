import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import {} from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  StatusBarStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";

export const Login = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar barStyle={theme["background-alternative"] as StatusBarStyle} />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme["background"] }}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <View>
              <Text style={{ fontSize: RFValue(30) }} category="h1">
                Let's sign you in
              </Text>
              <View style={{ marginTop: RFValue(10) }}>
                <Text category="s1">Welcome back! You've been missed</Text>
              </View>
            </View>
            <View style={{ marginTop: RFValue(40) }}>
              <Input
                size="large"
                placeholder="Email Address eg. johndoe@gmail.com"
              />
              <View style={{ marginTop: RFValue(10) }}>
                <Input size="large" placeholder="Password eg * * * * * * " />
              </View>
              <View style={[styles.forgotPassword]}>
                <View>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: theme["color-basic-600"],
                    }}
                  >
                    Lost your Password?{" "}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                  <Text>Recover!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
          <View>
            <View style={styles.registerContainer}>
              <View>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: theme["color-basic-600"],
                  }}
                >
                  Don't have an account?{" "}
                </Text>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <Text>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <Button size={"large"}>Sign In</Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFValue(20),
    justifyContent: "space-between",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RFValue(20),
  },
  forgotPassword: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: RFValue(10),
  },
});
