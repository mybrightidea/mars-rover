// When DOM built initialise the rendering
document.addEventListener("DOMContentLoaded", () => {
  if (typeof jRover === "undefined" || typeof jRover === "undefined") {
    throw new Error("jRover required but not present");
  } else {
    let html = "";

    jRoverTest.data.forEach((data, index) => {
      html += `<div class="test-case">`;
      html += addTitleHTML(jRoverTest.titles[index], index);
      const formattedData = jRover.prepData(data);
      html += addTestDataHTML(formattedData);
      html += addResultHTML(jRoverTest.results[index], "Expected");
      html += addResultHTML(
        {
          maxX: formattedData.maxX,
          maxY: formattedData.maxY,
          roverEndStates: jRover.runProblem(formattedData.roverData)
        },
        "Actual"
      );
      html += `</div>`;
    });
    document.getElementById("output").innerHTML = html;
  }
});

const addTitleHTML = (title, testNumber) => {
  return `<h2 class="test-title">Test ${testNumber +
    1}</h2><h3 class = "test-sub-title">${title}</h3>`;
};
const addTestDataHTML = formattedData => {
  const { maxX, maxY, roverData } = formattedData;
  let html = `<p class="max-coords">Max: (${maxX},${maxY})</p>`;

  for (let roverNumber = 0; roverNumber < roverData.length; roverNumber++) {
    const { x, y, orientation, data } = roverData[roverNumber];
    html += `<p class="input-data">Rover ${roverNumber +
      1}<br/> x:${x} y:${y} <br/>orientation: ${orientation}<br/>data: ${data}<br/></p>`;
  }
  return html;
};
const addResultHTML = (result, type) => {
  const { maxX, maxY, roverEndStates } = result;
  let html = `<h2 class="test-result-title">${type} Result</h2>`;
  html += `<p class="max-coords">Max: (${maxX},${maxY})</p>`;
  for (
    let roverNumber = 0;
    roverNumber < roverEndStates.length;
    roverNumber++
  ) {
    const { x, y, orientation } = roverEndStates[roverNumber];
    html += `<p class="test-result">Rover ${roverNumber +
      1}<br/> x:${x} y:${y}<br/>orientation: ${orientation}<br/></p>`;
  }
  return html;
};
