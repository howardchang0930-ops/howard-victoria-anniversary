import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoveLetter: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="letter" className="container" style={{ padding: isMobile ? '80px 5%' : '150px 5%', backgroundColor: 'var(--bg-dark)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="glass"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: isMobile ? '50px 25px' : '80px 60px',
          borderRadius: '2px',
          position: 'relative',
          borderTop: '1px solid rgba(212,175,55,0.3)',
          borderBottom: '1px solid rgba(212,175,55,0.3)'
        }}
      >
        <div style={{ position: 'absolute', top: '15px', left: '15px', width: '15px', height: '15px', borderTop: '1px solid var(--accent-gold)', borderLeft: '1px solid var(--accent-gold)' }} />
        <div style={{ position: 'absolute', top: '15px', right: '15px', width: '15px', height: '15px', borderTop: '1px solid var(--accent-gold)', borderRight: '1px solid var(--accent-gold)' }} />
        <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '15px', height: '15px', borderBottom: '1px solid var(--accent-gold)', borderLeft: '1px solid var(--accent-gold)' }} />
        <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '15px', height: '15px', borderBottom: '1px solid var(--accent-gold)', borderRight: '1px solid var(--accent-gold)' }} />

        <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '50px' }}>
          <p style={{ color: 'var(--accent-gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem' }}>A Personal Note</p>
          <h2 className="romantic-text" style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', color: 'var(--text-main)', marginTop: '10px' }}>For Victoria</h2>
        </div>
        
        <div style={{
          textAlign: isMobile ? 'center' : 'justify',
          textAlignLast: 'center',
          lineHeight: isMobile ? '2' : '2.4',
          color: 'var(--text-muted)',
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          fontWeight: 300,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <p style={{ marginBottom: '20px' }}>
            Looking back on this past year, every memory feels like a scene from a beautiful film. 
            From our very first encounter on March 2nd to all the quiet, unnoticed moments we've shared since.
          </p>
          <p style={{ marginBottom: '20px' }}>
            You bring a light into my life that I never knew I was missing. Your elegance, your laughter, 
            and your warmth have made the last 365 days the most precious chapter of my life.
          </p>
          <p style={{ marginBottom: '40px' }}>
            Here is to all the adventures we have yet to take, and to the endless love we continue to grow.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: isMobile ? '40px' : '60px' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Yours endlessly,</span>
            <span className="romantic-text" style={{ fontSize: isMobile ? '2rem' : '3rem', color: 'var(--accent-gold)', marginTop: '5px' }}>Howard</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
