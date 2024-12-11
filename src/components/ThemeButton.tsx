import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { ThemePickerProps, Themes } from "../themes"

const ThemeButton = (props: { name: string; theme: number }) => {
    const { changeTheme } = useContext(ThemeContext)

    const themePreviewColors: { [key in Themes]: ThemePickerProps } = {
        [Themes.Peach]: {
            preview: "diagonal-split-peach",
            themeName: "text-[#d59485]",
            themeNameHover: "hover:text-[#d4d096]",
        },
        [Themes.Aquatic]: {
            preview: "diagonal-split-aquatic",
            themeName: "text-[#76c5d4]",
            themeNameHover: "hover:text-[#d8ffdd]",
        },
        [Themes.HighContrast]: {
            preview: "diagonal-split-high-contrast",
            themeName: "text-[#ff5aaa]",
            themeNameHover: "hover:text-[#ffffc6]",
        },
    }

    return (
        <div className="flex items-center gap-4">
            <div
                className={`${themePreviewColors[Themes[Themes[props.theme] as keyof typeof Themes]].preview} w-5 h-5 rounded-md`}
            />
            <button
                className={`${themePreviewColors[Themes[Themes[props.theme] as keyof typeof Themes]].themeName} 
                    ${themePreviewColors[Themes[Themes[props.theme] as keyof typeof Themes]].themeNameHover}
                    bg-transparent text-4xl font-titleRegular`}
                onClick={() => changeTheme(props.theme)}
            >
                <p className="mt-1">{props.name}</p>
            </button>
        </div>
    )
}

export default ThemeButton
