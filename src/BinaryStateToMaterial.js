import * as THREE from "./three.module";
import {APP} from "./App";

export function BinaryStateToMaterial(cellState) {

    let color = undefined;
    if (cellState === true) {
        color = new THREE.Color(APP.cellOnColor);//'#117a65')
        var m = new THREE.MeshBasicMaterial({color: color});
        m.transparent = true;
        m.opacity = APP.cellOpacityOn;
    } else {
        color = new THREE.Color(APP.cellOffColor);//'#FF0000')
        var m = new THREE.MeshBasicMaterial({color: color});
        m.transparent = true;
        m.opacity = APP.cellOpacityOff;
    }
    return m;
};