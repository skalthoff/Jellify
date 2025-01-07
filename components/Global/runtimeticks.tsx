import { pad } from "lodash";
import { Text } from "./text";
import { convertRunTimeTicksToSeconds } from "@/helpers/runtimeticks";

export default function RunTimeTicks({ children } : { children?: number | null | undefined }) : React.JSX.Element {
    if (!!!children) 
        return <Text>0:00</Text>

    let time = calculateRunTimeFromTicks(children);

    return <Text color="$gray10">{ time }</Text>
}

function calculateRunTimeFromTicks(runTimeTicks: number) : string {


    const runTimeTotalSeconds = convertRunTimeTicksToSeconds(runTimeTicks);

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