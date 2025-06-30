import { useState } from 'react';
import { useAuth } from '../../context/AuthContextAPI';
import ForgotPassword from './ForgotPassword';
import './AuthForm.css';

function LoginForm({ onSwitchToRegister, onClose }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      onClose();
      // Mostrar mensaje de éxito
      alert(`¡Bienvenido/a ${result.user.name}!`);
    } else {
      setErrors({ general: result.error });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-form login-mode">
      <div className="auth-header">
        <h3>
          <i className="fas fa-sign-in-alt"></i>
          Iniciar Sesión
        </h3>
        <p>Accede a tu cuenta o regístrate si es tu primera vez</p>
      </div>

      {errors.general && (
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-circle"></i>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form-content">
        <div className="form-group">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
            disabled={isLoading}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i>
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
            required
            disabled={isLoading}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <button 
          type="submit" 
          className="auth-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Iniciando sesión...
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt"></i>
              Iniciar Sesión
            </>
          )}
        </button>

        <div className="forgot-password-section">
          <button 
            type="button" 
            className="forgot-password-link"
            onClick={() => setShowForgotPassword(true)}
            disabled={isLoading}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </form>

      <div className="auth-footer">
        <p>
          ¿No tienes cuenta?{' '}
          <button 
            type="button" 
            className="auth-link"
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            Regístrate aquí
          </button>
        </p>
      </div>

      <ForgotPassword 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}

export default LoginForm;
