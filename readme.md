# Mars Rover

# Solution Approach

## 1.Tracking State

The rover has 2 states we wish to track

- Position

- Orientation

Since there is no condition that the instruction queue must end on an "M" instruction, we could have the situation where the last instruction is "R" or "L".

We therefore have to track each property independently.

## 2. Final orientation algorithm

To determine the final orientation we need to simply track the net orientation change e.g. if we accumulate rotations with, for example "R" as +1 (meaning that "L" would be -1 since the net of "R" and "L" instruction is no net rotation) and the net rotation from the start would be the accumulated value of the rotations. We can then deduce the final orientation as being the initial orientation adjusted by the net rotations. This is independant of any translations ("M" instructions)

## 3. Final position algorithm

If we assume a standard cartesian coordinate system North would be the direction of the increasing y axis, and East the increasing x-axis

So facing North, a single "M" instruction increases y coordinate by 1 and x is unchanged. If we represent the initial position by the 2x1 matrix

`[[x0],[y0]]`

then, **when facing North**, processing the "M" instruction is equivalent to adding the 2 x 1 matrix

`[[0],[1]]`

resulting in the new location being

`[[x0],[y0+1]]`

The final position is dependent on the start position and the instructions being processed in the sequence that they are provided. So the processing algorithm must step though each instruction strictly in the order it is provdied.

We represent a single step when oriented North as the addition of the "M" 2 x 1 matrix `[[0],[1]]` to the current position (represented by the 2 x 1 matrix `[[xt],[yt]]`).

We adjust the "M" matrix for the orientation by applying the 2 x 2 rotational transformation matrix: A 90 degree clockwise rotational transformation (an "R" instruction) is represented by the matrix `[[0, 1], [-1, 0]]`

So a 1 unit step East is `[[0, 1], [-1, 0]] x [[0],[1]]` = `[[1],[0]]`, i.e. x coordinate increases by 1 and y remains unchanged which is correct.

The "L" instruction - A 90 degree anti-clockwise rotational transformation - is represented by `[[0, -1], [1, 0]]`

Rotational transformations are [additive] and so if we hit a sequence of rotations we can multiply these together and arrive at the correct net transformation to apply to the subsequent "M" instruction

So the logic of the process is is to process all instructions in the order that they are presented: We accumulate rotations ("R" and "L" instructions, could be any number >= 0) until an "M" instruction is reached (translation).

Our initial M vector is translation-1-unit-North vector `[[1],[0]]` which we pre-multiply the by the accumulated rotations (if any) and then add the result to the previous position.

This result is our new M translation-1-unit vector and when the next "M" instruction is reached it is this value that is pre-multiplied by the accumulated rotations before applying the adjustment.

## 4. Implementation

### Data Preparation

The first line of data gives the maximum extent of the plateau which simply needs to parsed

We are then presented with rover movement data comprising starting coordinates, an orientation and then a sequence of rotations and translations.

The starting orientation can transformed to be represented by rotations relative to the base orientation (North)

So an orientation of:

- East can be represented as North with 1 Right rotation applied
- South as North with 2 Right rotations applied
- West as North with either 1 Left or 3 Right rotations applied

The movement data of each rover is a queue of instructions (`[R | L | M ]`).

We can write an eqivalent representation of each rover's databy by PRE-pending its starting orientation represented by North with orienting rotations

so Example 1

- `{x:1, y:2, orientation: N, movement: L-M-L-M-L-M-L-M-M}` is unchanged

and Example 2

- `{x:3, y:3, orientation: E, movement: M-M-R-M-M-R-M-R-R-M}` is transformed to

- `{x:3, y:3, orientation: N, movement: R-M-M-R-M-M-R-M-R-R-M}`

Performing this pre-processing on the input data the means that subsequent processing logic is simplified and generic.

### Logic

- Initialise position to starting coordinates

- pre-pend rotations so that initial orientation represented by North plus rotations required to be equivalent to initial orientation (see above)

- Initialse orientation to North

- Initialise whole-run orientation accumulator

Process each instruction. At each iteration

- If instruction is "M" (a translation)

  - apply any accumulated rotations since last translation to current "M" adjustment and add to resulting step to previous postion

  - reset since-last-translation accumulator

  - save newly adjusted "M" vector for next step

- If instruction is a rotation

  - Apply rotation to since-last-translation rotation accumulator

  - Apply rotation to since-inception rotation accumulator

## 5. Program notes

Code is implemented as a module for node or windows: It reponds to its use pattern and creates either `window.jRover` global when included in an HTML document or exports `jRover` from the module ()used in node or test environment.

All methods and properties exposed for testing: In a live release would only need to expose `runProblem` method

Tests are specified using `mocha` with `should` assertion library

Test cases all exist in `test/rover.test.js`

Non-trivial business case tests are:

These tests are in the mocha test file but also implemented in the index.html file supplied so they can be viewed easily [here on codepen](https://codepen.io/johnalupton/pen/oNXMMGM) without having to npm install the app and run mocha

Test with own data

- Should not crash with empty data

- Should not crash with only limits no rover data

- Should return rover position with 1 rover

- Should return correct position with 1 instruction which is rotation

- Should return correct position with 1 instruction which is translation

- Should return correct position with only 1 type of instruction - rotation

- Should return correct position with only 1 type of instruction - translation

- Should return correct position start on rotation

- Should return correct position start on TRANSLATION

- Should return correct position END on rotation

- Should return correct position END on TRANSLATION

- Should return correct position start non north with 4 rotations, no translation
- Should return correct position when start with mulitple rotations
- Should return correct position when end with mulitple rotations
- Should return correct position when no instructions sent

- Should return correct position when large data set of instructions set #1

- Should return correct position when large data set of instructions set #2

Have fun!

:clown_face:

John
