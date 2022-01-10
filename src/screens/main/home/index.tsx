import React, { FC, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, Alert } from "react-native";
import { HomeHeader } from "./components/header";
import blogData from "../../../data/blogData.json";
import { BlogPostCard } from "../../../components/Blog/card";
import { IBlogPost } from "../../../interfaces/blog";
import { ThemedView } from "../../../components/View";
import { Loader } from "../../../components/Loader";
import { LoginAlert } from "./components/login-alert";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuthProvider } from "../../../navigation";

export const Home: FC<any> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [{ doSignOut }, { signOut }, state] = useAuthProvider();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ThemedView style={styles.container}>
        <SafeAreaView>
          <HomeHeader
            signedIn={state?.userToken}
            logout={() => {
              if (state?.userToken) {
                doSignOut();
                signOut();
              }
              navigation.navigate("Auth", {
                screen: "login",
              });
            }}
          />
        </SafeAreaView>

        {loading ? (
          <AlertContainer>
            <Loader size={250} />
          </AlertContainer>
        ) : (
          <>
            <View
              style={{
                marginBottom: RFValue(10),
                marginHorizontal: RFValue(15),
              }}
            >
              <LoginAlert />
            </View>
            <FlatList
              contentContainerStyle={styles.body}
              data={(blogData as { blogs: IBlogPost[] })?.blogs}
              renderItem={({ item }) => (
                <BlogPostCard
                  data={item}
                  onPress={() => {
                    if (!state.userToken) {
                      navigation.navigate("Auth", {
                        screen: "login",
                        params: {
                          data: item,
                        },
                      });
                    } else {
                      navigation.push("blog", {
                        data: item,
                      });
                    }
                    // schedulePushNotification(item);
                  }}
                />
              )}
              keyExtractor={(item) => item.title}
            />
          </>
        )}
      </ThemedView>
    </>
  );
};

const AlertContainer: FC = ({ children }) => {
  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
