import { SizeTokens, XStack, Label, Separator, Switch } from "tamagui";

export function SwitchWithLabel(props: { size: SizeTokens; defaultChecked?: boolean, label: string }) {
    const id = `switch-${props.size.toString().slice(1)}-${props.defaultChecked ?? ''}}`
    return (
      <XStack width={200} alignItems="center" gap="$4">
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
        <Switch id={id} size={props.size} defaultChecked={props.defaultChecked}>
          <Switch.Thumb animation="quicker" />
        </Switch>
      </XStack>
    )
  }
  