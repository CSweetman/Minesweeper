import { createContext, useState } from "react"
import { Themes } from "../themes"

type ThemeContext = { theme: Themes; changeTheme: (newTheme: Themes) => void }

const ThemeContext = createContext({} as ThemeContext)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<Themes>(Themes.Peach)

    const changeTheme = (newTheme: Themes) => {
        setTheme(newTheme)
        localStorage.setItem("theme", JSON.stringify(newTheme))
    }

    return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider }
