let time1 = 0;
let delta_t = 0;
let time2 = 0;
let pulse_data = 0;
let pulse_out = 0;
let counter = 0;
let stable_peak = 0;
let running_peak = 0;
let time_start = 0;
let registered = false;
radio.setGroup(0);

basic.forever(() => {
    pulse_data = pins.analogReadPin(AnalogPin.P0);
});

// basic.forever(() => {
//     serial.writeValue("Pulse Diagram", pulse_data);
// });

// basic.forever(() => {
//     serial.writeValue("Current Pulse", pulse_out);
// });

// basic.forever(() => {
//     serial.writeValue("Stable Threshold", stable_peak)
// });

// basic.forever(() => {
//     serial.writeValue("Running Peak", running_peak)
// });

function motion_magnitude() {
    return Math.abs(Math.sqrt(
        input.acceleration(Dimension.X) ** 2 +
        input.acceleration(Dimension.Y) ** 2 +
        input.acceleration(Dimension.Z) ** 2
    ) - 1024);
}

/*
    Constantly scan for the peak of the current spike.
    If another spike is detected within -20% of that range then that's another pulse.
    If another spike isn't detected for 2*delta_t of previously recorded pulse,
    reset what range we're looking for.
*/

basic.forever(() => {
    if (pulse_data > running_peak) {
        running_peak = pulse_data;
        time_start = input.runningTime();
    } else if (input.runningTime() - time_start > 2 * delta_t && !registered) {
        running_peak = 600
    } else if (pulse_data < running_peak && running_peak > 600) {
        stable_peak = running_peak
    } 
    
});

basic.forever(() => {
    registered = false;
    if (pulse_data > (stable_peak * 0.65) && counter == 0) {
        registered = true;
        time2 = input.runningTime();
        delta_t = time2 - time1;
        time1 = time2;
        counter = 1;
        pulse_out = Math.floor(60000 / delta_t);

        let motion = motion_magnitude();
        radio.sendValue("pulse", pulse_out);
        radio.sendValue("time", Math.floor(time1 / 60000));
        radio.sendValue("movement", motion >= 70 ? 1 : 0);
        radio.sendValue("raw_mvmt", motion);
    } else if (pulse_data <= 430 && counter == 1) {
        counter = 0;
    }
});
