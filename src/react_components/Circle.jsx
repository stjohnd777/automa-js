import React, { useState, useEffect } from 'react';

function Label() {
    return (<h4>Hello React Pure React Function Component!</h4>)
}

function Circle(props) {

    const [background, setBackgound] = useState(props.bg)

    let handleMouseOver = () => {
        console.log('onMouseOver')
        setBackgound(props.obg);

    }
    let handleMouseleave = () => {
        console.log('onMouseLeave')
        setBackgound(props.bg);
    }

    return (
        <div
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseleave}
            style={{
                margin: '25px',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                background: background,
                border: '1px solid #000',
                display: 'inline-block'
            }}
        />);
}

function log_random() {
    console.log(Math.random())
}

function Button(props) {
    const [counter , setCounter] = ReactDOM.useState(0);
    return (
        <button onClick={() => props.api.doit()}> {Math.random()}</button>)

}

function Display(props) {
    return <h2>{props.msg}</h2>;
}

function App(props) {
    return (
        <div>
            <ul>
                <li><Label></Label></li>
                <li><Button api={props.api}></Button></li>
                <li><Display msg={props.message}/></li>
                <li>
                    <Circle bg={'#00FF00'} obg={'#FF0000'}/>
                    <Circle bg={'#0000FF'} obg={'#FFFFFF'}/>
                </li>
            </ul>
        </div>
    )
}

let api = {
    doit: () => {
        alert('Hi ')
    }
}

ReactDOM.render(
    <App api={api} message={"Circle"}/>,
    document.getElementById('circle')
);


