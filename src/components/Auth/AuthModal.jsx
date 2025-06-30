import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthModal.css';

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [currentMode, setCurrentMode] = useState(initialMode);

  // Resetear al modo inicial cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setCurrentMode(initialMode);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const switchToRegister = () => {
    setCurrentMode('register');
  };

  const switchToLogin = () => {
    setCurrentMode('login');
  };

  return (
    <div className="auth-modal-overlay" onClick={handleBackdropClick}>
      <div className="auth-modal">
        <div className="auth-modal-header">
          <div className="modal-brand">
            <img 
              src="/img/logo.jpg" 
              alt="BACONFORT Logo" 
              className="modal-logo"
            />
            <span className="modal-brand-text">BACONFORT</span>
          </div>
          <button 
            className="auth-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="auth-modal-content">
          {currentMode === 'login' ? (
            <LoginForm 
              onSwitchToRegister={switchToRegister}
              onClose={onClose}
            />
          ) : (
            <RegisterForm 
              onSwitchToLogin={switchToLogin}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
