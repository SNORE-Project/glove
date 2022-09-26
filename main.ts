radio.setGroup(0);
loops.everyInterval(200, snore.recordVol);
loops.everyInterval(200, snore.recordAccel);
loops.everyInterval(10, snore.recordBP);
loops.everyInterval(200, snore.sendData);
