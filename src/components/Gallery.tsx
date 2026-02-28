import React from 'react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  // 之後你可以將這些 URL 替換成你們的真實照片
  const photos = [
    { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600', caption: 'Laughter' },
    { url: 'https://images.unsplash.com/photo-1516589174184-c685266d4af4?q=80&w=600', caption: 'Moments' },
    { url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=600', caption: 'Travels' },
    { url: 'https://images.unsplash.com/photo-1522673607200-1648482ce486?q=80&w=600', caption: 'Anniversary' },
  ];

  return (
    <section id="gallery" className="container" style={{ textAlign: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#4a4a4a' }}
      >
        Our Moments
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              position: 'relative',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            <img 
              src={photo.url} 
              alt={photo.caption} 
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '20px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
              color: 'white',
              textAlign: 'left'
            }}>
              <p className="romantic-text" style={{ fontSize: '1.2rem' }}>{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <p style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
        Click to see more memories soon...
      </p>
    </section>
  );
};

export default Gallery;
