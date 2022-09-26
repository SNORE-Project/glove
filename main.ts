radio.setGroup(0);
let active = false;

input.onButtonPressed(Button.A, function() {
    active = !active;
})

loops.everyInterval(200, () => {
    if (active) {
        snore.recordVol();
        snore.recordAccel();
        snore.sendData();
    }
    });

loops.everyInterval(200, () => {if (active){snore.sendData}});
