function handleInput(x, y) {
  // 모드 전환 스위치 클릭 감지
  if (x >= 30 && x <= 150 && y >= 30 && y <= 70) {
    isCircuitMode = !isCircuitMode;
    resetPositions();
    return;
  }

  if (isWelcomeScreen) {
    // Next 버튼 클릭 처리
    if (
      x >= width / 2 - 100 &&
      x <= width / 2 + 100 &&
      y >= height / 2 &&
      y <= height / 2 + 50
    ) {
      isWelcomeScreen = false;
      isDescriptionScreenCircuit = true; // Circuit 설명 화면으로 전환
    }
    return;
  }

  if (isDescriptionScreenCircuit) {
    // Next 버튼 클릭 처리
    if (
      x >= width / 2 - 100 &&
      x <= width / 2 + 100 &&
      y >= height / 2 + 100 &&
      y <= height / 2 + 150
    ) {
      isDescriptionScreenCircuit = false;
      isDescriptionScreenPacket = true; // Packet 설명 화면으로 전환
    }
    return;
  }

  if (isDescriptionScreenPacket) {
    // Start 버튼 클릭 처리
    if (
      x >= width / 2 - 100 &&
      x <= width / 2 + 100 &&
      y >= height / 2 + 100 &&
      y <= height / 2 + 150
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
        if (x >= xR && x <= xR + 30 && y >= yR && y <= yR + 30) {
          currentPacket = "R";
          phaseR = 1;
        } else if (x >= xG && x <= xG + 30 && y >= yG && y <= yG + 30) {
          currentPacket = "G";
          phaseG = 1;
        } else if (x >= xB && x <= xB + 30 && y >= yB && y <= yB + 30) {
          currentPacket = "B";
          phaseB = 1;
        }
      }
    } else {
      if (x >= xR && x <= xR + 30 && y >= yR && y <= yR + 30) {
        phaseR = 1;
      } else if (x >= xG && x <= xG + 30 && y >= yG && y <= yG + 30) {
        phaseG = 1;
      } else if (x >= xB && x <= xB + 30 && y >= yB && y <= yB + 30) {
        phaseB = 1;
      }
    }
  }
}
