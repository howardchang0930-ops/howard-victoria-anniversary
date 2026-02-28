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
    // 這裡我們載入剛才建立的 moments.json 資料
    setMoments(momentsData);
  }, []);

  // 浪漫濾鏡定義
  const getFilterStyle = (filterType: string) => {
    switch (filterType) {
      case 'romantic': return 'sepia(0.2) saturate(1.2) brightness(1.05)';
      case 'warm': return 'sepia(0.3) saturate(1.1) contrast(1.1)';
      case 'vintage': return 'grayscale(0.1) contrast(1.2) sepia(0.2)';
      default: return 'none';
    }
  };

  return (
    <section id="gallery" className="container" style={{ textAlign: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#4a4a4a' }}
      >
        Captured Memories
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {moments.map((moment, index) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, rotate: index % 2 === 0 ? -2 : 2, y: 20 }}
            whileInView={{ opacity: 1, rotate: index % 2 === 0 ? -1 : 1, y: 0 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0, 
              zIndex: 10,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)' 
            }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{
              padding: '15px 15px 50px 15px',
              backgroundColor: '#fff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0',
              borderRadius: '2px', // 拍立得通常是直角或微圓角
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '100%',
              aspectRatio: moment.aspectRatio,
              overflow: 'hidden',
              backgroundColor: '#eee',
              marginBottom: '15px',
              position: 'relative'
            }}>
              {/* 自動美化照片：object-fit: cover 會自動填充並裁切多餘部分 */}
              <img 
                src={`/src/assets/uploads/${moment.filename}`} 
                alt={moment.caption}
                onError={(e) => {
                  // 如果還沒上傳真實照片，顯示一個精美的佔位符
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop`;
                }}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: getFilterStyle(moment.filter),
                  transition: 'filter 0.3s ease'
                }}
              />
            </div>
            
            {/* 手寫字體風格說明文字 */}
            <p className="romantic-text" style={{ 
              fontSize: '1.4rem', 
              color: '#555',
              marginTop: '10px',
              letterSpacing: '1px'
            }}>
              {moment.caption}
            </p>
          </motion.div>
        ))}
      </div>
      
      <div style={{ marginTop: '50px', fontStyle: 'italic', color: '#999' }}>
        <p>Adding more stories to our library...</p>
      </div>
    </section>
  );
};

export default Gallery;
