import "react-native-gesture-handler";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useColorScheme } from "react-native";
import { Provider, useSelector, useDispatch } from "react-redux";

// Themes
import { PreferencesContext, ThemeMode } from "@themes/ThemeContext";

// App Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Component Imports
import { PaperProvider } from "react-native-paper";

// Store
import store, { AppDispatch, RootState } from "./src/redux/store";

// redux
import { AuthActions } from "@redux/auth/AuthSlice";

// Page Navigation
import QuickResponseNavigation from "src/nagivation/QuickResponseNavigation";
import DrawerNavigation from "src/nagivation/DrawerNavigation";
import AuthenticationNavigation from "./src/nagivation/AuthenticationNavigation";

// Components
import Loading from "./src/components/Loading";

function Wrapper() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuth);

  const [isInitialized, setIsInitialized] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const initializeApp = async () => {
    await dispatch(AuthActions.checkUserSessionAsync());
    setIsInitialized(true);
  };

  const reInitializeApp = async () => {
    console.log("Reinitializing App");
    setIsInitialized(false);
    await dispatch(AuthActions.checkUserSessionAsync());
    setIsInitialized(true);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isInitialized ? (
        isLoggedIn ? (
          <>
            <Stack.Screen
              name="DrawerNavigation"
              component={DrawerNavigation}
              initialParams={{ reInitializeApp }}
            />
            <Stack.Screen name="QuickResponseNavigation" component={QuickResponseNavigation} />
          </>
        ) : (
          <Stack.Screen name="AuthenticationNavigation" component={AuthenticationNavigation} />
        )
      ) : (
        <Stack.Screen name="Loading" component={Loading} />
      )}
    </Stack.Navigator>
  );
}

import themes, { changeGlobalTheme } from "@themes/themes";

export default function App() {
  const sysScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>("system");

  const [themeCustom, setThemeCustom] = useState(themes.light.Custom);
  const [themeCombined, setThemeCombined] = useState(themes.light.Combined);

  useEffect(() => {
    if (currentTheme !== "system") {
      changeGlobalTheme(currentTheme);
      setThemeCustom(themes[currentTheme].Custom);
      setThemeCombined(themes[currentTheme].Combined);
      return;
    }

    // If sysScheme is null
    // Meaning user has not set any preference
    // So we will use the default theme for the app
    // Which is light depending on our tatse :))
    setThemeCustom(themes[sysScheme ?? "dark"].Custom);
    setThemeCombined(themes[sysScheme ?? "dark"].Combined);
    changeGlobalTheme(sysScheme ?? "dark");
  }, [currentTheme]);

  const changeTheme = useCallback(
    (mode: ThemeMode) => {
      return setCurrentTheme(mode);
    },
    [currentTheme]
  );

  const preferences = useMemo(
    () => ({
      changeTheme,
      currentTheme,
    }),
    [changeTheme, currentTheme]
  );

  return (
    <Provider store={store}>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={themeCustom}>
          <NavigationContainer theme={themeCombined}>
            <Wrapper />
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </Provider>
  );
}
