import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState('2025.03.02');
  const [phase, setPhase] = useState<'counting' | 'waiting' | 'exploding'>('counting');
  const [isMobile, setIsMobile] = useState(false);

  // 嚴格審核後的人像/合照清單
  const premiumPhotos = [
    './uploads/_0ff3f03f-6b3e-4dd1-bb9a-8686478883c0.jpg',
    './uploads/S__44802053.jpg',
    './uploads/_3cbb9049-3b98-45c0-a82a-f61bd2f370e0.jpg',
    './uploads/S__44802054.jpg',
    './uploads/_433bd3c2-92c8-4722-aca3-9d8a6881f25c.jpg',
    './uploads/S__31137803.jpg',
    './uploads/603612513_17922458970200045_5751134264985713997_n.jpg',
    './uploads/539205996_17922231318125151_9092769545157182629_n.jpg'
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    if (phase === 'counting') {
      const duration = 4000;
      const startTime = Date.now();

      const photoTimer = setInterval(() => {
        setIndex((prev) => (prev + 1) % premiumPhotos.length);
      }, 800);

      const dateTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress === 1) {
          clearInterval(dateTimer);
          clearInterval(photoTimer);
          setCurrentDate('2026.03.02');
          setTimeout(() => setPhase('waiting'), 800);
          return;
        }

        const totalMonths = 12;
        const currentMonthCount = Math.floor(progress * totalMonths);
        const year = currentMonthCount >= 10 ? 2026 : 2025;
        const month = ((2 + currentMonthCount) % 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        setCurrentDate(`${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`);
      }, 100);

      return () => { clearInterval(photoTimer); clearInterval(dateTimer); };
    }
  }, [phase]);

  const handleStart = () => {
    setPhase('exploding');
    setTimeout(onComplete, 1500);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 20000,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 背景照片層 (更高級的轉場) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px) brightness(0)' }}
          animate={{ opacity: 0.4, scale: 1.05, filter: 'blur(0px) brightness(1)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px) brightness(0)' }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <img src={premiumPhotos[index]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="mem" />
        </motion.div>
      </AnimatePresence>

      {/* 電影感漏光效果 (Light Leaks) */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], x: [-100, 100] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(45deg, rgba(212,175,55,0.1) 0%, transparent 40%, rgba(183,110,121,0.1) 100%)',
          zIndex: 1, pointerEvents: 'none'
        }}
      />

      {/* 核心內容區 */}
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          {phase === 'counting' && (
            <motion.div key="count" exit={{ opacity: 0, y: -20 }}>
              <h2 className="gold-gradient-text" style={{ fontSize: isMobile ? '14vw' : '5rem', fontWeight: 200, letterSpacing: '10px' }}>
                {currentDate}
              </h2>
            </motion.div>
          )}

          {phase === 'waiting' && (
            <motion.div
              key="wait"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <h2 className="gold-gradient-text" style={{ fontSize: isMobile ? '12vw' : '4rem', marginBottom: '40px' }}>2026.03.02</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStart}
                style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  backgroundColor: 'transparent', border: '1px solid var(--accent-gold)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  cursor: 'none', position: 'relative', overflow: 'hidden'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--accent-gold)', borderRadius: '50%' }}
                />
                <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', zIndex: 1, letterSpacing: '1px' }}>START</span>
              </motion.button>
              <p style={{ color: 'var(--text-muted)', marginTop: '20px', letterSpacing: '3px', fontSize: '0.7rem' }}>Touch to Open our Journey</p>
            </motion.div>
          )}

          {phase === 'exploding' && (
            <motion.div key="explode" style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
              {/* 金色粒子炸裂特效 (鞭炮感) */}
              {[...Array(60)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: '50vw', y: '50vh', scale: 0 }}
                  animate={{ 
                    x: Math.random() * 100 + 'vw', 
                    y: Math.random() * 100 + 'vh', 
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    position: 'absolute', width: '4px', height: '4px',
                    backgroundColor: i % 2 === 0 ? 'var(--accent-gold)' : '#fff',
                    borderRadius: '50%', boxShadow: '0 0 10px var(--accent-gold)'
                  }}
                />
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ position: 'absolute', inset: 0, backgroundColor: '#fff', zIndex: 200 }}
                transition={{ duration: 0.1, repeat: 1, yoyo: true }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 雜訊與暗角 */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`, pointerEvents: 'none', zIndex: 5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)', zIndex: 4, pointerEvents: 'none' }} />
    </motion.div>
  );
};

export default Intro;
