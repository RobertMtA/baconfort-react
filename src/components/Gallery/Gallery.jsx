import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Gallery.css';

const Gallery = ({ images, currentIndex, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex || 0);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-modal">
      <div className="gallery-overlay" onClick={onClose}></div>
      <button className="gallery-close-button" onClick={onClose}>
        <FaTimes />
      </button>
      <button className="gallery-nav-button prev" onClick={handlePrev}>
        <FaChevronLeft />
      </button>
      <div className="gallery-image-container">
        <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
      </div>
      <button className="gallery-nav-button next" onClick={handleNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Gallery;