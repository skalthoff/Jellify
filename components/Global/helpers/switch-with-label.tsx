import { SizeTokens, XStack, Separator, Switch, Theme, styled, getToken } from "tamagui";
import { Label } from "./text";

interface SwitchWithLabelProps {
  onCheckedChange: (value: boolean) => void,
  size: SizeTokens
  checked: boolean;
  label: string;
  width?: number | undefined;
}

const JellifySliderThumb = styled(Switch.Thumb, {
  borderColor: getToken("$color.amethyst"),
  backgroundColor: getToken("$color.purpleDark")
})

export function SwitchWithLabel(props: SwitchWithLabelProps) {
    const id = `switch-${props.size.toString().slice(1)}-${props.checked ?? ''}}`
    return (
      <XStack alignItems="center" gap="$3">
          <Label
          
          size={props.size}
          htmlFor={id}
          >
            {props.label}
          </Label>
          <Theme name={"inverted_purple"}>
            <Separator minHeight={20} vertical />
            <Switch 
              id={id} 
              size={props.size} 
              checked={props.checked} 
              onCheckedChange={(checked: boolean) => props.onCheckedChange(checked)}
              backgroundColor={props.checked ? getToken("$color.telemagenta") : getToken("$color.purpleGray")}
            >
              <JellifySliderThumb animation="bouncy" />
            </Switch>
          </Theme>
        </XStack>
    )
  }
  