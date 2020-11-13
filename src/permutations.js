export let ComputePermutations4 = (dim) => {
    let deltaVectors = [];
    [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
            [-1, 0, 1].forEach(dz => {
                [-1, 0, 1].forEach(dk => {
                    if (!(dx === 0 && dy === 0 && dz === 0 && dk === 0)) {
                        deltaVectors.push({dx, dy, dz, dk});
                    }
                })
            })
        })
    });
    return deltaVectors;
}

export let ComputePermutations3 = () => {
    let deltaVectors = [];
    [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
            [-1, 0, 1].forEach(dz => {
                if (!(dx === 0 && dy === 0 && dz === 0)) {
                    deltaVectors.push({dx, dy, dz});
                }
            })
        })
    });
    return deltaVectors;
}

export let ComputePermutations2 = () => {
    let deltaVectors = [];
    [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
            if (!(dx === 0 && dy === 0)) {
                deltaVectors.push({dx, dy});
            }
        })
    });
    return deltaVectors;
}
export let ComputeNeighbors = (dim, topology, cord, latticeSize) => {

    let nbhrs = [];

    if (dim == 2) {
        let deltaVectors = ComputePermutations2();
        deltaVectors.forEach(delta => {
            nbhrs.push({
                x:  ApplyTopology(cord.x + delta.dx, topology, latticeSize),
                y:  ApplyTopology(cord.y + delta.dy, topology, latticeSize)
            });
        });
    }

    if (dim == 3) {
        let deltaVectors = ComputePermutations3();
        deltaVectors.forEach(delta => {

            let x = cord.x + delta.dx;
            let y = cord.y + delta.dy;
            let z = cord.z + delta.dz;

            let xx =  ApplyTopology(x, topology, latticeSize);
            let yy =  ApplyTopology(y, topology, latticeSize);
            let zz =  ApplyTopology(z, topology, latticeSize);

            let normalized_cord = {x: xx, y: yy, z: zz}

            nbhrs.push(normalized_cord);
        });
    }

    // if (dim > 3) {
    //     let deltaVectors = module.exports.ComputePermutations3();
    //     deltaVectors.forEach(delta => {
    //         let v = [];
    //         for (let pi = 0; pi < dim; i++) {
    //             v[pi] = module.exports.ApplyTopology(cord[pi] + delta.dx, topology, latticeSize);
    //         }
    //         nbhrs.push(v);
    //     });
    // }

    return nbhrs;
}

export let TOPOLOGY = {
    ELECTRIC_FENCE: 0,
    TORUS: 1,
    SPHERE: 2,
    RP3: 3,
    OPEN: 4
}


export let ApplyTopology = (n, topology, latticeSize) => {

    if (topology === TOPOLOGY.TORUS) {
        // simplify with ? operator
        if (n === -1) {
            return latticeSize - 1;
        }
        if (n === latticeSize) {
            return 0;
        }
        return n;
    }

    throw Error('Not Implemented Yet');

    if (topology === 'projective') {
    }
    if (topology === 'spherical') {
    }
    if (topology === 'fence') {
    }
}
