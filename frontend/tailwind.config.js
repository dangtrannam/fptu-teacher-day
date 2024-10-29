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
                'bgBase': "url('./src/assets/images/backGroundImg_2x.png')",
                'bgBase_Mobile': "url('./src/assets/images/bg_mobile_2x.png')",
                'bgBase_Tablet': "url('./src/assets/images/bg_tablet_2x.png')",
                'wish_card': "url('./src/assets/images/wish_card.png')",
            },
        },
    },
    plugins: [],
}
