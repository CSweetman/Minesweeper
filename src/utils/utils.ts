export const directions = [
    //up right down left
    [-1, 0], [0, 1], [1, 0], [0, -1], 
    [-1, -1], [-1, 1], [1, -1], [1, 1]
]
const BOARD_WIDTH = 8

export const bfs = (grid: number[][], x: number, y: number): number[] => {
    

    // store all visited element and finally returned this
    const values = [];
    // BFS uses queue to process data, Initially store first element
    const queue = [[x, y]];
    // created 2-d matrix same as given matrix with falsy values
    const seen = new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(false));
        
    while (queue.length) {
        const currentPos = queue.shift();
        const row = currentPos![0];
        const col = currentPos![1];
            // row should not be less then 0
            // row should not be greater then matrix.length
            // col should not be less then 0
            // col should not be greater then matrix.length
            // element should not be visited (seen[row][col])
        const invalidRow = row < 0 || row >= grid.length;
        const invalidCol = col < 0 || col >= grid[0].length;
        if (invalidRow || invalidCol || seen[row][col]) {
         continue; // continue while loop
        }
        seen[row][col] = true; // marked true so that not to visit this again
        values.push(row * BOARD_WIDTH + (col)); // push visited element into values array
        // Push adjacent item in to queue
        for (const dir of directions) {
            if (grid[row][col] === 0)
                queue.push([row + dir[0], col + dir[1]]);
        }
    }
    return values;
}

export const findVein = (veins: { [k: string]: Array<number> }, indx: number) => {
    for (const key in veins) {
        for (const val of veins[key]) {
            if (indx === val)
                return key
        }
    }
}

export const canGroupReveal = (grid: boolean[][], index: number, amt: number) => {
    let counter = 0
    for (const d of directions) {
        const x = Math.floor(index / BOARD_WIDTH) + d[0]
        const y = index % BOARD_WIDTH + d[1]
        if (!(x < 0 || x >= grid.length) && !(y < 0 || y >= grid[0].length) && grid[x][y])
            counter++
    }
    return counter===amt ? true : false
}



