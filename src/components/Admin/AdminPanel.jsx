import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import PropertyEditor from './PropertyEditor';
import Dashboard from './Dashboard';
import PromotionManager from './PromotionManager';
import AmenitiesManager from './AmenitiesManager';
import ReviewsAdmin from './ReviewsAdmin';
import SimpleUserManager from './SimpleUserManager';
import AdminReservations from './AdminReservations';
import { useEffect } from 'react';
import './AdminPanel.css';
import './AdminResponsive.css';

function AdminPanel() {
  const { logout, getAllProperties } = useAdmin();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const properties = getAllProperties();

  const handleEditProperty = (propertyId) => {
    setSelectedProperty(propertyId);
    setActiveTab('edit');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onEditProperty={handleEditProperty} />;
      case 'reservations':
        return <AdminReservations />;
      case 'reviews':
        return <ReviewsAdmin />;
      case 'users':
        return <SimpleUserManager />;
      case 'promotions':
        return <PromotionManager />;
      case 'amenities':
        return <AmenitiesManager />;
      case 'edit':
        return selectedProperty ? (
          <PropertyEditor 
            propertyId={selectedProperty} 
            onBack={() => setActiveTab('dashboard')}
          />
        ) : (
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle"></i>
            Selecciona una propiedad para editar
          </div>
        );
      default:
        return <Dashboard onEditProperty={handleEditProperty} />;
    }
  };

  return (
    <div className="admin-panel">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-brand">
            <i className="fas fa-shield-alt"></i>
            <h1>Panel de Administración - BACONFORT</h1>
          </div>
          <button className="btn btn-outline-light" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="admin-content">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button 
              className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <i className="fas fa-chart-line"></i>
              Dashboard
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'reservations' ? 'active' : ''}`}
              onClick={() => setActiveTab('reservations')}
            >
              <i className="fas fa-calendar-check"></i>
              Gestión Reservas
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <i className="fas fa-star"></i>
              Reseñas
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <i className="fas fa-users"></i>
              Usuarios
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'promotions' ? 'active' : ''}`}
              onClick={() => setActiveTab('promotions')}
            >
              <i className="fas fa-percent"></i>
              Promociones
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'amenities' ? 'active' : ''}`}
              onClick={() => setActiveTab('amenities')}
            >
              <i className="fas fa-cog"></i>
              Comodidades
            </button>
            
            <div className="admin-nav-section">
              <h4>Propiedades</h4>
              {Object.values(properties).map(property => (
                <button
                  key={property.id}
                  className={`admin-nav-item property-item ${
                    selectedProperty === property.id && activeTab === 'edit' ? 'active' : ''
                  }`}
                  onClick={() => handleEditProperty(property.id)}
                >
                  <i className="fas fa-building"></i>
                  {property.title}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
