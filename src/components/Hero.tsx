import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      backgroundColor: 'var(--bg-dark)'
    }}>
      {/* Dynamic Cursor Light Effect */}
      <motion.div
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 1.5 }}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '800px', height: '800px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ zIndex: 10 }}
      >
        <motion.p 
          initial={{ opacity: 0, letterSpacing: '0px' }}
          animate={{ opacity: 1, letterSpacing: '4px' }}
          transition={{ delay: 0.5, duration: 1.5 }}
          style={{ fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '20px', textTransform: 'uppercase' }}
        >
          A Celebration of Love
        </motion.p>
        
        <h1 style={{ fontSize: '5rem', letterSpacing: '2px', lineHeight: '1.2' }}>
          <span className="gold-gradient-text">Howard</span> 
          <span style={{ fontSize: '3rem', margin: '0 20px', color: 'var(--text-muted)' }}>&</span> 
          <span className="gold-gradient-text">Victoria</span>
        </h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          style={{ marginTop: '30px' }}
        >
          <p className="romantic-text" style={{ fontSize: '2rem', color: 'var(--text-muted)' }}>
            Est. March 2nd
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
          Discover
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--accent-gold), transparent)'
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
