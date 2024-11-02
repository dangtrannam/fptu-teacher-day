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
        const count = useMotionValue(from)
        const rounded = useTransform(count, (latest) => Math.round(latest))
        
        useEffect(() => {
            const controls = animate(count, to, { duration: 2, ease: 'easeOut' })
            return controls.stop
        }, [count, to])
        
        return <motion.span>{rounded}</motion.span>
    }

    return (
        <div className="relative  w-screen overflow-hidden">
            <Background />
            <CloudOverlay animate={animateClouds}/>
            <CardComponent animate={animateClouds}/>
            <div className="absolute left-1/2 -translate-x-1/2 top-24  min-[500px]:top-24 min-[1200px]:top-12 flex flex-col items-center justify-center mt-16 mb-10 mx-auto max-w-2xl w-full z-[100]">
                <div className="flex justify-center items-center w-full">
                    <SVGLogo />
                </div>
                <div className="flex flex-col items-center justify-center space-y-6 w-full mt-10 px-4 lg:px-0">
                    <p className="text-center text-white text-base md:text-xl font-inter flex flex-col uppercase font-bold">
                        <span>GỬI LỜI CHÚC ĐIỆN TỬ TỚI THẦY CÔ</span>
                        <span>Đã có <strong className='text-orange-500'><Counter from={100} to={400} />+</strong> Lời chúc được gửi thành công</span>
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
