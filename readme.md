# Mars Rover

## Solution Approach

1. Data Preparation
   The first line of data gives the maximum extent of the plateau whic simply needs to parsed

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

2.

Have Fun! :clown_face:

John
