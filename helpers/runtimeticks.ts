export function convertSecondsToRunTimeTicks(seconds: number) {

    const runTimeMilliseconds = seconds * 1000 * 10000;

    return runTimeMilliseconds;
}

export function convertRunTimeTicksToSeconds(ticks: number) {
        // Convert ticks to seconds
    // https://emby.media/community/index.php?/topic/63357-runtimeticks-microseconds-milliseconds-or-nanoseconds/
    const runTimeMilliseconds = ticks / 10000; 

    const runTimeTotalSeconds = Math.floor(runTimeMilliseconds / 1000);

    return runTimeTotalSeconds;
}