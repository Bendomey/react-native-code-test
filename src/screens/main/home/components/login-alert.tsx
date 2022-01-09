import React from "react";
import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const LoginAlert = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: "#f2d4b6",
          paddingVertical: RFValue(15),
          paddingHorizontal: RFValue(10),
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#b86009", fontFamily: "Roboto-Bold" }}>
          You are here as a guest. Click here to login!
        </Text>
      </View>
    </>
  );
};
