radio.setGroup(0);
loops.everyInterval(100, snore.recordVol);
loops.everyInterval(100, snore.recordAccel);
loops.everyInterval(10, snore.recordBP);
loops.everyInterval(100, snore.sendData);
