import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [state, setState] = useState(false);
  const location = useLocation();

  const navigation = [
    { title: "Inicio", path: "/", icon: "home" },
    { title: "Detalles", path: "#detalles", icon: "info-circle" },
    { title: "Ubicación", path: "#ubicacion", icon: "map-marker-alt" },
    { title: "Contacto", path: "#contactanos", icon: "envelope" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.onclick = null;
    };
  }, []);

  useEffect(() => {
    setState(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${state ? 'mobile-open' : ''}`}>
      <nav className="navbar navbar-expand-lg navbar-dark">
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
            <span className="brand-text">BA-CONFORT</span>
          </Link>
          
          <button 
            className="menu-btn navbar-toggler custom-toggler" 
            onClick={() => setState(!state)}
            aria-expanded={state}
            aria-label="Toggle navigation"
          >
            {state ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>
          
          <div className={`navbar-collapse ${state ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              {navigation.map((item, idx) => (
                <NavItem 
                  key={idx}
                  to={item.path.startsWith('#') ? null : item.path}
                  href={item.path.startsWith('#') ? item.path : null}
                  icon={item.icon}
                  text={item.title}
                  active={item.path === location.pathname}
                  onClick={() => setState(false)}
                />
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {isHomePage && (
        <div className="video-cover">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            className="back-video"
            aria-label="Video de portada"
          >
            <source src="video/video-portada-principal.mp4" type="video/mp4" />
            <track kind="captions" srcLang="es" label="Spanish captions" />
            Tu navegador no soporta videos HTML5.
          </video>
          <div className="video-overlay" aria-hidden="true"></div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, href, icon, text, active, onClick }) {
  const content = (
    <>
      <i className={`fas fa-${icon} nav-icon`} aria-hidden="true"></i> 
      <span className="nav-text">{text}</span>
    </>
  );

  return (
    <li className="nav-item">
      {to ? (
        <Link 
          className={`nav-link ${active ? 'active' : ''}`} 
          to={to}
          onClick={onClick}
        >
          {content}
        </Link>
      ) : (
        <a 
          className="nav-link" 
          href={href}
          onClick={onClick}
        >
          {content}
        </a>
      )}
    </li>
  );
}

export default Header;