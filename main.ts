radio.setGroup(0);
let active = false;
let statusLed = true;
let time = 0;

const setLed = () => {
    if (active && statusLed) {
        led.plot(0,0);
    } else {
        led.unplot(0,0);
    }
}

input.onButtonPressed(Button.A, () => {
    active = !active;
    setLed();
    if (active) {
        basic.showString("On");
    } else {
        basic.showString("Off");
    }
});

input.onButtonPressed(Button.B, () => {
    statusLed = !statusLed;
    led.plot(0, 0);
    basic.pause(1000);
    setLed();
});

loops.everyInterval(snore.intervalSize / snore.bpMeasuresPerInterval, () => {
    if (active) {
        time += snore.intervalSize / snore.bpMeasuresPerInterval
        snore.recordBP();
        if (time == snore.intervalSize) {
            snore.recordVol();
            snore.recordAccel();
            snore.sendData();
            time = 0;
        }
    }
});
