let xR, yR, xG, yG, xB, yB;
let phaseR = 0, phaseG = 0, phaseB = 0;
let speed = 1.5;
let currentPacket = "";
let isCircuitMode = true;

function setup() {
  createCanvas(1600, 900);
  resetPositions();
}

function draw() {
  background(240);

  // Network structure colors
  stroke(180);
  fill(220, 220, 255, 200);
  rect(230, 335, 180, 135, 20); // Rounded nodes
  rect(580, 335, 180, 135, 20);
  rect(1150, 335, 180, 135, 20);
  rect(580, 735, 180, 135, 20);
  rect(1150, 735, 180, 135, 20);
  rect(1500, 735, 180, 135, 20);

  // Connection lines
  strokeWeight(3);
  stroke(100, 150, 255, 150);
  line(410, 402.5, 580, 402.5);
  line(670, 470, 670, 735);
  line(760, 402.5, 1150, 402.5);
  line(760, 802.5, 1150, 802.5);
  line(1240, 470, 1240, 735);
  line(760, 470, 1150, 735);
  line(760, 735, 1150, 470);
  line(1330, 802.5, 1500, 802.5);

  // Labels for nodes
  noStroke();
  fill(30);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("START", 320, 402.5);
  text("END", 1590, 802.5);

  // Mode display
  textAlign(CENTER, CENTER);
  textSize(60);
  if (isCircuitMode) fill(255, 100, 100);
  else fill(100, 255, 100);
  text(
    isCircuitMode ? "Circuit Switching Network" : "Packet Switching Network",
    width / 2,
    100
  );

  // Mode toggle button
  stroke(0);
  strokeWeight(1);
  fill(200);
  rect(30, 30, 120, 40, 10);
  fill(isCircuitMode ? color(200, 0, 0) : color(0, 200, 0));
  textSize(20);
  noStroke();
  textAlign(CENTER, CENTER);
  text(isCircuitMode ? "Circuit" : "Packet", 90, 50);

  // Packet movement message
  fill(30);
  textSize(20);
  if (isCircuitMode) text("Only one packet can move at a time.", 320, 300);
  else text("Multiple packets can move simultaneously.", 320, 300);

  // Draw packets
  drawPacket(xR, yR, color(255, 120, 120), "R");
  drawPacket(xG, yG, color(120, 255, 120), "G");
  drawPacket(xB, yB, color(120, 120, 255), "B");

  // Move packets
  if (currentPacket === "R" || !isCircuitMode) moveRed();
  if (currentPacket === "G" || !isCircuitMode) moveGreen();
  if (currentPacket === "B" || !isCircuitMode) moveBlue();
}

function drawPacket(x, y, c, label) {
  fill(c);
  stroke(0, 50);
  strokeWeight(2);
  rect(x, y, 30, 30, 8); // Rounded packets
  fill(0);
  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  text(label, x + 15, y + 15);
}

function moveRed() {
  if (phaseR === 1) {
    xR += 3.0 * speed;
    if (xR >= 1227.5) {
      xR = 1227.5;
      phaseR = 2;
    }
  } else if (phaseR === 2) {
    yR += 2.0 * speed;
    if (yR >= 790) {
      yR = 790;
      phaseR = 3;
    }
  } else if (phaseR === 3) {
    xR += 2.0 * speed;
    if (xR >= 1530) {
      xR = 1530;
      phaseR = 0;
      if (isCircuitMode) currentPacket = "";
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
      if (isCircuitMode) currentPacket = "";
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
      if (isCircuitMode) currentPacket = "";
    }
  }
}

function mousePressed() {
  if (mouseX >= 30 && mouseX <= 150 && mouseY >= 30 && mouseY <= 70) {
    isCircuitMode = !isCircuitMode;
    resetPositions();
    return;
  }

  if (isCircuitMode) {
    if (currentPacket === "") {
      if (mouseX >= xR && mouseX <= xR + 30 && mouseY >= yR && mouseY <= yR + 30) {
        currentPacket = "R";
        phaseR = 1;
      } else if (mouseX >= xG && mouseX <= xG + 30 && mouseY >= yG && mouseY <= yG + 30) {
        currentPacket = "G";
        phaseG = 1;
      } else if (mouseX >= xB && mouseX <= xB + 30 && mouseY >= yB && mouseY <= yB + 30) {
        currentPacket = "B";
        phaseB = 1;
      }
    }
  } else {
    if (mouseX >= xR && mouseX <= xR + 30 && mouseY >= yR && mouseY <= yR + 30) {
      phaseR = 1;
    } else if (mouseX >= xG && mouseX <= xG + 30 && mouseY >= yG && mouseY <= yG + 30) {
      phaseG = 1;
    } else if (mouseX >= xB && mouseX <= xB + 30 && mouseY >= yB && mouseY <= yB + 30) {
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
  currentPacket = "";
}
