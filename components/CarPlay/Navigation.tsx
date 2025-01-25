import { CarPlay, TabBarTemplate } from "react-native-carplay";

const CarPlayNavigation : TabBarTemplate = new TabBarTemplate({
    templates: [],
    onTemplateSelect(template, e) {
        if (template)
            CarPlay.pushTemplate(template, true)
    },
});

export default CarPlayNavigation;