import { DarkTheme } from "@react-navigation/native";
import { Colors } from "../enums/colors";

export const JellifyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.Primary,
    },
  };