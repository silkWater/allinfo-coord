import React from 'react';
import './style.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>&copy; {currentYear} 지도 기반 좌표변환 서비스 | WGS84 ↔ UTM</p>
      </div>
    </footer>
  );
};

export default Footer;
