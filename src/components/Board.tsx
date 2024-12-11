import { useContext, useEffect, useRef, useState } from "react"
import { bfs, canGroupReveal, directions, findVein } from "../utils/utils"
import Modal from "./Modal"
import Tile from "./Tile"
import { BoardColorProps, Themes } from "../themes"
import { ThemeContext } from "../context/ThemeContext"

export type gamestate = "WIN" | "LOSE" | "ONGOING"

const Board = () => {
    const BOARD_WIDTH = 8
    const BOARD_HEIGHT = 8
    const NUM_OF_MINES = 8

    const [arr, setArr] = useState(
        Array.from({ length: BOARD_WIDTH }, () => Array.from({ length: BOARD_HEIGHT }, () => 0))
    )
    const [reveal, setReveal] = useState(
        Array.from({ length: BOARD_WIDTH }, () => Array.from({ length: BOARD_HEIGHT }, () => false))
    )
    const [marks, setMarks] = useState(
        Array.from({ length: BOARD_WIDTH }, () => Array.from({ length: BOARD_HEIGHT }, () => false))
    )
    const [zeroVeins, setZeroVeins] = useState<{ [k: string]: Array<number> }>({})
    const [gameState, setGameState] = useState<gamestate>("ONGOING")
    const loadingRef = useRef(true)
    const { theme } = useContext(ThemeContext)
    //Implement on first click to move mine if a mine is clicked first.

    //setSymbol a useState located in the Tile component
    const handleReveal = (symbol: boolean, index: number, val: number) => {
        if (!symbol) {
            const x = Math.floor(index / BOARD_WIDTH)
            const y = index % BOARD_HEIGHT
            //Creates copy to set reveal later
            const copy = [...reveal]
            copy[x][y] = true
            if (val === 0) {
                const key = findVein(zeroVeins, index)
                if (key) {
                    for (const tile of zeroVeins[key]) {
                        if (tile !== index) {
                            const u = Math.floor(tile / BOARD_WIDTH)
                            const v = tile % BOARD_HEIGHT
                            copy[u][v] = true
                            updateMark(u, v, false)
                        }
                    }
                }
            }
            if (val === -1) {
                setGameState("LOSE")
            }
            // console.log(copy)
            setReveal(copy)
        }
    }

    const groupReveal = (index: number) => {
        const x = Math.floor(index / BOARD_WIDTH)
        const y = index % BOARD_HEIGHT
        if (canGroupReveal(marks, index, arr[x][y])) {
            for (const dir of directions) {
                const row = x + dir[0]
                const col = y + dir[1]
                if (!(row < 0 || row >= arr.length) && !(col < 0 || col >= arr[0].length) && !reveal[row][col]) {
                    const currIndex = row * BOARD_WIDTH + col
                    handleReveal(marks[row][col], currIndex, arr[row][col])
                }
            }
        }
    }

    function incrementValue(x: number, y: number) {
        const copy = [...arr]
        copy[x][y] += 1
        setArr(copy)
    }

    function setMine(x: number, y: number) {
        const copy = [...arr]
        copy[x][y] = -1
        setArr(copy)
    }

    //Updates marks such that if there are no marks
    const updateMark = (x: number, y: number, val?: boolean) => {
        const copy = [...marks]
        copy[x][y] = typeof val !== "undefined" ? val : !copy[x][y]
        setMarks(copy)
    }

    const calculateValues = (mines: Set<number>, arr: Array<Array<number>>) => {
        mines.forEach((mineIndx) => {
            const x = Math.floor(mineIndx / BOARD_WIDTH)
            const y = mineIndx % BOARD_HEIGHT
            setMine(x, y)
            // Through each mine, check the above, current, and below 3 mines to add 1 to the value
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (!(x + i < 0) && !(x + i > BOARD_WIDTH - 1) && !(y + j < 0) && !(y + j > BOARD_HEIGHT - 1)) {
                        if (!(arr[x + i][y + j] === -1)) incrementValue(x + i, y + j)
                    }
                }
            }
        })
    }

    const bfsHelper = () => {
        const h = arr.length
        const w = arr[0].length
        let veinCounter = 0
        let visited: { [k: string]: Array<number> } = { "-1": [] }
        for (let row = 0; row < h; row++) {
            for (let col = 0; col < w; col++) {
                if (arr[row][col] === 0 && !isInVein(row * BOARD_WIDTH + col, visited)) {
                    const vein = bfs(arr, row, col)
                    // console.log(`Vein ${row * BOARD_WIDTH + (col)} is ${vein}`)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const veinObj: any = {}
                    veinObj[veinCounter.toString()] = vein
                    setZeroVeins((prevVeins) => ({
                        ...prevVeins,
                        ...veinObj,
                    }))
                    visited = { ...visited, ...veinObj }
                    veinCounter++
                }
            }
        }
    }

    const isInVein = (val: number, visited: { [k: string]: number[] }): boolean => {
        for (const vein in visited) {
            if (visited[vein].includes(val)) return true
        }
        return false
    }

    useEffect(() => {
        //Ensures that everything is occured on first paint, avoids strict mode weirdness
        if (loadingRef.current) {
            const nums: Set<number> = new Set()
            while (nums.size !== 8) {
                nums.add(Math.floor(Math.random() * 64) + 0)
            }
            calculateValues(nums, arr)
            console.log(arr)
            bfsHelper()
        }
        return () => {
            loadingRef.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let counter = 64
        for (const row of reveal) {
            for (const rev of row) {
                if (rev) counter--
            }
        }
        if (counter === NUM_OF_MINES) setGameState("WIN")
    }, [reveal])

    const boardColors: { [key in Themes]: BoardColorProps } = {
        [Themes.Peach]: {
            board: "bg-[#d59487]",
            title: "text-[#d5d097]",
        },
        [Themes.Aquatic]: {
            board: "bg-[#75c4d3]",
            title: "text-[#d4fedc]",
        },
        [Themes.HighContrast]: {
            board: "bg-[#ff5aaa]",
            title: "text-[#ffffc6]",
        },
    }

    return (
        <div
            className={`${boardColors[theme].title} min-h-[100%] flex flex-col gap-10 justify-center items-center flex-grow `}
        >
            <h1 className="text-7xl font-bold text-center font-outline-title font-titleRegular">minesweeper</h1>

            <main className="flex justify-center">
                <div className={`${boardColors[theme].board}  p-2 rounded-[10px]`}>
                    <div className=" grid grid-cols-8 gap-2">
                        {/* <div className='bg-red-100 grid grid-cols-4 w-[16rem] border-[1px] border-black'> */}
                        {gameState !== "ONGOING" && <Modal gameState={gameState}></Modal>}
                        {arr.flat().map((val, i) => {
                            const x = Math.floor(i / BOARD_WIDTH)
                            const y = i % BOARD_HEIGHT
                            return (
                                <Tile
                                    key={i.toString()}
                                    value={val}
                                    handleReveal={handleReveal}
                                    index={i}
                                    x={x}
                                    y={y}
                                    reveal={reveal[Math.floor(x)][y]}
                                    mark={marks[Math.floor(x)][y]}
                                    updateMarks={updateMark}
                                    groupReveal={groupReveal}
                                    gameState={gameState}
                                    // setGameState={setGameState}
                                ></Tile>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Board
