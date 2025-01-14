import { DarkTheme } from "@react-navigation/native";
import { Colors } from "../enums/colors";

export const JellifyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.Background,
      primary: Colors.Primary,
    },  
    dark: true
  };