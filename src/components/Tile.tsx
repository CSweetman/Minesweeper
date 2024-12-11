/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import { gamestate } from "./Board"
import { ThemeContext } from "../context/ThemeContext"
import { TileColorProps, Themes } from "../themes"

interface TileProps {
    value: number
    index: number
    x: number
    y: number
    reveal: boolean
    handleReveal: any
    mark: boolean
    updateMarks: any
    groupReveal: any
    gameState: gamestate
}

interface Tile {
    value: number
}

const Tile = ({
    value,
    handleReveal,
    index,
    reveal,
    mark,
    updateMarks,
    x,
    y,
    groupReveal,
    gameState,
}: TileProps) => {
    const { theme } = useContext(ThemeContext)

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (gameState !== "ONGOING") {
            return
        }
        if (!reveal) {
            updateMarks(x, y)
        } else {
            groupReveal(index, value)
        }
    }

    const handleClick = () => {
        if (gameState === "ONGOING" && !reveal) {
            handleReveal(mark, index, value)
        }
    }


    const tileColors: { [key in Themes]: TileColorProps } = {
        [Themes.Peach]: {
            tile: "bg-[#d6b296]",
            tileCover: "bg-[#d5d097]",
            tileHover: "hover:bg-[#d6be94]",
            mineCount: "text-[#c7756c]",
            flag: "text-[#d92f35]",
        },
        [Themes.Aquatic]: {
            tile: "bg-[#adf2e0]",
            tileCover: "bg-[#d7ffdc]",
            tileHover: "hover:bg-[#dffaad]",
            mineCount: "text-[#61aabf]",
            flag: "text-[#dc8083]",
        },
        [Themes.HighContrast]: {
            tile: "bg-[#000034]",
            tileCover: "bg-[#ffffc6]",
            tileHover: "hover:bg-[#ffa2b9]",
            mineCount: "text-[#ffffc6]",
            flag: "text-[#e8060c]",
        },

    }

    return (
        <div
            className={`flex items-center justify-center w-16 h-16 ${reveal ? tileColors[theme].tile : tileColors[theme].tileCover} ${reveal ? null : tileColors[theme].tileHover}
                border-[#eefcfe]  rounded-[10px]`}
            onClick={() => handleClick()}
            onContextMenu={(e) => handleRightClick(e)}
        >
            {mark ? (
                <p className={`text-center text-3xl font-bold ${tileColors[theme].flag} font-outline-flag`}>!</p>
            ) : null}
            {reveal ? (
                <p className={`text-xl font-bold ${tileColors[theme].mineCount}`}>{value !== 0 ? value : ""}</p>
            ) : null}
        </div>
    )
}

export default Tile
