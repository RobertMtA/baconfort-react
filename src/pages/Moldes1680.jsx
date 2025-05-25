import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PriceCard from "../components/PriceCard/PriceCard";
import Gallery from '../components/Gallery/Gallery';
import ReservationForm from '../components/ReservationForm/ReservationForm';
import Loading from '../components/Loading/Loading';
import '../styles/departamento.css';
import NotFound from './NotFound';


function Moldes1680() {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    'img/img-moldes1.jpg',
    'img/img-moldes2.jpg',
    'img/img-moldes3.jpg',
    'img/img-moldes4.jpg',
    'img/img-moldes5.jpg',
    'img/img-moldes6.jpg',
  ];

  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

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
      {window.location.pathname !== '/moldes1680' ? (
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
              poster="img/img-moldes3.jpg"
            >
              <source src="video/video-portada-moldes-1680.mp4" type="video/mp4" />
              <img src="img/img-moldes5.jpg" alt="Departamento Moldes 1680" />
            </video>
            <div className="video-overlay"></div>
          </div>

          <main className="departamento-page">
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
                        amount="USD 1200"
                        details="No incluye servicios y limpieza semanal"
                        whatsappMessage="Me interesa el departamento en Moldes 1680 para alquiler mensual"
                      />
                      <PriceCard 
                        title="Por Semana"
                        amount="USD 400"
                        details="No incluye una limpieza"
                        whatsappMessage="Me interesa el departamento en Moldes 1680 para alquiler semanal"
                      />
                      <PriceCard 
                        title="Por Día"
                        amount="USD 70"
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
                        Exclusivo departamento familiar en Belgrano. Ubicación privilegiada cerca de Av. Cabildo y Barrancas de Belgrano. Dos dormitorios amplios, living comedor, cocina equipada y baño completo. Ideal para familias o grupos. Excelente conectividad, próximo a la línea D de subte. Zona residencial segura con todos los servicios.
                      </p>
                      <hr />
                      <p lang="en">
                        <strong>In English:</strong><br />
                        Exclusive family apartment in Belgrano. Prime location near Av. Cabildo and Barrancas de Belgrano. Two spacious bedrooms, living-dining room, equipped kitchen, and full bathroom. Perfect for families or groups. Excellent connectivity, close to subway line D. Safe residential area with all services.
                      </p>
                      <hr />
                      <p lang="pt">
                        <strong>Em Português:</strong><br />
                        Apartamento familiar exclusivo em Belgrano. Localização privilegiada próxima à Av. Cabildo e Barrancas de Belgrano. Dois quartos espaçosos, sala de estar e jantar, cozinha equipada e banheiro completo. Ideal para famílias ou grupos. Excelente conectividade, próximo à linha D do metrô. Área residencial segura com todos os serviços.
                      </p>
                    </div>
                  </div>
                  
                  <div className="amenities-list mb-5">
                    <h3 className="h5 mb-3 text-center"><i className="fas fa-star"></i> Comodidades Destacadas</h3>
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-tv"></i> Entretenimiento</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-tv"></i> Smart TV 43"</li>
                          <li><i className="fas fa-wifi"></i> WiFi 300MB</li>
                          <li><i className="fas fa-snowflake"></i> Aire Acondicionado F/C</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-home"></i> Comodidades</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-door-closed"></i> Balcón Cerrado</li>
                          <li><i className="fas fa-warehouse"></i> Amplios Placards</li>
                          <li><i className="fas fa-bath"></i> Baño Completo</li>
                          <li><i className="fas fa-utensils"></i> Cocina Equipada</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <h4 className="h6 mb-3"><i className="fas fa-concierge-bell"></i> Servicios</h4>
                        <ul className="list-unstyled">
                          <li><i className="fas fa-bicycle"></i> Guarda bicicletas</li>
                          <li><i className="fas fa-tshirt"></i> Lavadero Completo</li>
                          <li><i className="fas fa-elevator"></i> 2 Ascensores</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <section className="gallery-section">
                    <h2><i className="fas fa-images"></i> Galería de Imágenes</h2>
                    <div className="gallery-container">
                      {images.map((img, index) => (
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