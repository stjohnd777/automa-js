/**
 * set the texture on a cell
 */
import * as THREE from './three.module.js';
import Range from './range.js';
import KeyboardControls from './KeyboardControl.js';
import DUCKED_THREE from './OrbitControls';
import { ComputeNeighbors} from './permutations.js'
import { GetNextState_ConwayBinaryRule as RuleSpace } from './ConwayRules.js'
import  {RandomBinaryRule } from './RandomBinaryRule'
import {BinaryStateToMaterial } from './BinaryStateToMaterial'
import * as dat from 'dat.gui';



export const APP = {

    font : undefined,

    loadFont :async function () {
        const loader = new THREE.FontLoader();
        return new Promise((resolve,reject)=>{
            loader.load('../public/fonts/helvetiker_regular.typeface.json', function (font) {
                resolve(font);
            });
        });
    }
    ,
    /**
     *  step one is to create a scene
     */
    scene: new THREE.Scene()
    ,
    projector: undefined
    ,
    /**
     * step two is set up a camera
     */
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    ,
    /**
     * step three create a renderer
     */
    renderer: new THREE.WebGLRenderer(),
    /**
     * Show x-y-z Axis
     */
    showAxis: true,
    /**
     * Show floor plane xy as gr
     */
    showPlane: true,
    /**
     * Show openGL wire frames
     */
    showWire: false,
    /**
     * Show cell edges
     */
    showCubeEdges: true,
    /**
     * Show info text on cells
     */
    showText: false,

    cellOnColor : '#117a65',
    cellOpacityOn: .9,

    showOffCell : true,
    cellOffColor : '#FF0000',
    cellOpacityOff: .25,

    isShowLabels : false,
    /**
     * The inner cell size, ot the inhabitant
     */
    cellSize: .5,
    /**
     * The outer cell or wire frame cell size
     */
    cellOutlineSize: .95,
    /**
     * recompute geometry
     */
    isGeometryDirty: true,
    /**
     * Select state active
     */
    isProjectorSelection: false,
    /**
     * delay between rendering scenes
     */
    delayStep: 1000,

    backgroundColor : "#85929E",

    SetCameraPosition: (x, y, z) => {
        APP.camera.position.x = x;
        APP.camera.position.y = y;
        APP.camera.position.z = z;
    }
    ,
    InitOrbitControl: (container = 'container', width = window.innerWidth, height = window.innerHeight) => {

        APP.renderer.setSize(width, height);

        //document.body.appendChild(APP.renderer.domElement);
        $('#' + container).append(APP.renderer.domElement);

        /**
         * Custom Key listener
         */
        APP.keysListener = new KeyboardControls(APP.camera);

        document.body.addEventListener('keyup', function (e) {
            APP.keysListener.onKeyUp(e);
        }, true);


        document.body.addEventListener('keydown', function (e) {
            APP.keysListener.onKeyDown(e);
        }, true);


        /**
         * Ray trace projector functionality tied to mouse click event
         * for geometry (cell) selection
         */
        //APP.projector = new THREE.Projector();

        document.body.addEventListener('mousedown', function (event) {

            if (APP.isProjectorSelection) {

                /**
                 *  creates a new Vector3 instance with the mouse's coordinates
                 *  on the screen relative to the center of the canvas as a percent
                 *  of the canvas width.
                 */
                // var ratio = width / height;// APP.renderer.devicePixelRatio;
                // // ratio * (event.pageX - this.offsetLeft) / this.width * 2 - 1;
                // var x = event.pageX * ratio / (2 * width) - 1;
                //
                // //-ratio * (event.pageY - this.offsetTop) / this.height * 2 + 1;
                // var y = -event.pageY * ratio / (2 * height) + 1;
                // var z = 0;
                // var vector = new THREE.Vector3(x, y, 0);
                //
                // alert("(" + x + "," + y + "," + z + ")" + "cellslength " + APP.cells.length);
                //
                // /**
                //  *  That vector is then un-projected (from 2D into 3D space) relative
                //  *  to the camera.
                //  */
                // APP.projector = projector.unprojectVector(vector, APP.camera);
                // var unitVectorInDirectionCamera = vector.sub(APP.camera.position).normalize();
                // var raycaster = new THREE.Raycaster(
                //     APP.camera.position,
                //     unitVectorInDirectionCamera);
                //
                // var intersects = raycaster.intersectObjects(APP.cells);
                // if (intersects.length) {
                //     alert("hit");// describes the clicked object
                // }
            }
        }, true);

        // Add OrbitControls so that we can pan around with the mouse.
        APP.controls = new THREE.OrbitControls(APP.camera, APP.renderer.domElement);

        // Create an event listener that resizes the renderer with the browser window.
        window.addEventListener('resize', function () {
            let WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
            APP.renderer.setSize(WIDTH, HEIGHT);
            APP.camera.aspect = WIDTH / HEIGHT;
            APP.camera.updateProjectionMatrix();
        });

        APP.camera.position.z = 15;
    }
    // ,
    // getCellAt: (x, y, z) => {
    //     return APP.World.CellMap.get(`${x}.${y}.${z}`);
    // }
    // ,
    // setTextureForCellAt: (x, y, z, material) => {
    //     let cell = APP.getCellAt(x,y,z);
    //     cell.material = material;
    // }
    ,
    World: {

        name: undefined,
        topology: undefined,
        dim: undefined,
        gridSizeX: undefined,
        gridSizeY: undefined,
        gridSizeZ: undefined,

        CellMap: new Map(),

        // ,
        // getCellAt: (x, y, z) => {
        //     return APP.World.CellMap.get(`${x}.${y}.${z}`);
        // }
        //,
        setTextureForCellAt: (x, y, z, material) => {
            let cell = APP.getCellAt(x,y,z);
            cell.material = material;
        }
        ,
        getCell: (x, y, z) => {
            return APP.World.CellMap.get(`${x}.${y}.${z}`);

        }
        ,
        getCellState: (x, y, z) => {
            return APP.World.CellMap.get(`${x}.${y}.${z}`).state;
        }
        ,
        setCellState: (x, y, z, state, render = true) => {
            APP.World.CellMap.get(`${x}.${y}.${z}`).state = state;
            if ( render ) APP.Render();
        }
        ,
        getCellNeighbors: (x, y, z) => {
            return APP.World.CellMap.get(`${x}.${y}.${z}`).neighbors;
        }
        ,
        renderCell : (x,y,z,c,opacity)=> {
            let  material = new THREE.MeshBasicMaterial({color: c,transparent : true, opacity : opacity});
            let cell = APP.World.getCell(x, y, z);
            cell.material = material;
            cell.materialOverrideAlways = true;
        }
        ,
        getResident : (x,y,z) =>{
            APP.World.getCell(x,y,z).resident;
        }
        ,
        seedZLine: (x = 0, y = 0) => {
            for (let index = 0; index < this.gridSizeZ; index++) {
                let cell = this.getCell(x, y, index);
                cell.state = true;
                let m = BinaryStateToMaterial(true);
                cell.material = m;
            }
        }
        ,
        seedYLine: (x = 0, z = 0) => {
            for (let index = 0; index < this.gridSizeZ; index++) {
                let cell = this.getCell(x, index, z);
                cell.state = true;
                let m = BinaryStateToMaterial(true);
                cell.material = m;
            }
        }
        ,
        seedXLine: (y = 0, z = 0) => {
            for (let index = 0; index < this.gridSizeZ; index++) {
                let cell = this.getCell(index, y, z);
                cell.state = true;
                let m = BinaryStateToMaterial(true);
                cell.material = m;
            }
        }
    }
    ,
    /**
     * Create the geometry for the lattice of the automa
     */
    createLattice:  async (name, topology, dim, gridSizeX, gridSizeY, gridSizeZ) => {

        let len = Math.max(gridSizeX, gridSizeY, gridSizeZ);

        APP.World.topology = topology;
        APP.World.dim = dim;
        APP.World.gridSizeX = gridSizeX;
        APP.World.gridSizeY = gridSizeY;
        APP.World.gridSizeZ = gridSizeZ;

        if ( APP.isShowLabels) {
            try {
                APP.font = await APP.loadFont();
                const geometryText = new THREE.TextGeometry('TEST', {
                    font: APP.font,
                    size: 80,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                });
                APP.scene.push(geometryText);
            } catch (e) {
                console.log('failed to load fonts');
            }
        }


        // examine the loops for a for each, maybe range
        Range(gridSizeZ).forEach(   z =>  {
            Range(gridSizeY).forEach(   y =>  {
                Range(gridSizeX).forEach(   x =>  {

                    let coordinate = `${x}.${y}.${z}`;

                    let state = GetInitialCellState(x,y,z);

                    let cubeSpace = CreateCube(x, y, z, ComputeCellMaterialFromState(state) );

                    let neighbors = ComputeNeighbors(dim, topology, coordinate, len);

                    let residentEntity = undefined;
                    if (HasInitialEntityAt(x,y,z)) {
                        residentEntity = CreateEntity(x, y, z);
                        let entityState = true;
                        APP.World.entity.push(residentEntity);
                        residentEntity = Object.assign(residentEntity, {
                            name: 'r.'+coordinate,
                            coordinate: coordinate,
                            state: entityState,
                        })
                        cubeSpace.add(residentEntity);
                    }


                    cubeSpace = Object.assign(cubeSpace,{
                        name: 's.'+coordinate,
                        coordinate: coordinate,
                        residents: residentEntity,
                        state: state,
                        world: APP.World,
                        neighbors: neighbors,
                        materialOverrideAlways : false,
                        materialOverrideOnce :false
                    })

                    if ( APP.isShowLabels) {
                        const geometryText = new THREE.TextGeometry(`(${x},${y},${z})`, {
                            font: APP.font,
                            size: 12,
                            height: 5,
                            curveSegments: 12,
                            bevelEnabled: true,
                            bevelThickness: 10,
                            bevelSize: 8,
                            bevelOffset: 0,
                            bevelSegments: 5
                        });
                        geometryText.translateX(x);
                        geometryText.translateY(y);
                        geometryText.translateZ(z);
                        cubeSpace.add(geometryText);
                    }

                    APP.World.CellMap.set (coordinate , cubeSpace);

                    APP.scene.add(cubeSpace);

                    // if (APP.showWire === true) {
                    //     let geometryLines = new THREE.BoxGeometry(APP.cellOutlineSize, APP.cellOutlineSize, APP.cellOutlineSize);
                    //     let materialLines = new THREE.MeshBasicMaterial({wireframe: true,color: '#000000'});
                    //     materialLines.transparent = true;
                    //     materialLines.opacity = .1;
                    //
                    //     let meshLines = new THREE.Mesh(geometryLines, materialLines);
                    //     meshLines.translateX(x);
                    //     meshLines.translateY(y);
                    //     meshLines.translateZ(z);
                    //     APP.scene.add(meshLines);
                    // }
                })
            })
        });

        /**
         * Shows (x,y,z) axis lines
         */
        if (APP.showAxis === true) {
            APP.scene.add(new THREE.AxisHelper(20));
        }

        /**
         * Shows xy plane as gird
         */
        if (APP.showPlane === true) {
            let size = 100;
            let divisions = 100;
            let gridHelper = new THREE.GridHelper(size, divisions);
            APP.scene.add(gridHelper);
        }
    }
    ,
    /**
     * This function manages the animation, notice that this is a recursive
     * function.
     *
     */
    Render: () => {

        requestAnimationFrame(APP.Render);

        // APP.world.cells.forEach( cell=>{
        //    cell.rotation.x += .01;
        //    cell.rotation.y += .01;
        // }) ;

        // background color
        APP.renderer.setClearColor(APP.backgroundColor);

        APP.World.CellMap.forEach((cell,coordinate) => {

            if (APP.showOffCell === false){
                cell.material.opacity = 0;
                return;
            }
            if ( cell.materialOverrideOnce) {
                cell.materialOverrideOnce = false;
                return ;
            }
            if ( cell.materialOverrideAlways) {
                return ;
            }
            cell.material = ComputeCellMaterialFromState(cell.state);

            if ( cell.resident ) {
                cell.material = ComputeResidentMaterialFromState(cell.resident.state);
            }

        });

        // THREE render
        APP.renderer.render(APP.scene, APP.camera);

        // react to input
        APP.keysListener.update();
    }
    ,
    /**
     * Clear the Geometry
     */
    clearGeometry: () => {
        APP.World.CellMap.forEach((cell,coordinate) => cell.dispose());
        APP.World.CellMap = new Map();

    }
    ,

    Next: () => {
        WorldStepForward((err, next) => {
            // do some visual and sound
        });
    }
    ,
    intervalID : undefined
    ,
    /*
     * Set the evolution in motion, a new generation every
     * interval ns
     *
     */
    Start: (interval_ms_step_world = 1000) => {
        /*
         * The world progression  is done with a
         * interval timer, consider a call back
         */
        AutomaScheduler(interval_ms_step_world);
    }
    ,
    Stop: ( ) =>{
        clearInterval(APP.intervalID);
    }
    ,
    Reset : ()=>{

    }
};


