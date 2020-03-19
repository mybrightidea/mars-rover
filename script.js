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
  document.getElementById(
    "result"
  ).innerHTML = result.reduce((html, endPoint, roverNumber) => {}, "");
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
const runProblem = params => [];

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
  const problemData = prepData(input);
  renderInput(problemData.roverData);
  renderResult(runProblem(input));
});
