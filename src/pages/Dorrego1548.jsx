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
  '/img/img-dorrego1.jpg',
  '/img/img-dorrego2.jpg',
  '/img/img-dorrego3.jpg',
  '/img/img-dorrego4.jpg',
  '/img/img-dorrego5.jpg',
  '/img/img-dorrego6.jpg',
  '/img/img-dorrego7.jpg',
  '/img/img-dorrego8.jpg',
  '/img/img-dorrego9.jpg',
  '/img/img-dorrego10.jpg',
  '/img/img-dorrego11.jpg',
  '/img/img-dorrego12.jpg',
  '/img/img-dorrego13.jpg',
  '/img/img-dorrego14.jpg',
  '/img/img-dorrego15.jpg',
  '/img/img-dorrego16.jpg',
  '/img/img-dorrego17.jpg',
  '/img/img-dorrego18.jpg'
];

function Dorrego1548() {
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
      {window.location.pathname !== '/dorrego1548' ? (
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
              poster="img/img-dorrego11.jpg"
            >
              <source src="video/video-portada-dorrego-1548.mp4" type="video/mp4" />
              <img src="img/img-dorrego2.jpg" alt="Departamento Dorrego 1548" />
            </video>
            <div className="video-overlay"></div>
            <div className="video-content">
            
            </div>
          </div>

          <main className="departamento-page">
            <section id="servicios" className="services container py-5">
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <h1 className="text-center mb-4"><i className="fas fa-building"></i> Palermo Hollywood Retreat</h1>
                  <h2 className="h4 text-center mb-4"><i className="fas fa-map-marker-alt"></i> Dorrego 1548 - Confort y Estilo</h2>
                  
                  <div className="property-features mb-5">
                    <div className="row text-center">
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-building fa-2x mb-2 feature-icon building-icon"></i>
                        <p> Planta Baja</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-bed fa-2x mb-2 feature-icon bed-icon"></i>
                        <p> 4 huespedes</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-snowflake fa-2x mb-2 feature-icon ac-icon"></i>
                        <p>Aire Acondicionado F/C</p>
                      </div>
                      <div className="col-md-3 col-6 mb-3">
                        <i className="fas fa-users fa-2x mb-2 feature-icon people-icon"></i>
                        <p>Para 4 Huéspedes</p>
                      </div>
                    </div>
                  </div>
                  <div id="precio-de-alquiler" className="pricing-container">
                    <h2 className="pricing-title"><i className="fas fa-dollar-sign"></i> Valor del Alquiler</h2>
                    <div className="pricing-cards">
                      <PriceCard 
                        title="Por Mes"
                        amount="USD 1500"
                        details="Incluye servicios y limpieza semanal"
                        whatsappMessage="Me interesa el departamento en Dorrego 1548 para alquiler mensual"
                      />
                      <PriceCard 
                        title="Por Semana"
                        amount="USD 550"
                        details="Incluye una limpieza"
                        whatsappMessage="Me interesa el departamento en Dorrego 1548 para alquiler semanal"
                      />
                      <PriceCard 
                        title="Por Día"
                        amount="USD 90"
                        details="Mínimo 3 noches"
                        whatsappMessage="Me interesa el departamento en Dorrego 1548 para alquiler diario"
                      />
                    </div>
                  </div>

                  <div className="service">
                    <h3>
                      <i className="fas fa-home" aria-hidden="true"></i> Palermo Hollywood Hideaway / 3 habitaciones / jardín<br />
                      <i className="fas fa-map-marker-alt" aria-hidden="true"></i> Av. Dorrego 1548<br />
                    </h3>
                    <div className="description">
                      <p lang="es">
                        <strong>En Español:</strong><br />
                        Este alojamiento elegante es ideal para viajes en grupo, ya sea con amigos o familiares. Es una casa con entrada independiente y mucho espacio en el corazón de Palermo, con un estilo vanguardista. Está cerca de estaciones de metro y autobús, en la mejor zona de Buenos Aires. Ideal para quienes aman el arte y la gastronomía.
                      </p>
                      <hr />
                      <p lang="en">
                        <strong>In English:</strong><br />
                        This elegant accommodation is ideal for group trips, whether with friends or family. It is a house with an independent entrance and plenty of space in the heart of Palermo, with an avant-garde style. It is close to metro and bus stations, in the best area of Buenos Aires. Ideal for those who love art and gastronomy.
                      </p>
                      <hr />
                      <p lang="pt">
                        <strong>Em Português:</strong><br />
                        Esta acomodação elegante é ideal para viagens em grupo, seja com amigos ou familiares. É uma casa com entrada independente e muito espaço no coração de Palermo, com um estilo vanguardista. Fica perto de estações de metrô e ônibus, na melhor área de Buenos Aires. Ideal para quem ama arte e gastronomia.
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
                          <li><i className="fas fa-wifi"></i> WiFi 300MB</li>
                          <li><i className="fas fa-snowflake"></i> Aire Acondicionado F/C & Caldera</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-home"></i> Comodidades</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-door-closed"></i> Jardín Trasero</li>
                          <li><i className="fas fa-warehouse"></i> Habitaciones Amplias</li>
                          <li><i className="fas fa-bath"></i> Baños en Suite, Vestidores, Baño de Servicio</li>
                          <li><i className="fas fa-laptop"></i> Zona de Trabajo Equipada</li>
                          <li><i className="fas fa-utensils"></i> Cocina Integrada con Lavavajillas</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-concierge-bell"></i> Servicios</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-bicycle"></i> Guarda bicicletas</li>
                          <li><i className="fas fa-tshirt"></i> Lavadero Completo</li>
                          <li><i className="fas fa-elevator"></i> Entrada Independiente</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <section className="gallery-section">
                    <h2><i className="fas fa-images"></i> Galería de Imágenes</h2>
                    <div className="gallery-container">
                      {galleryImages.map((img, index) => (
                        <div key={index} className="gallery-item" onClick={() => openGallery(index)}>
                          <img src={img} alt={`Departamento Dorrego 1548 - ${index + 1}`} loading="lazy" />
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
                    <i className="fas fa-map-marker-alt"></i> Ubicación Dorrego 1548
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mb-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.80098355137!2d-58.44734012565521!3d-34.583901956449566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5edc60e7b6f%3A0xacb90ce90228d6ce!2sAv.%20Dorrego%201548%2C%20C1414CKX%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1746474505794!5m2!1ses-419!2sar" 
                    width="100%" 
                    height="450" 
                    style={{border:0}}
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de Dorrego 1548"
                  ></iframe>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="location-details mb-4">
                    <h3 className="h4">Puntos de interés cercanos:</h3>
                    <ul className="list-unstyled">
                      <li><i className="fas fa-subway"></i>  Subte Línea B - Estación Dorrego (8 min)</li>
                      <li><i className="fas fa-subway"></i>   Subte Línea D - Estación Ministro Carranza (15 min)</li>
                      <li><i class="fas fa-train"></i> Estación de Tren Carranza (15 min)</li>
                      <li><i class="fas fa-store"></i> Avenida Córdoba (8 min)</li>
                              <li><i class="fas fa-store"></i> Avenida Corrientes (1 min)</li>
                              <li><i class="fas fa-store"></i> Avenida Santa Fe (15 min)</li>
                              <li><i class="fas fa-store-alt"></i> Mercado de Pulgas (1 min)</li>
                              <li><i class="fas fa-utensils"></i> Polo Gastronómico calle Arévalo (5 min)</li>
                              <li><i class="fas fa-tree"></i> Bosques de Palermo (30 min)</li>
                              <li><i class="fas fa-bus"></i> Múltiples líneas de colectivo</li>

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

export default Dorrego1548;