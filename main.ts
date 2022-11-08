radio.setGroup(0);
let time = 0;

loops.everyInterval(snore.intervalSize / snore.bpMeasuresPerInterval, () => {
    time += snore.intervalSize / snore.bpMeasuresPerInterval
    snore.recordBP();
    if (time == snore.intervalSize) {
        snore.recordVol();
        snore.recordAccel();
        snore.sendData();
        time = 0;
    }
});
