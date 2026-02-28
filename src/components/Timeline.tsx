import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timeline: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const events = [
    { date: 'March 2nd', year: '2025', title: 'The Beginning', desc: 'The day two paths intertwined into one beautiful journey.' },
    { date: 'June', year: '2025', title: 'Adventures Unfold', desc: 'Exploring the world hand in hand, collecting moments.' },
    { date: 'December', year: '2025', title: 'Winter Warmth', desc: 'A season of lights, laughter, and endless conversations.' },
    { date: 'March 2nd', year: '2026', title: 'Chapter One', desc: 'Celebrating 365 days of absolute magic. Happy Anniversary.' },
  ];

  return (
    <section id="story" className="container" style={{ padding: isMobile ? '80px 5%' : '150px 5%' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: 'center', marginBottom: isMobile ? '50px' : '80px' }}
      >
        <p style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '10px' }}>Our Journey</p>
        <h2 style={{ fontSize: isMobile ? '2.2rem' : '3rem', color: 'var(--text-main)' }}>Milestones of Us</h2>
      </motion.div>
      
      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Glowing center line (Adjusted for mobile) */}
        <div style={{
          position: 'absolute',
          left: isMobile ? '20px' : '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, var(--accent-gold), transparent)',
          transform: isMobile ? 'none' : 'translateX(-50%)',
          boxShadow: '0 0 15px var(--accent-gold-light)'
        }} />

        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isMobile ? 30 : (index % 2 === 0 ? -50 : 50) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
            style={{
              display: 'flex',
              justifyContent: isMobile ? 'flex-start' : (index % 2 === 0 ? 'flex-end' : 'flex-start'),
              paddingRight: isMobile ? '0' : (index % 2 === 0 ? '50%' : '0'),
              paddingLeft: isMobile ? '50px' : (index % 2 === 0 ? '0' : '50%'),
              marginBottom: isMobile ? '60px' : '100px',
              position: 'relative'
            }}
          >
            <div className="glass" style={{
              width: '100%',
              padding: isMobile ? '25px' : '40px',
              borderRadius: '15px',
              textAlign: isMobile ? 'left' : (index % 2 === 0 ? 'right' : 'left'),
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: isMobile ? 'flex-start' : (index % 2 === 0 ? 'flex-end' : 'flex-start'), gap: '10px', marginBottom: '10px' }}>
                  <span className="romantic-text" style={{ color: 'var(--accent-gold)', fontSize: isMobile ? '1.8rem' : '2.5rem', lineHeight: '1' }}>{event.date}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px' }}>{event.year}</span>
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-main)', fontSize: isMobile ? '1.3rem' : '1.8rem' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: isMobile ? '0.9rem' : '1.05rem', fontWeight: 300 }}>{event.desc}</p>
              </div>
            </div>

            {/* Glowing diamond dot (Adjusted for mobile) */}
            <div style={{
              position: 'absolute',
              left: isMobile ? '20px' : '50%',
              top: isMobile ? '40px' : '50%',
              width: '10px',
              height: '10px',
              backgroundColor: 'var(--accent-gold)',
              transform: 'translate(-50%, -50%) rotate(45deg)',
              boxShadow: '0 0 20px var(--accent-gold-light)',
            }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
