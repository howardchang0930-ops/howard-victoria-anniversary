import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import momentsData from '../data/moments.json';

interface Moment {
  id: number;
  filename: string;
  caption: string;
  filter: string;
  aspectRatio: string;
  type: string;
}

const Gallery: React.FC = () => {
  const [moments, setMoments] = useState<Moment[]>([]);

  useEffect(() => {
    setMoments(momentsData);
  }, []);

  const getFilterStyle = (filterType: string) => {
    switch (filterType) {
      case 'romantic': return 'sepia(0.3) saturate(1.2) brightness(0.9) contrast(1.1)';
      case 'warm': return 'sepia(0.2) saturate(1.4) brightness(0.95)';
      case 'vintage': return 'grayscale(0.4) contrast(1.3) sepia(0.3)';
      default: return 'brightness(0.9) contrast(1.1)';
    }
  };

  return (
    <section id="gallery" className="container" style={{ padding: '150px 5%', backgroundColor: 'var(--bg-light)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <p style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', marginBottom: '10px' }}>Exhibition of Us</p>
        <h2 style={{ fontSize: '3rem', color: 'var(--text-main)' }}>Captured Memories</h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {moments.map((moment, index) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            style={{ cursor: 'none' }} // Using global custom cursor
          >
            <div style={{
              width: '100%',
              aspectRatio: moment.aspectRatio,
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '2px', // sharp elegant edges
            }}>
              <motion.img 
                src={`./uploads/${moment.filename}`} 
                alt={moment.caption}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: getFilterStyle(moment.filter),
                  display: 'block'
                }}
              />
              {/* Elegant dark overlay on hover */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '30px'
                }}
              >
                <p className="romantic-text" style={{ 
                  fontSize: '1.8rem', 
                  color: 'var(--accent-gold-light)',
                  margin: 0
                }}>
                  {moment.caption}
                </p>
              </motion.div>
            </div>
            {/* Minimal caption below */}
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>NO. 0{index + 1}</span>
              <span style={{ color: 'var(--text-main)', fontSize: '0.9rem', letterSpacing: '1px' }}>{moment.caption.toUpperCase()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
