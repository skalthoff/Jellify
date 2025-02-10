import { backgroundRuntime } from "@/App";
import { runOnRuntime } from "react-native-reanimated";

export function convertSecondsToRunTimeTicks(seconds: number) {
    return runOnRuntime(backgroundRuntime, (runTimeSeconds: number) => {
        const runTimeMilliseconds = seconds * 1000 * 10000;
    
        return runTimeMilliseconds;
    })(seconds);
}

export function convertRunTimeTicksToSeconds(ticks: number) {
    return runOnRuntime(backgroundRuntime, (runTimeTicks : number) => {
        const runTimeMilliseconds = runTimeTicks / 10000; 
        const runTimeTotalSeconds = Math.floor(runTimeMilliseconds / 1000);
        return runTimeTotalSeconds;
    })(ticks);
}