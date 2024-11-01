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
                'bgBase': "url('./assets/images/backGroundImg_2x.png')",
                'bgBase_Mobile': "url('./assets/images/bg_mobile_2x.png')",
                'bgBase_Tablet': "url('./assets/images/bg_tablet_2x.png')",
                'wish_card': "url('./assets/images/wish_card_flower.png')",
                'cloud1': "url('./assets/images/cloud1.png')",
                'cloud2': "url('./assets/images/cloud2.png')",
                'cloud3': "url('./assets/images/cloud3.png')",
                'cloud4': "url('./assets/images/cloud4.png')",
                'mascot1': "url('./assets/images/mascot1.png')",
                'mascot2': "url('./assets/images/mascot2.png')",
                'mascot3': "url('./assets/images/mascot3.png')",
                'mascot4': "url('./assets/images/mascot4.png')",
                'mascot5': "url('./assets/images/mascot5.png')",
                'mascot6': "url('./assets/images/mascot6.png')",
                'mascot7': "url('./assets/images/mascot7.png')",
                'mascot8': "url('./assets/images/mascot8.png')"
            },
            backgroundColor: {
                'black-50': 'rgba(0, 0, 0, 0.5)',
                'orange-opacity': 'rgba(242, 113, 37, 0.4)',
                'brand': 'rgba(242, 113, 37, 1)',
                'pink': 'rgba(255, 240, 235, 1)',
                'pink-200': '#fbcab0',
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
