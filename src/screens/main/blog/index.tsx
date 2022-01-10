import { Text, useTheme } from "@ui-kitten/components";
import React, { FC } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ThemedView } from "../../../components/View";

export const Blog: FC<any> = ({ route }) => {
  const theme = useTheme();
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme["background"] }}>
        <ThemedView style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ padding: RFValue(20) }}>
              <Text category="h1">{route.params.data.title}</Text>

              <View style={{ marginTop: RFValue(10) }}>
                <StyledImage image={route.params.data.imageUrl} />
                <Text category="s1"> {route.params.data.content}</Text>
              </View>
            </View>
          </ScrollView>
        </ThemedView>
      </SafeAreaView>
    </>
  );
};

interface StyledImageProps {
  image: string;
}
const StyledImage: FC<StyledImageProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={{ flex: 1, borderRadius: 10, height: "100%", width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: RFValue(170),
    width: "100%",
    marginBottom: RFValue(15),
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: "#fff",
  },
  innerContainer: {
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(7),
    borderRadius: 20,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
