import { useTheme } from "@ui-kitten/components";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import { HomeHeader } from "./components/header";

export const Home: FC<any> = ({ navigation }) => {
  const theme = useTheme();
  return (
    <>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme["background"] }]}
      >
        <View>
          <HomeHeader
            logout={() =>
              navigation.navigate("Auth", {
                screen: "login",
              })
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
