/**
 * This file is used to combine the custom theme with the default theme.
 * Please come to https://callstack.github.io/react-native-paper/docs/guides/theming#creating-dynamic-theme-colors
 * for more information.
 */

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from "react-native-paper";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

import customLightColors from "./light-theme.json";
import customDarkColors from "./dark-theme.json";

const CustomLight = {
  ...MD3LightTheme,
  colors: customLightColors.colors,
};

const CustomDark = {
  ...MD3DarkTheme,
  colors: customDarkColors.colors,
};

const CombinedDefaultTheme = merge(CustomLight, LightTheme);
const CombinedDarkTheme = merge(CustomDark, DarkTheme);

const themes = {
  dark: {
    Combined: CombinedDarkTheme,
    Custom: CustomDark,
  },
  light: {
    Combined: CombinedDefaultTheme,
    Custom: CustomLight,
  },
};

export let currentTheme = themes.light.Custom;
export const changeGlobalTheme = (mode: "light" | "dark") => {
  if (mode) currentTheme = themes[mode].Custom;
};

export default themes;
