import {APP} from './App.js';
import {TOPOLOGY} from './permutations.js'
import utils from './Fullscreen.js'


$('#toggleFullScene').click(utils.toggleFullScreen);

let gridDim = 3;//2;
let gridSizeX = 10;
let gridSizeY = 10;
let gridSizeZ = 10; // 1

function main() {

    // APP.gridSizeX = gridSizeX;
    // APP.gridSizeY = gridSizeY;
    // APP.gridSizeZ = gridSizeZ;

    //APP.font = await APP.loadFont();
    APP.InitOrbitControl('container');
    APP.createLattice("Conway 3", TOPOLOGY.TORUS, gridDim, gridSizeX, gridSizeY, gridSizeZ);
    APP.SetCameraPosition(gridSizeX / 2, gridSizeY / 2, 15);


    //APP.world.seedZLine(3,3);
    APP.Render();
    // APP.Start( 500);
    window.APP = APP;
}

main();
