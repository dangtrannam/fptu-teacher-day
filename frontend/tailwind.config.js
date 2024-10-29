/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ["'Inter'", 'sans-serif'],
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
            backgroundColor: {
                'black-50': 'rgba(0, 0, 0, 0.5)',
                'orange-opacity': 'rgba(242, 113, 37, 0.4)',
                'brand': 'rgba(242, 113, 37, 1)',
                'pink': 'rgba(255, 240, 235, 1)',
            },
            textColor: {
                'brand': 'rgba(242, 113, 37, 1)',
                'black-custom': '#000000', // Custom black color if needed
            },
            borderColor: {
                'brand': 'rgba(242, 113, 37, 1)',
                'orange-opacity': 'rgba(242, 113, 37, 0.4)',
            },
            spacing: {
                '512px': '512px',
                '704px': '704px',
                '176px': '176px',
            },
        },
    },
    plugins: [],
}
