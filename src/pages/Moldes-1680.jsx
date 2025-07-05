import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PriceCard from "../components/PriceCard/PriceCard";
import Gallery from '../components/Gallery/Gallery';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import ReviewsSection from '../components/ReviewsSection/ReviewsSection';
import Loading from '../components/Loading/Loading';
import VideoHero from '../components/VideoHero/VideoHero';
import { useGallery } from '../hooks/useGallery';
import { useProperty } from '../hooks/useProperty';
import ImageUtils from '../utils/ImageUtils';
import '../styles/departamento.css';
import NotFound from './NotFound';


function Moldes1680() {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { 
    images: galleryImages, 
    loading: isGalleryLoading, 
    error: galleryError,
    refreshGallery 
  } = useGallery('moldes-1680');

  // Cargar información completa de la propiedad desde el backend
  const {
    property,
    loading: isPropertyLoading,
    error: propertyError,
    refreshProperty,
    isUsingFallback
  } = useProperty('moldes-1680');

  // Debug: mostrar información sobre el estado de los datos
  useEffect(() => {
    console.log('🏠 MOLDES-1680 COMPONENT: Estado de datos:', {
      isPropertyLoading,
      isUsingFallback,
      hasProperty: !!property,
      amenitiesCount: property?.amenities ? {
        departamento: property.amenities.departamento?.length || 0,
        servicios: property.amenities.servicios?.length || 0,
        amenitiesEdificio: property.amenities.amenitiesEdificio?.length || 0
      } : null,
      propertyUpdatedAt: property?.updatedAt || 'No disponible'
    });
  }, [property, isPropertyLoading, isUsingFallback]);

  // Fallback images if database is empty
  const fallbackImages = [
    '/img/img-moldes1.jpg',
    '/img/img-moldes2.jpg',
    '/img/img-moldes3.jpg',
    '/img/img-moldes4.jpg',
    '/img/img-moldes5.jpg',
    '/img/img-moldes6.jpg',
  ];

  // Use gallery images from database or fallback to static images
  const images = galleryImages.length > 0 ? galleryImages : fallbackImages;

  // Procesar imágenes con ImageUtils
  const processedImages = images.map(img => ImageUtils.getImageSrc(img));

  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

  useEffect(() => {
    // Log de la información de la propiedad cuando se carga
    if (property) {
      console.log('🏠 MOLDES1680: Propiedad cargada desde backend:', property);
      console.log('💰 MOLDES1680: Precios recibidos:', property.prices);
      console.log('🎯 MOLDES1680: Comodidades recibidas:', property.amenities);
      
      // Log detallado de servicios
      if (property.amenities?.servicios) {
        console.log('🔍 MOLDES1680: Lista detallada de servicios:', 
          property.amenities.servicios.map((s, i) => `${i+1}. ${s.text}`)
        );
      }
    }
  }, [property]);

  // Auto-refresh cada 30 segundos para mantener sincronizadas las comodidades
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPropertyLoading) {
        console.log('🔄 MOLDES1680: Auto-refresh de comodidades');
        refreshProperty();
      }
    }, 30000); // 30 segundos

    return () => clearInterval(intervalId);
  }, [refreshProperty, isPropertyLoading]);

  useEffect(() => {
    // Simular carga de imágenes
    const loadImages = async () => {
      const images = document.querySelectorAll('img');
      const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve); // Handle error cases too
        });
      });

      await Promise.all(promises);
      setIsLoading(false);
    };

    loadImages();
  }, []);

  return (
    <>
      {!['/moldes1680', '/departamentos/moldes-1680'].includes(window.location.pathname) ? (
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
                  <li className="nav-item">
                    <a className="nav-link" href="#reseñas"><i className="fas fa-star nav-icon"></i> Reseñas</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Sección Hero con Video */}
          <VideoHero 
            videoSrc="/video/video-portada-moldes-1680.mp4"
            posterSrc="/img/img-moldes3.jpg"
            fallbackImage="/img/img-moldes5.jpg"
            altText="Departamento Moldes 1680"
          />

          <main className="departamento-page moldes-container">
            <section id="servicios" className="services container py-5">
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <h1 className="text-center mb-4"><i className="fas fa-building"></i> Belgrano Family Retreat</h1>
                  <h2 className="h4 text-center mb-4"><i className="fas fa-map-marker-alt"></i> Moldes 1680 - Confort y Espacio</h2>
                  
                  <div className="property-features mb-5">
                    <div className="row text-center">
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-building fa-2x mb-2 feature-icon"></i>
                        <p>2° Piso con Ascensor</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-bed fa-2x mb-2 feature-icon"></i>
                        <p>2 Dormitorios</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-snowflake fa-2x mb-2 feature-icon"></i>
                        <p>Aire Acondicionado F/C</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-users fa-2x mb-2 feature-icon"></i>
                        <p>Para 4 Huéspedes</p>
                      </div>
                    </div>
                  </div>

                  <div id="precio-de-alquiler" className="pricing-container">
                    <h2 className="pricing-title"><i className="fas fa-dollar-sign"></i> Valor del Alquiler</h2>
                    <div className="pricing-cards">
                      <PriceCard 
                        title="Por Mes"
                        amount={property?.prices?.monthly || "USD 1200"}
                        details="No incluye servicios y limpieza semanal"
                        whatsappMessage="Me interesa el departamento en Moldes 1680 para alquiler mensual"
                      />
                      <PriceCard 
                        title="Por Semana"
                        amount={property?.prices?.weekly || "USD 400"}
                        details="No incluye una limpieza"
                        whatsappMessage="Me interesa el departamento en Moldes 1680 para alquiler semanal"
                      />
                      <PriceCard 
                        title="Por Día"
                        amount={property?.prices?.daily || "USD 70"}
                        details="Mínimo 3 noches"
                        whatsappMessage="Me interesa el departamento en Moldes 1680 para alquiler diario"
                      />
                    </div>
                  </div>

                  <div className="service">
                    <h3>
                      <i className="fas fa-home"></i> Belgrano Family Retreat<br />
                      <i className="fas fa-map-marker-alt"></i> Moldes 1680 - Confort y Espacio
                    </h3>
                    <div className="description">
                      <p lang="es">
                        <strong>En Español:</strong><br />
                        {property?.description?.es || "Exclusivo departamento de dos ambientes en edificio boutique con amenities premium en Belgrano. Diseño moderno, espacios luminosos y todas las comodidades para una estadía perfecta."}
                      </p>
                      <hr />
                      <p lang="en">
                        <strong>In English:</strong><br />
                        {property?.description?.en || "Exclusive two-room apartment in a boutique building with premium amenities in Belgrano. Modern design, bright spaces, and all the comforts for a perfect stay."}
                      </p>
                      <hr />
                      <p lang="pt">
                        <strong>Em Português:</strong><br />
                        {property?.description?.pt || "Apartamento exclusivo de dois ambientes em edifício boutique com amenidades premium em Belgrano. Design moderno, espaços luminosos e todas as comodidades para uma estadia perfeita."}
                      </p>
                    </div>
                  </div>
                  
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
                          disabled={isPropertyLoading}
                        >
                          <i className={`fas fa-sync-alt ${isPropertyLoading ? 'fa-spin' : ''}`}></i>
                          {isPropertyLoading ? ' Actualizando...' : ' Actualizar'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Indicador de estado de datos */}
                    {isUsingFallback && (
                      <div className="alert alert-warning" role="alert">
                        <i className="fas fa-exclamation-triangle"></i>
                        <strong>Modo Offline:</strong> Mostrando datos de respaldo. 
                        <button 
                          className="btn btn-sm btn-outline-warning ms-2"
                          onClick={() => {
                            refreshProperty();
                            refreshGallery();
                          }}
                        >
                          <i className="fas fa-sync-alt"></i> Reconectar
                        </button>
                      </div>
                    )}
                    
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
                            {isPropertyLoading ? (
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
                          {isGalleryLoading ? ' (Cargando...)' : ''}
                          {galleryError ? ' (Error)' : ''}
                          {!isGalleryLoading && galleryImages.length > 0 ? ' ✅' : ''}
                          {!isGalleryLoading && galleryImages.length === 0 ? ' (Usando fallback)' : ''}
                        </div>
                        <button 
                          onClick={refreshGallery}
                          className="btn btn-sm btn-outline-primary"
                          title="Actualizar galería"
                        >
                          <i className="fas fa-sync-alt"></i> Actualizar
                        </button>
                      </div>
                    </div>
                    <div className="gallery-container">
                      {processedImages.map((img, index) => (
                        <div key={index} className="gallery-item" onClick={() => openGallery(index)}>
                          <img src={img} alt={`Departamento Moldes 1680 - ${index + 1}`} loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </section>
            <div className="col-lg-4">
                  {/* Add the ReservationForm here */}
                  <ReservationForm />
                </div>
            <section id="ubicacion" className="py-5 bg-light">
              <div className="container">
                <div className="row">
                  <div className="col-12 text-center mb-4">
                    <h2 className="section-title">
                      <i className="fas fa-map-marker-alt"></i> Ubicación Moldes 1680
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.4459416106006!2d-58.45894352565634!3d-34.56758125558819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5d0c68f12dd%3A0xaae761375ee581ce!2sMoldes%201680%2C%20C1426ALV%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1746476890169!5m2!1ses-419!2sar" 
                      width="100%" 
                      height="450" 
                      style={{border:0}}
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa de Moldes 1680"
                    ></iframe>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="location-details mb-4">
                      <h3 className="h4">Puntos de interés cercanos:</h3>
                      <ul className="list-unstyled">
                        <li><i className="fas fa-subway"></i> Subte Línea D - José Hernández (2 min)</li>
                        <li><i className="fas fa-store"></i> Av. Cabildo (5 min)</li>
                        <li><i className="fas fa-tree"></i> Barrancas de Belgrano (10 min)</li>
                        <li><i className="fas fa-utensils"></i> Barrio Chino (15 min)</li>
                        <li><i className="fas fa-bus"></i> Múltiples líneas de colectivo</li>
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

            {/* Sección de Reseñas */}
            <ReviewsSection propertyId="moldes1680" />
          </main>
          
          {showGallery && (
            <Gallery 
              images={images}
              currentIndex={currentImageIndex}
              onClose={() => setShowGallery(false)}
            />
          )}
        </>
      )}
    </>
  );
}

export default Moldes1680;