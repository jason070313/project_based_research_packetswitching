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

// 상대적 위치를 위한 비율 값
let positions = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculatePositions();
  resetPositions();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculatePositions();
  resetPositions();
}

function calculatePositions() {
  // 화면 크기에 따라 상대적인 위치 계산
  positions.startX = width * 0.2;
  positions.startY = height * 0.4;
  positions.endX = width * 0.8;
  positions.endY = height * 0.8;

  // 노드 및 연결을 위한 위치 계산
  // 예시: 노드 위치를 화면 비율에 따라 설정
  positions.nodes = [
    { x: width * 0.2, y: height * 0.4 },
    { x: width * 0.35, y: height * 0.4 },
    { x: width * 0.6, y: height * 0.4 },
    { x: width * 0.35, y: height * 0.7 },
    { x: width * 0.6, y: height * 0.7 },
    { x: width * 0.8, y: height * 0.7 }
  ];

  // 패킷 초기 위치
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
    textSize(40);
    fill(50);
    noStroke();
    text(
      isCircuitMode ? "Circuit Switching Network" : "Packet Switching Network",
      width / 2,
      height / 12
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
  let btnSize = min(width, height) * 0.05; // 화면 크기에 비례
  fill(100, 180, 255);
  noStroke();
  ellipse(width - 50, 50, btnSize, btnSize);

  fill(255);
  textSize(btnSize * 0.5);
  textAlign(CENTER, CENTER);
  text("?", width - 50, 50);
}

function drawTooltip() {
  let tooltipWidth = min(width, height) * 0.35;
  let tooltipHeight = min(width, height) * 0.15;
  fill(50, 50, 50, 220);
  stroke(200);
  rectMode(CORNER);
  rect(width - tooltipWidth - 20, 80, tooltipWidth, tooltipHeight, 10);

  fill(255);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text("패킷을 클릭하면 움직입니다\nR키를 누르면 초기화됩니다", width - tooltipWidth / 2 - 20, 80 + tooltipHeight / 2);
}

function mouseMoved() {
  // ? 버튼 위에 마우스가 있는지 확인
  let d = dist(mouseX, mouseY, width - 50, 50);
  let btnSize = min(width, height) * 0.025; // 반지름
  isHoveringHelp = d <= btnSize;
}

function touchMoved() {
  mouseMoved();
}

function drawInstruction() {
  fill(50);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);
  text(
    isCircuitMode
      ? "Only one packet can move at a time."
      : "Multiple packets can move simultaneously.",
    width * 0.3,
    height * 0.3
  );
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetPositions();
  }
}

function drawNodes() {
  noStroke();
  fill(190, 210, 255);
  positions.nodes.forEach(node => {
    let nodeWidth = min(width, height) * 0.09;
    let nodeHeight = min(width, height) * 0.07;
    rect(node.x, node.y, nodeWidth, nodeHeight, 30);
  });

  fill(30);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("START", positions.nodes[0].x + min(width, height)*0.045, positions.nodes[0].y + min(width, height)*0.0175);
  text("END", positions.nodes[5].x + min(width, height)*0.045, positions.nodes[5].y + min(width, height)*0.0175);
}

function drawConnections() {
  strokeWeight(5);
  stroke(150, 180, 255);
  
  // 연결 선을 화면 비율에 맞게 수정
  // 예시: nodes 배열의 인덱스를 이용하여 선 그리기
  let connections = [
    [0,1], [1,2], [1,3], [2,4], [4,5],
    [2,3], [2,5], [3,4]
  ];
  
  connections.forEach(conn => {
    let start = positions.nodes[conn[0]];
    let end = positions.nodes[conn[1]];
    line(start.x + min(width, height)*0.045, start.y + min(width, height)*0.035,
         end.x + min(width, height)*0.045, end.y + min(width, height)*0.035);
  });
}

function drawModeSwitch() {
  let switchX = min(width, height) * 0.05;
  let switchY = min(width, height) * 0.04;
  let switchWidth = min(width, height) * 0.12;
  let switchHeight = min(width, height) * 0.04;
  let toggleDiameter = min(width, height) * 0.03;

  // 스위치 배경
  fill(200);
  noStroke();
  rect(switchX, switchY, switchWidth, switchHeight, 20);

  // 스위치 토글
  if (isCircuitMode) {
    fill(255, 100, 100);
    ellipse(switchX + toggleDiameter, switchY + switchHeight / 2, toggleDiameter, toggleDiameter);
  } else {
    fill(100, 255, 150);
    ellipse(switchX + switchWidth - toggleDiameter, switchY + switchHeight / 2, toggleDiameter, toggleDiameter);
  }

  // 모드 텍스트
  fill(50);
  noStroke();
  textSize(min(width, height) * 0.015);
  textAlign(LEFT, CENTER);
  text("Circuit", switchX + min(width, height) * 0.01, switchY + switchHeight + min(width, height) * 0.02);
  textAlign(RIGHT, CENTER);
  text("Packet", switchX + switchWidth - min(width, height) * 0.01, switchY + switchHeight + min(width, height) * 0.02);
}

