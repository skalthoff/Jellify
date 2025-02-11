import Icon from "../../../components/Global/helpers/icon";
import { Label } from "../../../components/Global/helpers/text";
import { Popover, Adapt, YStack, XStack, Input, getToken, Button } from "tamagui";

export default function AddPlaylistPopover() : React.JSX.Element {
    return (
        <Popover size="$5" allowFlip>
        <Popover.Trigger asChild>
            <Icon name="plus-circle-outline" color={getToken("$color.telemagenta")} />
        </Popover.Trigger>
  
        {/* {shouldAdapt && (
          <Adapt when="sm" platform="touch">
            <Popover.Sheet animation="medium" modal dismissOnSnapToBottom>
              <Popover.Sheet.Frame padding="$4">
                <Adapt.Contents />
              </Popover.Sheet.Frame>
              <Popover.Sheet.Overlay
                backgroundColor="$shadowColor"
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Popover.Sheet>
          </Adapt>
        )} */}
  
        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          elevate
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
  
          <YStack gap="$3">
            <XStack gap="$3">
              <Label size="$3" htmlFor="Name">
                Name
              </Label>
              <Input flex={1} size="$3" id="Name" />
            </XStack>
  
            <Popover.Close asChild>
              <Button
                onPress={() => {
                  /* Custom code goes here, does not interfere with popover closure */
                }}
              >
                Create
              </Button>
            </Popover.Close>
          </YStack>
        </Popover.Content>
      </Popover>
  
    )
}