export let GetInitialCellState = (x,y,z) => {
    let state = false;
    if (x == 2 && y ===2) { // z-line
        state = true;
    }
    return state;
}
export let HasInitialEntityAt = (x,y,z)=>{
    return false;
}

async function load_text() {
    const loader = new THREE.FontLoader();
    return new Promise((resolve,reject)=>{
        loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
            resolve(font);
        });
    });
}


/**
 * Create a BoxGeometry
 * Creates a simple Material
 * Create Mesh from the Geom and Material
 * Set the position
 *
 * return Mesh
 * @param x
 * @param y
 * @param z
 * @returns {THREE.Mesh}
 */
export let CreateCube = (x, y, z, material) => {
    // the create a cube
    // geometry + material => mesh = cube
    let geometry = new THREE.BoxGeometry(APP.cellSize, APP.cellSize, APP.cellSize);

    let cube = new THREE.Mesh(geometry, material);
    cube.translateX(x);
    cube.translateY(y);
    cube.translateZ(z);

    if ( APP.showCubeEdges) {
        createCubeOutLine(x - APP.cellSize / 2, y - APP.cellSize / 2, z - APP.cellSize / 2);
    }

    return cube;
}
export let createCubeOutLine = (x, y, z) => {

    let scene = APP.scene;
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    let d = APP.cellSize;


    const points0 = [];
    points0.push( new THREE.Vector3(  x, y, z ) );
    points0.push( new THREE.Vector3( x+d, y, z ) );
    points0.push( new THREE.Vector3( x+d, y+d, z ) );
    points0.push( new THREE.Vector3( x, y+d, z ) );
    points0.push( new THREE.Vector3(  x, y, z ) );
    const geometry0 = new THREE.BufferGeometry().setFromPoints( points0 );
    const line0 = new THREE.Line( geometry0, material );
    scene.add( line0 );

    const points1 = [];
    points1.push( new THREE.Vector3(  x, y, z+d ) );
    points1.push( new THREE.Vector3( x+d, y, z+d ) );
    points1.push( new THREE.Vector3( x+d, y+d, z+d ) );
    points1.push( new THREE.Vector3( x, y+d, z+d ) );
    points1.push( new THREE.Vector3(  x, y, z+d ) );
    const geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
    const line1 = new THREE.Line( geometry1, material );
    scene.add( line1 );

    const points2 = [];
    points2.push( new THREE.Vector3( x, y, z ) );
    points2.push( new THREE.Vector3( x, y, z+d ) );
    const geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
    const line2 = new THREE.Line( geometry2, material );
    scene.add( line2 );

    const points3 = [];
    points3.push( new THREE.Vector3( x+d, y, z ) );
    points3.push( new THREE.Vector3( x+d, y, z+d ) );
    const geometry3 = new THREE.BufferGeometry().setFromPoints( points3 );
    const line3 = new THREE.Line( geometry3, material );
    scene.add( line3 );

    const points4 = [];
    points4.push( new THREE.Vector3( x, y+d, z ) );
    points4.push( new THREE.Vector3( x, y+d, z+d ) );
    const geometry4 = new THREE.BufferGeometry().setFromPoints( points4 );
    const line4 = new THREE.Line( geometry4, material );
    scene.add( line4 );

    const points5 = [];
    points5.push( new THREE.Vector3( x+d, y+d, z ) );
    points5.push( new THREE.Vector3( x+d, y+d, z+d ) );
    const geometry5 = new THREE.BufferGeometry().setFromPoints( points5 );
    const line5 = new THREE.Line( geometry5, material );
    scene.add( line5 );


    //Note that lines are drawn between each consecutive pair of vertices, but not between the first and last (the line is not closed.)

    //Now that we have points for two lines and a material, we can put them together to form a line.
    // const line = new THREE.Line( geometry, material );
    // All that's left is to add it to the scene and call render.
    //
    // scene.add( line );

}

