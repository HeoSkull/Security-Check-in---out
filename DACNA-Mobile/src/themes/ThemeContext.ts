import { createContext } from "react";

export type ThemeMode = "light" | "dark" | "system";

export const PreferencesContext = createContext<{
  changeTheme: (mode: ThemeMode) => void;
  currentTheme: ThemeMode;
}>({
  changeTheme: (mode: ThemeMode) => {},
  currentTheme: "system",
});
