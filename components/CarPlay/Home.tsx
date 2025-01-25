import { fetchRecentlyPlayedArtists } from "../../api/queries/functions/recents";
import { GridTemplate } from "react-native-carplay";

const recentArtists = fetchRecentlyPlayedArtists()

const CarPlayHome : GridTemplate = new GridTemplate({
    title: "Home",
    tabTitle: "Home",
    buttons: Array.from({ length: 8 }).map((_, i) => ({
        id: `BUTTON_${i}`,
        image: require("../../assets/icon_60pt_3x.jpg"),
        titleVariants: [`Item ${i}`]
    }))
});

export default CarPlayHome;