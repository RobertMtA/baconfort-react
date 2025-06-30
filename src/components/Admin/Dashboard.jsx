import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import QuickActions from './QuickActions';
import './Dashboard.css';

function Dashboard({ onEditProperty }) {
  const { getAllProperties } = useAdmin();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [activeQuickAction, setActiveQuickAction] = useState(null);
  const properties = getAllProperties();
  const propertyList = Object.values(properties);

  // Calcular estadísticas
  const totalProperties = propertyList.length;
  const averageMonthlyPrice = totalProperties > 0 ? propertyList.reduce((sum, prop) => {
    const monthlyPrice = prop.prices?.monthly;
    const price = typeof monthlyPrice === 'number' ? monthlyPrice : parseInt(String(monthlyPrice || '0').replace(/[^\d]/g, ''));
    return sum + (isNaN(price) ? 0 : price);
  }, 0) / totalProperties : 0;

  const averageDailyPrice = totalProperties > 0 ? propertyList.reduce((sum, prop) => {
    const dailyPrice = prop.prices?.daily;
    const price = typeof dailyPrice === 'number' ? dailyPrice : parseInt(String(dailyPrice || '0').replace(/[^\d]/g, ''));
    return sum + (isNaN(price) ? 0 : price);
  }, 0) / totalProperties : 0;

  const handleQuickAction = (action) => {
    setActiveQuickAction(action);
    setShowQuickActions(true);
  };

  const closeQuickActions = () => {
    setShowQuickActions(false);
    setActiveQuickAction(null);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(properties, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `baconfort_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const viewProperty = (propertyId) => {
    // Mapeo de IDs a rutas
    const routeMap = {
      'moldes-1680': '/moldes1680',
      'santa-fe-3770': '/santafe3770',
      'dorrego-1548': '/dorrego1548',
      'convencion-1994': '/convencion1994',
      'ugarteche-2824': '/ugarteche2824'
    };

    const route = routeMap[propertyId];
    if (route) {
      // Abrir en nueva pestaña
      window.open(route, '_blank');
    } else {
      // Si no encuentra la ruta, mostrar mensaje
      alert(`No se encontró la página para la propiedad: ${propertyId}`);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>
          <i className="fas fa-chart-line"></i>
          Dashboard
        </h2>
        <p>Resumen general de las propiedades de BACONFORT</p>
      </div>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon buildings">
            <i className="fas fa-building"></i>
          </div>
          <div className="stat-content">
            <h3>{totalProperties}</h3>
            <p>Propiedades Totales</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon price">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3>USD {Math.round(averageMonthlyPrice)}</h3>
            <p>Precio Promedio Mensual</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon daily">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="stat-content">
            <h3>USD {Math.round(averageDailyPrice)}</h3>
            <p>Precio Promedio Diario</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon location">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Zonas Cubiertas</p>
          </div>
        </div>
      </div>

      {/* Lista de propiedades */}
      <div className="properties-overview">
        <h3>
          <i className="fas fa-list"></i>
          Gestión de Propiedades
        </h3>
        
        <div className="properties-grid">
          {propertyList.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <img 
                  src={property.coverImage} 
                  alt={property.title}
                  onError={(e) => {
                    e.target.src = '/img/logo.jpg';
                  }}
                />
              </div>
              
              <div className="property-info">
                <h4>{property.title}</h4>
                <p className="property-address">
                  <i className="fas fa-map-marker-alt"></i>
                  {property.address}
                </p>
                
                <div className="property-prices">
                  <span className="price-tag monthly">
                    <i className="fas fa-calendar"></i>
                    {property.prices.monthly}/mes
                  </span>
                  <span className="price-tag daily">
                    <i className="fas fa-calendar-day"></i>
                    {property.prices.daily}/día
                  </span>
                </div>
                
                <div className="property-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onEditProperty(property.id)}
                  >
                    <i className="fas fa-edit"></i>
                    Editar
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => viewProperty(property.id)}
                    title={`Ver página de ${property.title}`}
                  >
                    <i className="fas fa-eye"></i>
                    Ver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="quick-actions">
        <h3>
          <i className="fas fa-bolt"></i>
          Acciones Rápidas
        </h3>
        
        <div className="actions-grid">
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('add-property')}
          >
            <i className="fas fa-plus"></i>
            <span>Agregar Propiedad</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('manage-images')}
          >
            <i className="fas fa-images"></i>
            <span>Gestionar Imágenes</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={() => handleQuickAction('update-prices')}
          >
            <i className="fas fa-dollar-sign"></i>
            <span>Actualizar Precios</span>
          </button>
          
          <button 
            className="action-btn"
            onClick={exportData}
          >
            <i className="fas fa-file-export"></i>
            <span>Exportar Datos</span>
          </button>
        </div>
      </div>

      {/* Quick Actions Modal */}
      {showQuickActions && (
        <QuickActions 
          action={activeQuickAction}
          onClose={closeQuickActions}
          properties={properties}
          onEditProperty={onEditProperty}
        />
      )}
    </div>
  );
}

export default Dashboard;
