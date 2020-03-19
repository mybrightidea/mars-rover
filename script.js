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

// When DOM built initialise the rendering
document.addEventListener("DOMContentLoaded", () => {
  gridInit(grid);
});
