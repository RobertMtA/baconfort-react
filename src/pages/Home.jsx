import { Link } from 'react-router-dom';
import DepartamentoCard from "../components/DepartamentoCard/DepartamentoCard";
import Carousel from "../components/Carousel/Carousel";
import Header from '../components/Header/Header';
import './Home.css';
import NotFound from './NotFound';

function Home() {
  return (
    <>
      <Header />
      <hr />

      <main className="home">
        <h1>BA.CONFORT - Alquiler Temporario</h1>
        <h2>Vive Buenos Aires - Tu experiencia porteña comienza aquí.</h2>
        
        {/* Carrusel principal */}
        <Carousel />
        
        <p>
          Bienvenido a BA CONFORT, tu hogar temporal en Buenos Aires. Ofrecemos departamentos y casas únicas en las mejores zonas de la ciudad: Palermo, Belgrano y Recoleta.
        </p>
        <p>
          Cada espacio está diseñado con estilo y funcionalidad, para que te sientas como en casa. Nuestra misión es hacer que tu estancia sea inolvidable y cómoda.
        </p>
        <p className="highlight-text">¡Te esperamos para que vivas una experiencia única!</p>
        
        <hr />
        
        <h2 className="location-title"><i className="fas fa-map-marker-alt text-primary me-2"></i>¿Dónde Estamos?</h2>
        
        <div className="departamentos-grid">
          <DepartamentoCard 
            title={<><i className="fas fa-building text-info me-2"></i>Moldes 1680</>}
            address={<><i className="fas fa-map-pin text-secondary me-2"></i>Moldes 1680, Buenos Aires</>}
            image="/img/img-portada-moldes-1680.jpg"
            path="/departamentos/moldes-1680"
            badgeColor="bg-info"
          />
          <DepartamentoCard 
            title={<><i className="fas fa-building text-success me-2"></i>Santa Fe 3770</>}
            address={<><i className="fas fa-map-pin text-secondary me-2"></i>Santa Fe 3770, Buenos Aires</>}
            image="/img/img-portada-santa-fe-3770.jpg"
            path="/departamentos/santa-fe-3770"
            badgeColor="bg-success"
          />
          <DepartamentoCard 
            title={<><i className="fas fa-building text-warning me-2"></i>Dorrego 1548</>}
            address={<><i className="fas fa-map-pin text-secondary me-2"></i>Dorrego 1548, Buenos Aires</>}
            image="/img/img-portada-dorrego-1548.jpg"
            path="/departamentos/dorrego-1548"
            badgeColor="bg-warning"
          />
          <DepartamentoCard 
            title={<><i className="fas fa-building text-danger me-2"></i>Convención 1994</>}
            address={<><i className="fas fa-map-pin text-secondary me-2"></i>Convención 1994, Buenos Aires</>}
            image="/img/img-portada-convencion-1994.jpg"
            path="/departamentos/convencion-1994"  // Corregido: agregada la "n" que faltaba
            badgeColor="bg-danger"
          />
          <DepartamentoCard 
            title={<><i className="fas fa-building text-primary me-2"></i>Ugarteche 2824</>}
            address={<><i className="fas fa-map-pin text-secondary me-2"></i>Ugarteche 2824, Buenos Aires</>}
            image="/img/img-portada-ugarteche-2824.jpg"
            path="/departamentos/ugarteche-2824"
            badgeColor="bg-primary"
          />
        </div>

        {/* Sección de Ubicaciones */}
        <section id="ubicacion" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-4">
              <i className="fas fa-map-marked-alt location-title-icon"></i> Nuestras Ubicaciones
            </h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="location-card">
                  <h3><i className="fas fa-building location-icon"></i> Palermo Botánico</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Ugarteche 2824</p>
                  <p><i className="fas fa-subway"></i> Cerca de Subte D</p>
                  <p><i className="fas fa-tree"></i> Próximo al Jardín Botánico</p>
                  <p><i className="fas fa-hospital"></i> Hospital Italiano</p>
                  <Link to="/departamentos/ugarteche-2824" className="btn btn-primary">
                    <i className="fas fa-info-circle"></i> Más Información
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="location-card">
                  <h3><i className="fas fa-building location-icon"></i> Palermo</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Santa Fe 3770</p>
                  <p><i className="fas fa-subway"></i> Cerca de Subte D</p>
                  <p><i className="fas fa-shopping-bag"></i> Zona Comercial</p>
                  <p><i className="fas fa-hospital"></i> Sanatorio Güemes</p>
                  <Link to="/departamentos/santa-fe-3770" className="btn btn-primary">
                    <i className="fas fa-info-circle"></i> Más Información
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="location-card">
                  <h3><i className="fas fa-building location-icon"></i> Belgrano</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Moldes 1680</p>
                  <p><i className="fas fa-subway"></i> Cerca de Subte D</p>
                  <p><i className="fas fa-store"></i> Próximo a Av. Cabildo</p>
                  <p><i className="fas fa-hospital"></i> Hospital Pirovano</p>
                  <Link to="/departamentos/moldes-1680" className="btn btn-primary">
                    <i className="fas fa-info-circle"></i> Más Información
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="location-card">
                  <h3><i className="fas fa-building location-icon"></i> Palermo</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Convención 1994</p>
                  <p><i className="fas fa-utensils"></i> Zona Gastronómica</p>
                  <p><i className="fas fa-shopping-bag"></i> Área Comercial</p>
                  <p><i className="fas fa-hospital"></i> Hospital Fernández</p>
                  <Link to="/departamentos/convencion-1994" className="btn btn-primary">
                    <i className="fas fa-info-circle"></i> Más Información
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="location-card">
                  <h3><i className="fas fa-building location-icon"></i> Palermo</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Dorrego 2080</p>
                  <p><i className="fas fa-glass-cheers"></i> Zona de Bares</p>
                  <p><i className="fas fa-tree"></i> Cerca de Parques</p>
                  <p><i className="fas fa-hospital"></i> Sanatorio Los Arcos</p>
                  <Link to="/departamentos/dorrego-1548" className="btn btn-primary">
                    <i className="fas fa-info-circle"></i> Más Información
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;