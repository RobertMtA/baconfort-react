import React, { useState, useEffect } from 'react';
import { authAPI } from '../../services/api';
import UserReservations from '../UserReservations/UserReservations';
import ForgotPassword from '../Auth/ForgotPassword';
import './UserProfile.css';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      // Aquí deberías tener una función para obtener el perfil del usuario
      // Por ahora usaremos datos del localStorage
      const userData = JSON.parse(localStorage.getItem('baconfort-user') || '{}');
      setUser(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || ''
      });
    } catch (err) {
      console.error('Error al cargar perfil:', err);
      setError('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      // Aquí deberías implementar la actualización del perfil
      console.log('Guardando perfil:', formData);
      setEditMode(false);
      // Actualizar los datos locales
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      localStorage.setItem('baconfort-user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Error al guardar perfil:', err);
      setError('Error al guardar el perfil');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    try {
      // Aquí implementarías la llamada a la API para cambiar contraseña
      // await authAPI.changePassword(passwordData.currentPassword, passwordData.newPassword);
      
      alert('Contraseña actualizada exitosamente');
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setError('');
    } catch (err) {
      setError('Error al cambiar la contraseña');
    }
  };

  const handlePrivacySettings = () => {
    setShowPrivacyModal(true);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    if (window.confirm('¿Estás ABSOLUTAMENTE SEGURO de que quieres eliminar tu cuenta? Esta acción NO se puede deshacer.')) {
      try {
        // Aquí implementarías la llamada a la API para eliminar cuenta
        // await authAPI.deleteAccount();
        
        alert('Cuenta eliminada. Serás redirigido al inicio.');
        localStorage.removeItem('baconfort-token');
        localStorage.removeItem('baconfort-user');
        window.location.href = '/';
      } catch (err) {
        setError('Error al eliminar la cuenta');
      }
    }
    setShowDeleteModal(false);
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderProfileTab = () => (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="profile-info">
          <h3>{user?.name || 'Usuario'}</h3>
          <p>{user?.email}</p>
          <span className="member-since">
            Miembro desde {new Date(user?.createdAt || Date.now()).getFullYear()}
          </span>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setEditMode(!editMode)}
        >
          <i className={`fas fa-${editMode ? 'times' : 'edit'}`}></i>
          {editMode ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      {editMode ? (
        <form className="profile-form" onSubmit={handleSaveProfile}>
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              <i className="fas fa-save"></i>
              Guardar Cambios
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setEditMode(false)}
            >
              <i className="fas fa-times"></i>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="detail-card">
            <h4>Información Personal</h4>
            <div className="detail-item">
              <i className="fas fa-user"></i>
              <div>
                <label>Nombre</label>
                <span>{user?.name || 'No especificado'}</span>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-envelope"></i>
              <div>
                <label>Email</label>
                <span>{user?.email}</span>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-phone"></i>
              <div>
                <label>Teléfono</label>
                <span>{user?.phone || 'No especificado'}</span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h4>Preferencias</h4>
            <div className="detail-item">
              <i className="fas fa-bell"></i>
              <div>
                <label>Notificaciones</label>
                <span>Activadas</span>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-globe"></i>
              <div>
                <label>Idioma</label>
                <span>Español</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="user-profile-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <h3>Cargando perfil...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="profile-navigation">
        <h2>
          <i className="fas fa-user-cog"></i>
          Mi Cuenta
        </h2>
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i>
            Perfil
          </button>
          <button 
            className={`nav-tab ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            <i className="fas fa-calendar-alt"></i>
            Mis Reservas
          </button>
          <button 
            className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i>
            Configuración
          </button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'reservations' && <UserReservations />}
        {activeTab === 'settings' && (
          <div className="settings-section">
            <h3>Configuración de la Cuenta</h3>
            <div className="settings-group">
              <h4>Seguridad</h4>
              <p>Mantén tu cuenta segura actualizando tu contraseña regularmente.</p>
              <div className="security-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowPasswordModal(true)}
                >
                  <i className="fas fa-key"></i>
                  Cambiar Contraseña
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowForgotPassword(true)}
                >
                  <i className="fas fa-unlock-alt"></i>
                  Recuperar Contraseña
                </button>
              </div>
              <div className="security-info">
                <small className="text-muted">
                  <i className="fas fa-info-circle"></i>
                  Si olvidaste tu contraseña, usa "Recuperar Contraseña" para recibir un enlace de reseteo por email.
                </small>
              </div>
            </div>
            <div className="settings-group">
              <h4>Privacidad</h4>
              <p>Configura cómo otros usuarios pueden ver tu información.</p>
              <button 
                className="btn btn-outline"
                onClick={handlePrivacySettings}
              >
                <i className="fas fa-shield-alt"></i>
                Configurar Privacidad
              </button>
            </div>
            <div className="settings-group danger-zone">
              <h4>Zona Peligrosa</h4>
              <p>Una vez eliminada, tu cuenta no se puede recuperar.</p>
              <button 
                className="btn btn-danger"
                onClick={handleDeleteAccount}
              >
                <i className="fas fa-trash"></i>
                Eliminar Cuenta
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      )}

      {showPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPasswordModal(false)}>&times;</span>
            <h2>Cambiar Contraseña</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label htmlFor="currentPassword">Contraseña Actual</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nueva Contraseña</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  <i className="fas fa-save"></i>
                  Guardar Cambios
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  <i className="fas fa-times"></i>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPrivacyModal(false)}>&times;</span>
            <h2>Configuración de Privacidad</h2>
            <div className="privacy-settings">
              <div className="setting-item">
                <h4>Visibilidad del Perfil</h4>
                <p>Controla quién puede ver tu información personal.</p>
                <select className="form-control">
                  <option>Público</option>
                  <option>Solo usuarios registrados</option>
                  <option>Privado</option>
                </select>
              </div>
              <div className="setting-item">
                <h4>Historial de Reservas</h4>
                <p>¿Permitir que otros vean tu historial de reservas?</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <h4>Notificaciones por Email</h4>
                <p>Recibir notificaciones sobre el estado de tus reservas.</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button 
                className="btn btn-success"
                onClick={() => {
                  alert('Configuración de privacidad guardada');
                  setShowPrivacyModal(false);
                }}
              >
                <i className="fas fa-save"></i>
                Guardar Cambios
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowPrivacyModal(false)}
              >
                <i className="fas fa-times"></i>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
            <h2>Eliminar Cuenta</h2>
            <p>¿Estás ABSOLUTAMENTE SEGURO de que quieres eliminar tu cuenta? Esta acción NO se puede deshacer.</p>
            <div className="form-actions">
              <button 
                className="btn btn-danger"
                onClick={confirmDeleteAccount}
              >
                <i className="fas fa-trash"></i>
                Eliminar Cuenta
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                <i className="fas fa-times"></i>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ForgotPassword 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default UserProfile;
