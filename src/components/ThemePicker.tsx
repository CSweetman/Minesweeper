
import { Themes } from "../themes"
import ThemeButton from "./ThemeButton"

const ThemePicker = () => {

    const addSpaces = (s: string) => {
        return s.replace(/([A-Z])/g, " $1")
    }

    return (
        <div className="absolute min-w-[100%]">
            <div className="mr-5 mt-5 flex justify-end">
                <div className="flex flex-col">
                    {Object.keys(Themes)
                        .filter((key) => isNaN(Number(key)))
                        .map((key, i) => (
                            <ThemeButton name={addSpaces(key).trim().toLocaleLowerCase()} key={i} theme={i} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ThemePicker
