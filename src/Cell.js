
export  class Cell  {

    constructor(x,y,z,state,resident = undefined) {
        this.coords = [];
        this. state = state;
        this.resident = resident
    }

    getNeighborCells () {
        let cells = [];
        return cells;
    }

   getNeighborResident () {
        let cells = [];
        return cells;
    }

    getResident() {
        return this.resident;
    }

    setResident(resident){
        this.resident = resident;
    }
}