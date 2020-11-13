

import {ComputeNeighbors, TOPOLOGY} from './src/permutations.js'



let dim = 3;
let len = 12;

function coordinate3 (x,y,z) {
    return {
        x:x,y:y,z:z
    }
}



test('ComputeNeighbors dim 3 len 12 topology T2', () => {
    let dim = 3;
    let len = 10;

    let coord = {x:0,y:0,z:0}
    // let perms= PERMS.ComputePermutations3();
    // console.log(perms);

    let neighbors = ComputeNeighbors(3, TOPOLOGY.TORUS, coord, 10);
    console.log(neighbors);

    coord = {x:5,y:5,z:5}
    neighbors = ComputeNeighbors(3, TOPOLOGY.TORUS, coord, 10);
    console.log(neighbors);

    coord = {x:5,y:5,z:0}
    neighbors = ComputeNeighbors(3, TOPOLOGY.TORUS, coord, 10);
    console.log(neighbors);

    coord = {x:9,y:9,z:9}
    neighbors = ComputeNeighbors(3, TOPOLOGY.TORUS, coord, 10);
    console.log(neighbors);

    // c = PERMS.ComputePermutations3(5,5,0);
    // console.log(c);
    // let neighbors = ComputeNeighbors(dim, TOPOLOGY.TORUS, c, len);
    // console.log(neighbors);
    //
    //
    //
    // c = PERMS>ComputePermutations3(11,7,7);
    // console.log(c);

    // neighbors = ComputeNeighbors(dim, TOPOLOGY.TORUS, coordinate, len);
    // console.log(neighbors);

});