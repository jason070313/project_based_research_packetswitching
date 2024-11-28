let xR, yR, xG, yG, xB, yB;
let phaseR = 0, phaseG = 0, phaseB = 0;
let speed = 1.5;
let currentPacket = "";
let isCircuitMode = true;
let isWelcomeScreen = true; // 초기 상태
let isDescriptionScreenCircuit = false; // Circuit 설명 화면 상태
let isDescriptionScreenPacket = false; // Packet 설명 화면 상태

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
      isDescriptionScreenPacket = false; // 설명 화면 종료
    }
    return;
  }

  // 모드 전환 스위치 클릭 감지
  if (mouseX >= 30 && mouseX <= 150 && mouseY >= 30 && mouseY <= 70) {
    isCircuitMode = !isCircuitMode;
    resetPositions();
    return;
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
