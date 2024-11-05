/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                // montserrat: ["'Montserrat'", 'sans-serif'],
            },
            textStroke: {
                '0.75': '0.75px white',
            },
            transitionDuration: {
                '2000': '2000ms',
            },
            backgroundImage: {
                // If local development, uncomment the following lines
                // 'bgBase': "url('./assets/images/backGroundImg_2x.png')",
                // 'bgBase_Mobile': "url('./assets/images/bg_mobile_2x.png')",
                // 'bgBase_Tablet': "url('./assets/images/bg_tablet_2x.png')",
                // 'wish_card': "url('./assets/images/wish_card_bg_x3.png')",
                // 'cloud1': "url('./assets/images/cloud1.png')",
                // 'cloud2': "url('./assets/images/cloud2.png')",
                // 'cloud3': "url('./assets/images/cloud3.png')",
                // 'cloud4': "url('./assets/images/cloud4.png')",
                // 'mascot1': "url('./assets/images/mascot1.png')",
                // 'mascot2': "url('./assets/images/mascot2.png')",
                // 'mascot3': "url('./assets/images/mascot3.png')",
                // 'mascot4': "url('./assets/images/mascot4.png')",
                // 'mascot5': "url('./assets/images/mascot5.png')",
                // 'mascot6': "url('./assets/images/mascot6.png')",
                // 'mascot7': "url('./assets/images/mascot7.png')",
                // 'mascot8': "url('./assets/images/mascot8.png')",
                // "animation_background_forward": "url('./assets/images/animation_background/background-forward.png')",
                // "animation_background_backward": "url('./assets/images/animation_background/background-backward.png')",
                // "animation_background_middle": "url('./assets/images/animation_background/background-middle.png')",
                // If production, use the following lines
                'bgBase': "url('./images/backGroundImg_2x.png')",
                'bgBase_Mobile': "url('./images/bg_mobile_2x.png')",
                'bgBase_Tablet': "url('./images/bg_tablet_2x.png')",
                'wish_card': "url('./images/wish_card_bg_x3.png')",
                'cloud1': "url('./images/cloud1.png')",
                'cloud2': "url('./images/cloud2.png')",
                'cloud3': "url('./images/cloud3.png')",
                'cloud4': "url('./images/cloud4.png')",
                'mascot1': "url('./images/mascot1.png')",
                'mascot2': "url('./images/mascot2.png')",
                'mascot3': "url('./images/mascot3.png')",
                'mascot4': "url('./images/mascot4.png')",
                'mascot5': "url('./images/mascot5.png')",
                'mascot6': "url('./images/mascot6.png')",
                'mascot7': "url('./images/mascot7.png')",
                'mascot8': "url('./images/mascot8.png')",
                "animation_background_forward": "url('./images/animation_background/background-forward.png')",
                "animation_background_backward": "url('./images/animation_background/background-backward.png')",
                "animation_background_middle": "url('./images/animation_background/background-middle.png')",
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
                'brand-600': 'rgba(255,138,69,1)',
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
            boxShadow: {
                'md': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', // Custom box shadow
            },
            textStrokeWidth: {
                '0.75': '0.75px',
            },

        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.stroke-white': {
                    '-webkit-text-stroke': '0.75px white',
                    'text-stroke': '0.75px white',
                },
            });
        }
    ],
}
