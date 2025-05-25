import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PriceCard from "../components/PriceCard/PriceCard";
import Gallery from '../components/Gallery/Gallery';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import Loading from '../components/Loading/Loading';
import '../styles/departamento.css';
import NotFound from './NotFound';

// Move images array outside component
const galleryImages = [
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

function SantaFe3770() {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const openGallery = (index) => {
    setSelectedImage(index);
    setShowGallery(true);
  };

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
              poster="img/img-santa-fe10.jpg"
            >
              <source src="video/video-portada-pricipal.mp4" type="video/mp4" />
              <img src="img/img-santa-fe15.jpg" alt="Departamento Santa Fe 3770 - Confort y Espacio" />
            </video>
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
                        amount="USD 1200"
                        details="No incluye servicios y limpieza semanal"
                        whatsappMessage="Me interesa el departamento en Santa Fe 3770 para alquiler mensual"
                      />
                      <PriceCard 
                        title="Por Semana"
                        amount="USD 400"
                        details="No incluye una limpieza"
                        whatsappMessage="Me interesa el departamento en Santa Fe 3770 para alquiler semanal"
                      />
                      <PriceCard 
                        title="Por Día"
                        amount="USD 70"
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
                        Exclusivo departamento de lujo en Palermo Botánico. Ubicación privilegiada con excelente conectividad. Amenities premium: piscina olímpica, gimnasio equipado, jardín zen, parrilla y área de juegos. WiFi de alta velocidad en todo el edificio. Seguridad 24/7 y protocolos sanitarios vigentes. Ideal para estadías ejecutivas o turísticas.
                      </p>
                      <hr />
                      <p lang="en">
                        <strong>In English:</strong><br />
                        Luxury studio in Palermo Botánico. Prime location with excellent connectivity. Premium amenities: Olympic pool, fully equipped gym, zen garden, BBQ area, and games room. High-speed WiFi throughout the building. 24/7 security and up-to-date health protocols. Perfect for business or tourist stays.
                      </p>
                      <hr />
                      <p lang="pt">
                        <strong>Em Português:</strong><br />
                        Apartamento de luxo no Palermo Botánico. Localização privilegiada com excelente conectividade. Comodidades premium: piscina olímpica, academia equipada, jardim zen, churrasqueira e área de jogos. WiFi de alta velocidade em todo o prédio. Segurança 24/7 e protocolos sanitários atualizados. Ideal para estadias executivas ou turísticas.
                      </p>
                    </div>
                  </div>
                  
                  {/* Comodidades Destacadas */}
                  <div className="amenities-list mb-5">
                    <h3 className="h5 mb-3 text-center"><i className="fas fa-star"></i> Amenities Premium</h3>
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-tv"></i> Entretenimiento</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-tv"></i> Smart TV 49"</li>
                          <li><i className="fas fa-wifi"></i> WiFi 300MB Fibra Óptica</li>
                          <li><i className="fas fa-snowflake"></i> Aire Acondicionado Split</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-swimming-pool"></i> Edificio</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-swimming-pool"></i> Piscina Olímpica</li>
                          <li><i className="fas fa-dumbbell"></i> Gimnasio Equipado</li>
                          <li><i className="fas fa-tree"></i> Jardín Zen</li>
                          <li><i className="fas fa-shield-alt"></i> Seguridad 24hs</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-home"></i> Departamento</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-bed"></i> Cama Queen Size</li>
                          <li><i className="fas fa-bath"></i> Baño Completo</li>
                          <li><i className="fas fa-utensils"></i> Cocina Full Equipped</li>
                          <li><i className="fas fa-tshirt"></i> Laundry</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <section className="gallery-section">
                    <h2><i className="fas fa-images"></i> Galería de Imágenes</h2>
                    <div className="gallery-container">
                      {galleryImages.map((img, index) => (
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
          
          {showGallery && (
            <Gallery 
              images={galleryImages}
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