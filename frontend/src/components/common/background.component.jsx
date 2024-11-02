"use client"

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Background() {
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });

  const backwardX = useTransform(smoothMouseX, [0, window.innerWidth], [-20, 20]);
  const forwardX = useTransform(smoothMouseX, [0, window.innerWidth], [-20, 20]);

  const handleMouseMove = (event) => {
    mouseX.set(event.clientX);
  };

  return (
    <div 
      className='w-screen h-screen overflow-hidden -z-10 bg-bgBase_Mobile min-[500px]:bg-bgBase_Tablet min-[1200px]:bg-bgBase bg-cover bg-center'
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="absolute inset-0 bg-animation_background_backward bg-cover bg-no-repeat bg-center"
        style={{ x: backwardX }}
      ></motion.div>
      <div className="absolute inset-0 bg-animation_background_middle bg-cover bg-no-repeat bg-center"></div>
      <motion.div 
        className="absolute inset-0 bg-animation_background_forward bg-cover bg-no-repeat bg-center"
        style={{ x: forwardX }}
      ></motion.div>
    </div>
  );
}