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
  '/img/img-convencion1.jpg',
  '/img/img-convencion2.jpg',
  '/img/img-convencion3.jpg',
  '/img/img-convencion4.jpg',
  '/img/img-convencion5.jpg',
  '/img/img-convencion6.jpg',
  '/img/img-convencion7.jpg',
  '/img/img-convencion8.jpg',
  '/img/img-convencion9.jpg',
  '/img/img-convencion10.jpg',
  '/img/img-convencion11.jpg'
];

function Convencion1994() {
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
      {window.location.pathname !== '/convencion1994' ? (
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
              poster="img/img-convencion1.jpg"
            >
              <source src="/video/video-portada-convencion-1994.mp4" type="video/mp4" />
              <img src="img/img-convencion11.jpg" alt="Departamento Convención 1994" />
            </video>
            <div className="video-overlay"></div>
            <div className="video-content">
            
            </div>
          </div>

          <main className="departamento-page">
            <section id="servicios" className="services container py-5">
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <h1 className="text-center mb-4"><i className="fas fa-building"></i> Palermo Lifestyle en el corazón de Palermo</h1>
                  <h2 className="h4 text-center mb-4"><i className="fas fa-map-marker-alt"></i> Convención 1994 - Confort y Espacio</h2>
                  
                  <div className="property-features mb-5">
                    <div className="row text-center">
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-building fa-2x mb-2 feature-icon building-icon"></i>
                        <p>5° Piso con Ascensor</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-bed fa-2x mb-2 feature-icon bed-icon"></i>
                        <p>Studio con Living-Cocina</p>
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
                        details="Incluye servicios y limpieza semanal"
                        whatsappMessage="Me interesa el departamento en Convención 1994 para alquiler mensual"
                      />
                      <PriceCard 
                        title="Por Semana"
                        amount="USD 400"
                        details="Incluye una limpieza"
                        whatsappMessage="Me interesa el departamento en Convención 1994 para alquiler semanal"
                      />
                      <PriceCard 
                        title="Por Día"
                        amount="USD 70"
                        details="Mínimo 3 noches"
                        whatsappMessage="Me interesa el departamento en Convención 1994 para alquiler diario"
                      />
                    </div>
                  </div>

                  <div className="service">
                    <h3>
                      <i className="fas fa-home" aria-hidden="true"></i> Palermo Lifestyle en el corazón de Palermo<br />
                      <i className="fas fa-map-marker-alt" aria-hidden="true"></i> Convención 1994
                    </h3>
                    <div className="description">
                      <p lang="es">
                        <strong>En Español:</strong><br />
                        Exclusivo estudio para dos personas en edificio boutique con amenities premium en Palermo Hollywood. Diseño moderno, espacios luminosos y todas las comodidades para una estadía perfecta. Ubicación privilegiada cerca de restaurantes, bares y transporte público.
                      </p>
                      <hr />
                      <p lang="en">
                        <strong>In English:</strong><br />
                        Exclusive studio for two in a boutique building with premium amenities in Palermo Hollywood. Modern design, bright spaces, and all the comforts for a perfect stay. Prime location near restaurants, bars, and public transportation.
                      </p>
                      <hr />
                      <p lang="pt">
                        <strong>Em Português:</strong><br />
                        Estúdio exclusivo para duas pessoas em edifício boutique com amenidades premium em Palermo Hollywood. Design moderno, espaços luminosos e todas as comodidades para uma estadia perfeita. Localização privilegiada próxima a restaurantes, bares e transporte público.
                      </p>
                    </div>
                  </div>
                  {/* Comodidades Premium */}
                  <div className="amenities-list mb-5">
                    <h3 className="h5 mb-3 text-center"><i className="fas fa-star"></i> Comodidades Premium</h3>
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-home"></i> Departamento</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-tv"></i> Smart TV 32"</li>
                          <li><i className="fas fa-wifi"></i> WiFi 300MB Fibra Óptica</li>
                          <li><i className="fas fa-snowflake"></i> Aire Acondicionado F/C</li>
                          <li><i className="fas fa-door-closed"></i> Balcón con Vista</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-plus-circle"></i> Servicios</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-shield-alt"></i> Seguridad 24hs</li>
                          <li><i className="fas fa-tshirt"></i> Lavarropas y Laundry</li>
                          <li><i className="fas fa-concierge-bell"></i> Recepción</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-spa"></i> Amenities</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-dumbbell"></i> Gimnasio</li>
                          <li><i className="fas fa-swimming-pool"></i> Piscina Climatizada</li>
                          <li><i className="fas fa-hot-tub"></i> Sauna & Jacuzzi</li>
                          <li><i className="fas fa-sun"></i> Solarium & Terraza</li>
                          <li><i className="fas fa-users"></i> SUM</li>
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
                      <i className="fas fa-map-marker-alt"></i> Ubicación Convención 1994
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.9794528214347!2d-58.443187525655496!3d-34.57938645621117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5eb56f5992b%3A0x95ec69c6c92a8551!2sConvenci%C3%B3n%201994%2C%20C1414%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1746470781616!5m2!1ses-419!2sar" 
                      width="100%" 
                      height="450" 
                      style={{border:0}}
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa de Convención 1994"
                    ></iframe>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="location-details mb-4">
                      <h3 className="h4">Puntos de interés cercanos:</h3>
                      <ul className="list-unstyled">
                      <li><i class="fas fa-utensils"></i> Polo Gastronómico Palermo (5 min)</li>
                                <li><i class="fas fa-store"></i> Mercado de Pulgas (5 min)</li>
                                <li><i class="fas fa-subway"></i> Subte Línea D - Ministro Carranza (10 min)</li>
                                <li><i class="fas fa-subway"></i> Subte Línea B - Dorrego (12 min)</li>
                                <li><i class="fas fa-bus"></i> Metrobús Av. Juan B. Justo</li>
                                <li><i class="fas fa-shopping-cart"></i> Plaza Serrano (15 min)</li>
                                <li><i class="fas fa-coffee"></i> Cafeterías y Restaurantes (2-5 min)</li>
                                <li><i class="fas fa-walking"></i> Zona altamente transitable y segura</li>
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

export default Convencion1994;