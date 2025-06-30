import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import ImageUploader from './ImageUploader';
import './PromotionManager.css';

function PromotionManager() {
  const { getPromotions, updatePromotion, addPromotion, deletePromotion, reorderPromotions } = useAdmin();
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');

  const promotions = getPromotions();

  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    active: true
  });

  const handleAddPromotion = () => {
    if (!newPromotion.title || !newPromotion.description || !newPromotion.image) {
      setMessage('❌ Por favor completa todos los campos obligatorios');
      return;
    }

    addPromotion(newPromotion);
    setNewPromotion({
      title: '',
      description: '',
      image: '',
      link: '',
      active: true
    });
    setShowAddForm(false);
    setMessage('✅ Promoción agregada exitosamente');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleUpdatePromotion = (id, updates) => {
    updatePromotion(id, updates);
    setMessage('✅ Promoción actualizada');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeletePromotion = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta promoción?')) {
      deletePromotion(id);
      setMessage('✅ Promoción eliminada');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleToggleActive = (id, currentActive) => {
    handleUpdatePromotion(id, { active: !currentActive });
  };

  const movePromotion = (fromIndex, toIndex) => {
    const newOrder = [...promotions];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    
    // Actualizar el orden
    const reorderedPromotions = newOrder.map((promo, index) => ({
      ...promo,
      order: index + 1
    }));
    
    reorderPromotions(reorderedPromotions);
  };

  const propertyOptions = [
    { value: '', label: 'Sin enlace específico' },
    { value: '/moldes1680', label: 'Moldes 1680' },
    { value: '/santafe3770', label: 'Santa Fe 3770' },
    { value: '/dorrego1548', label: 'Dorrego 1548' },
    { value: '/convencion1994', label: 'Convención 1994' },
    { value: '/ugarteche2824', label: 'Ugarteche 2824' }
  ];

  return (
    <div className="promotion-manager">
      <div className="manager-header">
        <h2>
          <i className="fas fa-percent text-warning me-2"></i>
          Gestión de Promociones
        </h2>
        <button
          className="btn btn-success"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <i className="fas fa-plus me-2"></i>
          {showAddForm ? 'Cancelar' : 'Agregar Promoción'}
        </button>
      </div>

      {message && (
        <div className={`alert ${message.includes('❌') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}

      {/* Formulario para agregar nueva promoción */}
      {showAddForm && (
        <div className="add-promotion-form">
          <h3>Nueva Promoción</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Título *</label>
              <input
                type="text"
                className="form-control"
                value={newPromotion.title}
                onChange={(e) => setNewPromotion({...newPromotion, title: e.target.value})}
                placeholder="Ej: Descuento Especial - Estancia Larga"
              />
            </div>
            <div className="form-group">
              <label>Descripción *</label>
              <textarea
                className="form-control"
                value={newPromotion.description}
                onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                placeholder="Ej: 20% OFF en estadías de más de 15 días"
                rows="3"
              />
            </div>
          </div>

          <ImageUploader
            value={newPromotion.image}
            onChange={(value) => setNewPromotion({...newPromotion, image: value})}
            label="Imagen de la Promoción"
            required={true}
          />

          <div className="form-group">
            <label>Enlace a Propiedad</label>
            <select
              className="form-control"
              value={newPromotion.link}
              onChange={(e) => setNewPromotion({...newPromotion, link: e.target.value})}
            >
              {propertyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleAddPromotion}>
              <i className="fas fa-save me-2"></i>
              Guardar Promoción
            </button>
            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
              <i className="fas fa-times me-2"></i>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de promociones existentes */}
      <div className="promotions-list">
        <h3>Promociones Existentes ({promotions.length})</h3>
        
        {promotions.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-percent fa-3x text-muted mb-3"></i>
            <p>No hay promociones creadas</p>
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
              <i className="fas fa-plus me-2"></i>
              Crear Primera Promoción
            </button>
          </div>
        ) : (
          promotions.map((promotion, index) => (
            <div key={promotion.id} className={`promotion-card ${!promotion.active ? 'inactive' : ''}`}>
              <div className="promotion-order">
                <div className="order-controls">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => movePromotion(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                  >
                    <i className="fas fa-arrow-up"></i>
                  </button>
                  <span className="order-number">{index + 1}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => movePromotion(index, Math.min(promotions.length - 1, index + 1))}
                    disabled={index === promotions.length - 1}
                  >
                    <i className="fas fa-arrow-down"></i>
                  </button>
                </div>
              </div>

              <div className="promotion-image">
                <img src={promotion.image} alt={promotion.title} />
                {!promotion.active && (
                  <div className="inactive-overlay">
                    <i className="fas fa-eye-slash"></i>
                  </div>
                )}
              </div>

              <div className="promotion-content">
                {editingPromotion === promotion.id ? (
                  <PromotionEditForm
                    promotion={promotion}
                    onSave={(updates) => {
                      handleUpdatePromotion(promotion.id, updates);
                      setEditingPromotion(null);
                    }}
                    onCancel={() => setEditingPromotion(null)}
                    propertyOptions={propertyOptions}
                  />
                ) : (
                  <>
                    <h4>{promotion.title}</h4>
                    <p>{promotion.description}</p>
                    <div className="promotion-meta">
                      <span className="link-info">
                        <i className="fas fa-link me-1"></i>
                        {promotion.link || 'Sin enlace'}
                      </span>
                      <span className={`status ${promotion.active ? 'active' : 'inactive'}`}>
                        <i className={`fas ${promotion.active ? 'fa-eye' : 'fa-eye-slash'} me-1`}></i>
                        {promotion.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="promotion-actions">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setEditingPromotion(promotion.id)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className={`btn btn-sm ${promotion.active ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => handleToggleActive(promotion.id, promotion.active)}
                  title={promotion.active ? 'Desactivar' : 'Activar'}
                >
                  <i className={`fas ${promotion.active ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeletePromotion(promotion.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Componente para editar promoción
function PromotionEditForm({ promotion, onSave, onCancel, propertyOptions }) {
  const [formData, setFormData] = useState({
    title: promotion.title,
    description: promotion.description,
    image: promotion.image,
    link: promotion.link || '',
    active: promotion.active
  });

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="edit-form">
      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          className="form-control form-control-sm"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          className="form-control form-control-sm"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows="2"
        />
      </div>
      <ImageUploader
        value={formData.image}
        onChange={(value) => setFormData({...formData, image: value})}
        label="Imagen"
        className="compact"
      />
      <div className="form-group">
        <label>Enlace</label>
        <select
          className="form-control form-control-sm"
          value={formData.link}
          onChange={(e) => setFormData({...formData, link: e.target.value})}
        >
          {propertyOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-actions">
        <button className="btn btn-sm btn-success" onClick={handleSave}>
          <i className="fas fa-save"></i>
        </button>
        <button className="btn btn-sm btn-secondary" onClick={onCancel}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}

export default PromotionManager;
