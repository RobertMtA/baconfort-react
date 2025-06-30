import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import './AmenitiesManager.css';

function AmenitiesManager() {
  const { data, updateProperty } = useAdmin();
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('departamento');
  const [newAmenity, setNewAmenity] = useState({ text: '' });
  const [editingAmenity, setEditingAmenity] = useState(null);

  const properties = Object.values(data.properties);
  const categories = {
    departamento: 'Departamento',
    servicios: 'Servicios',
    amenitiesEdificio: 'Amenities del Edificio'
  };

  const iconOptions = [
    { icon: 'fas fa-tv', name: 'Televisión / Smart TV' },
    { icon: 'fas fa-wifi', name: 'WiFi / Internet' },
    { icon: 'fas fa-snowflake', name: 'Aire Acondicionado' },
    { icon: 'fas fa-door-closed', name: 'Balcón / Puerta' },
    { icon: 'fas fa-utensils', name: 'Cocina / Utensilios' },
    { icon: 'fas fa-bed', name: 'Cama / Dormitorio' },
    { icon: 'fas fa-bath', name: 'Baño / Ducha' },
    { icon: 'fas fa-shield-alt', name: 'Seguridad' },
    { icon: 'fas fa-tshirt', name: 'Lavarropas / Lavandería' },
    { icon: 'fas fa-concierge-bell', name: 'Recepción / Portería' },
    { icon: 'fas fa-car', name: 'Estacionamiento / Cochera' },
    { icon: 'fas fa-elevator', name: 'Ascensor' },
    { icon: 'fas fa-dumbbell', name: 'Gimnasio / Ejercicio' },
    { icon: 'fas fa-swimming-pool', name: 'Piscina' },
    { icon: 'fas fa-hot-tub', name: 'Jacuzzi / Spa' },
    { icon: 'fas fa-sun', name: 'Solarium / Terraza' },
    { icon: 'fas fa-users', name: 'SUM / Salón' },
    { icon: 'fas fa-building', name: 'Edificio' },
    { icon: 'fas fa-lock', name: 'Seguridad / Cerradura' },
    { icon: 'fas fa-broom', name: 'Limpieza' },
    { icon: 'fas fa-couch', name: 'Living / Sofá' },
    { icon: 'fas fa-warehouse', name: 'Espacio Amplio / Depósito' },
    { icon: 'fas fa-coffee', name: 'Cafetera / Cocina' },
    { icon: 'fas fa-blender', name: 'Microondas / Electrodomésticos' },
    { icon: 'fas fa-wine-glass', name: 'Cristalería / Bar' },
    { icon: 'fas fa-bicycle', name: 'Bicicletas / Ciclismo' },
    { icon: 'fas fa-laptop', name: 'Zona de Trabajo / Oficina' },
    { icon: 'fas fa-tree', name: 'Jardín / Naturaleza' },
    { icon: 'fas fa-spa', name: 'Spa / Relajación' },
    { icon: 'fas fa-gamepad', name: 'Entretenimiento / Juegos' }
  ];

  const handleAddAmenity = () => {
    if (!selectedProperty || !newAmenity.text) return;

    // Asignar icono por defecto basado en la categoría
    const defaultIcons = {
      departamento: 'fas fa-home',
      servicios: 'fas fa-concierge-bell',
      amenitiesEdificio: 'fas fa-star'
    };

    const property = data.properties[selectedProperty];
    const updatedAmenities = {
      ...property.amenities,
      [selectedCategory]: [
        ...(property.amenities?.[selectedCategory] || []),
        { 
          icon: defaultIcons[selectedCategory],
          text: newAmenity.text 
        }
      ]
    };

    console.log('🔧 DEBUG: Actualizando amenities para', selectedProperty);
    console.log('🔧 DEBUG: Categoría:', selectedCategory);
    console.log('🔧 DEBUG: Nueva amenity:', newAmenity.text);
    console.log('🔧 DEBUG: Amenities actualizadas:', updatedAmenities);
    
    updateProperty(selectedProperty, { amenities: updatedAmenities });
    setNewAmenity({ text: '' });
    
    console.log('✅ DEBUG: updateProperty llamado');
  };

  const handleEditAmenity = (categoryKey, index, amenity) => {
    setEditingAmenity({ categoryKey, index, ...amenity });
  };

  const handleSaveEdit = () => {
    if (!selectedProperty || !editingAmenity) return;

    const property = data.properties[selectedProperty];
    const updatedAmenities = { ...property.amenities };
    updatedAmenities[editingAmenity.categoryKey][editingAmenity.index] = {
      icon: editingAmenity.icon,
      text: editingAmenity.text
    };

    updateProperty(selectedProperty, { amenities: updatedAmenities });
    setEditingAmenity(null);
  };

  const handleDeleteAmenity = (categoryKey, index) => {
    if (!selectedProperty) return;

    const property = data.properties[selectedProperty];
    const updatedAmenities = { ...property.amenities };
    updatedAmenities[categoryKey] = updatedAmenities[categoryKey].filter((_, i) => i !== index);

    updateProperty(selectedProperty, { amenities: updatedAmenities });
  };

  const selectedPropertyData = selectedProperty ? data.properties[selectedProperty] : null;

  return (
    <div className="amenities-manager">
      <h3><i className="fas fa-star"></i> Gestionar Comodidades</h3>
      
      {/* Debug Tools - Solo visible si hay problemas */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-tools" style={{background: '#ffe6e6', padding: '10px', marginBottom: '20px', borderRadius: '4px'}}>
          <small><strong>🔧 Debug Tools:</strong></small>
          <button 
            onClick={() => {
              if (window.confirm('¿Resetear todos los datos? Esto limpiará localStorage y recargará datos iniciales.')) {
                localStorage.removeItem('baconfort_data');
                window.location.reload();
              }
            }}
            className="btn btn-warning btn-sm ms-2"
          >
            🔄 Reset Data
          </button>
        </div>
      )}

      {/* Selector de Propiedad */}
      <div className="form-group">
        <label>Seleccionar Propiedad:</label>
        <select 
          value={selectedProperty} 
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="form-control"
        >
          <option value="">Selecciona una propiedad</option>
          {properties.map(property => (
            <option key={property.id} value={property.id}>
              {property.title}
            </option>
          ))}
        </select>
      </div>

      {selectedProperty && (
        <>
          {/* Selector de Categoría */}
          <div className="form-group">
            <label>Categoría:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
            >
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Agregar Nueva Comodidad */}
          <div className="add-amenity-form">
            <h4>Agregar Nueva Comodidad a "{categories[selectedCategory]}"</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Texto de la comodidad:</label>
                <input 
                  type="text" 
                  value={newAmenity.text}
                  onChange={(e) => setNewAmenity(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Ej: Smart TV 55&quot;, WiFi 300MB, Piscina climatizada, etc."
                  className="form-control"
                />
              </div>
              <button 
                onClick={handleAddAmenity}
                className="btn btn-primary"
                disabled={!newAmenity.text}
              >
                <i className="fas fa-plus"></i> Agregar Comodidad
              </button>
            </div>
            {newAmenity.text && (
              <div className="icon-preview">
                <strong>Vista Previa:</strong> <i className="fas fa-star"></i> {newAmenity.text}
              </div>
            )}
            <div className="help-text">
              <small><i className="fas fa-info-circle"></i> Las comodidades agregadas aparecerán inmediatamente en la página del departamento</small>
            </div>
          </div>

          {/* Lista de Comodidades Existentes */}
          <div className="amenities-list">
            <h4>Comodidades de {categories[selectedCategory]}</h4>
            {selectedPropertyData?.amenities?.[selectedCategory]?.length > 0 ? (
              <div className="amenity-items">
                {selectedPropertyData.amenities[selectedCategory].map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    {editingAmenity && 
                     editingAmenity.categoryKey === selectedCategory && 
                     editingAmenity.index === index ? (
                      <div className="edit-amenity">
                        <input 
                          type="text"
                          value={editingAmenity.text}
                          onChange={(e) => setEditingAmenity(prev => ({ ...prev, text: e.target.value }))}
                          className="form-control"
                          placeholder="Texto de la comodidad"
                        />
                        <button onClick={handleSaveEdit} className="btn btn-success btn-sm">
                          <i className="fas fa-save"></i>
                        </button>
                        <button onClick={() => setEditingAmenity(null)} className="btn btn-secondary btn-sm">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="amenity-display">
                        <div className="amenity-content">
                          <i className={amenity.icon}></i>
                          <span>{amenity.text}</span>
                        </div>
                        <div className="amenity-actions">
                          <button 
                            onClick={() => handleEditAmenity(selectedCategory, index, amenity)}
                            className="btn btn-warning btn-sm"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteAmenity(selectedCategory, index)}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-amenities">No hay comodidades en esta categoría</p>
            )}
          </div>

          {/* Vista Previa */}
          <div className="amenities-preview">
            <h4>Vista Previa</h4>
            <div className="preview-categories">
              {Object.entries(categories).map(([key, label]) => (
                <div key={key} className="preview-category">
                  <h5><i className="fas fa-star"></i> {label}</h5>
                  <ul className="preview-list">
                    {selectedPropertyData?.amenities?.[key]?.map((amenity, index) => (
                      <li key={index}>
                        <i className={amenity.icon}></i> {amenity.text}
                      </li>
                    )) || <li>Sin comodidades</li>}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AmenitiesManager;
