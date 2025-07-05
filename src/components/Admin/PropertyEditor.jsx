import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import MultipleImageUploader from './MultipleImageUploader';
import DatabaseGalleryManager from './DatabaseGalleryManager';
import './PropertyEditor.css';

function PropertyEditor({ propertyId, onBack }) {
  const { getProperty, updateProperty, loadPropertiesFromBackend } = useAdmin();
  const property = getProperty(propertyId);
  
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    prices: {
      monthly: '',
      weekly: '',
      daily: ''
    },
    description: {
      es: '',
      en: '',
      pt: ''
    },
    coverImage: '',
    heroVideo: '',
    galleryImages: []
  });
  
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [databaseImages, setDatabaseImages] = useState([]);

  useEffect(() => {
    if (property) {
      setFormData(property);
    }
  }, [property]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleGalleryImagesChange = (newImages) => {
    console.log('🖼️ GALLERY MULTIPLE: Cambiando imágenes:', newImages);
    setFormData(prev => {
      const newData = {
        ...prev,
        galleryImages: newImages
      };
      console.log('🖼️ GALLERY MULTIPLE: Estado actualizado:', newData.galleryImages);
      return newData;
    });
  };

  const handleDatabaseImagesChange = (newImages) => {
    console.log('🗄️ GALLERY DB: Imágenes de BD actualizadas:', newImages);
    setDatabaseImages(newImages);
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log('💾 GUARDANDO:', propertyId, formData);
    
    // Mapear ID frontend a backend (todos con guiones)
    const idMap = {
      'moldes-1680': 'moldes-1680',
      'santa-fe-3770': 'santa-fe-3770', 
      'dorrego-1548': 'dorrego-1548',
      'convencion-1994': 'convencion-1994',
      'ugarteche-2824': 'ugarteche-2824'
    };
    
    const backendId = idMap[propertyId] || propertyId;
    console.log('🔄 Mapeando ID:', propertyId, '→', backendId);
    
    // Preparar datos para el backend - convertir precios a números
    const backendData = { ...formData };
    
    // Convertir precios de strings a números
    if (backendData.prices) {
      const convertPrice = (price) => {
        if (typeof price === 'string') {
          // Extraer solo números del string (ej: "USD 60" -> 60)
          const numMatch = price.match(/\d+/);
          return numMatch ? parseInt(numMatch[0]) : 0;
        }
        return typeof price === 'number' ? price : 0;
      };
      
      backendData.prices = {
        ...backendData.prices,
        daily: convertPrice(backendData.prices.daily),
        weekly: convertPrice(backendData.prices.weekly),
        monthly: convertPrice(backendData.prices.monthly)
      };
    }
    
    console.log('🔄 Datos transformados para backend:', backendData);
    
    try {
      // 1. Guardar directamente en el backend
      const response = await fetch(`http://localhost:5000/api/properties/${backendId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
        },
        body: JSON.stringify(backendData)
      });
      
      if (response.ok) {
        // 2. Actualizar localStorage
        await updateProperty(propertyId, formData);
        
        // 3. Forzar recarga de datos del backend
        console.log('🔄 Forzando recarga desde backend...');
        await loadPropertiesFromBackend();
        
        // 4. Refrescar datos del formulario
        setSaveMessage('✓ Guardado exitoso - Datos sincronizados');
        
        // 5. Recarga completa después de un momento
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
      } else {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
      
    } catch (error) {
      console.error('❌ Error completo:', error);
      setSaveMessage(`✗ Error: ${error.message}`);
      setTimeout(() => setSaveMessage(''), 5000);
    }
    
    setIsSaving(false);
  };

  if (!property) {
    return (
      <div className="property-editor">
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle"></i>
          Propiedad no encontrada
        </div>
      </div>
    );
  }

  return (
    <div className="property-editor">
      {/* Header */}
      <div className="editor-header">
        <div className="editor-title">
          <button className="btn-back" onClick={onBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2>
              <i className="fas fa-edit"></i>
              Editar Propiedad
            </h2>
            <p>{formData.title}</p>
          </div>
        </div>
        
        <div className="editor-actions">
          {saveMessage && (
            <span className={`save-message ${saveMessage.includes('✓') ? 'success' : 'error'}`}>
              {saveMessage}
            </span>
          )}
          <button 
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Guardando...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                Guardar Cambios
              </>
            )}
          </button>
          <button 
            className="btn btn-success ms-2"
            onClick={async () => {
              await handleSave();
              setTimeout(() => {
                onBack();
              }, 1000); // Esperar 1 segundo después de guardar antes de volver
            }}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Guardando...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                <i className="fas fa-arrow-left ms-1"></i>
                Guardar y Volver
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="editor-tabs">
        <button 
          className={`tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <i className="fas fa-info-circle"></i>
          Información General
        </button>
        <button 
          className={`tab ${activeTab === 'prices' ? 'active' : ''}`}
          onClick={() => setActiveTab('prices')}
        >
          <i className="fas fa-dollar-sign"></i>
          Precios
        </button>
        <button 
          className={`tab ${activeTab === 'descriptions' ? 'active' : ''}`}
          onClick={() => setActiveTab('descriptions')}
        >
          <i className="fas fa-language"></i>
          Descripciones
        </button>
        <button 
          className={`tab ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          <i className="fas fa-video"></i>
          Video
        </button>
        <button 
          className={`tab ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          <i className="fas fa-images"></i>
          Imágenes
        </button>
      </div>

      {/* Content */}
      <div className="editor-content">
        {activeTab === 'general' && (
          <div className="editor-section">
            <h3>Información General</h3>
            
            <div className="form-group">
              <label>
                <i className="fas fa-building"></i>
                Título de la Propiedad
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ej: Moldes 1680"
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-map-marker-alt"></i>
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Ej: Moldes 1680, Buenos Aires"
              />
            </div>

            <ImageUploader
              value={formData.coverImage}
              onChange={(value) => handleInputChange('coverImage', value)}
              label="Imagen de Portada"
              required={false}
            />
          </div>
        )}

        {activeTab === 'prices' && (
          <div className="editor-section">
            <h3>Gestión de Precios</h3>
            
            <div className="prices-grid">
              <div className="form-group">
                <label>
                  <i className="fas fa-calendar"></i>
                  Precio Mensual
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.prices.monthly}
                  onChange={(e) => handleNestedInputChange('prices', 'monthly', e.target.value)}
                  placeholder="USD 1200"
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-calendar-week"></i>
                  Precio Semanal
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.prices.weekly}
                  onChange={(e) => handleNestedInputChange('prices', 'weekly', e.target.value)}
                  placeholder="USD 400"
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-calendar-day"></i>
                  Precio Diario
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.prices.daily}
                  onChange={(e) => handleNestedInputChange('prices', 'daily', e.target.value)}
                  placeholder="USD 70"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'descriptions' && (
          <div className="editor-section">
            <h3>Descripciones Multiidioma</h3>
            
            <div className="form-group">
              <label>
                <i className="fas fa-flag"></i>
                Descripción en Español
              </label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.description.es}
                onChange={(e) => handleNestedInputChange('description', 'es', e.target.value)}
                placeholder="Descripción detallada en español..."
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-flag"></i>
                Descripción en Inglés
              </label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.description.en}
                onChange={(e) => handleNestedInputChange('description', 'en', e.target.value)}
                placeholder="Detailed description in English..."
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-flag"></i>
                Descripción en Português
              </label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.description.pt}
                onChange={(e) => handleNestedInputChange('description', 'pt', e.target.value)}
                placeholder="Descrição detalhada em português..."
              />
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="editor-section">
            <h3>Video Hero de la Propiedad</h3>
            <p className="text-muted mb-3">
              <i className="fas fa-info-circle me-1"></i>
              Este video se mostrará en la sección hero de la página de la propiedad
            </p>
            
            <VideoUploader
              value={formData.heroVideo}
              onChange={(value) => handleInputChange('heroVideo', value)}
              label="Video Principal"
              required={false}
            />
            
            <div className="video-recommendations mt-3">
              <h5><i className="fas fa-lightbulb text-warning me-2"></i>Recomendaciones:</h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-check text-success me-2"></i>Formato: MP4 preferible</li>
                <li><i className="fas fa-check text-success me-2"></i>Duración: 10-60 segundos ideal</li>
                <li><i className="fas fa-check text-success me-2"></i>Tamaño: Máximo 50MB</li>
                <li><i className="fas fa-check text-success me-2"></i>Resolución: 1920x1080 (Full HD) recomendado</li>
                <li><i className="fas fa-check text-success me-2"></i>Contenido: Mostrar las mejores características del departamento</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="editor-section">
            <h3>Gestión de Imágenes</h3>
            <p className="text-muted mb-4">
              <i className="fas fa-info-circle me-1"></i>
              Gestiona todas las imágenes de la propiedad. Puedes usar la galería local (temporal) o la galería de base de datos (persistente).
            </p>
            
            {/* Galería de Base de Datos */}
            <div className="gallery-section mb-4">
              <DatabaseGalleryManager
                propertyId={propertyId}
                onImagesChange={handleDatabaseImagesChange}
              />
            </div>

            {/* Separador */}
            <div className="gallery-separator">
              <hr />
              <span className="separator-text">Galería Local (Temporal)</span>
              <hr />
            </div>
            
            {/* Galería Local/Temporal */}
            <div className="gallery-section">
              <div className="local-gallery-info mb-3">
                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  <strong>Galería Local:</strong> Las imágenes aquí se almacenan temporalmente en el navegador. 
                  Para almacenamiento permanente, usa la Galería de Base de Datos arriba.
                </div>
              </div>
              
              <MultipleImageUploader
                currentImages={formData.galleryImages}
                onImagesChange={handleGalleryImagesChange}
                title="Galería Local del Departamento"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyEditor;
