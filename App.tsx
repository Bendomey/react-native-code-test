import "react-native-gesture-handler";
import { Image } from "react-native";
import * as Font from "expo-font";
import { AppNavigator } from "./src/navigation";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "./src/services/contexts/theme";
import data from "./src/data/blogData.json";
import { IBlogPost } from "./src/interfaces/blog";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { registerForPushNotificationsAsync } from "./src/services/notification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function cacheImages(images: string[]) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [loaded] = Font.useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      ...(data as any).blogs
        .map((post: IBlogPost) => post.imageUrl)
        .slice(0, 10),
    ]);

    await Promise.all([...imageAssets]);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!isReady && !loaded) {
    // TODO: I will change this to a loader :)
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
