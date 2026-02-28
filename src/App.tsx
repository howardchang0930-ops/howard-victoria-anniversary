import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import LoveLetter from './components/LoveLetter';
import './App.css';

const App: React.FC = () => {
  const [showHearts, setShowHearts] = useState(false);

  const triggerSurprise = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 5000);
  };

  return (
    <div className="App">
      {/* 驚喜愛心雨特效 */}
      <AnimatePresence>
        {showHearts && (
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 1 }}
                animate={{ y: window.innerHeight + 50, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 + Math.random() * 2, ease: "linear" }}
                style={{ position: 'absolute' }}
              >
                <Heart fill="#f06292" color="#f06292" size={20 + Math.random() * 30} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <Hero />
      <Timeline />
      <Gallery />
      <LoveLetter />

      {/* 驚喜小彩蛋按鈕 */}
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={triggerSurprise}
          style={{
            padding: '15px 40px',
            fontSize: '1.1rem',
            backgroundColor: '#f06292',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(240, 98, 146, 0.4)'
          }}
        >
          <Sparkles size={20} />
          Click for a Surprise
        </motion.button>
      </div>

      <footer style={{
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid #f8bbd0',
        color: '#888',
        fontSize: '0.9rem'
      }}>
        <p>© 2026 Howard & Victoria • Forever Together</p>
      </footer>
    </div>
  );
};

export default App;
