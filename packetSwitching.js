let xR, yR, xG, yG, xB, yB;
let phaseR = 0, phaseG = 0, phaseB = 0; // 0: stationary, 1 or more: moving
let speed = 1.5; // packet movement speed
let currentPacket = ""; // currently moving packet (used in Circuit mode)
let isCircuitMode = true; // initial mode is Circuit

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetPositions();
}

function draw() {
  background(255);

  // Draw network structure
  fill(200, 200, 200);
  rect(230, 335, 180, 135);
  rect(580, 335, 180, 135);
  rect(1150, 335, 180, 135);
  rect(580, 735, 180, 135);
  rect(1150, 735, 180, 135);
  rect(1500, 735, 180, 135);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(60);
  if (isCircuitMode) text("Circuit Switching Network", width / 2, 100);
  else text("Packet Switching Network", width / 2, 100);
  textSize(30);
  text("START", 320, 402.5);
  text("END", 1590, 802.5);

  // Draw network connections
  line(410, 402.5, 580, 402.5);
  line(670, 470, 670, 735);
  line(760, 402.5, 1150, 402.5);
  line(760, 802.5, 1150, 802.5);
  line(1240, 470, 1240, 735);
  line(760, 470, 1150, 735);
  line(760, 735, 1150, 470);
  line(1330, 802.5, 1500, 802.5);

  // Display mode selection
  fill(0);
  textSize(20);
  textAlign(LEFT);
  text("Mode:", 30, 50);
  fill(isCircuitMode ? color(200, 0, 0) : color(0, 200, 0)); // Change color based on mode
  text(isCircuitMode ? "Circuit" : "Packet", 100, 50);

  // Mode instructions
  fill(0);
  textAlign(LEFT);
  text("Click to toggle between Circuit and Packet modes.", 30, 80);

  // Mode-specific behavior instructions
  if (isCircuitMode) {
    text("Only one packet can move at a time.", 30, 110);
  } else {
    text("Multiple packets can move simultaneously.", 30, 110);
  }

  // Circuit mode warning message
  if (isCircuitMode && currentPacket !== "") {
    fill(255, 0, 0);
    textSize(25);
    textAlign(CENTER, CENTER);
    text("Only one packet can move at a time.", 320, 300);
  }

  // Draw packets
  drawPacket(xR, yR, color(255, 0, 0), "R");
  drawPacket(xG, yG, color(0, 255, 0), "G");
  drawPacket(xB, yB, color(0, 0, 255), "B");

  // Handle packet movement
  if (currentPacket === "R" || !isCircuitMode) moveRed();
  if (currentPacket === "G" || !isCircuitMode) moveGreen();
  if (currentPacket === "B" || !isCircuitMode) moveBlue();
}

function drawPacket(x, y, c, label) {
  fill(c);
  rect(x, y, 25, 25);
  fill(0);
  textSize(15);
  textAlign(CENTER, CENTER);
  text(label, x + 12.5, y + 12.5);
}

function moveRed() {
  if (phaseR === 1) {
    xR += 3.0 * speed;
    if (xR >= 1227.5) {
      xR = 1227.5;
      phaseR = 2; // Next step
    }
  } else if (phaseR === 2) {
    yR += 2.0 * speed;
    if (yR >= 790) {
      yR = 790;
      phaseR = 3; // Next step
    }
  } else if (phaseR === 3) {
    xR += 2.0 * speed;
    if (xR >= 1530) {
      xR = 1530;
      phaseR = 0; // Complete
      if (isCircuitMode) currentPacket = ""; // Reset only in Circuit mode
    }
  }
}

function moveGreen() {
  if (phaseG === 1) {
    xG += 3.2 * speed;
    if (xG >= 1235) {
      xG = 1235;
      phaseG = 2;
    }
  } else if (phaseG === 2) {
    xG -= 2.1 * speed;
    yG += 2.1 * (265 / 390) * speed;
    if (yG >= 790) {
      yG = 790;
      phaseG = 3;
    }
  } else if (phaseG === 3) {
    xG += 3.6 * speed;
    if (xG >= 1623) {
      xG = 1623;
      phaseG = 0;
      if (isCircuitMode) currentPacket = ""; // Reset only in Circuit mode
    }
  }
}

function moveBlue() {
  if (phaseB === 1) {
    xB += 2.3 * speed;
    if (xB >= 657.5) {
      xB = 657.5;
      phaseB = 2;
    }
  } else if (phaseB === 2) {
    yB += 1.4 * speed;
    if (yB >= 790) {
      yB = 790;
      phaseB = 3;
    }
  } else if (phaseB === 3) {
    xB += 2.8 * speed;
    if (xB >= 1578) {
      xB = 1578;
      phaseB = 0;
      if (isCircuitMode) currentPacket = ""; // Reset only in Circuit mode
    }
  }
}

function mousePressed() {
  // Check for mode toggle click (top-left)
  if (mouseX >= 30 && mouseX <= 150 && mouseY >= 30 && mouseY <= 60) {
    isCircuitMode = !isCircuitMode;
    resetPositions(); // Reset positions on mode change
    return;
  }

  // Handle packet clicks
  if (isCircuitMode) {
    // Circuit mode: Only one packet can move at a time
    if (currentPacket === "") {
      if (mouseX >= xR && mouseX <= xR + 25 && mouseY >= yR && mouseY <= yR + 25) {
        currentPacket = "R";
        phaseR = 1;
      } else if (mouseX >= xG && mouseX <= xG + 25 && mouseY >= yG && mouseY <= yG + 25) {
        currentPacket = "G";
        phaseG = 1;
      } else if (mouseX >= xB && mouseX <= xB + 25 && mouseY >= yB && mouseY <= yB + 25) {
        currentPacket = "B";
        phaseB = 1;
      }
    }
  } else {
    // Packet mode: Multiple packets can move simultaneously
    if (mouseX >= xR && mouseX <= xR + 25 && mouseY >= yR && mouseY <= yR + 25) {
      phaseR = 1;
    } else if (mouseX >= xG && mouseX <= xG + 25 && mouseY >= yG && mouseY <= yG + 25) {
      phaseG = 1;
    } else if (mouseX >= xB && mouseX <= xB + 25 && mouseY >= yB && mouseY <= yB + 25) {
      phaseB = 1;
    }
  }
}

function resetPositions() {
  xR = 430;
  yR = yG = yB = 390;
  xG = 481;
  xB = 534;
  phaseR = phaseG = phaseB = 0;
  currentPacket = ""; // Reset current moving packet
}
