import { useAuth } from '../../context/AuthContextAPI';
import { useEffect } from 'react';

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      alert('Debes iniciar sesión para acceder a esta página');
      return;
    }
    
    if (adminOnly && !isAdmin()) {
      alert('No tienes permisos para acceder a esta página');
      return;
    }
  }, [isAuthenticated, isAdmin, adminOnly]);

  // Si no está autenticado, no mostrar nada (o podrías redirigir)
  if (!isAuthenticated()) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <i className="fas fa-lock fa-3x" style={{color: '#3498db', marginBottom: '1rem'}}></i>
        <h3>Acceso Restringido</h3>
        <p>Debes iniciar sesión para acceder a esta página.</p>
      </div>
    );
  }

  // Si requiere admin y no es admin
  if (adminOnly && !isAdmin()) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <i className="fas fa-user-shield fa-3x" style={{color: '#e74c3c', marginBottom: '1rem'}}></i>
        <h3>Acceso de Administrador Requerido</h3>
        <p>No tienes permisos para acceder a esta página.</p>
        <small>Usuario actual: {user?.name} ({user?.role})</small>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
