import React from 'react';
import { motion } from 'framer-motion';

const Timeline: React.FC = () => {
  const events = [
    { date: '2025.03.01', title: 'First Date', desc: 'The day everything started...' },
    { date: '2025.06.15', title: 'First Trip', desc: 'Our first travel memory together.' },
    { date: '2025.12.25', title: 'First Christmas', desc: 'A warm winter with you.' },
    { date: '2026.03.01', title: 'One Year Anniversary', desc: 'Happy 1st Anniversary, Howard & Victoria!' },
  ];

  return (
    <section id="story" className="container" style={{ textAlign: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#4a4a4a' }}
      >
        Our Journey
      </motion.h2>
      
      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* 中心軸線 */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: '#f8bbd0',
          transform: 'translateX(-50%)'
        }} />

        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            style={{
              display: 'flex',
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
              paddingRight: index % 2 === 0 ? '50%' : '0',
              paddingLeft: index % 2 === 0 ? '0' : '50%',
              marginBottom: '50px',
              position: 'relative'
            }}
          >
            <div style={{
              width: '80%',
              padding: '25px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              textAlign: index % 2 === 0 ? 'right' : 'left',
              border: '1px solid #fce4ec'
            }}>
              <span className="romantic-text" style={{ color: '#f06292', fontSize: '1.2rem', fontWeight: 'bold' }}>{event.date}</span>
              <h3 style={{ margin: '10px 0', color: '#4a4a4a' }}>{event.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{event.desc}</p>
            </div>

            {/* 中心圓點 */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '16px',
              height: '16px',
              backgroundColor: '#f06292',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              border: '3px solid #fff'
            }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
