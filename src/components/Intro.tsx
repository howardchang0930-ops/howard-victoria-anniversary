import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [currentDate, setCurrentDate] = useState('2025.03.02');
  const [isFinishing, setIsFinishing] = useState(false);

  // 預設要閃現的照片（從你上傳的照片中挑選）
  const flashPhotos = [
    './uploads/LINE_ALBUM_grad trip🫰_250807_1.jpg',
    './uploads/_0ff3f03f-6b3e-4dd1-bb9a-8686478883c0.jpg',
    './uploads/A4A746B0-9AFA-449F-8612-FA28D99B3443.jpg',
    './uploads/20250525_132825433_iOS.jpg',
    './uploads/S__44802053.jpg',
    './uploads/S__31137803.jpg'
  ];

  useEffect(() => {
    let startTime = Date.now();
    const duration = 3000; // 動畫持續 3 秒

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        clearInterval(timer);
        setCurrentDate('2026.03.02');
        setCounter(flashPhotos.length - 1);
        setTimeout(() => {
          setIsFinishing(true);
          setTimeout(onComplete, 1000);
        }, 800);
        return;
      }

      // 隨機產生日期與照片索引來營造快速流逝感
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const randomYear = progress > 0.8 ? '2026' : '2025';
      
      setCurrentDate(`${randomYear}.${randomMonth.toString().padStart(2, '0')}.${randomDay.toString().padStart(2, '0')}`);
      setCounter(Math.floor(Math.random() * flashPhotos.length));
    }, 60); // 每 60 毫秒跳動一次

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000',
        zIndex: 20000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 背景閃現的照片 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={counter}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }}
        >
          <img 
            src={flashPhotos[counter]} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2) brightness(0.8)' }}
            alt="flash"
          />
        </motion.div>
      </AnimatePresence>

      {/* 中央跳動的文字 */}
      <motion.div
        animate={isFinishing ? { scale: [1, 1.5, 0.8], opacity: [1, 1, 0] } : {}}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 1, textAlign: 'center' }}
      >
        <motion.h2
          className="gold-gradient-text"
          style={{ 
            fontSize: isFinishing ? '6rem' : '4rem', 
            fontWeight: 700,
            letterSpacing: '10px',
            textShadow: '0 0 30px rgba(212,175,55,0.5)'
          }}
        >
          {currentDate}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: '#fff', letterSpacing: '5px', marginTop: '20px', textTransform: 'uppercase', fontSize: '0.8rem' }}
        >
          {isFinishing ? 'Happy Anniversary' : 'Chronicle of Love'}
        </motion.p>
      </motion.div>

      {/* 掃描線效果 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 4px, 3px 100%',
        pointerEvents: 'none'
      }} />
    </motion.div>
  );
};

export default Intro;
