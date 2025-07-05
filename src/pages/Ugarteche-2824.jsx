import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PriceCard from "../components/PriceCard/PriceCard";
import Gallery from '../components/Gallery/Gallery';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import ReviewsSection from '../components/ReviewsSection/ReviewsSection';
import Loading from '../components/Loading/Loading';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import { useNavbar } from '../hooks/useNavbar';
import { useGallery } from '../hooks/useGallery';
import { useAdmin } from '../context/AdminContext';
import { useProperty } from '../hooks/useProperty';
import ImageUtils from '../utils/ImageUtils';
import NotFound from './NotFound';

import '../styles/departamento.css';



function Ugarteche2824() {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { navbarOpen, toggleNavbar, closeNavbar } = useNavbar();
  
  // Usar useProperty para obtener datos de la propiedad del backend
  const { 
    property, 
    loading: propertyLoading, 
    error: propertyError,
    refreshProperty,
    isUsingFallback
  } = useProperty('ugarteche-2824');
  
  // Cargar galería desde la base de datos
  const { 
    images: galleryImages, 
    loading: galleryLoading, 
    error: galleryError, 
    mainImage,
    refreshGallery 
  } = useGallery('ugarteche-2824');
  
  // Los precios ahora vienen directamente del backend a través de useProperty
  console.log('🏠 Ugarteche2824 - Property from backend:', property);
  
  // Usar imágenes de la base de datos o fallback a imágenes estáticas
  const images = galleryImages.length > 0 ? galleryImages : [
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

  // Procesar imágenes con ImageUtils
  const processedImages = images.map(img => ImageUtils.getImageSrc(img));

  useEffect(() => {
    // Simular carga de imágenes y esperar a que se cargue la galería y la propiedad
    const loadImages = async () => {
      // Esperar a que la galería y la propiedad terminen de cargar
      if (galleryLoading || propertyLoading) {
        return;
      }

      const images = document.querySelectorAll('img');
      const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      });

      await Promise.all(promises);
      setIsLoading(false);
    };

    loadImages();
  }, [galleryLoading, propertyLoading]); // Dependencia del estado de carga de la galería y la propiedad

  useEffect(() => {
    // Log para debugging - mostrar datos de la propiedad cuando cambien
    console.log('🔄 Ugarteche2824 - Property or gallery updated:', { property, galleryImages });
  }, [property, galleryImages]);

  // useEffect adicional removido ya que useProperty maneja la carga automáticamente

  const openGallery = (index) => {
    setSelectedImage(index);
    setShowGallery(true);
  };

  return (
    <>
      {!['/ugarteche2824', '/departamentos/ugarteche-2824'].includes(window.location.pathname) ? (
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
                onClick={toggleNavbar}
                aria-controls="navbarNav" 
                aria-expanded={navbarOpen} 
                aria-label="Abrir menú de navegación"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={`navbar-collapse ${navbarOpen ? 'show' : 'collapse'}`} id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/" onClick={closeNavbar} aria-label="Ir al inicio">
                      <i className="fas fa-home nav-icon" aria-hidden="true"></i> 
                      Inicio
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#servicios" onClick={closeNavbar} aria-label="Ver detalles de la propiedad">
                      <i className="fas fa-list nav-icon" aria-hidden="true"></i> 
                      Detalles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#ubicacion" onClick={closeNavbar} aria-label="Ver ubicación en el mapa">
                      <i className="fas fa-map-marker-alt nav-icon" aria-hidden="true"></i> 
                      Ubicación
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#reseñas" onClick={closeNavbar} aria-label="Ver reseñas de huéspedes">
                      <i className="fas fa-star nav-icon" aria-hidden="true"></i> 
                      Reseñas
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#precio-de-alquiler" onClick={closeNavbar} aria-label="Ver precios de alquiler">
                      <i className="fas fa-tag nav-icon" aria-hidden="true"></i> 
                      Precio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    
      {/* Sección Hero con Video */}
      <div className="video-hero">
        <VideoPlayer
          src={ImageUtils.getVideoSrc(property?.heroVideo) || "/video/video-portada-ugarteche-2824.mp4"}
          poster={ImageUtils.getImageSrc(mainImage || property?.coverImage || "/img/img-ugarteche3.jpg")}
          title={property?.title || "Departamento Ugarteche 2824"}
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          className="hero-video"
        />
        <div className="video-overlay"></div>
        <div className="video-content">
        
        </div>
      </div>

      <main className="departamento-page moldes-container">
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
                    amount={property?.prices?.monthly || "1250"}
                    details="No incluye servicios y limpieza semanal"
                    whatsappMessage="Me interesa el departamento en Ugarteche 2824 para alquiler mensual"
                  />
                  <PriceCard 
                    title="Por Semana"
                    amount={property?.prices?.weekly || "410"}
                    details="No incluye una limpieza"
                    whatsappMessage="Me interesa el departamento en Ugarteche 2824 para alquiler semanal"
                  />
                  <PriceCard 
                    title="Por Día"
                    amount={property?.prices?.daily || "72"}
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
                    {property?.description?.es || "Departamento de lujo en Palermo Botánico con vistas espectaculares."}
                  </p>
                  <hr />
                  <p lang="en">
                    <strong>In English:</strong><br />
                    {property?.description?.en || "Luxury apartment in Palermo Botánico with spectacular views."}
                  </p>
                  <hr />
                  <p lang="pt">
                    <strong>Em Português:</strong><br />
                    {property?.description?.pt || "Apartamento de luxo em Palermo Botânico com vistas espetaculares."}
                  </p>
                </div>
              </div>
              
              {/* Comodidades Destacadas */}
              <div className="amenities-list mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h5 mb-0">
                    <i className="fas fa-star"></i> Comodidades Destacadas
                    {isUsingFallback && (
                      <small className="text-warning ms-2" title="Datos locales - Backend no disponible">
                        <i className="fas fa-exclamation-triangle"></i>
                      </small>
                    )}
                  </h3>
                  <div className="d-flex align-items-center">
                    {isUsingFallback && (
                      <small className="text-muted me-2">Modo offline</small>
                    )}
                    <button 
                      onClick={refreshProperty}
                      className="btn btn-sm btn-outline-primary"
                      title="Actualizar comodidades"
                      disabled={propertyLoading}
                    >
                      <i className={`fas fa-sync-alt ${propertyLoading ? 'fa-spin' : ''}`}></i>
                      {propertyLoading ? ' Actualizando...' : ' Actualizar'}
                    </button>
                  </div>
                </div>
                
                {/* Mostrar comodidades dinámicas del backend */}
                {property?.amenities ? (
                  <div className="row">
                    {/* Departamento */}
                    {property.amenities.departamento && property.amenities.departamento.length > 0 && (
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-home"></i> Departamento</h4>
                        <ul className="list-unstyled">
                          {property.amenities.departamento.map((amenity, index) => (
                            <li key={`dept-${index}`}>
                              <i className={amenity.icon}></i> {amenity.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Servicios */}
                    {property.amenities.servicios && property.amenities.servicios.length > 0 && (
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-concierge-bell"></i> Servicios</h4>
                        <ul className="list-unstyled">
                          {property.amenities.servicios.map((amenity, index) => (
                            <li key={`serv-${index}`}>
                              <i className={amenity.icon}></i> {amenity.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Amenities del Edificio */}
                    {property.amenities.amenitiesEdificio && property.amenities.amenitiesEdificio.length > 0 && (
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-building"></i> Amenities del Edificio</h4>
                        <ul className="list-unstyled">
                          {property.amenities.amenitiesEdificio.map((amenity, index) => (
                            <li key={`amenities-${index}`}>
                              <i className={amenity.icon}></i> {amenity.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Fallback: mostrar estado de carga o mensaje */
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-center text-muted p-4">
                        {propertyLoading ? (
                          <>
                            <i className="fas fa-spinner fa-spin"></i> 
                            <span className="ms-2">Cargando comodidades...</span>
                          </>
                        ) : propertyError ? (
                          <>
                            <i className="fas fa-exclamation-triangle text-warning"></i>
                            <span className="ms-2">Error cargando comodidades: {propertyError}</span>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-info-circle"></i>
                            <span className="ms-2">No hay comodidades disponibles</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <section className="gallery-section">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h2><i className="fas fa-images"></i> Galería de Imágenes</h2>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* Debug visual */}
                    <div style={{ 
                      padding: '5px 10px', 
                      fontSize: '12px', 
                      borderRadius: '4px',
                      backgroundColor: galleryImages.length > 0 ? '#d4edda' : '#f8d7da',
                      color: galleryImages.length > 0 ? '#155724' : '#721c24',
                      border: '1px solid ' + (galleryImages.length > 0 ? '#c3e6cb' : '#f5c6cb')
                    }}>
                      DB: {galleryImages.length} | Total: {images.length}
                      {galleryLoading ? ' (Cargando...)' : ''}
                      {galleryError ? ' (Error)' : ''}
                      {!galleryLoading && galleryImages.length > 0 ? ' ✅' : ''}
                      {!galleryLoading && galleryImages.length === 0 ? ' (Usando fallback)' : ''}
                    </div>
                    <button 
                      onClick={refreshGallery}
                      className="btn btn-sm btn-outline-primary"
                      title="Actualizar galería"
                    >
                      <i className="fas fa-sync-alt"></i> Actualizar Galería
                    </button>
                  </div>
                </div>
                <div className="gallery-container">
                  {processedImages.map((img, index) => (
                    <div key={index} className="gallery-item" onClick={() => openGallery(index)}>
                      <img src={img} alt={`Departamento Ugarteche 2824 - ${index + 1}`} loading="lazy" />
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
                  <li><i className="fas fa-subway"></i> Subte Línea D - Scalabrini Ortiz (1 min)</li>
                  <li><i className="fas fa-subway"></i> Subte Línea D - Scalabrini Ortiz (5 min)</li>
                            <li><i className="fas fa-subway"></i> Subte Línea H - Estación Las Heras (15 min)</li>
                            <li><i className="fas fa-store"></i> Avenida Santa Fe y Las Heras (10 min)</li>
                            <li><i className="fas fa-shopping-cart"></i> Alto Palermo Shopping (15 min)</li>
                            <li><i className="fas fa-tree"></i> Jardín Botánico Carlos Thays (2 min)</li>
                            <li><i className="fas fa-hospital"></i> Hospital Italiano (10 min)</li>
                            <li><i className="fas fa-hospital"></i> Hospital Rivadavia (12 min)</li>
                            <li><i className="fas fa-bus"></i> Múltiples líneas de colectivo</li>
                            <li><i className="fas fa-utensils"></i> Zona gastronómica premium</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Reseñas */}
        <section id="reseñas" className="py-5">
          <div className="container">
            <ReviewsSection propertyId="ugarteche2824" />
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