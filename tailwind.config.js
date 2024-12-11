/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                titleRegular: ["Regular"],
                titleLight: ["Light"],
            },
            colors: {
                "peach-tile": "bg-[#d6b296]",
            },
        },
    },
    plugins: [],
}
