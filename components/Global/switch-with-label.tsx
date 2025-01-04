import { SizeTokens, XStack, Separator, Switch, ColorTokens } from "tamagui";
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
        <Separator minHeight={20} vertical />
        <Switch 
          id={id} 
          size={props.size} 
          checked={props.checked} 
          onCheckedChange={(checked: boolean) => props.onCheckedChange(checked)}
          backgroundColor={props.backgroundColor}
        >
          <Switch.Thumb animation="quicker" />
        </Switch>
      </XStack>
    )
  }
  