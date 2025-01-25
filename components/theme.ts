import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { getTokens } from "tamagui";

export const JellifyDarkTheme = {
    colors: {
      ...DarkTheme.colors,
      card: getTokens().color.$purpleDark.val,
      border: getTokens().color.$amethyst.val,
      background: getTokens().color.$purpleDark.val,
      primary: getTokens().color.$telemagenta.val,
    },  
    dark: true
};

export const JellifyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: getTokens().color.$telemagenta.val
  }
};