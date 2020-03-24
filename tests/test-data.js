(function() {
  jRoverTest = {
    titles: [
      "Should not crash with original test data",
      "Should not crash with only limits no rover data",
      "Should return rover position with 1 rover",
      "Should return correct position with 1 instruction which is rotation",
      "Should return correct position with 1 instruction which is translation",
      "Should return correct position with only 1 type of instruction - rotation",
      "Should return correct position with only 1 type of instruction - translation",
      "Should return correct position start on rotation",
      "Should return correct position start on TRANSLATION",
      "Should return correct position END on rotation",
      "Should return correct position END on TRANSLATION",
      "Should return correct position start non north with 4 rotations, no translation",
      "Should return correct position when start with mulitple rotations",
      "Should return correct position when end with mulitple rotations",
      "Should return correct position when no instructions sent",
      "Should return correct position when large data set of instructions set #1",
      "Should return correct position when large data set of instructions set #2",
      "Should return correct max and min for X & Y when large data set of instructions"
    ],
    data: [
      [[5, 5], [1, 2, "N"], "LMLMLMLMM", [3, 3, "E"], "MMRMMRMRRM"],
      [[5, 5]],
      //3
      [[5, 5], [1, 2, "N"], "LMLMLMLMM"],
      //4
      [[5, 5], [1, 2, "N"], "L"],
      //5
      [[5, 5], [1, 2, "W"], "M"],
      //6
      [[5, 5], [1, 2, "W"], "RLRLLRLLRLLRLRLLR"],
      //7
      [[5, 5], [1, 2, "W"], "MMMMMMMM"],
      //8
      [[5, 5], [1, 2, "W"], "RMMR"],
      //9
      [[5, 5], [1, 2, "W"], "MRRM"],
      //10
      [[5, 5], [1, 2, "W"], "RMMR"],
      //11
      [[5, 5], [1, 2, "W"], "MRRM"],
      //12
      [[5, 5], [1, 2, "W"], "RRRR"],
      //13
      [[5, 5], [1, 2, "W"], "LLLLLLLLLM"],
      //14
      [[5, 5], [1, 2, "W"], "MLLLLLLLLL"],
      //15
      [[5, 5], [1, 2, "W"], ""],
      //16
      [
        [5, 5],
        [1, 2, "N"],
        "MMLRMMMMMMRMRMRLLRMMMLLMMLRMMLMLRRLMMRLMRRMRMLRRLMRMLMLLRRMRRMLRRLMRLLRMMMLRLRLRMRRRMMMMLRLMLMRMRMLMRMLMMRLLMMMRRLLMMRRRRRRLRMLMLRLMMMMRRLMRMRRLRLMLRLLMMMLRRRLLRMLRLLMMLMRRMLLMLLRRLLMLLLLMMLMLLLMRLRMRMRMRLLLLRRLLMRLLLLLLL"
      ],
      //17
      [
        [5, 5],
        [1, 2, "N"],
        "MMLLMMRLLLLMMLRMLMRLRLMMLMMRMLRLMMRMLMRMMLMRRRMMRMMRLRRMRLLLLMMLRMRRMRMRMRRLMRLLLMRMRLMMRMLLRLMRLRMLRMMLMMRRMRLRRMLLLRRMMRRMRLLMMLLRLRRMMMLLLMRMMLRLMMLMMMLMMMRRRMMLLLRMLMMLLRMRRLMRRRLRMMLMMMLMLLRRLRLLMLMLLRLRLRRLMMLMRMMLL"
      ],
      //18
      [
        [5, 5],
        [1, 2, "N"],
        "MRRMLLLMMRRMRLRMLLRMLRLLLLRMMLMRRLMMMRMLLMMLMLLRRMRLRRRMLMMRLMMMLLLLLMLMMMMMLLLMRRLMRMMMLRLRRRLMRMRLRLMLLRRMRRMRRMRMMRLLLMRLMRRMMMMMMLRRRMMRMRRRLLLLRRLRLMMLMLMRRRMMRMRRLRMLRMRRLLLMRLMRRMMRLLLLLLLRLMMMMMLRMLLLRMMLMMRMLRRLR"
      ]
    ],
    results: [
      {
        maxX: 5,
        maxY: 5,
        roverEndStates: [
          { x: 1, y: 3, orientation: "N" },
          { x: 5, y: 1, orientation: "E" }
        ]
      },
      //2
      { maxX: 5, maxY: 5, roverEndStates: [] },
      //3
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 3, orientation: "N" }] },
      //4
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 2, orientation: "W" }] },
      //5
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 0, y: 2, orientation: "W" }] },
      //6
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 2, orientation: "N" }] },
      //7
      { maxX: 5, maxY: 5, roverEndStates: [{ x: -7, y: 2, orientation: "W" }] },
      //8
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 4, orientation: "E" }] },
      //9
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 2, orientation: "E" }] },
      //10
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 4, orientation: "E" }] },
      //11
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 2, orientation: "E" }] },
      //12
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 2, orientation: "W" }] },
      //13
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 1, orientation: "S" }] },
      //14
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 0, y: 2, orientation: "S" }] },
      //15
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 1, y: 2, orientation: "W" }] },
      //16
      { maxX: 5, maxY: 5, roverEndStates: [{ x: 2, y: 0, orientation: "N" }] },
      //17
      { maxX: 5, maxY: 5, roverEndStates: [{ x: -4, y: 5, orientation: "E" }] },
      //18
      {
        maxX: 5,
        maxY: 5,
        roverEndStates: [
          { x: 9, y: -4, maxX: 9, minX: -1, maxY: 3, minY: 8, orientation: "W" }
        ]
      }
    ]
  };

  if (typeof window !== "undefined") {
    window.jRoverTest = jRoverTest;
  } else {
    if (typeof module === "object" && typeof module.exports === "object") {
      module.exports = jRoverTest;
    }
  }
})();
