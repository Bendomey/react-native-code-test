import { Text, useTheme } from "@ui-kitten/components";
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { useThemeProvider } from "../../../../services/contexts/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  logout: () => void;
}

export const HomeHeader: FC<Props> = ({ logout }) => {
  const theme = useTheme();
  const { handleThemeSwitch } = useThemeProvider();

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text category="h1" style={{ fontSize: RFValue(25) }}>
            Blog Posts
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleThemeSwitch}>
            <Ionicons
              name="ios-contrast"
              color={theme["background-alternative"]}
              size={RFValue(25)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: RFValue(20) }}
            onPress={logout}
          >
            <Ionicons
              name="ios-log-out"
              color={theme["color-danger-600"]}
              size={RFValue(25)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(15),
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
