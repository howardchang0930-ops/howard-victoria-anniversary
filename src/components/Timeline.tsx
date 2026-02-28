import React from 'react';
import { motion } from 'framer-motion';

const Timeline: React.FC = () => {
  const events = [
    { date: 'March 2nd', year: '2025', title: 'The Beginning', desc: 'The day two paths intertwined into one beautiful journey.' },
    { date: 'June', year: '2025', title: 'Adventures Unfold', desc: 'Exploring the world hand in hand, collecting moments.' },
    { date: 'December', year: '2025', title: 'Winter Warmth', desc: 'A season of lights, laughter, and endless conversations.' },
    { date: 'March 2nd', year: '2026', title: 'Chapter One', desc: 'Celebrating 365 days of absolute magic. Happy Anniversary.' },
  ];

  return (
    <section id="story" className="container" style={{ padding: '150px 5%' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <p style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', marginBottom: '10px' }}>Our Journey</p>
        <h2 style={{ fontSize: '3rem', color: 'var(--text-main)' }}>Milestones of Us</h2>
      </motion.div>
      
      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Elegant glowing center line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, var(--accent-gold), transparent)',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 15px var(--accent-gold-light)'
        }} />

        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
            style={{
              display: 'flex',
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
              paddingRight: index % 2 === 0 ? '50%' : '0',
              paddingLeft: index % 2 === 0 ? '0' : '50%',
              marginBottom: '100px',
              position: 'relative'
            }}
          >
            <div className="glass" style={{
              width: '85%',
              padding: '40px',
              borderRadius: '20px',
              textAlign: index % 2 === 0 ? 'right' : 'left',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative background glow */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                [index % 2 === 0 ? 'right' : 'left']: '-50%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                zIndex: 0
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start', gap: '15px', marginBottom: '15px' }}>
                  <span className="romantic-text" style={{ color: 'var(--accent-gold)', fontSize: '2.5rem', lineHeight: '1' }}>{event.date}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '2px' }}>{event.year}</span>
                </div>
                <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-main)', fontSize: '1.8rem' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', fontWeight: 300 }}>{event.desc}</p>
              </div>
            </div>

            {/* Glowing diamond dot */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '12px',
              height: '12px',
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
