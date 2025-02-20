import { SizeTokens, XStack, Separator, Switch, ColorTokens, Theme } from "tamagui";
import { Label } from "./text";

interface SwitchWithLabelProps {
  onCheckedChange: (value: boolean) => void,
  size: SizeTokens
  checked: boolean;
  label: string;
  width?: number | undefined;
  backgroundColor?: ColorTokens;
}

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
            >
              <Switch.Thumb animation="bouncy" />
            </Switch>
          </Theme>
        </XStack>
    )
  }
  