function drawPacket(x, y, c, label) {
  fill(c);
  noStroke();
  let packetSize = min(width, height) * 0.03;
  ellipse(x + packetSize / 2, y + packetSize / 2, packetSize, packetSize);
  fill(0);
  noStroke();
  textSize(packetSize * 0.5);
  textAlign(CENTER, CENTER);
  text(label, x + packetSize / 2, y + packetSize / 2);
}

function drawWelcomeScreen() {
  background(220, 230, 255);
  textAlign(CENTER, CENTER);
  fill(50);
  textSize(min(width, height) * 0.05);
  text("안녕하세요!", width / 2, height / 3 + 30);
  text(
    "Packet Switching vs Circuit Switching 시뮬레이션에 오신 것을 환영합니다",
    width / 2,
    height / 3 + 80
  );

  // Next 버튼
  let btnWidth = min(width, height) * 0.2;
  let btnHeight = min(width, height) * 0.06;
  fill(100, 180, 255);
  noStroke();
  rect(width / 2 - btnWidth / 2, height / 2, btnWidth, btnHeight, 20);

  fill(255);
  textSize(min(width, height) * 0.025);
  text("Next", width / 2, height / 2 + btnHeight / 2);
}

function drawDescriptionScreenCircuit() {
  background(240, 250, 255);
  textAlign(CENTER, CENTER);
  fill(50);
  textSize(min(width, height) * 0.04);
  text("Circuit Switching Network란?", width / 2, height * 0.25);

  textSize(min(width, height) * 0.025);
  text(
    "두 컴퓨터 간에 고정된 통신 경로를 설정하여 정보를 교환하는 방식입니다. \n" +
    "한 번 통신 경로가 설정되면, 그 경로는 독점적으로 사용됩니다. \n" +
    "정보 전송 속도가 빠르고 지연이 적어 음성 통신이나 대용량 데이터 전송에 적합합니다.",
    width / 2,
    height / 2 - 50
  );

  // Next 버튼
  let btnWidth = min(width, height) * 0.2;
  let btnHeight = min(width, height) * 0.06;
  fill(100, 180, 255);
  noStroke();
  rect(width / 2 - btnWidth / 2, height / 2 + 100, btnWidth, btnHeight, 20);

  fill(255);
  textSize(min(width, height) * 0.025);
  text("Next", width / 2, height / 2 + 100 + btnHeight / 2);
}

function drawDescriptionScreenPacket() {
  background(240, 250, 255);
  textAlign(CENTER, CENTER);
  fill(50);
  textSize(min(width, height) * 0.04);
  text("Packet Switching Network란?", width / 2, height * 0.25);

  textSize(min(width, height) * 0.025);
  text(
    "데이터를 작게 나눈 패킷 단위로 나눠 네트워크를 통해 전송하는 방식입니다. \n" +
    "각 패킷은 독립적으로 라우팅되며, 다양한 경로를 통해 목적지에 도달할 수 있습니다. \n" +
    "효율적인 네트워크 사용이 가능하며 파일, 이메일 등 다양한 데이터 전송에 적합합니다.",
    width / 2,
    height / 2 - 50
  );

  // Start 버튼
  let btnWidth = min(width, height) * 0.2;
  let btnHeight = min(width, height) * 0.06;
  fill(100, 180, 255);
  noStroke();
  rect(width / 2 - btnWidth / 2, height / 2 + 100, btnWidth, btnHeight, 20);

  fill(255);
  textSize(min(width, height) * 0.025);
  text("Start", width / 2, height / 2 + 100 + btnHeight / 2);
}

function mousePressed() {
  handleInput(mouseX, mouseY);
}

function touchStarted() {
  handleInput(touchX, touchY);
}

