const should = require("should");
jRover = require("../rover");
jRoverTest = require("./test-data");

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
      .property("originalInstructions")
      .and.containDeepOrdered(input[2].split(""));
  });
  it("Should return correct prepared input data for rover 2", () => {
    const { maxX, maxY, roverData } = jRover.prepData(input);
    roverData[1].should.have.property("x").and.equal(input[3][0]);
    roverData[1].should.have.property("y").and.equal(input[3][1]);
    roverData[1].should.have
      .property("originalInstructions")
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

describe("Test with own data", () => {
  //1. should not crash with empty data
  it("should not crash with empty data", () => {
    const result = jRover.solveProblem([]);
    should.not.exist(result);
  });

  // execute tests in file
  jRoverTest.data.forEach((data, index) => {
    it(jRoverTest.titles[index], () => {
      const { maxX, maxY, roverEndStates } = jRover.solveProblem(data);

      maxX.should.equal(jRoverTest.results[index].maxX);
      maxY.should.equal(jRoverTest.results[index].maxY);

      jRoverTest.results[index].roverEndStates.forEach(
        (expectedEndState, esIndex) => {
          const {
            x,
            y,
            orientation,
            maxX,
            minX,
            maxY,
            minY,
            path
          } = roverEndStates[esIndex];
          x.should.equal(expectedEndState.x);
          y.should.equal(expectedEndState.y);
          orientation.should.equal(expectedEndState.orientation);
          path[path.length - 1].x.should.equal(expectedEndState.x);
          path[path.length - 1].y.should.equal(expectedEndState.y);
          path[path.length - 1].orientation.should.equal(
            expectedEndState.orientation
          );
        }
      );
    });
  });
});
