let xR, yR, xG, yG, xB, yB;
let phaseR = 0, phaseG = 0, phaseB = 0;
let speed = 1.5;
let currentPacket = "";
let isCircuitMode = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetPositions();
}

function draw() {
  // 배경 효과
  drawBackground();

  // 네트워크 구조
  drawNodes();
  drawConnections();

  // 모드 전환 스위치
  drawModeSwitch();

  // 네트워크 모드 제목
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(isCircuitMode ? color(250, 100, 100) : color(100, 250, 150));
  text(isCircuitMode ? "Circuit Switching Network" : "Packet Switching Network", width / 2, height / 10);

  // 패킷 이동 메시지
  fill(255);
  textSize(20);
  if (isCircuitMode) text("Only one packet can move at a time.", width / 5, height / 5);
  else text("Multiple packets can move simultaneously.", width / 5, height / 5);

  // 패킷 그리기
  drawPacket(xR, yR, color(255, 120, 120), "R");
  drawPacket(xG, yG, color(120, 255, 120), "G");
  drawPacket(xB, yB, color(120, 120, 255), "B");

  // 패킷 이동
  if (currentPacket === "R" || !isCircuitMode) moveRed();
  if (currentPacket === "G" || !isCircuitMode) moveGreen();
  if (currentPacket === "B" || !isCircuitMode) moveBlue();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetPositions();
}

function drawBackground() {
  let c1 = color(30, 30, 60);
  let c2 = color(10, 10, 40);
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawNodes() {
  noStroke();
  fill(200, 220, 255, 200);
  rect(230, 335, 180, 135, 30);
  rect(580, 335, 180, 135, 30);
  rect(1150, 335, 180, 135, 30);
  rect(580, 735, 180, 135, 30);
  rect(1150, 735, 180, 135, 30);
  rect(1500, 735, 180, 135, 30);

  fill(30);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("START", 320, 402.5);
  text("END", 1590, 802.5);
}

function drawConnections() {
  strokeWeight(5);
  stroke(100, 150, 255, 150);
  line(410, 402.5, 580, 402.5);
  line(670, 470, 670, 735);
  stroke(255, 120, 150, 150);
  line(760, 402.5, 1150, 402.5);
  line(760, 802.5, 1150, 802.5);
  stroke(150, 255, 150, 150);
  line(1240, 470, 1240, 735);
  line(760, 470, 1150, 735);
  line(760, 735, 1150, 470);
  stroke(255, 255, 150, 150);
  line(1330, 802.5, 1500, 802.5);
}

function drawModeSwitch() {
  // 스위치 배경
  fill(180);
  rect(width / 20, height / 20, 120, 40, 20);

  // 스위치 토글
  if (isCircuitMode) {
    fill(250, 100, 100); // Circuit 모드 색상
    ellipse(width / 20 + 40, height / 20 + 20, 30);
  } else {
    fill(100, 250, 150); // Packet 모드 색상
    ellipse(width / 20 + 100, height / 20 + 20, 30);
  }

  // 모드 텍스트
  fill(0);
  textSize(15);
  textAlign(LEFT, CENTER);
  text("Circuit", width / 20, height / 20 + 60);
  textAlign(RIGHT, CENTER);
  text("Packet", width / 20 + 120, height / 20 + 60);
}

function drawPacket(x, y, c, label) {
  fill(c);
  stroke(255, 255, 255, 100);
  strokeWeight(3);
  ellipse(x + 15, y + 15, 30, 30);
  fill(0);
  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  text(label, x + 15, y + 15);
}

function mousePressed() {
  // 모드 전환 스위치 클릭 감지
  if (mouseX >= width / 20 && mouseX <= width / 20 + 120 && mouseY >= height / 20 && mouseY <= height / 20 + 40) {
    isCircuitMode = !isCircuitMode;
    resetPositions();
    return;
  }

  // 패킷 선택
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

function resetPositions() {
  xR = 430;
  yR = yG = yB = 390;
  xG = 481;
  xB = 534;
  phaseR = phaseG = phaseB = 0;
  currentPacket = "";
}
