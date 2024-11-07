"use client"

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Background() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const backwardX = useTransform(smoothMouseX, [0, windowSize.width], [-40, 40]);
  const forwardX = useTransform(smoothMouseX, [0, windowSize.width], [-40, 40]);

  const handleMouseMove = (event) => {
    mouseX.set(event.clientX);
  };

  return (
    <div 
      className='w-screen h-screen overflow-hidden -z-10 bg-bgBase_Mobile bg-top min-[500px]:bg-bgBase_Tablet min-[500px]:bg-center min-[900px]:bg-bgBase bg-cover max-[550px]:bg-top min-[1000px]:bg-center'
      onMouseMove={handleMouseMove}
    >
      <div
         className='hidden min-[1200px]:block absolute inset-0 bg-bgBase bg-cover bg-center'
      >
      <motion.div 
        className="absolute inset-0 bg-cover  bg-animation_background_backward bg-no-repeat bg-center top-10"
        style={{ 
          x: backwardX,
          width: 'calc(100% + 80px)',
          height: 'calc(100% + 80px)',
          top: '-40px',
          left: '-40px'
        }}
      ></motion.div>
      <div className="absolute inset-0 bg-animation_background_middle bg-cover bg-no-repeat bg-center"></div>
      <motion.div 
        className="absolute inset-0 bg-animation_background_forward bg-cover bg-no-repeat bg-center"
        style={{ 
          x: forwardX,
          width: 'calc(100% + 80px)',
          height: 'calc(100% + 80px)',
          top: '-40px',
          left: '-40px'
        }}
      ></motion.div>
      </div>
    </div>
  );
}