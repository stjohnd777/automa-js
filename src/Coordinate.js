
/**
 * Coordinate, that can be any dimension since the arguments is
 * used, but can take the defautl x,y,z in most cases for sanity
 * on the cleints side
 */
export default function Coordinate(x, y, z) {

    var coordinates = arguments;

    this.getX = function() {
        return coordinates[0];
    };
    this.getY = function() {
        return coordinates[1];
    };
    this.getZ = function() {
        return coordinates[2];
    };

    this.getCoordinate = function(i) {
        var copy = coordinates.slice();
        return copy[i];
    }
}

Coordinate.prototype = {
    constructor : Coordinate,

    magnitude : function() {
        var magnitudeSqared = this.coordinate.x * this.coordinate.x;
        magnitudeSqared    += this.coordinate.y * this.coordinate.y;
        magnitudeSqared    += this.coordinate.z * this.coordinate.z;
        return Math.sqrt( magnitudeSqared);
    },

    getNeighboringCoordinates : function() {
        var coodinates = [];


        return coordinates;
    }
}

Coordinate.prototype.getNeighboringCoordinates = function() {
    var coodinates = [];
    return coordinates;
}
Coordinate.prototype.constructor = Coordinate;
