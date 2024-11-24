import { config } from "@tamagui/config/v3";
import { createTokens } from "tamagui";
import { Colors } from "./enums/colors";


export const jellifyTokens = createTokens({
    ...config.tokens,
    color: {
        primary: Colors.Primary,
        secondary: Colors.Secondary
    }
})