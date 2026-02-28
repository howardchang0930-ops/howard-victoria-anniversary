import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Intro from './components/Intro';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import LoveLetter from './components/LoveLetter';
import './App.css';

const App: React.FC = () => {
  const [showHearts, setShowHearts] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 偵測是否為手機
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateCursor = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    if (!isMobile) {
      window.addEventListener('mousemove', updateCursor);
    }
    
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'auto';
    };
  }, [loading, isMobile]);

  const triggerSurprise = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 8000);
  };

  return (
    <div className="App" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <AnimatePresence>
        {loading && <Intro onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {/* 只有在非手機裝置才顯示自定義游標 */}
          {!isMobile && (
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
              <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', backgroundColor: 'var(--accent-gold-light)', borderRadius: '50%' }} />
            </motion.div>
          )}

          <AnimatePresence>
            {showHearts && (
              <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
                {[...Array(isMobile ? 20 : 40)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 0, scale: 0 }}
                    animate={{ y: window.innerHeight + 50, opacity: [0, 1, 1, 0], scale: Math.random() * 0.5 + 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4 + Math.random() * 4, ease: "linear", delay: Math.random() * 2 }}
                    style={{ position: 'absolute', color: 'var(--accent-gold)' }}
                  >
                    <Sparkles size={24} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          <Hero />
          <Timeline />
          <Gallery />
          <LoveLetter />

          <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerSurprise}
              style={{
                padding: isMobile ? '15px 30px' : '20px 50px',
                fontSize: '0.9rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                backgroundColor: 'transparent',
                color: 'var(--accent-gold)',
                border: '1px solid var(--accent-gold)',
                borderRadius: '0', 
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <Sparkles size={18} />
              Reveal Magic
            </motion.button>
          </div>

          <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
              © 2026 <span style={{ color: 'var(--accent-gold)', margin: '0 5px' }}>|</span> Howard & Victoria
            </p>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default App;
