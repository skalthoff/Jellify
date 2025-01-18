import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Colors } from "../enums/colors";

export const JellifyDarkTheme = {
    colors: {
      ...DarkTheme.colors,
      card: Colors.Background,
      border: Colors.Borders,
      background: Colors.Background,
      primary: Colors.Primary,
    },  
    dark: true
};

export const JellifyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.Primary
  }
};