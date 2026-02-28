import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Intro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [currentDate, setCurrentDate] = useState('2025.03.02');
  const [isFinishing, setIsFinishing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const flashPhotos = [
    './uploads/LINE_ALBUM_grad trip🫰_250807_1.jpg',
    './uploads/_0ff3f03f-6b3e-4dd1-bb9a-8686478883c0.jpg',
    './uploads/A4A746B0-9AFA-449F-8612-FA28D99B3443.jpg',
    './uploads/20250525_132825433_iOS.jpg',
    './uploads/S__44802053.jpg',
    './uploads/S__31137803.jpg'
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    let startTime = Date.now();
    const duration = 3000;

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

      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const randomYear = progress > 0.8 ? '2026' : '2025';
      setCurrentDate(`${randomYear}.${randomMonth.toString().padStart(2, '0')}.${randomDay.toString().padStart(2, '0')}`);
      setCounter(Math.floor(Math.random() * flashPhotos.length));
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      style={{
        position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 20000,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        overflow: 'hidden', padding: '0 20px'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={counter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        >
          <img src={flashPhotos[counter]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="flash" />
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={isFinishing ? { scale: [1, 1.2, 0.9], opacity: [1, 1, 0] } : {}}
        style={{ zIndex: 1, textAlign: 'center' }}
      >
        <h2 className="gold-gradient-text" style={{ 
          fontSize: isMobile ? '12vw' : '4rem', 
          fontWeight: 700, letterSpacing: isMobile ? '5px' : '10px' 
        }}>
          {currentDate}
        </h2>
        <p style={{ color: '#fff', letterSpacing: '3px', marginTop: '20px', fontSize: '0.7rem' }}>
          {isFinishing ? 'Happy Anniversary' : 'CHRONICLE OF LOVE'}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Intro;
