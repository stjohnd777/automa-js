

test('Map', () => {

    let map = new Map();

    map.set([1,1,1], "0 0 0");

    console.log( map.get( [1,1,1]) );
})

test('Map 2', () => {

    let c= [1,1,1]

    let map = new Map();

    map.set(c, "0 0 0");

    console.log( map.get(c ) );
})

test('Map 3', () => {

    let map = new Map();

    map.set('key', "0 0 0");

    console.log( map.get('key' ) );
})

test('Map 4', () => {

    let map = new Map();

    map.set({x:0,y:1}, "0 0 0");

    console.log( map.get({x:0,y:1} ) );
})