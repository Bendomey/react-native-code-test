import { Text, useTheme } from "@ui-kitten/components";
import React, { FC, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ThemedView } from "../../../components/View";
import {
  cancelNotification,
  schedulePushNotification,
} from "../../../services/notification";
import { getFromStorage, saveToStorage } from "../../../services/store";

export const Blog: FC<any> = ({ route, navigation }) => {
  const theme = useTheme();
  const [readPerentage, setReadPerentage] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async () => {
      if (readPerentage < 0.7) {
        let getNotif = await getFromStorage(route.params.data.title);
        if (!getNotif) {
          let notifId = await schedulePushNotification(route.params.data);
          await saveToStorage(notifId, route.params.data.title);
        }
      } else {
        let getNotif = await getFromStorage(route.params.data.title);
        if (getNotif) {
          cancelNotification(getNotif);
        }
      }
    });

    return unsubscribe;
  }, [navigation]);
  console.log("potision", readPerentage);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme["background"] }}>
        <ThemedView style={{ flex: 1 }}>
          <ScrollView
            onScroll={({
              nativeEvent,
            }: {
              nativeEvent: {
                contentOffset: { y: number };
                contentSize: { height: number };
              };
            }) => {
              const { contentOffset, contentSize } = nativeEvent;
              const { height } = contentSize;

              const { y } = contentOffset;

              const position = y / height;
              setReadPerentage((prev) => (prev > position ? prev : position));
            }}
          >
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
