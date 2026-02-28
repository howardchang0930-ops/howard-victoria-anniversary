import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import momentsData from '../data/moments.json';

const Gallery: React.FC = () => {
  const [moments, setMoments] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMoments(momentsData);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="gallery" className="container" style={{ padding: isMobile ? '80px 5%' : '150px 5%', backgroundColor: 'var(--bg-light)', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        style={{ marginBottom: isMobile ? '40px' : '80px' }}
      >
        <p style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '15px' }}>Gallery of Moments</p>
        <h2 style={{ fontSize: isMobile ? '2.2rem' : '3.5rem', color: 'var(--text-main)' }}>回憶藝廊</h2>
      </motion.div>

      {moments.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ padding: '60px 20px', border: '1px dashed rgba(212,175,55,0.2)', borderRadius: '2px' }}
        >
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', letterSpacing: '2px' }}>
            回憶上傳中，靜候美好的瞬間...
          </p>
        </motion.div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {moments.map((moment: any, index: number) => (
            <div key={index}>
              {/* 照片顯示邏輯已準備好，只需填入 moments.json */}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;
