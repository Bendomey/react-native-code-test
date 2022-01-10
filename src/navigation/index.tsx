import React, { useContext, useEffect, useMemo, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Firebase, { FirebaseContext } from "../services/firebase";

//import Navigators
import { AuthNavigator } from "../screens/auth";
import { MainNavigator } from "../screens/main";
import { StatusBar } from "react-native";
import { useThemeProvider } from "../services/contexts/theme";
import { getFromStorage, saveToStorage } from "../services/store";
import { AUTH_MANAGER } from "../constants";

const Stack = createStackNavigator();

const Manipulator = (prevState: any, action: any) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.userToken,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

export const AppNavigator = () => {
  const { theme } = useThemeProvider();
  const barStyle = theme === "light" ? "dark-content" : "light-content";
  const [state, dispatch] = useReducer(Manipulator, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    (async () => {
      let userToken: any;
      try {
        userToken = await getFromStorage(AUTH_MANAGER);
      } catch (e) {
        console.warn(e);
      }
      //dispatch the token into context
      dispatch({
        type: "RESTORE_TOKEN",
        userToken: JSON.parse(userToken),
      });
    })();
  }, []);

  const authController = useMemo(
    () => ({
      signIn: async (data: any) => {
        try {
          await saveToStorage(data, AUTH_MANAGER);
          dispatch({ type: "SIGN_IN", token: data });
        } catch (e) {
          console.warn(e);
        }
      },
      signOut: async () => {
        try {
          await saveToStorage(null, AUTH_MANAGER);
          dispatch({ type: "SIGN_OUT" });
        } catch (e) {
          console.log(e);
        }
      },
    }),
    []
  );

  return (
    <>
      <StatusBar barStyle={barStyle} />
      <FirebaseContext.Provider value={[new Firebase(), authController, state]}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Main"}>
            <Stack.Screen
              name={"Main"}
              component={MainNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"Auth"}
              component={AuthNavigator}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FirebaseContext.Provider>
    </>
  );
};

export const useAuthProvider = () => useContext(FirebaseContext);
