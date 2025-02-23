import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { ListTemplate } from "react-native-carplay";

const ListItemTemplate = (items: BaseItemDto[] | undefined) => new ListTemplate({
    sections: [
        {
            items: items?.map(item => {
                return {
                    id: item.Id!,
                    text: item.Name ?? "Untitled"
                }
            }) ?? []
        }
    ]
})

export default ListItemTemplate;