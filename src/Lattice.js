import Range from "./range";

export class LatticeState {

    constructor(dim,len_x,len_y,len_z) {
        this.map_cell = new Map();
        Range(len_z).forEach(   z => {
            Range(len_y).forEach(y => {
                Range(len_x).forEach(x => {
                    let coord = [x,y,z];
                    let cell = new Cell(x,y,z)
                    this.map_cell[coord] = cell;
                })
            })
        })
    }

    getCell (x, y, z) {
        return this.map_cell.get(`${x}.${y}.${z}`);
    }

    getCellState (x, y, z) {
        return this.map_cell.get(`${x}.${y}.${z}`).state;
    }
    
    addResident (x,y,z,resident) {
        (this.map_cell[[x,y,z]]).resident = resident;
    }
    getResident(x,y,z) {
        return  (this.map_cell[[x,y,z]]);
    }
}