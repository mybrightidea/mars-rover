const should = require("should");
jRover = require("../rover");

beforeEach(() => {});

describe("Test evaluate rotation helper functions in jRover", () => {
  it("should return 1 when rotation instruction is 'R'", () => {
    const result = jRover.evaluateRotation("R");
    result.should.equal(1);
  });
  it("should return 3 when rotation instruction is 'L'", () => {
    const result = jRover.evaluateRotation("L");
    result.should.equal(3);
  });
  it("should return 0 when rotation instruction is not 'L' or 'R'", () => {
    const result = jRover.evaluateRotation("J");
    result.should.equal(0);
  });
});
describe("Test evaluate evalOrientation helper functions in jRover", () => {
  it("should return N when orientation accumulator is 0", () => {
    const result = jRover.evalOrientation(0);
    result.should.equal("N");
  });
  it("should return E when orientation accumulator is 1", () => {
    const result = jRover.evalOrientation(1);
    result.should.equal("E");
  });
  it("should return S when orientation accumulator is 2", () => {
    const result = jRover.evalOrientation(2);
    result.should.equal("S");
  });
  it("should return W when orientation accumulator is 3", () => {
    const result = jRover.evalOrientation(3);
    result.should.equal("W");
  });
  it("should return N when orientation accumulator is 4", () => {
    const result = jRover.evalOrientation(4);
    result.should.equal("N");
  });
  it("should return E when orientation accumulator is 5", () => {
    const result = jRover.evalOrientation(5);
    result.should.equal("E");
  });
  it("should return S when orientation accumulator is 6", () => {
    const result = jRover.evalOrientation(6);
    result.should.equal("S");
  });
});
describe("Test evaluate orientationToRotation helper functions in jRover", () => {
  it("should return instruction 'R' when orientation is 'E'", () => {
    const result = jRover.orientationToRotation("E");
    result.should.equal("R");
  });
  it("should return instruction 'RR' when orientation is 'S'", () => {
    const result = jRover.orientationToRotation("S");
    result.should.equal("RR");
  });
  it("should return instruction 'RRR' when orientation is 'W'", () => {
    const result = jRover.orientationToRotation("W");
    result.should.equal("RRR");
  });
  it("should return instruction '' when orientation is 'N'", () => {
    const result = jRover.orientationToRotation("N");
    result.should.equal("");
  });
  it("should return instruction '' when orientation is ''", () => {
    const result = jRover.orientationToRotation("");
    result.should.equal("");
  });
  it("should return instruction '' when orientation is 'X'", () => {
    const result = jRover.orientationToRotation("x");
    result.should.equal("");
  });
});

describe("Test matrix multiply helper functions in jRover", () => {
  it("should return initial matrix when 4 rotateL applied", () => {
    const result = jRover.MMult(
      jRover.MMult(
        jRover.MMult(
          jRover.MMult(jRover.identity, jRover.rotateL),
          jRover.rotateL
        ),
        jRover.rotateL
      ),
      jRover.rotateL
    );
    result.should.containDeepOrdered(jRover.identity);
  });
  it("should return initial matrix when 4 rotateR applied", () => {
    const result = jRover.MMult(
      jRover.MMult(
        jRover.MMult(
          jRover.MMult(jRover.identity, jRover.rotateR),
          jRover.rotateR
        ),
        jRover.rotateR
      ),
      jRover.rotateR
    );
    result.should.containDeepOrdered(jRover.identity);
  });
  it("should return same result when 3 * rotateR and 1 * rotateL", () => {
    const result1 = jRover.MMult(
      jRover.MMult(
        jRover.MMult(jRover.identity, jRover.rotateR),
        jRover.rotateR
      ),
      jRover.rotateR
    );
    const result2 = jRover.MMult(jRover.identity, jRover.rotateL);

    result1.should.containDeepOrdered(result2);
  });
  it("should return initial matrix when pre-multiply 2 x 1 with 2 x 1 identiry", () => {
    const result = jRover.MMult(jRover.identity, jRover.north1);
    result.should.containDeepOrdered(jRover.north1);
  });
});

