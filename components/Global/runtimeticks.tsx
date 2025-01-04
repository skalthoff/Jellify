import { pad } from "lodash";
import { Text } from "./text";

export default function RunTimeTicks({ children } : { children?: number | null | undefined }) : React.JSX.Element {
    if (!!!children) 
        return <Text>0:00</Text>

    let time = calculateRunTimeFromTicks(children);

    return <Text>{ time }</Text>
}

function calculateRunTimeFromTicks(runTimeTicks: number) : string {

    // Convert ticks to seconds
    // https://emby.media/community/index.php?/topic/63357-runtimeticks-microseconds-milliseconds-or-nanoseconds/
    const runTimeMilliseconds = runTimeTicks / 10000; 

    const runTimeTotalSeconds = Math.floor(runTimeMilliseconds / 1000);

    const runTimeHours = Math.floor(runTimeTotalSeconds / 3600);
    const runTimeMinutes = Math.floor((runTimeTotalSeconds % 3600) / 60)
    const runTimeSeconds = runTimeTotalSeconds % 60;

    return `${ runTimeHours != 0 ? pad(runTimeHours.toString(), 2, "0") : "" }:${pad(runTimeMinutes.toString(), 2, "0")}:${pad(runTimeSeconds.toString(), 2, "0")}`;
}