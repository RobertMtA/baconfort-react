import { useEffect, useState } from 'react';
import './Carousel.css';

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Images for the carousel
  const images = [
    { src: 'img/img-portada-moldes-1680.jpg', alt: 'Moldes 1680' },
    { src: '/img/img-portada-santa-fe-3770.jpg', alt: 'Santa Fe 3770' },
    { src: '/img/img-portada-dorrego-1548.jpg', alt: 'Dorrego 1548' },
    { src: '/img/img-portada-convencion-1994.jpg', alt: 'Convención 1994' },
    { src: '/img/img-portada-ugarteche-2824.jpg', alt: 'Ugarteche 2824' }
  ];

  useEffect(() => {
    // Auto-advance carousel
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <section id="indexCarousel" className="carousel slide" aria-label="Galería de imágenes">
      <h3 className="visually-hidden">Galería de Imágenes</h3>
      
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            data-bs-target="#indexCarousel"
            data-bs-slide-to={index}
            className={index === activeIndex ? 'active' : ''}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
      
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div 
            key={`slide-${index}`}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
          >
            <img 
              src={image.src} 
              className="d-block w-100" 
              alt={image.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
      
      <button 
        className="carousel-control-prev" 
        type="button" 
        onClick={handlePrev}
        aria-label="Anterior"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      
      <button 
        className="carousel-control-next" 
        type="button" 
        onClick={handleNext}
        aria-label="Siguiente"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </section>
  );
}

export default Carousel;