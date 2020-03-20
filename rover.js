(function() {
  const safeSplit = str => {
    if (str.length === 1) {
      return [str];
    } else {
      return str.split("");
    }
  };
  const jRover = {
    identity: [
      [1, 0],
      [0, 1]
    ],
    rotateR: [
      [0, 1],
      [-1, 0]
    ],
    rotateL: [
      [0, -1],
      [1, 0]
    ],
    north1: [[0], [1]],
    MMult: (a, b) => {
      let outerArray = [];
      for (let row = 0; row < a.length; row++) {
        let innerArray = [];
        for (let col = 0; col < b[0].length; col++) {
          let x = 0;
          for (let i = 0; i < b.length; i++) {
            x += a[row][i] * b[i][col];
          }
          innerArray.push(x);
        }
        outerArray.push(innerArray);
      }
      return outerArray;
    },
    evaluateRotation: instruction => {
      switch (instruction) {
        case "L":
          return 3;
        case "R":
          return 1;
        default:
          return 0;
      }
    },
    evalOrientation: accumulator => {
      const residual = accumulator % 4;
      switch (residual) {
        case 0:
          return "N";
        case 1:
          return "E";
        case 2:
          return "S";
        case 3:
          return "W";
      }
    },
    orientationToRotation: orientation => {
      switch (orientation) {
        case "E":
          return "R";
        case "S":
          return "RR";
        case "W":
          return "RRR";
        default:
          return "";
      }
    },
    prepData: (input = []) => {
      if (input.length === 0) {
        return [];
      }
      const [maxX, maxY] = input[0];
      let roverData = [];

      for (let i = 1; i < input.length; i = i + 2) {
        const [x, y, orientation] = input[i];
        const data = safeSplit(input[i + 1]);
        roverData.push({
          x,
          y,
          orientation,
          data,
          adjustedData: safeSplit(
            jRover.orientationToRotation(orientation)
          ).concat(data)
        });
      }
      return {
        maxX,
        maxY,
        roverData
      };
    },
    runProblem: (roverData = []) => {
      return roverData.map(({ x, y, adjustedData }) => {
        let xEnd = x;
        let yEnd = y;

        let accRotation = jRover.identity;
        let inceptionRotationAccumulator = 0;
        let MStep = jRover.north1;

        adjustedData.forEach(instruction => {
          switch (instruction) {
            case "M":
              MStep = jRover.MMult(accRotation, MStep);
              const [[dx], [dy]] = MStep;
              xEnd += dx;
              yEnd += dy;
              accRotation = jRover.identity;
              break;
            case "L":
              accRotation = jRover.MMult(accRotation, jRover.rotateL);
              break;
            case "R":
              accRotation = jRover.MMult(accRotation, jRover.rotateR);
              break;
          }
          inceptionRotationAccumulator += jRover.evaluateRotation(instruction);
        });

        return {
          x: xEnd,
          y: yEnd,
          orientation: jRover.evalOrientation(inceptionRotationAccumulator)
        };
      });
    },
    solveProblem: (input = []) => {
      if (input.length === 0) {
        return;
      }
      const { maxX, maxY, roverData } = jRover.prepData(input);
      return { maxX, maxY, roverEndStates: jRover.runProblem(roverData) };
    }
  };

  if (typeof window !== "undefined") {
    window.jRover = jRover;
  } else {
    if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = jRover;
    }
  }
})();