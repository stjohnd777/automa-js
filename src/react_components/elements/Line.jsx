import React, { useState, useEffect  } from 'react';

import * as THREE from "three";

//import * as THREE from "../../three.module";

// function Point(props) {
//     // Declare a new state variable, which we'll call "count"
//
//     const [pointColor, setPointColor] = useState( '0x0000ff');
//
//     // Similar to componentDidMount and componentDidUpdate:
//     useEffect(() => {
//         // Update the document title using the browser API
//         document.title = `You clicked ${count} times`;
//     });
//
//
//     let scene = props.scene;
//     let a = props.pointA;
//     let b = props.pointB;
//
//
//     const points = [];
//     points.push( new THREE.Vector3(  a.x, a.y, a.z ) );
//     points.push( new THREE.Vector3( b.x, b.y, b.z ) );
//
//     const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
//     const geometry = new THREE.BufferGeometry().setFromPoints( points );
//     const line = new THREE.Line( geometry, material );
//     scene.add( line );
//
//
//
//     return (
//         <div ax={a.c} ay={a.y} az={a.z} bx={b.c} by={b.y} cz={b.z}/>
//     );
// }


// class App extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.scene = props.scene;
//         this.a = props.a;
//         this.b = props.b;
//         this.state = {color: '#FF0000'};
//     }
//
//     componentDidMount() {
//
//     }
//
//     render (){
//         return <div/>
//     }
// }

class Line2 extends React.Component {

    constructor(props) {
        super(props);
        this.scene = props.scene;
        this.a = props.a;
        this.b = props.b;
        this.state = {color: '#FF0000'};
    }

    componentDidMount() {
        const points = [ new THREE.Vector3(  this.a.x, this.a.y, this.a.z ), new THREE.Vector3( this.b.x, this.b.y, this.b.z )  ];
        const material = new THREE.LineBasicMaterial( { this.state.color } );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        this.scene.add( line );
    }


    componentWillUnmount() {

    }

    render() {
        return ( <div ax={this.a.x} ay={this.a.y} az={this.a.z} bx={this.b.c} by={this.b.y} cz={this.b.z}/> );
    }
}

function Line (props){

    [lineColor, setLineColor] = useState('#FF0000');

    useEffect(() => {
        const points = [ new THREE.Vector3(  props.a.x, props.a.y, props.a.z ), new THREE.Vector3( props.b.x, props.b.y, props.b.z )  ];
        const material = new THREE.LineBasicMaterial( {lineColor} );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        props.scene.add( line );

    });

    return ( <div ax={props.a.x} ay={props.a.y} az={props.a.z} bx={props.b.c} by={props.b.y} cz={props.b.z}/> );
}

// let app =
// {
//     scene : new THREE.Scene(),
//     camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
//     renderer: new THREE.WebGLRenderer(),
//
// }

// ReactDOM.render(
//     <App scene={app.scene}/>,
//     document.getElementById('root')
// );


// <app>
//     <lattice >
//        for(x){
//           for (y) {
//               for (y) {
//                 <simplex coord=[x,y,x] state=getInitialStateSpacee()>
//                     <entity state=getInitialStateEntity() />
//                 </simplex>
//               }
//              }
//         }
//     </lattice>
// </app>