import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PriceCard from "../components/PriceCard/PriceCard";
import Gallery from '../components/Gallery/Gallery';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import Loading from '../components/Loading/Loading';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import ReviewsSection from '../components/ReviewsSection/ReviewsSection';
import { useNavbar } from '../hooks/useNavbar';
import { useGallery } from '../hooks/useGallery';
import { useProperty } from '../hooks/useProperty';
import { useAdmin } from '../context/AdminContext';
import ImageUtils from '../utils/ImageUtils';
import '../styles/departamento.css';
import NotFound from './NotFound';



function SantaFe3770() {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { navbarOpen, toggleNavbar, closeNavbar } = useNavbar();
  const { data, loadPropertiesFromBackend } = useAdmin();
  
  // Cargar galería desde la base de datos
  const { 
    images: galleryImages, 
    loading: galleryLoading, 
    error: galleryError, 
    mainImage,
    refreshGallery 
  } = useGallery('santafe3770');

  // Cargar información completa de la propiedad desde el backend
  const {
    property: backendProperty,
    loading: isPropertyLoading,
    error: propertyError
  } = useProperty('santafe3770');
  
  // Obtener datos de la propiedad desde el contexto admin como fallback
  const adminProperty = data?.properties?.['santa-fe-3770'];
  
  // Usar datos del backend si están disponibles, sino usar datos del admin
  const property = backendProperty || adminProperty;

  useEffect(() => {
    // Log de la información de la propiedad cuando se carga
    if (backendProperty) {
      console.log('🏠 SANTA FE 3770: Propiedad cargada desde backend:', backendProperty);
      console.log('💰 SANTA FE 3770: Precios recibidos:', backendProperty.prices);
    }
    if (adminProperty) {
      console.log('🏠 SANTA FE 3770: Propiedad desde admin context:', adminProperty);
      console.log('💰 SANTA FE 3770: Precios admin:', adminProperty.prices);
    }
  }, [backendProperty, adminProperty]);
  
  // Usar imágenes de la base de datos o fallback a imágenes estáticas
  const images = galleryImages.length > 0 ? galleryImages : [
    '/img/img-santa-fe1.jpg',
    '/img/img-santa-fe2.jpg',
    '/img/img-santa-fe3.jpg',
    '/img/img-santa-fe4.jpg',
    '/img/img-santa-fe5.jpg',
    '/img/img-santa-fe6.jpg',
    '/img/img-santa-fe7.jpg',
    '/img/img-santa-fe8.jpg',
    '/img/img-santa-fe9.jpg',
    '/img/img-santa-fe10.jpg',
    '/img/img-santa-fe11.jpg',
    '/img/img-santa-fe12.jpg',
    '/img/img-santa-fe13.jpg',
    '/img/img-santa-fe14.jpg',
    '/img/img-santa-fe15.jpg',
    '/img/img-santa-fe16.jpg',
    '/img/img-santa-fe17.jpg',
    '/img/img-santa-fe18.jpg',
    '/img/img-santa-fe19.jpg'
  ];

  // Procesar imágenes con ImageUtils
  const processedImages = images.map(img => ImageUtils.getImageSrc(img));

  useEffect(() => {
    // Simular carga de imágenes y esperar a que se cargue la galería
    const loadImages = async () => {
      // Esperar a que la galería termine de cargar
      if (galleryLoading) {
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
  }, [galleryLoading]); // Dependencia del estado de carga de la galería

  const openGallery = (index) => {
    setSelectedImage(index);
    setShowGallery(true);
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = processedImages.map(src => {
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
  }, [processedImages]);

  return (
    <>
      {window.location.pathname !== '/santafe3770' ? (
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
              src={ImageUtils.getVideoSrc(property?.heroVideo) || "/video/video-portada-santa-fe-3770.mp4"}
              poster={ImageUtils.getImageSrc(mainImage || property?.coverImage || "/img/img-santa-fe10.jpg")}
              title={property?.title || "Departamento Santa Fe 3770"}
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

          <main className="departamento-page">
            <section id="servicios" className="services container py-5">
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <h1 className="text-center mb-4"><i className="fas fa-building"></i> Palermo Lifestylet</h1>
                  <h2 className="h4 text-center mb-4"><i className="fas fa-map-marker-alt"></i>   Santa Fe 3770 - Confort y Espacio</h2>
                  
                  <div className="property-features mb-5">
                    <div className="row text-center">
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-building fa-2x mb-2 feature-icon building-icon"></i>
                        <p> 12° Piso con Ascensor</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-bed fa-2x mb-2 feature-icon bed-icon"></i>
                        <p> 2 Dormitorios</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-snowflake fa-2x mb-2 feature-icon ac-icon"></i>
                        <p>Aire Acondicionado F/C</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-users fa-2x mb-2 feature-icon people-icon"></i>
                        <p>Para 2 Huéspedes</p>
                      </div>
                    </div>
                  </div>
                  <div id="precio-de-alquiler" className="pricing-container">
                    <h2 className="pricing-title"><i className="fas fa-dollar-sign"></i> Valor del Alquiler</h2>
                    <div className="pricing-cards">
                      <PriceCard 
                        title="Por Mes"
                        amount={property?.prices?.monthly || "USD 1300"}
                        details="No incluye servicios y limpieza semanal"
                        whatsappMessage="Me interesa el departamento en Santa Fe 3770 para alquiler mensual"
                      />
                      <PriceCard 
                        title="Por Semana"
                        amount={property?.prices?.weekly || "USD 420"}
                        details="No incluye una limpieza"
                        whatsappMessage="Me interesa el departamento en Santa Fe 3770 para alquiler semanal"
                      />
                      <PriceCard 
                        title="Por Día"
                        amount={property?.prices?.daily || "USD 75"}
                        details="Mínimo 3 noches"
                        whatsappMessage="Me interesa el departamento en Santa Fe 3770 para alquiler diario"
                      />
                    </div>
                  </div>

                  <div className="service">
                    <h3>
                      <i className="fas fa-home" aria-hidden="true"></i> Chic Studio by Jardín Botánico<br />
                      <i className="fas fa-map-marker-alt" aria-hidden="true"></i> Av. Santa Fe 3770<br />
                    </h3>
                    <div className="description">
                      <p lang="es">
                        <strong>En Español:</strong><br />
                        {property?.description?.es || "Moderno departamento de un ambiente en el corazón de Palermo con todas las comodidades necesarias."}
                      </p>
                      <hr />
                      <p lang="en">
                        <strong>In English:</strong><br />
                        {property?.description?.en || "Modern one-bedroom apartment in the heart of Palermo with all necessary amenities."}
                      </p>
                      <hr />
                      <p lang="pt">
                        <strong>Em Português:</strong><br />
                        {property?.description?.pt || "Apartamento moderno de um ambiente no coração de Palermo com todas as comodidades necessárias."}
                      </p>
                    </div>
                  </div>
                  
                  {/* Comodidades Destacadas */}
                  <div className="amenities-list mb-5">
                    <h3 className="h5 mb-3 text-center"><i className="fas fa-star"></i> Amenities Premium</h3>
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-home"></i> Departamento</h4>
                        <ul className="list-unstyled">
                          {property?.amenities?.departamento?.map((amenity, index) => (
                            <li key={index}><i className={amenity.icon}></i> {amenity.text}</li>
                          )) || (
                            <>
                              <li><i className="fas fa-tv"></i> Smart TV 49"</li>
                              <li><i className="fas fa-wifi"></i> WiFi 300MB Fibra Óptica</li>
                              <li><i className="fas fa-snowflake"></i> Aire Acondicionado Split</li>
                              <li><i className="fas fa-bed"></i> Cama Queen Size</li>
                              <li><i className="fas fa-bath"></i> Baño Completo</li>
                              <li><i className="fas fa-utensils"></i> Cocina Full Equipped</li>
                            </>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-plus-circle"></i> Servicios</h4>
                        <ul className="list-unstyled">
                          {property?.amenities?.servicios?.map((amenity, index) => (
                            <li key={index}><i className={amenity.icon}></i> {amenity.text}</li>
                          )) || (
                            <>
                              <li><i className="fas fa-shield-alt"></i> Seguridad 24hs</li>
                              <li><i className="fas fa-tshirt"></i> Laundry</li>
                            </>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-spa"></i> Amenities</h4>
                        <ul className="list-unstyled">
                          {property?.amenities?.amenitiesEdificio?.map((amenity, index) => (
                            <li key={index}><i className={amenity.icon}></i> {amenity.text}</li>
                          )) || (
                            <>
                              <li><i className="fas fa-swimming-pool"></i> Piscina Olímpica</li>
                              <li><i className="fas fa-dumbbell"></i> Gimnasio Equipado</li>
                              <li><i className="fas fa-tree"></i> Jardín Zen</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <section className="gallery-section">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <h2><i className="fas fa-images"></i> Galería de Imágenes</h2>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={loadPropertiesFromBackend}
                          className="btn btn-sm btn-outline-success"
                          title="Actualizar precios desde admin"
                        >
                          <i className="fas fa-dollar-sign"></i> Actualizar Precios
                        </button>
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
                          <img src={img} alt={`Departamento Santa Fe 3770 - ${index + 1}`} loading="lazy" />
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
                      <i className="fas fa-map-marker-alt"></i> Ubicación Santa Fe 3770
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.7660184958695!2d-58.419351225655085!3d-34.584786556496226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb57f7a315c89%3A0x77e5993c26725c26!2sAv.%20Sta.%20Fe%203770%2C%20C1425%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1746478051004!5m2!1ses-419!2sar" 
                      width="100%" 
                      height="450" 
                      style={{border:0}}
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa de Santa Fe 3770"
                    ></iframe>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="location-details mb-4">
                      <h3 className="h4">Puntos de interés cercanos:</h3>
                      <ul className="list-unstyled">
                      <li><i class="fas fa-subway"></i> Subte Línea D - Scalabrini Ortiz (1 min)</li>
                                <li><i class="fas fa-store"></i> Av. Santa Fe - Zona comercial (1 min)</li>
                                <li><i class="fas fa-tree"></i> Jardín Botánico Carlos Thays (2 min)</li>
                                <li><i class="fas fa-shopping-cart"></i> Alto Palermo Shopping (15 min)</li>
                                <li><i class="fas fa-hospital"></i> Hospital Italiano (10 min)</li>
                                <li><i class="fas fa-hospital"></i> Sanatorio Güemes (8 min)</li>
                                <li><i class="fas fa-bus"></i> Múltiples líneas de colectivo</li>
                                <li><i class="fas fa-coffee"></i> Cafeterías y restaurantes (1 min)</li>
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

          {/* Sección de Reseñas */}
          <ReviewsSection propertyId="santafe3770" />
          
          {showGallery && (
            <Gallery 
              images={processedImages}
              currentIndex={selectedImage}
              onClose={() => setShowGallery(false)}
            />
          )}
        </>
      )}
    </>
  );
}

export default SantaFe3770;