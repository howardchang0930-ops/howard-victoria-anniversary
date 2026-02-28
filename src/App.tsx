import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import LoveLetter from './components/LoveLetter';
import './App.css';

const App: React.FC = () => {
  const [showHearts, setShowHearts] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const triggerSurprise = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 8000);
  };

  return (
    <div className="App" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {/* Global Custom Cursor */}
      <motion.div
        animate={{ x: cursorPos.x - 10, y: cursorPos.y - 10 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '20px', height: '20px',
          border: '1px solid var(--accent-gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference'
        }}
      >
        <motion.div 
          animate={{ x: 8, y: 8 }}
          style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent-gold-light)', borderRadius: '50%' }}
        />
      </motion.div>

      {/* Elegant Surprise Effects */}
      <AnimatePresence>
        {showHearts && (
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 0, scale: 0 }}
                animate={{ y: window.innerHeight + 50, opacity: [0, 1, 1, 0], scale: Math.random() * 0.5 + 0.5, rotate: Math.random() * 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4 + Math.random() * 4, ease: "linear", delay: Math.random() * 2 }}
                style={{ position: 'absolute', color: 'var(--accent-gold)' }}
              >
                <Sparkles size={24} strokeWidth={1} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <Hero />
      <Timeline />
      <Gallery />
      <LoveLetter />

      {/* Surprise Button */}
      <div style={{ padding: '100px 20px', textAlign: 'center', position: 'relative' }}>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerSurprise}
          style={{
            padding: '20px 50px',
            fontSize: '1rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
            color: 'var(--accent-gold)',
            border: '1px solid var(--accent-gold)',
            borderRadius: '0', // Sharp luxury edges
            cursor: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '15px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Sparkles size={18} />
          Reveal Magic
        </motion.button>
      </div>

      <footer style={{
        padding: '60px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: 'var(--text-muted)',
      }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}>
          © 2026 <span style={{ color: 'var(--accent-gold)', margin: '0 10px' }}>|</span> Howard & Victoria
        </p>
      </footer>
    </div>
  );
};

export default App;
