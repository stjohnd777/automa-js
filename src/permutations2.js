module.exports = {
    ComputePermutations4: (dim) => {
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
    },

    ComputePermutations3: () => {
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
    },

    ComputePermutations2: () => {
        let deltaVectors = [];
        [-1, 0, 1].forEach(dx => {
            [-1, 0, 1].forEach(dy => {
                if (!(dx === 0 && dy === 0)) {
                    deltaVectors.push({dx, dy});
                }
            })
        });
        return deltaVectors;
    },

    // TODO : refactor signatures , maybe
    ComputeNeighbors: (dim, topology, cord, latticeSize) => {

        cord = cord.split('.');
        cord = {x: parseInt(cord[0]), y: parseInt(cord[1]), z: parseInt(cord[2])}

        let neighbor_coordinates = [];

        if (dim == 2) {
            let deltaVectors = module.exports.ComputePermutations2();
            deltaVectors.forEach(delta => {
                neighbor_coordinates.push({
                    x: module.exports.ApplyTopology(cord.x + delta.dx, topology, latticeSize),
                    y: module.exports.ApplyTopology(cord.y + delta.dy, topology, latticeSize)
                });
            });
        }

        if (dim == 3) {

            let deltaVectors = module.exports.ComputePermutations3();
            deltaVectors.forEach(delta => {

                let x = cord.x + delta.dx;
                let y = cord.y + delta.dy;
                let z = cord.z + delta.dz;

                let xx = module.exports.ApplyTopology(x, topology, latticeSize);
                let yy = module.exports.ApplyTopology(y, topology, latticeSize);
                let zz = module.exports.ApplyTopology(z, topology, latticeSize);

                let normalized_cord = {x: xx, y: yy, z: zz}

                neighbor_coordinates.push(normalized_cord);
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

        return neighbor_coordinates;
    },

    TOPOLOGY: {
        ELECTRIC_FENCE: 0,
        TORUS: 1,
        SPHERE: 2,
        RP3: 3,
        OPEN: 4
    },


    ApplyTopology: (n, topology, latticeSize) => {
        if (topology === module.exports.TOPOLOGY.TORUS) {
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

}
