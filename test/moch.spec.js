
const p = require ('../src/permutations2')
let ComputeNeighbors = p.ComputeNeighbors;
let TOPOLOGY = p.TOPOLOGY

// import { ComputeNeighbors , TOPOLOGY} from '../src/permutations'


const    assert = require('assert'),
    expect = require('chai').expect,
    should = require('chai').should();

describe ('Fuck You', ()=>{

    it('better run',()=>{

        let dim = 3;
        let len = 10;

        let coord = '0.0.0';
        // let perms= PERMS.ComputePermutations3();
        // console.log(perms);

        let neighbors =  ComputeNeighbors(3, TOPOLOGY.TORUS, coord, 10);
        console.log(neighbors);

        // coord = '5.5.5'
        // neighbors = ComputeNeighbors(3, TOPOLOGY.TORUS, coord, 10);
        // console.log(neighbors);
        //
        // coord = '5.5.0'
        // neighbors = ComputeNeighbors(3, TOPOLOGY.TORUS, coord, 10);
        // console.log(neighbors);
        //
        // coord = '9.9.9'
        // neighbors = ComputeNeighbors(3, TOPOLOGY.TORUS, coord, 10);
        // console.log(neighbors);

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

    })
})