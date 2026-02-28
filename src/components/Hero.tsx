import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="hero-container" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #fffafb 0%, #fce4ec 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 飄浮的背景愛心 */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.4, 0],
            x: Math.sin(i) * 100 
          }}
          transition={{ 
            duration: 8 + Math.random() * 5, 
            repeat: Infinity, 
            delay: i * 2,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            color: '#f06292',
            zIndex: 1
          }}
        >
          <Heart fill="#f06292" size={24 + Math.random() * 20} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 10 }}
      >
        <p className="romantic-text" style={{ fontSize: '1.5rem', color: '#f06292', marginBottom: '10px' }}>
          Celebrating One Year Together
        </p>
        <h1 style={{ fontSize: '4rem', color: '#4a4a4a', letterSpacing: '2px', fontWeight: 700 }}>
          Howard <span style={{ color: '#d4af37' }}>&</span> Victoria
        </h1>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ marginTop: '20px' }}
        >
          <Heart fill="#f06292" color="#f06292" size={40} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ position: 'absolute', bottom: '30px', color: '#f06292' }}
      >
        <p style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>Scroll Down to Our Story</p>
      </motion.div>
    </div>
  );
};

export default Hero;
