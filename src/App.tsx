import { useContext } from "react"
import ThemePicker from "./components/ThemePicker"
import Board from "./components/Board"
import { BgColorProps, Themes } from "./themes"
import { ThemeContext } from "./context/ThemeContext"

const App = () => {
    const { theme } = useContext(ThemeContext)

    const bgColors: { [key in Themes]: BgColorProps } = {
        [Themes.Peach]: {
            bg: "bg-[#324b4e]",
        },
        [Themes.Aquatic]: {
            bg: "bg-[#27384f]",
        },
        [Themes.HighContrast]: {
            bg: "bg-[#000034]",
        },
    }

    return (
        <div className={`min-h-screen ${bgColors[theme].bg} flex flex-col justify-start`}>
            <ThemePicker />
            <Board />
        </div>
    )
}

export default App
