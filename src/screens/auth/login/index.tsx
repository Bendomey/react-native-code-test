import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import {} from "expo-status-bar";
import React, { FC, useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuthProvider } from "../../../navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toast from "react-native-root-toast";
import { errorMessage } from "../../../services/broker";
import { IBlogPost } from "../../../interfaces/blog";
interface ILoginInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export const Login: FC<any> = ({ navigation, route }) => {
  const blog = route.params?.data;
  console.log(blog);

  const themeColor = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(schema),
  });
  const [{ doSignInWithEmailAndPassword }, { signIn }] = useAuthProvider();
  const [loading, setLoading] = useState(false);

  const authenticate = async ({ email, password }: ILoginInputs) => {
    try {
      setLoading(true);
      const results = await doSignInWithEmailAndPassword(email, password);
      await signIn(results.user);
      if (blog) {
        navigation.navigate("Main", {
          screen: "blog",
          params: { data: blog as IBlogPost },
        });
      } else {
        navigation.navigate("Main", {
          screen: "home",
        });
      }
    } catch (error: any) {
      console.log(error);

      Toast.show(errorMessage(error.code) as string, {
        duration: Toast.durations.LONG,
      });
    } finally {
      setLoading(false);
    }
  };

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
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    size="large"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Email Address eg. johndoe@gmail.com"
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text category="label" style={{ color: "red" }}>
                  This field is required.
                </Text>
              )}

              <View style={{ marginTop: RFValue(10) }}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry
                      value={value}
                      size="large"
                      placeholder="Password eg * * * * * * "
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text category="label" style={{ color: "red" }}>
                    This field is required.
                  </Text>
                )}
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
                disabled={loading}
                onPress={handleSubmit(authenticate)}
              >
                {loading ? "loading..." : "Sign In"}
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
