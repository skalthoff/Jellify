import { SizeTokens, XStack, Label, Separator, Switch } from "tamagui";

export function SwitchWithLabel(props: { size: SizeTokens; checked: boolean, label: string, onCheckedChange: (value: boolean) => void }) {
    const id = `switch-${props.size.toString().slice(1)}-${props.checked ?? ''}}`
    return (
      <XStack flex={1} width={200} alignItems="center" gap="$4">
        <Label
          paddingRight="$0"
          minWidth={90}
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
  