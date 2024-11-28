let xR, yR, xG, yG, xB, yB;
let phaseR = 0, phaseG = 0, phaseB = 0;
let speed = 1.5;
let currentPacket = "";
let isCircuitMode = true;
let isWelcomeScreen = true; // 초기 상태
let isDescriptionScreen = false; // 설명 화면 상태

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetPositions();
}

function draw() {
  if (isWelcomeScreen) {
    drawWelcomeScreen(); // 환영 화면
  } else if (isDescriptionScreen) {
    drawDescriptionScreen(); // 설명 화면
  } else {
    // 시뮬레이션 화면
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
  text("안녕하세요!", width / 2, height / 3 + 60);
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
  text("Next", width / 2, height / 2 + 55);
}

function drawDescriptionScreen() {
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

  // Start 버튼
  fill(100, 180, 255); // 버튼 색상
  noStroke();
  rect(width / 2 - 100, height / 2 + 100, 200, 50, 20);

  fill(255);
  textSize(25);
  text("Start", width / 2, height / 2 + 125);
}

function mousePressed() {
  if (isWelcomeScreen) {
    // Next 버튼 클릭 처리
    if (
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 + 100 &&
      mouseY >= height / 2 &&
      mouseY <= height / 2 + 50
    ) {
      isWelcomeScreen = false;
      isDescriptionScreen = true; // 설명 화면으로 전환
    }
    return;
  }

  if (isDescriptionScreen) {
    // Start 버튼 클릭 처리
    if (
      mouseX >= width / 2 - 100 &&
      mouseX <= width / 2 + 100 &&
      mouseY >= height / 2 + 100 &&
      mouseY <= height / 2 + 150
    ) {
      isDescriptionScreen = false; // 설명 화면 종료
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
  if (isCircuitMode && currentPacket === "") {
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
  } else if (!isCircuitMode) {
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
  fill(200); // 회색 배경
  noStroke(); // 테두리 제거
  rect(30, 30, 120, 40, 20);

  if (isCircuitMode) {
    fill(255, 100, 100); // Circuit 모드 색상
    ellipse(50, 50, 30);
  } else {
    fill(100, 255, 150); // Packet 모드 색상
    ellipse(110, 50, 30);
  }

  fill(50); // 글자 색상
  noStroke(); // 테두리 제거
  textSize(15);
  textAlign(LEFT, CENTER);
  text("Circuit", 30, 80);
  textAlign(RIGHT, CENTER);
  text("Packet", 150, 80);
}

function resetPositions() {
  xR = 430;
  yR = yG = yB = 390;
  xG = 481;
  xB = 534;
  phaseR = phaseG = phaseB = 0;
  currentPacket = "";
}
