import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState('2025.03.02');
  const [phase, setPhase] = useState<'counting' | 'waiting' | 'exploding'>('counting');
  const [isMobile, setIsMobile] = useState(false);

  // 嚴選後的絕對合照清單 (排除所有作文、文件)
  const premiumPhotos = [
    './uploads/S__44802053.jpg',
    './uploads/S__44802054.jpg',
    './uploads/S__31137803.jpg',
    './uploads/LINE_ALBUM_grad trip🫰_250807_1.jpg'
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    if (phase === 'counting') {
      const duration = 4000;
      const startTime = Date.now();

      const photoTimer = setInterval(() => {
        setIndex((prev) => (prev + 1) % premiumPhotos.length);
      }, 1000);

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
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <img src={premiumPhotos[index]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="memorial" />
        </motion.div>
      </AnimatePresence>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          {phase === 'counting' && (
            <motion.div key="count" exit={{ opacity: 0, y: -20 }}>
              <h2 className="gold-gradient-text" style={{ fontSize: isMobile ? '12vw' : '5rem', fontWeight: 200, letterSpacing: '10px' }}>
                {currentDate}
              </h2>
            </motion.div>
          )}

          {phase === 'waiting' && (
            <motion.div
              key="wait"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <h2 className="gold-gradient-text" style={{ fontSize: isMobile ? '10vw' : '4rem', marginBottom: '40px' }}>2026.03.02</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStart}
                style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  backgroundColor: 'transparent', border: '1px solid var(--accent-gold)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden'
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
                transition={{ duration: 0.1, repeat: 1, repeatType: 'reverse' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`, pointerEvents: 'none', zIndex: 5 }} />
    </motion.div>
  );
};

export default Intro;
