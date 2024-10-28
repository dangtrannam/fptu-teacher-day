/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["'Montserrat'", 'sans-serif'],
            },
            transitionDuration: {
                '2000': '2000ms',
            },
            backgroundImage: {
                'bgBase': "url('./src/assets/images/backGroundImg_1.5x.png')",
                // Add more custom background images here
            },
        },
    },
    plugins: [],
}