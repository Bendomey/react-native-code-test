import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToStorage = async <T>(data: T, key: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // We can use monitoring system, eg. sentry to track this.
    console.log(e);
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // We can use monitoring system, eg. sentry to track this.
    console.log(e);
  }
};
