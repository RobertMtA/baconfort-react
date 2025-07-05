import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import './AmenitiesManager.css';

function AmenitiesManager() {
  const { data, updateProperty, loadPropertiesFromBackend } = useAdmin();
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('departamento');
  const [newAmenity, setNewAmenity] = useState({ text: '', icon: 'fas fa-star' });
  const [editingAmenity, setEditingAmenity] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const properties = Object.values(data.properties);
  const categories = {
    departamento: 'Departamento',
    servicios: 'Servicios',
    amenitiesEdificio: 'Amenities del Edificio'
  };

  // Cargar datos desde backend al montar el componente
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      console.log('🔄 AMENITIES: Cargando comodidades desde backend...');
      await loadPropertiesFromBackend();
      console.log('✅ AMENITIES: Datos cargados desde backend');
      setLoading(false);
    };
    
    loadData();
  }, []);

  // Debug: verificar qué datos tenemos
  useEffect(() => {
    if (selectedProperty) {
      const property = data.properties[selectedProperty];
      console.log('🔍 AMENITIES: Datos de propiedad seleccionada:', {
        id: selectedProperty,
        amenities: property?.amenities,
        hasAmenities: !!property?.amenities
      });
    }
  }, [selectedProperty, data.properties]);

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
    { icon: 'fas fa-gamepad', name: 'Entretenimiento / Juegos' },
    { icon: 'fas fa-star', name: 'Destacado' }
  ];

  // Filtrar amenidades por búsqueda
  const filterAmenities = (amenities) => {
    if (!searchTerm) return amenities;
    return amenities.filter(amenity => 
      amenity.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Estadísticas
  const getStats = () => {
    if (!selectedProperty) return { total: 0, byCategory: {} };
    
    const property = data.properties[selectedProperty];
    const stats = { total: 0, byCategory: {} };
    
    Object.entries(categories).forEach(([key, label]) => {
      const count = property.amenities?.[key]?.length || 0;
      stats.byCategory[key] = count;
      stats.total += count;
    });
    
    return stats;
  };

  const stats = getStats();

  const handleAddAmenity = async () => {
    if (!selectedProperty || !newAmenity.text.trim()) return;

    console.log('➕ AMENITIES: Agregando nueva comodidad:', {
      property: selectedProperty,
      category: selectedCategory,
      amenity: newAmenity
    });

    const property = data.properties[selectedProperty];
    const updatedAmenities = {
      ...property.amenities,
      [selectedCategory]: [
        ...(property.amenities?.[selectedCategory] || []),
        { 
          icon: newAmenity.icon,
          text: newAmenity.text.trim()
        }
      ]
    };

    await updateProperty(selectedProperty, { amenities: updatedAmenities });
    setNewAmenity({ text: '', icon: 'fas fa-star' });
    
    console.log('✅ AMENITIES: Comodidad agregada exitosamente');
  };

  const handleEditAmenity = (categoryKey, index, amenity) => {
    console.log('✏️ AMENITIES: Editando comodidad:', { categoryKey, index, amenity });
    setEditingAmenity({ categoryKey, index, ...amenity });
    // Cambiar a la categoría correspondiente si es necesario
    if (categoryKey !== selectedCategory) {
      setSelectedCategory(categoryKey);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedProperty || !editingAmenity || !editingAmenity.text.trim()) return;

    console.log('💾 AMENITIES: Guardando edición:', editingAmenity);

    const property = data.properties[selectedProperty];
    const updatedAmenities = { ...property.amenities };
    updatedAmenities[editingAmenity.categoryKey][editingAmenity.index] = {
      icon: editingAmenity.icon,
      text: editingAmenity.text.trim()
    };

    await updateProperty(selectedProperty, { amenities: updatedAmenities });
    setEditingAmenity(null);
    
    console.log('✅ AMENITIES: Edición guardada exitosamente');
  };

  const handleDeleteAmenity = (categoryKey, index) => {
    setShowDeleteConfirm({ categoryKey, index });
  };

  const confirmDeleteAmenity = async () => {
    if (!selectedProperty || !showDeleteConfirm) return;

    console.log('🗑️ AMENITIES: Eliminando comodidad:', showDeleteConfirm);

    const property = data.properties[selectedProperty];
    const updatedAmenities = { ...property.amenities };
    updatedAmenities[showDeleteConfirm.categoryKey] = updatedAmenities[showDeleteConfirm.categoryKey].filter((_, i) => i !== showDeleteConfirm.index);

    await updateProperty(selectedProperty, { amenities: updatedAmenities });
    setShowDeleteConfirm(null);
    
    console.log('✅ AMENITIES: Comodidad eliminada exitosamente');
  };

  const selectedPropertyData = selectedProperty ? data.properties[selectedProperty] : null;

  return (
    <div className="amenities-manager">
      <div className="amenities-manager-header">
        <h2 className="section-title">
          <i className="fas fa-star"></i>
          Gestión de Comodidades
          {loading && <span className="loading-indicator">Cargando...</span>}
        </h2>
      </div>

      {loading && (
        <div className="loading-section">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p>Cargando comodidades desde el backend...</p>
        </div>
      )}

      {/* Estadísticas */}
      {selectedProperty && (
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Total de Comodidades</span>
              </div>
            </div>
            
            <div className="stat-card department">
              <div className="stat-icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{stats.byCategory.departamento || 0}</span>
                <span className="stat-label">Departamento</span>
              </div>
            </div>
            
            <div className="stat-card services">
              <div className="stat-icon">
                <i className="fas fa-concierge-bell"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{stats.byCategory.servicios || 0}</span>
                <span className="stat-label">Servicios</span>
              </div>
            </div>
            
            <div className="stat-card building">
              <div className="stat-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{stats.byCategory.amenitiesEdificio || 0}</span>
                <span className="stat-label">Amenities del Edificio</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="controls-section">
        <div className="selectors-container">
          <div className="selector-group">
            <label htmlFor="property-select" className="selector-label">
              <i className="fas fa-building"></i>
              Propiedad:
            </label>
            <select 
              id="property-select"
              value={selectedProperty} 
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="selector-input"
            >
              <option value="">Seleccionar propiedad...</option>
              {properties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>

          {selectedProperty && (
            <div className="selector-group">
              <label htmlFor="category-select" className="selector-label">
                <i className="fas fa-layer-group"></i>
                Categoría:
              </label>
              <select 
                id="category-select"
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="selector-input"
              >
                {Object.entries(categories).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {selectedProperty && (
          <div className="search-container">
            <div className="search-input-wrapper">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar comodidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="amenity-search"
                name="amenity-search"
              />
            </div>
          </div>
        )}
      </div>

      {selectedProperty && (
        <>
          {/* Agregar Nueva Comodidad */}
          <div className="add-amenity-section">
            <div className="add-amenity-header">
              <h3>
                <i className="fas fa-plus-circle"></i>
                Agregar Nueva Comodidad
              </h3>
              <div className="category-badge">
                <i className="fas fa-tag"></i>
                {categories[selectedCategory]}
              </div>
            </div>
            
            <div className="form-container">
              <div className="form-group text-group">
                <label htmlFor="amenity-text" className="form-label">
                  <i className="fas fa-edit"></i>
                  Descripción:
                </label>
                <input 
                  id="amenity-text"
                  type="text" 
                  value={newAmenity.text}
                  onChange={(e) => setNewAmenity(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Ej: Smart TV 55&quot;, WiFi 300MB, Piscina climatizada..."
                  className="form-input"
                />
              </div>
            </div>
              
              {newAmenity.text && (
                <div className="preview-container">
                  <div className="preview-label">Vista Previa:</div>
                  <div className="amenity-preview">
                    <i className={newAmenity.icon}></i>
                    <span>{newAmenity.text}</span>
                  </div>
                </div>
              )}
              
              <div className="form-actions">
                <button 
                  onClick={handleAddAmenity}
                  className="btn-add"
                  disabled={!newAmenity.text.trim()}
                >
                  <i className="fas fa-plus"></i>
                  Agregar Comodidad
                </button>
              </div>
          </div>

          {/* Lista de Comodidades */}
          <div className="amenities-list-section">
            <div className="section-header">
              <h3>
                <i className="fas fa-list"></i>
                Comodidades de {categories[selectedCategory]}
              </h3>
              <div className="amenities-count">
                {selectedPropertyData?.amenities?.[selectedCategory]?.length || 0} comodidades
              </div>
            </div>
            
            {selectedPropertyData?.amenities?.[selectedCategory]?.length > 0 ? (
              <div className="amenities-grid">
                {filterAmenities(selectedPropertyData.amenities[selectedCategory]).map((amenity, index) => (
                  <div key={index} className="amenity-card">
                    {editingAmenity && 
                     editingAmenity.categoryKey === selectedCategory && 
                     editingAmenity.index === index ? (
                      <div className="amenity-edit">
                        <div className="edit-form">
                          <div className="edit-row">
                            <select 
                              value={editingAmenity.icon}
                              onChange={(e) => setEditingAmenity(prev => ({ ...prev, icon: e.target.value }))}
                              className="edit-input icon-select"
                            >
                              {iconOptions.map(option => (
                                <option key={option.icon} value={option.icon}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                            
                            {/* Vista previa del icono en edición */}
                            <div className="icon-preview-edit">
                              <div className="icon-preview-display">
                                <i className={editingAmenity.icon}></i>
                              </div>
                              <div className="icon-preview-info">
                                <span className="icon-preview-name">
                                  {iconOptions.find(opt => opt.icon === editingAmenity.icon)?.name || 'Icono'}
                                </span>
                              </div>
                            </div>
                            <input 
                              type="text"
                              value={editingAmenity.text}
                              onChange={(e) => setEditingAmenity(prev => ({ ...prev, text: e.target.value }))}
                              className="edit-input"
                              placeholder="Descripción de la comodidad"
                            />
                          </div>
                          <div className="edit-actions">
                            <button onClick={handleSaveEdit} className="btn-save">
                              <i className="fas fa-check"></i>
                              Guardar
                            </button>
                            <button onClick={() => setEditingAmenity(null)} className="btn-cancel">
                              <i className="fas fa-times"></i>
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="amenity-content">
                        <div className="amenity-info">
                          <span className="amenity-text">{amenity.text}</span>
                        </div>
                        <div className="amenity-actions">
                          <button 
                            onClick={() => handleEditAmenity(selectedCategory, index, amenity)}
                            className="action-btn edit-btn"
                            title="Editar comodidad"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteAmenity(selectedCategory, index)}
                            className="action-btn delete-btn"
                            title="Eliminar comodidad"
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
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h4>No hay comodidades en esta categoría</h4>
                <p>Agrega la primera comodidad para comenzar</p>
              </div>
            )}
          </div>

          {/* Vista Previa General */}
          <div className="preview-section">
            <div className="section-header">
              <h3>
                <i className="fas fa-eye"></i>
                Vista Previa de Todas las Comodidades
              </h3>
            </div>
            
            <div className="preview-grid">
              {Object.entries(categories).map(([key, label]) => (
                <div key={key} className="preview-category">
                  <div className="category-header">
                    <h4>
                      <i className="fas fa-star"></i>
                      {label}
                    </h4>
                    <span className="category-count">
                      {selectedPropertyData?.amenities?.[key]?.length || 0}
                    </span>
                  </div>
                  <div className="category-amenities">
                    {selectedPropertyData?.amenities?.[key]?.length > 0 ? (
                      selectedPropertyData.amenities[key].map((amenity, index) => (
                        <div key={index} className="preview-amenity">
                          <div className="amenity-content">
                            <span className="amenity-text">{amenity.text}</span>
                          </div>
                          <div className="amenity-actions">
                            <button 
                              onClick={() => handleEditAmenity(key, index, amenity)}
                              className="action-btn edit-btn"
                              title="Editar comodidad"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteAmenity(key, index)}
                              className="action-btn delete-btn"
                              title="Eliminar comodidad"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-amenities">
                        <i className="fas fa-info-circle"></i>
                        Sin comodidades
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!selectedProperty && (
        <div className="no-property-selected">
          <div className="no-property-icon">
            <i className="fas fa-building"></i>
          </div>
          <h3>Selecciona una propiedad</h3>
          <p>Elige una propiedad para gestionar sus comodidades</p>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-exclamation-triangle"></i>
                Confirmar Eliminación
              </h3>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que quieres eliminar esta comodidad?</p>
              <div className="amenity-to-delete">
                <i className="fas fa-star"></i>
                <span>Esta acción no se puede deshacer</span>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                onClick={confirmDeleteAmenity} 
                className="btn-delete"
              >
                <i className="fas fa-trash"></i> Eliminar
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(null)} 
                className="btn-cancel"
              >
                <i className="fas fa-times"></i> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AmenitiesManager;
