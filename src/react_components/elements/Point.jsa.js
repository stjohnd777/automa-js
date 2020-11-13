
import React, { useState } from 'react';



function Point(props) {
    // Declare a new state variable, which we'll call "count"
    let scene = props.scene;
    let point = props.point;

    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}