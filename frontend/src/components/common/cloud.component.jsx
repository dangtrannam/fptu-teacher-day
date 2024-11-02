import { motion } from 'framer-motion';

export const CloudOverlay = ({animate}) => {
    return (
        <div className='absolute bottom-0 w-screen h-screen overflow-hidden z-[10] bg-cover bg-center'>
            {/* left behind */}
            <motion.div
                className="absolute -left-12 -bottom-32 min-[500px]:-bottom-60  min-[1200px]:-bottom-[370px] w-[60%] top-0 bg-cloud3 bg-no-repeat bg-contain bg-center "
                animate={animate ? { x: '-100%' } : { x: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            {/* left ahead */}
            <motion.div
                className="absolute -left-2 -bottom-40  min-[500px]:-bottom-60  min-[1200px]:-bottom-[300px] w-[60%] top-0 bg-cloud1 bg-no-repeat bg-contain bg-center "
                animate={animate ? { x: '-100%' } : { x: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
            />

            {/* right behind */}
            <motion.div
                className="absolute -right-12 -bottom-40  min-[500px]:-bottom-60  min-[1200px]:-bottom-[370px] w-[60%] top-0 bg-cloud4 bg-no-repeat bg-contain bg-center "
                animate={animate ? { x: '100%' } : { x: 0 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
            {/* right ahead */}
            <motion.div
                className="absolute -right-2 -bottom-40  min-[500px]:-bottom-60  min-[1200px]:-bottom-[300px] w-[60%] top-0 bg-cloud2 bg-no-repeat bg-contain bg-center "
                animate={animate ? { x: '100%' } : { x: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
            />

            {/* white in bottom */}
            <motion.div className="absolute bottom-0 w-full h-1/3 bg-white opacity-100  min-[500px]:-bottom-20 min-[1200px]:-bottom-40 "
            animate={animate ? { opacity: 0, 
             } : { opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            ></motion.div>
        </div>
    );
}