import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoveLetter: React.FC = () => {
  return (
    <section id="letter" className="container" style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '50px',
          backgroundColor: '#fff',
          borderRadius: '30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
          border: '1px solid #f8bbd0',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f06292',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 5px 15px rgba(240, 98, 146, 0.3)'
          }}>
            <Heart color="white" fill="white" size={24} />
          </div>
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#4a4a4a' }}>A Note for You</h2>
        
        <div style={{
          textAlign: 'left',
          lineHeight: '2',
          color: '#555',
          fontFamily: 'var(--font-base)',
          fontSize: '1.1rem'
        }}>
          <p style={{ marginBottom: '20px' }}>Dear Victoria,</p>
          <p style={{ marginBottom: '20px' }}>
            Looking back on this year, I feel so incredibly lucky to have you by my side. 
            Every moment we've shared, from the smallest laugh to our biggest adventures, 
            has been a part of a beautiful journey that I cherish every single day.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Thank you for being you, for your kindness, and for all the love you've given me. 
            I can't wait to see what the next year holds for us.
          </p>
          <p style={{ textAlign: 'right', marginTop: '40px' }}>
            With all my love,<br />
            <span className="romantic-text" style={{ fontSize: '1.8rem', color: '#f06292' }}>Howard</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
