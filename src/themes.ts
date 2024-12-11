export enum Themes {
    Peach,
    Aquatic,
    HighContrast,
}

export type ThemesKeys = keyof typeof Themes

export const themesKeysArray = Object.keys(Themes)

export type TileColorProps = {
    tile: string
    tileCover: string
    tileHover: string
    mineCount: string
    flag: string
}

export type BoardColorProps = {
    board: string
    title: string
}

export type ThemePickerProps = {
    preview: string
    themeName: string
    themeNameHover: string
}

export type BgColorProps = {
    bg: string
}
