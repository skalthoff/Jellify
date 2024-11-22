import { SizeTokens, XStack, Separator, Switch } from "tamagui";
import { Label } from "./text";

export function SwitchWithLabel(props: { size: SizeTokens; checked: boolean, label: string, onCheckedChange: (value: boolean) => void, width?: number }) {
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
        <Switch id={id} size={props.size} checked={props.checked} onCheckedChange={(checked: boolean) => props.onCheckedChange(checked)}>
          <Switch.Thumb animation="quicker" />
        </Switch>
      </XStack>
    )
  }
  