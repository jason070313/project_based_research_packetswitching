let xR, yR, xG, yG, xB, yB;
let phaseR = 0, phaseG = 0, phaseB = 0;
let speed = 1.5;
let currentPacket = "";
let isCircuitMode = true;
let isWelcomeScreen = true; // 초기 상태
let isDescriptionScreenCircuit = false; // Circuit 설명 화면 상태
let isDescriptionScreenPacket = false; // Packet 설명 화면 상태
let isSimulationRunning = false; // 시뮬레이션 실행 상태
let isHoveringHelp = false; // 툴팁 상태

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetPositions();
}

function draw() {
  if (isWelcomeScreen) {
    drawWelcomeScreen(); // 환영 화면
  } else if (isDescriptionScreenCircuit) {
    drawDescriptionScreenCircuit(); // Circuit Switching 설명 화면
  } else if (isDescriptionScreenPacket) {
    drawDescriptionScreenPacket(); // Packet Switching 설명 화면
  } else if (isSimulationRunning) {
    // 시뮬레이션 화면
    background(240, 240, 255); // 배경 먼저 그리기

    // 네트워크 구조
    drawNodes();
    drawConnections();

    // 모드 전환 스위치
    drawModeSwitch();

    // 네트워크 모드 제목
    textAlign(CENTER, CENTER); // 텍스트 정렬
    textSize(40); // 텍스트 크기
    fill(50); // 텍스트 색상
    noStroke(); // 테두리 제거
    text(
      isCircuitMode ? "Circuit Switching Network" : "Packet Switching Network",
      width / 2, // 화면 가로 중앙
      height / 12 // 화면 상단 1/12 지점
    );

    // 안내 문구
    drawInstruction();

    // 패킷 그리기
    drawPacket(xR, yR, color(255, 120, 120), "R");
    drawPacket(xG, yG, color(120, 255, 120), "G");
    drawPacket(xB, yB, color(120, 120, 255), "B");

    // 패킷 이동
    if (currentPacket === "R" || !isCircuitMode) moveRed();
    if (currentPacket === "G" || !isCircuitMode) moveGreen();
    if (currentPacket === "B" || !isCircuitMode) moveBlue();
    
    // ? 버튼 그리기
    drawHelpButton();
  
    // 툴팁 표시
    if (isHoveringHelp) {
      drawTooltip();
    }
  }
}

function drawHelpButton() {
  fill(100, 180, 255); // ? 버튼 색상
  noStroke();
  ellipse(width - 50, 50, 40, 40); // 버튼 위치 및 크기

  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("?", width - 50, 50); // ? 텍스트
}

function drawTooltip() {
  fill(50, 50, 50, 220); // 반투명 배경
  stroke(200);
  rectMode(CORNER);
  rect(width - 220, 70, 210, 50, 10); // 툴팁 위치 및 크기

  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text("패킷을 클릭하면 움직입니다\nr키를 눌르 초기화됩니다", width - 210, 95);
}

function mouseMoved() {
  // ? 버튼 위에 마우스가 있는지 확인
  let d = dist(mouseX, mouseY, width - 50, 50);
  isHoveringHelp = d <= 20; // 버튼 크기 반경 내에 있으면 true
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
}
function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetPositions();
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
    ellipse(128, 50, 30);
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

function drawWelcomeScreen() {
  background(220, 230, 255); // 밝은 배경
  textAlign(CENTER, CENTER);
  fill(50);
  textSize(40);
  text("안녕하세요!", width / 2, height / 3 + 30);
  text(
    "Packet Switching vs Circuit Switching 시뮬레이션에 오신 것을 환영합니다",
    width / 2,
    height / 3 + 80
  );

  // Next 버튼
  fill(100, 180, 255); // 버튼 색상
  noStroke();
  rect(width / 2 - 100, height / 2, 200, 50, 20);

  fill(255);
  textSize(25);
  text("Next", width / 2, height / 2 + 25);
}

function drawDescriptionScreenCircuit() {
  background(240, 250, 255);
  textAlign(CENTER, CENTER);
  fill(50);
  textSize(30);
  text("Circuit Switching Network란?", width / 2, height / 4);

  textSize(20);
  text(
    "두 컴퓨터 간에 고정된 통신 경로를 설정하여 정보를 교환하는 방식입니다. \n" +
      "한 번 통신 경로가 설정되면, 그 경로는 독점적으로 사용됩니다. \n" +
      "정보 전송 속도가 빠르고 지연이 적어 음성 통신이나 대용량 데이터 전송에 적합합니다.",
    width / 2,
    height / 2 - 50
  );

  // Next 버튼
  fill(100, 180, 255); // 버튼 색상
  noStroke();
  rect(width / 2 - 100, height / 2 + 100, 200, 50, 20);

  fill(255);
  textSize(25);
  text("Next", width / 2, height / 2 + 125);
}

function drawDescriptionScreenPacket() {
  background(240, 250, 255);
  textAlign(CENTER, CENTER);
  fill(50);
  textSize(30);
  text("Packet Switching Network란?", width / 2, height / 4);

  textSize(20);
  text(
    "데이터를 작게 나눈 패킷 단위로 나눠 네트워크를 통해 전송하는 방식입니다. \n" +
      "각 패킷은 독립적으로 라우팅되며, 다양한 경로를 통해 목적지에 도달할 수 있습니다. \n" +
      "효율적인 네트워크 사용이 가능하며 파일, 이메일 등 다양한 데이터 전송에 적합합니다.",
    width / 2,
    height / 2 - 50
  );

  // Start 버튼
  fill(100, 180, 255); // 버튼 색상
  noStroke();
  rect(width / 2 - 100, height / 2 + 100, 200, 50, 20);

  fill(255);
  textSize(25);
  text("Start", width / 2, height / 2 + 125);
}

function mousePressed() {
  // 모드 전환 스위치 클릭 감지
  if (mouseX >= 30 && mouseX <= 150 && mouseY >= 30 && mouseY <= 70) {
    isCircuitMode = !isCircuitMode;
    resetPositions();
    return;
  }

  if (isWelcomeScreen) {
    // Next 버튼 클릭 처리
    if (
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 + 100 &&
      mouseY >= height / 2 &&
      mouseY <= height / 2 + 50
    ) {
      isWelcomeScreen = false;
      isDescriptionScreenCircuit = true; // Circuit 설명 화면으로 전환
    }
    return;
  }

  if (isDescriptionScreenCircuit) {
    // Next 버튼 클릭 처리
    if (
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 + 100 &&
      mouseY >= height / 2 + 100 &&
      mouseY <= height / 2 + 150
    ) {
      isDescriptionScreenCircuit = false;
      isDescriptionScreenPacket = true; // Packet 설명 화면으로 전환
    }
    return;
  }

  if (isDescriptionScreenPacket) {
    // Start 버튼 클릭 처리
    if (
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 + 100 &&
      mouseY >= height / 2 + 100 &&
      mouseY <= height / 2 + 150
    ) {
      isDescriptionScreenPacket = false;
      isSimulationRunning = true; // 시뮬레이션 화면 시작
      resetPositions(); // 초기화
    }
    return;
  }
  if(isSimulationRunning){
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

function resetPositions() {
  xR = 430;
  yR = yG = yB = 390;
  xG = 481;
  xB = 534;
  phaseR = phaseG = phaseB = 0;
  currentPacket = "";
}
