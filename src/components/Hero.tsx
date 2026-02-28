import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    checkMobile();
  }, []);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-dark)',
      padding: '0 20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ zIndex: 10 }}
      >
        <motion.p 
          initial={{ opacity: 0, letterSpacing: '0px' }}
          animate={{ opacity: 1, letterSpacing: isMobile ? '2px' : '4px' }}
          transition={{ delay: 0.5, duration: 1.5 }}
          style={{ fontSize: isMobile ? '0.8rem' : '1rem', color: 'var(--accent-gold)', marginBottom: '20px', textTransform: 'uppercase' }}
        >
          A Celebration of One Year
        </motion.p>
        
        <h1 style={{ 
          fontSize: isMobile ? '12vw' : '5rem', 
          letterSpacing: '2px', 
          lineHeight: '1.2'
        }}>
          <span className="gold-gradient-text">Howard & Victoria</span>
        </h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          style={{ marginTop: '30px' }}
        >
          <p className="romantic-text" style={{ fontSize: isMobile ? '1.5rem' : '2.2rem', color: 'var(--text-muted)' }}>
            三月二日 ‧ 我們的紀念日
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: isMobile ? '30px' : '40px',
            background: 'linear-gradient(to bottom, var(--accent-gold), transparent)'
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
