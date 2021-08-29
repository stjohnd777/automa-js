import {APP} from './App.js';
import {TOPOLOGY} from './permutations.js'
import utils from './Fullscreen.js'
import {openNav,closeNav,toggleRightMenu,GetStepDelay,manageRules} from './UI/SideNav'
// import * as dat from "dat.gui";


$('#toggleFullScene').click(utils.toggleFullScreen);

let gridDim = 3;//2;
let gridSizeX = 10;
let gridSizeY = 10;
let gridSizeZ = 10; // 1

import * as dat from 'dat.gui';

function main() {

    //APP.font = await APP.loadFont();
    APP.InitOrbitControl('container');

    APP.createLattice("Conway 3", TOPOLOGY.TORUS, gridDim, gridSizeX, gridSizeY, gridSizeZ);

    APP.SetCameraPosition(gridSizeX / 2, gridSizeY / 2, 15);

    //APP.world.seedZLine(3,3);
    APP.Render();

    window.APP = APP;

    // const gui = new dat.GUI();
    // window.dat = dat
}

main();
