import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PriceCard from "../components/PriceCard/PriceCard";
import Gallery from '../components/Gallery/Gallery';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import Loading from '../components/Loading/Loading';
import NotFound from './NotFound';

import '../styles/departamento.css';

// Define images array outside the component
const galleryImages = [
  '/img/img-ugarteche1.jpg',
  '/img/img-ugarteche2.jpg',
  '/img/img-ugarteche3.jpg',
  '/img/img-ugarteche4.jpg',
  '/img/img-ugarteche5.jpg',
  '/img/img-ugarteche6.jpg',
  '/img/img-ugarteche7.jpg',
  '/img/img-ugarteche8.jpg',
  '/img/img-ugarteche9.jpg'
];

function Ugarteche2824() {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = galleryImages.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const openGallery = (index) => {
    setSelectedImage(index);
    setShowGallery(true);
  };

  return (
    <>
      {window.location.pathname !== '/ugarteche2824' ? (
        <NotFound />
      ) : (
        <>
          {isLoading && <Loading />}
          {/* Navbar independiente */}
          <nav className="navbar navbar-expand-lg sticky-top convencion-navbar">
            <div className="container">
              <Link className="navbar-brand" to="/" aria-label="BACONFORT Home">
                <img 
                  src="/img/logo.jpg" 
                  alt="BACONFORT Logo" 
                  width="40" 
                  height="40" 
                  className="brand-logo"
                  loading="lazy"
                />
                <i className="fas fa-star ms-2 brand-icon" aria-hidden="true"></i> 
                <span className="brand-text">BACONFORT</span>
              </Link>
              <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/"><i className="fas fa-home nav-icon"></i> Inicio</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#servicios"><i className="fas fa-list nav-icon"></i> Detalles</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#ubicacion"><i className="fas fa-map-marker-alt nav-icon"></i> Ubicación</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#precio-de-alquiler"><i className="fas fa-tag nav-icon"></i> Precio</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    
      {/* Sección Hero con Video */}
      <div className="video-hero">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          className="hero-video"
          poster="img/img-ugarteche3.jpg"
        >
          <source src="video/video-portada-ugarteche-2824.mp4" type="video/mp4" />
          <img src="img/img-ugarteche6.jpg" alt="Departamento Ugarteche 2824" />
        </video>
        <div className="video-overlay"></div>
        <div className="video-content">
        
        </div>
      </div>

      <main className="departamento-page">
        <section id="servicios" className="services container py-5">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h1 className="text-center mb-4"><i className="fas fa-building"></i> Escape Urbano / Estilo y Comodidad en la Ciudad</h1>
              <h2 className="h4 text-center mb-4"><i className="fas fa-map-marker-alt"></i>   Ugarteche 2824</h2>
              
              <div className="property-features mb-5">
                <div className="row text-center">
                  <div className="col-md-3 col-6 mb-3">
                    <i className="fas fa-building fa-2x mb-2 feature-icon building-icon"></i>
                    <p> PH con Entrada Independiente</p>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <i className="fas fa-bed fa-2x mb-2 feature-icon bed-icon"></i>
                    <p> 1 Dormitorio</p>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <i className="fas fa-snowflake fa-2x mb-2 feature-icon ac-icon"></i>
                    <p>Aire Acondicionado F/C</p>
                  </div>
                  <div className="col-md-3 col-6 mb-3">
                    <i className="fas fa-users fa-2x mb-2 feature-icon people-icon"></i>
                    <p>Para 3 Huéspedes</p>
                  </div>
                </div>
              </div>
              <div id="precio-de-alquiler" className="pricing-container">
                <h2 className="pricing-title"><i className="fas fa-dollar-sign"></i> Valor del Alquiler</h2>
                <div className="pricing-cards">
                  <PriceCard 
                    title="Por Mes"
                    amount="USD 700"
                    details="No incluye servicios y limpieza semanal"
                    whatsappMessage="Me interesa el departamento en Ugarteche 2824 para alquiler mensual"
                  />
                  <PriceCard 
                    title="Por Semana"
                    amount="USD 400"
                    details="No incluye una limpieza"
                    whatsappMessage="Me interesa el departamento en Ugarteche 2824 para alquiler semanal"
                  />
                  <PriceCard 
                    title="Por Día"
                    amount="USD 60"
                    details="Mínimo 3 noches"
                    whatsappMessage="Me interesa el departamento en Ugarteche 2824 para alquiler diario"
                  />
                </div>
              </div>

              <div className="service">
                <h3>
                  <i className="fas fa-home" aria-hidden="true"></i> Escape Urbano / Estilo y Comodidad en la Ciudad<br />
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i> Ugarteche 2824<br />
                </h3>
                <div className="description">
                  <p lang="es">
                    <strong>En Español:</strong><br />
                    Exclusivo PH tipo casa totalmente reciclado a nuevo en un edificio centenario de gran categoría. Entrada independiente en una de las mejores zonas de Palermo, a solo metros del Jardín Botánico de Buenos Aires. Completamente equipado para 2 o 3 huéspedes. Diseño moderno que conserva el encanto histórico del edificio.
                  </p>
                  <hr />
                  <p lang="en">
                    <strong>In English:</strong><br />
                    Exclusive house-style PH completely renovated in a high-class centennial building. Independent entrance in one of the best areas of Palermo, just meters from the Buenos Aires Botanical Garden. Fully equipped for 2 or 3 guests. Modern design that preserves the building's historical charm.
                  </p>
                  <hr />
                  <p lang="pt">
                    <strong>Em Português:</strong><br />
                    PH exclusivo tipo casa totalmente renovado em um edifício centenário de alto padrão. Entrada independente em uma das melhores áreas de Palermo, a poucos metros do Jardim Botânico de Buenos Aires. Totalmente equipado para 2 ou 3 hóspedes. Design moderno que preserva o charme histórico do edifício.
                  </p>
                </div>
              </div>
              
              {/* Comodidades Destacadas */}
              <div className="amenities-list mb-5">
                <h3 className="h5 mb-3 text-center"><i className="fas fa-star"></i> Comodidades Destacadas</h3>
                <div className="row">
                  <div className="col-md-4">
                    <h4 className="h6 mb-3"><i className="fas fa-tv"></i> Entretenimiento</h4>
                    <ul className="list-unstyled">
                      <li><i className="fas fa-tv"></i> Smart TV 55"</li>
                      <li><i className="fas fa-wifi"></i> WiFi 300MB Fibra Óptica</li>
                      <li><i className="fas fa-snowflake"></i> Aire Acondicionado F/C</li>
                      <li><i className="fas fa-couch"></i> Living espacioso</li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h4 className="h6 mb-3"><i className="fas fa-home"></i> Características</h4>
                    <ul className="list-unstyled">
                      <li><i className="fas fa-door-closed"></i> Entrada independiente</li>
                      <li><i className="fas fa-warehouse"></i> Amplios Placards</li>
                      <li><i className="fas fa-bath"></i> Baño con ducha</li>
                      <li><i className="fas fa-bed"></i> Cama Queen Size</li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h4 className="h6 mb-3"><i className="fas fa-utensils"></i> Cocina</h4>
                    <ul className="list-unstyled">
                      <li><i className="fas fa-coffee"></i> Cafetera</li>
                      <li><i className="fas fa-blender"></i> Microondas</li>
                      <li><i className="fas fa-utensils"></i> Vajilla completa</li>
                      <li><i className="fas fa-wine-glass"></i> Cristalería</li>
                    </ul>
                  </div>
                </div>
              </div>

              <section className="gallery-section">
                <h2><i className="fas fa-images"></i> Galería de Imágenes</h2>
                <div className="gallery-container">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="gallery-item" onClick={() => openGallery(index)}>
                      <img src={img} alt={`Departamento Convención 1994 - ${index + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            <div className="col-lg-4">
              {/* Add the ReservationForm here */}
              <ReservationForm />
            </div>
          </div>
        </section>

        <section id="ubicacion" className="py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-4">
                <h2 className="section-title">
                  <i className="fas fa-map-marker-alt"></i> Ubicación Ugarteche 2824
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mb-4">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.8522399746353!2d-58.41651362565529!3d-34.58260515638102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb57edaf8ca5f%3A0x26e71942b423b3d7!2sUgarteche%202824%2C%20C1425%20EVB%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1746481698229!5m2!1ses-419!2sar" 
                  width="100%" 
                  height="450" 
                  style={{border:0}}
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Ugarteche 2824"
                ></iframe>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="location-details mb-4">
                  <h3 className="h4">Puntos de interés cercanos:</h3>
                  <ul className="list-unstyled">
                  <li><i class="fas fa-subway"></i> Subte Línea D - Scalabrini Ortiz (1 min)</li>
                  <li><i class="fas fa-subway"></i> Subte Línea D - Scalabrini Ortiz (5 min)</li>
                            <li><i class="fas fa-subway"></i> Subte Línea H - Estación Las Heras (15 min)</li>
                            <li><i class="fas fa-store"></i> Avenida Santa Fe y Las Heras (10 min)</li>
                            <li><i class="fas fa-shopping-cart"></i> Alto Palermo Shopping (15 min)</li>
                            <li><i class="fas fa-tree"></i> Jardín Botánico Carlos Thays (2 min)</li>
                            <li><i class="fas fa-hospital"></i> Hospital Italiano (10 min)</li>
                            <li><i class="fas fa-hospital"></i> Hospital Rivadavia (12 min)</li>
                            <li><i class="fas fa-bus"></i> Múltiples líneas de colectivo</li>
                            <li><i class="fas fa-utensils"></i> Zona gastronómica premium</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="house-rules mb-5 container">
          <h3 className="h5 mb-3 text-center">Información Importante</h3>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li><i className="fas fa-clock"></i> Check-in: 14:00</li>
                <li><i className="fas fa-clock"></i> Check-out: 11:00</li>
                <li><i className="fas fa-smoking-ban"></i> No fumar</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li><i className="fas fa-paw"></i> Mascotas permitidas (consultar)</li>
                <li><i className="fas fa-baby"></i> Apto para niños</li>
                <li><i className="fas fa-shield-alt"></i> Depósito de seguridad requerido</li>
              </ul>
            </div>
          </div>
        </div>

      
      </main>
      
      {showGallery && (
        <Gallery 
          images={galleryImages}
          currentIndex={selectedImage}
          onClose={() => setShowGallery(false)}
          onNavigate={setSelectedImage}
        />
      )}
        </>
      )}
    </>
  );
}

export default Ugarteche2824;