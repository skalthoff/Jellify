import { pad } from "lodash";
import { Text } from "./text";

export default function RunTimeTicks({ children } : { children?: number | null | undefined }) : React.JSX.Element {
    if (!!!children) 
        return <Text>0:00</Text>

    let time = calculateRunTimeFromTicks(children);

    return <Text color="$gray10">{ time }</Text>
}

function calculateRunTimeFromTicks(runTimeTicks: number) : string {

    // Convert ticks to seconds
    // https://emby.media/community/index.php?/topic/63357-runtimeticks-microseconds-milliseconds-or-nanoseconds/
    const runTimeMilliseconds = runTimeTicks / 10000; 

    const runTimeTotalSeconds = Math.floor(runTimeMilliseconds / 1000);

    const runTimeHours = Math.floor(runTimeTotalSeconds / 3600);
    const runTimeMinutes = Math.floor((runTimeTotalSeconds % 3600) / 60)
    const runTimeSeconds = runTimeTotalSeconds % 60;

    return `${ runTimeHours != 0 ? `${padRunTimeNumber(runTimeHours)}:` : "" }${padRunTimeNumber(runTimeMinutes)}:${padRunTimeNumber(runTimeSeconds)}`;
}

function padRunTimeNumber(number: number) : string {
    if (number >= 10)
        return `${number}`

    return `0${number}`;
}