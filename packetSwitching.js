let xR, yR, xG, yG, xB, yB;
let phaseR = 0, phaseG = 0, phaseB = 0;
let speed = 1.5;
let currentPacket = "";
let isCircuitMode = true;
let nodeData = {}; // Store monitoring information for each node

function setup() {
  createCanvas(1600, 900);
  resetPositions();
  initializeNodeData();
}

function draw() {
  // 배경 효과
  drawBackground();

  // 네트워크 구조
  drawNodes();
  drawConnections();

  // 모드 전환 버튼
  drawModeToggle();

  // 네트워크 모드 제목
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(isCircuitMode ? color(250, 100, 100) : color(100, 250, 150));
  text(isCircuitMode ? "Circuit Switching Network" : "Packet Switching Network", width / 2, 100);

  // 패킷 이동 메시지
  fill(255);
  textSize(20);
  if (isCircuitMode) text("Only one packet can move at a time.", 320, 300);
  else text("Multiple packets can move simultaneously.", 320, 300);

  // 패킷 그리기
  drawPacket(xR, yR, color(255, 120, 120), "R");
  drawPacket(xG, yG, color(120, 255, 120), "G");
  drawPacket(xB, yB, color(120, 120, 255), "B");

  // 노드 모니터링 데이터 업데이트 및 표시
  updateNodeData();
  displayNodeData();

  // 패킷 이동
  if (currentPacket === "R" || !isCircuitMode) moveRed();
  if (currentPacket === "G" || !isCircuitMode) moveGreen();
  if (currentPacket === "B" || !isCircuitMode) moveBlue();
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
  fill(50, 100, 150, 200);
  rect(230, 335, 180, 135, 30);
  rect(580, 335, 180, 135, 30);
  rect(1150, 335, 180, 135, 30);
  rect(580, 735, 180, 135, 30);
  rect(1150, 735, 180, 135, 30);
  rect(1500, 735, 180, 135, 30);

  fill(255);
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

function drawModeToggle() {
  noStroke();
  fill(100);
  rect(30, 30, 120, 40, 20);
  fill(isCircuitMode ? color(250, 100, 100) : color(100, 250, 150));
  ellipse(isCircuitMode ? 60 : 120, 50, 30);
  textSize(15);
  fill(255);
  textAlign(LEFT);
  text(isCircuitMode ? "Circuit" : "Packet", 140, 50);
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

function updateNodeData() {
  // Randomly update some data for simulation purposes
  for (let node in nodeData) {
    nodeData[node].throughput = random(10, 100).toFixed(1) + " Mbps";
    nodeData[node].latency = random(1, 50).toFixed(1) + " ms";
  }
}

function displayNodeData() {
  for (let node in nodeData) {
    let data = nodeData[node];
    fill(0, 100, 200, 150);
    rect(data.x, data.y, 140, 60, 10);
    fill(255);
    textSize(15);
    textAlign(LEFT, CENTER);
    text("Node: " + data.label, data.x + 10, data.y + 15);
    text("Throughput: " + data.throughput, data.x + 10, data.y + 30);
    text("Latency: " + data.latency, data.x + 10, data.y + 45);
  }
}

function initializeNodeData() {
  // Position for monitoring displays
  nodeData = {
    node1: { label: "START", x: 240, y: 480 },
    node2: { label: "MIDDLE 1", x: 600, y: 480 },
    node3: { label: "MIDDLE 2", x: 1170, y: 480 },
    node4: { label: "MIDDLE 3", x: 600, y: 880 },
    node5: { label: "MIDDLE 4", x: 1170, y: 880 },
    node6: { label: "END", x: 1500, y: 880 },
  };
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
