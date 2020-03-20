///////////////////////////////////////////////
// START OF PUZZLE HANDLING
///////////////////////////////////////////////
// initial puzzle grid
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
///////////////////////////////////////////////
// END OF PUZZLE RENDERING
///////////////////////////////////////////////

// When DOM built initialise the rendering
document.addEventListener("DOMContentLoaded", () => {
  if (typeof jRover === "undefined") {
    throw new Error("jRover required but not present");
  } else {
    const { maxX, maxY, roverData } = jRover.prepData(input);
    renderInput(roverData);
    renderResult(jRover.runProblem(roverData));
  }
});
