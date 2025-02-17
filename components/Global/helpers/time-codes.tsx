import { isSharedValue, runOnRuntime, SharedValue, useSharedValue } from "react-native-reanimated";
import { convertRunTimeTicksToSeconds } from "../../../helpers/runtimeticks";
import { Text } from "./text";
import React from "react";
import { backgroundRuntime } from "../../../App";
import { isNull, isNumber, isUndefined } from "lodash";

export function RunTimeSeconds({ children }: { children: number }) : React.JSX.Element {

    const seconds : string = runOnRuntime(backgroundRuntime, calculateRunTimeFromSeconds)(children)

    return <Text bold>{ seconds }</Text>
}

export function RunTimeTicks({ children } : { children: SharedValue<number> | SharedValue<null> | SharedValue<undefined> }) : React.JSX.Element {
    if (!isSharedValue<number>(children)) 
        return <Text>0:00</Text>

    else {

        const time = useSharedValue<string>("0:00")

        runOnRuntime(backgroundRuntime, (ticks : SharedValue<number>) => {
            'worklet';
            time.set(calculateRunTimeFromTicks(ticks))
        })(children);
        
        return (
            <Text 
                style={{display: "block"}} 
                color="$borderColor"
                >
                { time.get() }
            </Text>
        )
    }
}

function calculateRunTimeFromSeconds(seconds: number) : string {
    'worklet';
    const runTimeHours = Math.floor(seconds / 3600);
    const runTimeMinutes = Math.floor((seconds % 3600) / 60)
    const runTimeSeconds = Math.floor(seconds % 60);

    return (runTimeHours != 0 ? `${runTimeHours >= 10 ? runTimeHours : "0" + runTimeHours}:` : "") + 
        (runTimeHours != 0 ? `${runTimeMinutes >= 10 ? runTimeMinutes : "0" + runTimeMinutes}:` : `${runTimeMinutes}:`) +
        (runTimeSeconds >= 10 ? runTimeSeconds : "0" + runTimeSeconds);
}

function calculateRunTimeFromTicks(runTimeTicks: SharedValue<number>) : string {
    'worklet';
    const runTimeTotalSeconds = convertRunTimeTicksToSeconds(runTimeTicks);
    return calculateRunTimeFromSeconds(runTimeTotalSeconds);
}