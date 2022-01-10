import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import {} from "expo-status-bar";
import React, { FC } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";

export const Login: FC<any> = ({ navigation }) => {
  const themeColor = useTheme();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: themeColor["background"] }}>
        <View style={styles.container}>
          <KeyboardAwareScrollView style={{ paddingTop: RFValue(20) }}>
            <View>
              <Text style={{ fontSize: RFValue(30) }} category="h1">
                Let's sign you in
              </Text>
              <View style={{ marginTop: RFValue(10) }}>
                <Text category="s1">
                  You will able to access blogs on the platform when you're
                  logged in!
                </Text>
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
                      color: themeColor["color-basic-600"],
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
          <SafeAreaView>
            <View style={styles.registerContainer}>
              <View>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: themeColor["color-basic-600"],
                  }}
                >
                  Don't have an account?{" "}
                </Text>
              </View>
              <TouchableOpacity>
                <Text>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: RFValue(20) }}>
              <Button
                size={"large"}
                onPress={() =>
                  navigation.navigate("Main", {
                    screen: "home",
                  })
                }
              >
                Sign In
              </Button>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RFValue(20),
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