/**
 * the entity living in the cell
 *
 * @param cube
 * @param entityState
 * @returns {{state: {}, home: *}}
 */
export let CreateEntity = (x, y, z, entityState = {}) => {
    let geometry = new THREE.SphereGeometry(  .25, 32, 32 );
    let color = new THREE.Color('#7a66ff');
    let m = new THREE.MeshBasicMaterial({color: color});
    // m.transparent = true;
    // m.opacity = .8;
    let c = new THREE.Mesh(geometry, m);
    return c;
};



export let ComputeCellMaterialFromState = (atate) => {
    //TODO : look up state implementation of
    // switch on state enum
    let material =  BinaryStateToMaterial(atate);
    material.wireframe = APP.showWire;
    return material;
};

export let ComputeResidentMaterialFromState = (state) => {
    //TODO : look up state implementation of
    // switch on state enum
    let material =  BinaryStateToMaterial(state);
    material.wireframe = APP.showWire;
    return material;
};

export let ComputeNextCellState = (cube) => {

    return RuleSpace(cube);
    //return GetNextState_ConwayBinaryRule(cube);
    //return RandomBinaryRule(cube);
};

export let ComputeNextEntityState = (cube) => {
    return RuleSpace(cube);

};

let ToString = (o) =>{
    return JSON.stringify(0,' ', 2);
}
export let WorldStepForward = (callback) => {

    APP.World.CellMap.forEach((cell,key)=>{
        cell.next_state = ComputeNextCellState(cell);
        if (cell.resident) {
            cell.resident.next_state = ComputeNextEntityState(cell.resident);
            // TODO : Handle resident migration
        }
    })

    APP.World.CellMap.forEach((cell,key)=>{
        cell.state = cell.next_state;
        if (cell.resident) {
            cell.resident.state = cell.resident.next_state
            // TODO : Handle resident migration
        }
    })

    if (callback) {
        callback(undefined, true);
    }
};


export let AutomaScheduler = (interval = 1000) => {
     APP.intervalID = setInterval(function () {
        if (APP.isGeometryDirty == true) {
            WorldStepForward();
        }
    }, interval);
};


