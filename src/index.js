import {APP} from './App.js';
import {TOPOLOGY} from './permutations.js'
import utils from './Fullscreen.js'


$('#toggleFullScene').click(utils.toggleFullScreen);

let gridDim = 3;//2;
let gridSizeX = 7;
let gridSizeY = 7;
let gridSizeZ = 7; // 1

function main() {

    //APP.font = await APP.loadFont();
    APP.initOrbitControl('container');
    APP.createLattice("Conway 3", TOPOLOGY.TORUS, gridDim, gridSizeX, gridSizeY, gridSizeZ);
    APP.SetCameraPosition(gridSizeX / 2, gridSizeY / 2, 15);
    //APP.world.seedZLine(3,3);
    APP.Render();
    // APP.Start( 500);
    window.APP = APP;
}

main();
