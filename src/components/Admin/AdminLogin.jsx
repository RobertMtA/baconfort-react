import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      
      if (!success) {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión. Intenta nuevamente.');
    }
    
    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <i className="fas fa-shield-alt"></i>
          <h2>Panel de Administración</h2>
          <p>BACONFORT</p>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i>
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@baconfort.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
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
        </form>
        

      </div>
    </div>
  );
}

export default AdminLogin;
