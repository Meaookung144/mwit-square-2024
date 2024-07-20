/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                IBMPlexLoop: ["IBM Plex Sans Thai Looped", "sans-serif"],
                IBMPlex: ["IBM Plex Sans Thai", "serif"],
                B612Mono: ["B612 Mono", "mono"]
                    // Kodchasan: ["Kodchasan", "sans-serif"]
            },
            colors: {
                pa: '#4c538b',
                pb: '#a16f6c'
            }
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        prefix: "ds-",
        themes: [{
            sq: {
                "primary": "#224A9B",
                "secondary": "#B3C5ED",
                "accent": "#F9F3E2",
                "neutral": "#6D6284",
                "base-100": "#FFFFFF",
                "info": "#3ABFF8",
                "success": "#36D399",
                "warning": "#FBBD23",
                "error": "#F87272",
            },
        }, ],
    }
}