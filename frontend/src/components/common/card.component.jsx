import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"

const HeartIcon = () => (
  <svg width="60" height="56" viewBox="0 0 60 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 55.05L25.65 51.09C10.2 37.08 0 27.81 0 16.5C0 7.23 7.26 0 16.5 0C21.72 0 26.73 2.43 30 6.24C33.27 2.43 38.28 0 43.5 0C52.74 0 60 7.23 60 16.5C60 27.81 49.8 37.08 34.35 51.09L30 55.05Z" fill="#E31751"/>
  </svg>
)

const FallingHeart = ({ delay, onComplete }) => (
  <motion.div
    className="absolute"
    initial={{ y: -100, x: Math.random() * 80 - 40, opacity: 0, scale: 0.5 }}
    animate={{
      y: -220,
      opacity: [0, 1, 1, 0],
      scale: [0.2, 0.5, 0.5, 0.2],
    }}
    transition={{
      duration: 3,
      delay: delay,
    }}
    onAnimationComplete={onComplete}
  >
    <HeartIcon />
  </motion.div>
)

const cards = [
  {
    id: 1,
    mascot: 'bg-mascot1',
    text: 'Chúc thầy cô sẽ không phải gặp lại SV not pass FE để học lại hehe. Chúc thầy cô 20/11 thật nhiều niềm vui và hạnh phúc!'
  },
  {
    id: 2,
    mascot: 'bg-mascot2',
    text: `Happy Teachers' Day! Thank you for your patience, wisdom, and kindness. We are truly grateful for having you!`
  },
  {
    id: 3,
    mascot: 'bg-mascot3',
    text: `20/11 chúc thầy cô thật chill và luôn yêu nghề! Cảm ơn thầy cô đã không bao giờ ‘bó tay’ với tụi em!`
  },
  {
    id: 4,
    mascot: 'bg-mascot4',
    text: `Em chúc cô thật nhiều sức khỏe, ngày càng xinh đẹp, mãi là bông hoa duyên dáng giữa trời thu Hà Nội!`
  },
  {
    id: 5,
    mascot: 'bg-mascot5',
    text: `Chúc thầy cô ngày 20/11 vui vẻ, hạnh phúc, yêu đời! Cảm ơn thầy cô đã luôn ở đây và không bỏ cuộc với đám học sinh như chúng em.`
  },
  {
    id: 6,
    mascot: 'bg-mascot6',
    text: `Chúc thầy cô có một 20/11 thật hạnh phúc và bình an. Em rất biết ơn sự tận tụy của thầy cô trong từng bài giảng!`
  },
  {
    id: 7,
    mascot: 'bg-mascot7',
    text: `Để có lớp chúng em, thầy cô đã quá dũng cảm rồi! Chúc thầy cô 20/11 nhiều năng lượng và luôn nở nụ cười nhé!`
  },
  {
    id: 8,
    mascot: 'bg-mascot8',
    text: `20/11 chúc thầy cô yêu đời, yêu nghề, yêu luôn cả đám học trò lắm chuyện như chúng em!`
  }
]

export default function CardComponent({ animate }) {
  const [currentMascot, setCurrentMascot] = useState(0)
  const [hearts, setHearts] = useState([])

  const generateHearts = () => {
    const newHearts = Array(20).fill(null).map((_, index) => ({
      id: Date.now() + index,
      delay: index * 0.05
    }))
    setHearts(prevHearts => [...prevHearts, ...newHearts])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMascot((prev) => (prev + 1) % cards.length)
      generateHearts()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const removeHeart = (id) => {
    setHearts(prevHearts => prevHearts.filter(heart => heart.id !== id))
  }

  return (
    <motion.div 
      className="absolute z-50 bottom-20 left-1/2 -translate-x-1/2 min-[500px]:bottom-16 min-[1200px]:bottom-10 w-full max-w-lg px-2 [@media(max-height:600px)]:bottom-3"
      animate={animate ? { y: '100%', x: "-50%" } : { x: "-50%", y: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className='w-full bg-gradient-to-b from-white to-[#ADCFF1] p-6 shadow-[0_4px_6px_0_rgba(0,0,0,0.25)] rounded-[16px]'>
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0 h-[96px] aspect-square">
            <AnimatePresence mode='wait'>
              <motion.div 
                key={currentMascot}
                className={`${cards[currentMascot].mascot} bg-contain bg-no-repeat w-full h-full`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <AnimatePresence>
              {hearts.map((heart) => (
                <FallingHeart 
                  key={heart.id} 
                  delay={heart.delay} 
                  onComplete={() => removeHeart(heart.id)}
                />
              ))}
            </AnimatePresence>
          </div>
          <div className="relative self-center">
            <AnimatePresence mode="wait">
            <div className="absolute -left-2 -top-4 text-4xl text-black font-inter">“</div>
              <motion.p 
                key={currentMascot} 
                className="pt-2 text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {cards[currentMascot].text}
              </motion.p>
            </AnimatePresence>
            <div className="absolute -bottom-8 right-0 text-4xl text-black font-inter">”</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
