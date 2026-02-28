import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState('2025.03.02');
  const [isFinishing, setIsFinishing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 精選後的優質合照清單
  const premiumPhotos = [
    './uploads/LINE_ALBUM_grad trip🫰_250807_1.jpg',
    './uploads/_0ff3f03f-6b3e-4dd1-bb9a-8686478883c0.jpg',
    './uploads/S__44802053.jpg',
    './uploads/20250525_132825433_iOS.jpg',
    './uploads/S__44802054.jpg',
    './uploads/A4A746B0-9AFA-449F-8612-FA28D99B3443.jpg'
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const duration = 4000; // 總動畫時長
    const startTime = Date.now();

    // 照片切換計時器 (較慢且平滑)
    const photoTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % premiumPhotos.length);
    }, 1000);

    // 日期平滑進度計時器
    const dateTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress === 1) {
        clearInterval(dateTimer);
        clearInterval(photoTimer);
        setCurrentDate('2026.03.02');
        setTimeout(() => {
          setIsFinishing(true);
          setTimeout(onComplete, 1200);
        }, 1000);
        return;
      }

      // 計算月份進度 (從 2025.03 到 2026.03)
      const totalMonths = 12;
      const currentMonthCount = Math.floor(progress * totalMonths);
      const year = currentMonthCount >= 10 ? 2026 : 2025; // 簡單模擬
      const month = ((2 + currentMonthCount) % 12) + 1;
      const day = Math.floor(Math.random() * 28) + 1;
      
      setCurrentDate(`${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`);
    }, 100);

    return () => {
      clearInterval(photoTimer);
      clearInterval(dateTimer);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(30px)' }}
      style={{
        position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 20000,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 平滑縮放的照片背景 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.5, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <img 
            src={premiumPhotos[index]} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            alt="memory" 
          />
        </motion.div>
      </AnimatePresence>

      {/* 高質感的黑影遮罩 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.8) 100%)',
        zIndex: 1
      }} />

      {/* 中央優雅的日期 */}
      <motion.div
        animate={isFinishing ? { 
          scale: [1, 1.1, 0.9], 
          opacity: [1, 1, 0],
          letterSpacing: ['10px', '20px', '5px'] 
        } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ zIndex: 2, textAlign: 'center' }}
      >
        <motion.h2 className="gold-gradient-text" style={{ 
          fontSize: isMobile ? '14vw' : '5rem', 
          fontWeight: 200, 
          letterSpacing: isMobile ? '8px' : '15px',
          textShadow: '0 0 40px rgba(212,175,55,0.3)'
        }}>
          {currentDate}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isMobile ? '60%' : '300px' }}
          transition={{ duration: 3.5, ease: "linear" }}
          style={{ 
            height: '1px', 
            background: 'var(--accent-gold)', 
            margin: '20px auto',
            opacity: 0.5 
          }}
        />
        <p style={{ 
          color: 'var(--text-muted)', 
          letterSpacing: '5px', 
          fontSize: '0.7rem', 
          textTransform: 'uppercase',
          fontWeight: 300
        }}>
          The Chronicle of Howard & Victoria
        </p>
      </motion.div>

      {/* 微弱的雜訊紋理 (Premium 質感) */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        zIndex: 3,
        backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`
      }} />
    </motion.div>
  );
};

export default Intro;
