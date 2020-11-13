/**
 * Python Range for js
 *
 * range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * range(3, 5); // [3, 4]
 * range(10, 20, 2); // [10, 12, 14, 16, 18]
 */
export default function Range(start, edge, step) {
    // If only 1 number passed make it the edge and 0 the start
    if (arguments.length === 1) {
        edge = start;
        start = 0;
    }

    // Validate edge/start
    edge = edge || 0;
    step = step || 1;

    // Create array of numbers, stopping before the edge
    let arr = [];
    for (arr; (edge - start) * step > 0; start += step) {
        arr.push(start);
    }
    return arr;
}