function handleInput(x, y) {
  // 모드 전환 스위치 클릭 감지
  let switchX = min(width, height) * 0.05;
  let switchY = min(width, height) * 0.04;
  let switchWidth = min(width, height) * 0.12;
  let switchHeight = min(width, height) * 0.04;

  if (x >= switchX && x <= switchX + switchWidth &&
      y >= switchY && y <= switchY + switchHeight + min(width, height)*0.02) {
    isCircuitMode = !isCircuitMode;
    resetPositions();
    return;
  }

  if (isWelcomeScreen) {
    // Next 버튼 클릭 처리
    let btnWidth = min(width, height) * 0.2;
    let btnHeight = min(width, height) * 0.06;
    if (
      x >= width / 2 - btnWidth / 2 &&
      x <= width / 2 + btnWidth / 2 &&
      y >= height / 2 &&
      y <= height / 2 + btnHeight
    ) {
      isWelcomeScreen = false;
      isDescriptionScreenCircuit = true; // Circuit 설명 화면으로 전환
    }
    return;
  }

  if (isDescriptionScreenCircuit) {
    // Next 버튼 클릭 처리
    let btnWidth = min(width, height) * 0.2;
    let btnHeight = min(width, height) * 0.06;
    if (
      x >= width / 2 - btnWidth / 2 &&
      x <= width / 2 + btnWidth / 2 &&
      y >= height / 2 + 100 &&
      y <= height / 2 + 100 + btnHeight
    ) {
      isDescriptionScreenCircuit = false;
      isDescriptionScreenPacket = true; // Packet 설명 화면으로 전환
    }
    return;
  }

  if (isDescriptionScreenPacket) {
    // Start 버튼 클릭 처리
    let btnWidth = min(width, height) * 0.2;
    let btnHeight = min(width, height) * 0.06;
    if (
      x >= width / 2 - btnWidth / 2 &&
      x <= width / 2 + btnWidth / 2 &&
      y >= height / 2 + 100 &&
      y <= height / 2 + 100 + btnHeight
    ) {
      isDescriptionScreenPacket = false;
      isSimulationRunning = true; // 시뮬레이션 화면 시작
      resetPositions(); // 초기화
    }
    return;
  }

  if (isSimulationRunning) {
    // 패킷 선택
    if (isCircuitMode) {
      if (currentPacket === "") {
        let packetSize = min(width, height) * 0.03;
        if (x >= xR && x <= xR + packetSize &&
            y >= yR && y <= yR + packetSize) {
          currentPacket = "R";
          phaseR = 1;
        } else if (x >= xG && x <= xG + packetSize &&
                   y >= yG && y <= yG + packetSize) {
          currentPacket = "G";
          phaseG = 1;
        } else if (x >= xB && x <= xB + packetSize &&
                   y >= yB && y <= yB + packetSize) {
          currentPacket = "B";
          phaseB = 1;
        }
      }
    } else {
      let packetSize = min(width, height) * 0.03;
      if (x >= xR && x <= xR + packetSize &&
          y >= yR && y <= yR + packetSize) {
        phaseR = 1;
      } else if (x >= xG && x <= xG + packetSize &&
                 y >= yG && y <= yG + packetSize) {
        phaseG = 1;
      } else if (x >= xB && x <= xB + packetSize &&
                 y >= yB && y <= yB + packetSize) {
        phaseB = 1;
      }
    }
  }
}

function moveGreen() {
  if (phaseG === 1) {
    xG += 3.2 * speed;
    if (xG >= positions.nodes[2].x - min(width, height)*0.05) {
      xG = positions.nodes[2].x - min(width, height)*0.05;
      phaseG = 2;
    }
  } else if (phaseG === 2) {
    xG -= 2.1 * speed;
    yG += 2.1 * (265 / 390) * speed;
    if (yG >= positions.endY - min(width, height)*0.01) {
      yG = positions.endY - min(width, height)*0.01;
      phaseG = 3;
    }
  } else if (phaseG === 3) {
    xG += 3.6 * speed;
    if (xG >= positions.endX - min(width, height)*0.05) {
      xG = positions.endX - min(width, height)*0.05;
      phaseG = 0;
      if (isCircuitMode) currentPacket = "";
    }
  }
}

function moveBlue() {
  if (phaseB === 1) {
    xB += 2.3 * speed;
    if (xB >= positions.nodes[1].x + min(width, height)*0.02) {
      xB = positions.nodes[1].x + min(width, height)*0.02;
      phaseB = 2;
    }
  } else if (phaseB === 2) {
    yB += 1.4 * speed;
    if (yB >= positions.endY - min(width, height)*0.01) {
      yB = positions.endY - min(width, height)*0.01;
      phaseB = 3;
    }
  } else if (phaseB === 3) {
    xB += 2.8 * speed;
    if (xB >= positions.endX - min(width, height)*0.05) {
      xB = positions.endX - min(width, height)*0.05;
      phaseB = 0;
      if (isCircuitMode) currentPacket = "";
    }
  }
}

function moveRed() {
  if (phaseR === 1) {
    xR += 3.0 * speed;
    if (xR >= positions.nodes[1].x + min(width, height)*0.02) {
      xR = positions.nodes[1].x + min(width, height)*0.02;
      phaseR = 2;
    }
  } else if (phaseR === 2) {
    yR += 2.0 * speed;
    if (yR >= positions.endY - min(width, height)*0.01) {
      yR = positions.endY - min(width, height)*0.01;
      phaseR = 3;
    }
  } else if (phaseR === 3) {
    xR += 2.0 * speed;
    if (xR >= positions.endX - min(width, height)*0.05) {
      xR = positions.endX - min(width, height)*0.05;
      phaseR = 0;
      if (isCircuitMode) currentPacket = "";
    }
  }
}

function resetPositions() {
  // 패킷의 초기 위치를 노드의 START 위치에 맞춤
  let startNode = positions.nodes[0];
  let packetSize = min(width, height) * 0.03;
  xR = startNode.x + packetSize / 2;
  yR = startNode.y + packetSize / 2;
  xG = startNode.x + packetSize / 2 + packetSize + 10;
  yG = startNode.y + packetSize / 2;
  xB = startNode.x + packetSize / 2 + 2*(packetSize + 10);
  yB = startNode.y + packetSize / 2;
  phaseR = phaseG = phaseB = 0;
  currentPacket = "";
}
