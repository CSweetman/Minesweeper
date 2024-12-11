export const oldDfs = () => {
        
}
    // // Similar to number of islands DFS problem, please refer if you are confused
    // const DFS = (grid: number[][]) => {
    //     const h = grid.length
    //     const w = grid[0].length
    //     const visited = Array.from({ length: w }, () => Array.from({ length: h }, () => false))
    //     let num_islands = 0
    //     for (let i = 0; i < h; i++){
    //         for (let j = 0; j < w; j++){
    //             if (grid[i][j] === 0 && !visited[i][j]) {
    //                 num_islands++;
    //                 const vein: number[] = []
    //                 const veinObj: any = {}
    //                 DFSutil(grid, i, j, visited, vein, false);
    //                 veinObj[num_islands.toString()] = vein
    //                 console.log(`Vein ${num_islands}: ${vein}`)
    //                 setZeroVeins(prevVeins => ({
    //                     ...prevVeins,
    //                     ...veinObj
    //                 }))
    //             }
    //         }
    //     }
    //     console.log(num_islands)
    // }

    // const DFSutil = (grid: number[][], row: number, col: number, visited: boolean[][], vein: Array<number>, isLast: boolean) => {
    //     const h = grid.length
    //     const w = grid[0].length

    //     if (row < 0 || col < 0 || row >= h || col >= w || visited[row][col] || (grid[row][col] !== 0 && isLast)) {
    //         return
    //     }
    //     if (grid[row][col] !== 0 && !isLast) {
    //         isLast = true
    //     }

    //     visited[row][col] = true
    //     vein.push(row * 4 + (col))
    //     // console.log(row * 4 + (col + 1) + ' ')
    //     DFSutil(grid, row+ 1, col,visited, vein, isLast); // go right: ;
    //     DFSutil(grid, row- 1, col,visited, vein, isLast); //go left
    //     DFSutil(grid, row, col + 1,visited, vein, isLast); //go down
    //     DFSutil(grid, row, col - 1, visited, vein, isLast); // go up
    // }