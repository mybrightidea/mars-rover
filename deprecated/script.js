///////////////////////////////////////////////
// START OF PUZZLE HANDLING
///////////////////////////////////////////////
// initial puzzle grid
const grid = [
  [0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0],
  [1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0]
];

const input = [[5, 5], [1, 2, "N"], "LMLMLMLMM", [3, 3, "E"], "MMRMMRMRRM"];

///////////////////////////////////////////////
// Render result
///////////////////////////////////////////////
const renderResult = result => {
  let html = "";
  for (let roverNumber = 0; roverNumber < result.length; roverNumber++) {
    const { x, y, orientation } = result[roverNumber];
    html += `Rover ${roverNumber +
      1}: x:${x} y:${y} orientation: ${orientation}<br/>`;
  }
  document.getElementById("result").innerHTML = html;
};

const renderInput = input => {
  let html = "";
  for (let roverNumber = 0; roverNumber < input.length; roverNumber++) {
    const { x, y, orientation, data } = input[roverNumber];
    html += `Rover: ${roverNumber +
      1} start [${x},${y}] facing ${orientation} - data: ${data}<br/>`;
  }

  document.getElementById("input").innerHTML = html;
};

const identity = [
  [1, 0],
  [0, 1]
];
const rotateR = [
  [0, 1],
  [-1, 0]
];
const rotateL = [
  [0, -1],
  [1, 0]
];
const North1 = [[0], [1]];
const MMult = (a, b) => {
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
};

const evaluateRotation = instruction => {
  switch (instruction) {
    case "L":
      return 3;
    case "R":
      return 1;
    default:
      return 0;
  }
};
const evalOrientation = accumulator => {
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
};

const runProblem = roverData => {
  return roverData.map(({ x, y, adjustedData }) => {
    let xEnd = x;
    let yEnd = y;

    let accRotation = identity;
    let inceptionRotationAccumulator = 0;
    let MStep = North1;
    adjustedData.forEach(instruction => {
      // debugger;
      switch (instruction) {
        case "M":
          // console.log(accRotation);
          MStep = MMult(accRotation, MStep);
          const [[dx], [dy]] = MStep;
          // console.log(dx, dy);
          xEnd += dx;
          yEnd += dy;
          accRotation = identity;
          break;
        case "L":
          accRotation = MMult(accRotation, rotateL);
          break;
        case "R":
          accRotation = MMult(accRotation, rotateR);
          break;
      }
      inceptionRotationAccumulator += evaluateRotation(instruction);
    });

    return {
      x: xEnd,
      y: yEnd,
      orientation: evalOrientation(inceptionRotationAccumulator)
    };
  });
};

const gridInit = g => {
  const path = document.getElementById("rover-path");
  let html = "";

  g.forEach(row => {
    html += "<tr>";
    row.forEach(val => {
      const prefix = val !== 0 ? "" : "not--";
      html += `<td class="${prefix}visited">`;
      html += "</td>";
    });
    html += "</tr>";
  });
  path.innerHTML = html;
};
///////////////////////////////////////////////
// END OF PUZZLE RENDERING
///////////////////////////////////////////////

// Parse input and run problem

const orientationToRotation = orientation => {
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
};

const prepData = input => {
  const [maxX, maxY] = input[0];
  let roverData = [];

  for (let i = 1; i < input.length; i = i + 2) {
    const [x, y, orientation] = input[i];
    const data = input[i + 1].split("");
    roverData.push({
      x,
      y,
      orientation,
      data,
      adjustedData: orientationToRotation(orientation)
        .split("")
        .concat(data)
    });
  }
  console.log(roverData);
  return {
    maxX,
    maxY,
    roverData
  };
};

// When DOM built initialise the rendering
document.addEventListener("DOMContentLoaded", () => {
  gridInit(grid);
  const { maxX, maxY, roverData } = prepData(input);
  renderInput(roverData);
  renderResult(runProblem(roverData));
});
