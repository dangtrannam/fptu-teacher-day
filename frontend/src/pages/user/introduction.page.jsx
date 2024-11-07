import React from 'react';
import Button from '../../components/common/button.component';
import Background from '../../components/common/background.component';
import SVGLogo from '../../components/common/svg.component.jsx';
import { trackingUserAccess } from '../../service/tracking.service.js';
import { handleRemoveLocalStorage } from '../../service/localStorageService.js';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { useTransform } from 'framer-motion';
import { animate } from 'framer-motion';
import { useEffect } from 'react';
import { CloudOverlay } from '../../components/common/cloud.component.jsx';
import CardComponent from '../../components/common/card.component.jsx';

function isMobile() {
    return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const IntroductionPage = ({ setNextPage }) => {
    const [animateClouds, setAnimateClouds] = useState(false)


    const handleStart = () => {
        setAnimateClouds(true)
        setTimeout(() => {
            handleRemoveLocalStorage(setNextPage)
            trackingUserAccess()
        }, 200)
    }

    const Counter = ({ from, to }) => {
        const count = useMotionValue(from);
        const rounded = useTransform(count, (latest) => Math.round(latest));

        useEffect(() => {
            let current = from;
            const interval = setInterval(() => {
                if (current < to) {
                    // Random increment between 1 or 2
                    const increment = Math.floor(Math.random() * 2) + 1;
                    current += increment;

                    if (current > to) current = to;
                    // Slower animation
                    animate(count, current, {
                        duration: 2,
                        ease: "easeInOut"
                    });
                    // Stop when reached target
                    if (current >= to) {
                        clearInterval(interval);
                    }
                }
            }, 1500);
            return () => clearInterval(interval);
        }, [from, to]);

        return <motion.span>{rounded}</motion.span>;
    };

    const [scaleFactor, setScaleFactor] = useState(window.devicePixelRatio || 1);

    useEffect(() => {
        const updateScale = () => {
            setScaleFactor(window.devicePixelRatio || 1);
        };

        // Update the scale factor on window resize
        window.addEventListener('resize', updateScale);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateScale);
        };
    }, []);


    return (
        <div className="relative w-screen overflow-hidden">
            <Background />
            <CloudOverlay animate={animateClouds} />
            <CardComponent animate={animateClouds} />
            <div className="absolute left-1/2 -translate-x-1/2 top-9 min-[500px]:top-24 min-[1200px]:top-1/2 flex flex-col items-center justify-center mt-16 mb-10 mx-auto max-w-2xl w-full z-[100]"

                style={
                    !isMobile()
                        ? {
                            transform: `translate(-50%, -50%) scale(${1 / scaleFactor})`,
                            transformOrigin: 'center center',
                        }
                        : {}
                }
            >
                <div className="flex justify-center items-center w-[50%] xl:w-[70%]"

                >
                    <SVGLogo />
                </div>
                <div className="flex flex-col items-center justify-center space-y-6 w-full mt-10 px-4 lg:px-0"

                >
                    <p className="text-center text-white text-sm md:text-base lg:text-xl font-inter-bold flex flex-col uppercase">
                        <span className=''
                            style={{
                                fontSize: 'clamp(0.5rem, 2vw + 0.85rem, 1rem)', // Adjusts between 1.25rem and 2rem
                            }}
                        >TẠO THIỆP TRI ÂN THẦY CÔ</span>
                        <span
                            style={{
                                fontSize: 'clamp(0.5rem, 2vw + 0.85rem, 1rem)', // Adjusts between 1.25rem and 2rem
                            }}
                        >Đã có <strong className="text-brand-600 font-inter-extrabold text-xl stroke-white"><Counter from={100} to={400} />+</strong> Lời chúc được gửi thành công</span>
                    </p>
                    <Button
                        variant='primary'
                        label="Gửi lời chúc"
                        size="large"
                        onClick={handleStart}
                    />
                </div>
            </div>
        </div>
    )
};
export default IntroductionPage;