describe("Test with supplied data", () => {
  const input = [[5, 5], [1, 2, "N"], "LMLMLMLMM", [3, 3, "E"], "MMRMMRMRRM"];

  it("Should return 2 prepared rows of input and maxX, maxY for supplied test data", () => {
    const { maxX, maxY, roverData } = jRover.prepData(input);
    maxX.should.equal(input[0][0]);
    maxY.should.equal(input[0][1]);
    roverData.should.be.instanceof(Array).and.have.lengthOf(2);
  });

  it("Should return correct prepared input data for rover 1", () => {
    const { maxX, maxY, roverData } = jRover.prepData(input);
    roverData[0].should.have.property("x").and.equal(input[1][0]);
    roverData[0].should.have.property("y").and.equal(input[1][1]);
    roverData[0].should.have
      .property("data")
      .and.containDeepOrdered(input[2].split(""));
  });
  it("Should return correct prepared input data for rover 2", () => {
    const { maxX, maxY, roverData } = jRover.prepData(input);
    roverData[1].should.have.property("x").and.equal(input[3][0]);
    roverData[1].should.have.property("y").and.equal(input[3][1]);
    roverData[1].should.have
      .property("data")
      .and.containDeepOrdered(input[4].split(""));
  });

  it("Should return correct results structure", () => {
    const { maxX, maxY, roverData } = jRover.prepData(input);
    const result = jRover.runProblem(roverData);
    result.should.be.instanceof(Array).and.have.lengthOf(2);
    result[0].should.have.property("x");
    result[0].should.have.property("y");
    result[0].should.have.property("orientation");
  });

  it("Should return correct results for Rover 1", () => {
    const { maxX, maxY, roverData } = jRover.prepData(input);
    const { x, y, orientation } = jRover.runProblem(roverData)[0];
    x.should.equal(1);
    y.should.equal(3);
    orientation.should.equal("N");
  });
});

const testData = [
  [[5, 5], [1, 2, "N"], "LMLMLMLMM", [3, 3, "E"], "MMRMMRMRRM"],
  //1
  [],
  //2
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
  //16
  [
    [5, 5],
    [1, 2, "N"],
    "MMLLMMRLLLLMMLRMLMRLRLMMLMMRMLRLMMRMLMRMMLMRRRMMRMMRLRRMRLLLLMMLRMRRMRMRMRRLMRLLLMRMRLMMRMLLRLMRLRMLRMMLMMRRMRLRRMLLLRRMMRRMRLLMMLLRLRRMMMLLLMRMMLRLMMLMMMLMMMRRRMMLLLRMLMMLLRMRRLMRRRLRMMLMMMLMLLRRLRLLMLMLLRLRLRRLMMLMRMMLL"
  ]
];

const testResults = [
  {},
  //1
  undefined,
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
  { maxX: 5, maxY: 5, roverEndStates: [{ x: -4, y: 5, orientation: "E" }] }
];
describe("Test with own data", () => {
  //1. should not crash with empty data
  it("should not crash with empty data", () => {
    const result = jRover.solveProblem(testData[1]);
    should.not.exist(result);
  });
  //2. should not crash with only limits no rover data
  it("should not crash with only limits no rover data", () => {
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[2]);
    maxX.should.equal(testResults[2].maxX);
    maxY.should.equal(testResults[2].maxY);
    roverEndStates.should.be.instanceof(Array).and.have.lengthOf(0);
  });
  //3. should return rover position with 1 rover
  it("should return rover position with 1 rover", () => {
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[3]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[3].roverEndStates[0].x);
    y.should.equal(testResults[3].roverEndStates[0].y);
    orientation.should.equal(testResults[3].roverEndStates[0].orientation);
  });
  //4. should return correct position with 1 instruction which is rotation
  it("should return correct position with 1 instruction which is rotation", () => {
    const run = 4;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //5. should return correct position with 1 instruction which is translation
  it("should return correct position with 1 instruction which is translation", () => {
    const run = 5;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //6. should return correct position with only 1 type of instruction - rotation
  it("should return correct position with only 1 type of instruction - rotation", () => {
    const run = 6;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //7. should return correct position with only 1 type of instruction - translation
  it("should return correct position with only 1 type of instruction - translation", () => {
    const run = 7;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //8. should return correct position start on rotation
  it("should return correct position start on rotation", () => {
    const run = 8;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //9. should return correct position start on TRANSLATION
  it("should return correct position start on TRANSLATION", () => {
    const run = 9;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //10. should return correct position END on rotation
  it("should return correct position END on rotation", () => {
    const run = 10;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //11. should return correct position END on TRANSLATION
  it("should return correct position END on TRANSLATION", () => {
    const run = 11;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //12. start non north with 4 rotations, no translation
  it("should return correct position start non north with 4 rotations, no translation", () => {
    const run = 12;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //13.Should return correct position when start with mulitple rotations
  it("Should return correct position when start with mulitple rotations", () => {
    const run = 13;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //14.Should return correct position when end with mulitple rotations
  it("Should return correct position when end with mulitple rotations", () => {
    const run = 14;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //15.Should return correct position when no instructions sent
  it("Should return correct position when no instructions sent", () => {
    const run = 15;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //16.Should return correct position when large data set of instructions set #1
  it("Should return correct position when large data set of instructions set #1", () => {
    const run = 16;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
  //17.Should return correct position when large data set of instructions set #2
  it("Should return correct position when large data set of instructions set #2", () => {
    const run = 17;
    const { maxX, maxY, roverEndStates } = jRover.solveProblem(testData[run]);
    const { x, y, orientation } = roverEndStates[0];
    x.should.equal(testResults[run].roverEndStates[0].x);
    y.should.equal(testResults[run].roverEndStates[0].y);
    orientation.should.equal(testResults[run].roverEndStates[0].orientation);
  });
});
