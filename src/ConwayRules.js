
// This is really Compute Next State
import {APP} from "./App";

export let GetNextState_ConwayBinaryRule = (cell) => {

    // conway can be seen as
    // as inert space, not state => no rules
    // as entities with binary state {0,1}
    // entity can not relocate to new cell
    // entity state is determined by entity nbhr states
    // state transition  0|-> 1 when | LivingNBBR =3  1|->0  LivingNBBR not 2 or 3
    let state = false;
    // a living cell with one neighbor dies
    // a living cell with 2 or 3 neighbors lives on
    // a living call with 4 or more neighbors dies
    // a dead cell with exactly three become alive

    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    let living_neighbors = 0;

    cell.neighbors.forEach(aNeighborCoordinate => {
        let cell = APP.World.getCell(aNeighborCoordinate.x, aNeighborCoordinate.y, aNeighborCoordinate.z);
        if (cell.state === true) {
            living_neighbors++;
        }
    });

    state = cell.state ?  (living_neighbors === 2 || living_neighbors === 3) : (living_neighbors === 3);

    return state;
};

