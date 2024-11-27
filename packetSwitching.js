let xR, yR, xG, yG, xB, yB;
let phaseR = 0, phaseG = 0, phaseB = 0;
let speed = 1.5;
let currentPacket = "";
let isCircuitMode = true;
let isWelcomeScreen = true; // 초기 상태

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetPositions();
}

function draw() {
  if (isWelcomeScreen) {
    drawWelcomeScreen(); // 환영 화면 그리기
  } else {
    // 밝은 배경 색상
    background(240, 240, 255);

    // 네트워크 구조
    drawNodes();
    drawConnections();

    // 모드 전환 스위치
    drawModeSwitch();

    // 안내 문구
    drawInstruction();

    // 네트워크 모드 제목
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(50);
    noStroke();
    text(
      isCircuitMode ? "Circuit Switching Network" : "Packet Switching Network",
      width / 2,
      height / 12
    );

    // 패킷 그리기
    drawPacket(xR, yR, color(255, 120, 120), "R");
    drawPacket(xG, yG, color(120, 255, 120), "G");
    drawPacket(xB, yB, color(120, 120, 255), "B");

    // 패킷 이동
    if (currentPacket === "R" || !isCircuitMode) moveRed();
    if (currentPacket === "G" || !isCircuitMode) moveGreen();
    if (currentPacket === "B" || !isCircuitMode) moveBlue();
  }
}

function drawWelcomeScreen() {
  background(220, 230, 255); // 밝은 배경
  textAlign(CENTER, CENTER);
  fill(50);
  textSize(40);
  text("안녕하세요!", width / 2, height / 3);
  text(
    "Packet Switching vs Circuit Switching 시뮬레이션에 오신 것을 환영합니다",
    width / 2,
    height / 3 + 50
  );

  // Start 버튼
  fill(100, 180, 255); // 버튼 색상
  noStroke();
  rect(width / 2 - 100, height / 2, 200, 50, 20);

  fill(255);
  textSize(25);
  text("Start", width / 2, height / 2 + 25);
}

function mousePressed() {
  if (isWelcomeScreen) {
    // Start 버튼 클릭 처리
    if (
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 + 100 &&
      mouseY >= height / 2 &&
      mouseY <= height / 2 + 50
    ) {
      isWelcomeScreen = false; // 시뮬레이션 화면으로 전환
    }
    return;
  }

  // 모드 전환 스위치 클릭 감지
  if (mouseX >= 30 && mouseX <= 150 && mouseY >= 30 && mouseY <= 70) {
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

function drawNodes() {
  noStroke(); // 테두리 제거
  fill(190, 210, 255);
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
  stroke(150, 180, 255); // 간선 색상
  line(410, 402.5, 580, 402.5);
  line(670, 470, 670, 735);
  line(760, 402.5, 1150, 402.5);
  line(760, 802.5, 1150, 802.5);
  line(1240, 470, 1240, 735);
  line(760, 470, 1150, 735);
  line(760, 735, 1150, 470);
  line(1330, 802.5, 1500, 802.5);
}

function drawModeSwitch() {
  // 스위치 배경
  fill(200); // 회색 배경
  noStroke(); // 테두리 제거
  rect(30, 30, 120, 40, 20);

  // 스위치 토글
  if (isCircuitMode) {
    fill(255, 100, 100); // Circuit 모드 색상
    ellipse(50, 50, 30);
  } else {
    fill(100, 255, 150); // Packet 모드 색상
    ellipse(110, 50, 30);
  }

  // 모드 텍스트
  fill(50); // 글자 색상
  noStroke(); // 테두리 제거
  textSize(15);
  textAlign(LEFT, CENTER);
  text("Circuit", 30, 80);
  textAlign(RIGHT, CENTER);
  text("Packet", 150, 80);
}

function drawInstruction() {
  // 안내 문구를 START 상자 위에 배치
  fill(50); // 글자 색상 지정
  noStroke(); // 테두리 제거
  textSize(20);
  textAlign(CENTER, CENTER);
  text(
    isCircuitMode
      ? "Only one packet can move at a time."
      : "Multiple packets can move simultaneously.",
    320,
    300
  );
  // 왼쪽 하단에 추가 문구 표시
  textAlign(LEFT, CENTER);
  textSize(15);
  text("Click to Move Packet", 50, height - 50);
  text("Press 'R' to Reset", 50, height - 30);
}
function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetPositions();
  }
}

function drawPacket(x, y, c, label) {
  fill(c);
  noStroke(); // 테두리 제거
  ellipse(x + 15, y + 15, 30, 30);
  fill(0);
  noStroke();
  textSize(15);
  textAlign(CENTER, CENTER);
  text(label, x + 15, y + 15);
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
