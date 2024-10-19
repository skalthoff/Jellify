import { SizeTokens, XStack, Label, Separator, Switch } from "tamagui";

export function SwitchWithLabel(props: { size: SizeTokens; checked: boolean, label: string, onCheckedChange: (value: boolean) => void, width?: number }) {
    const id = `switch-${props.size.toString().slice(1)}-${props.checked ?? ''}}`
    return (
      <XStack width={props.width ?? 150} alignItems="center" gap="$4">
        <Label
          minWidth={50}
          justifyContent="flex-end"
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
  