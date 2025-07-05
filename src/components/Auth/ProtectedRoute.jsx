import { useAuth } from '../../context/AuthContextAPI';

function ProtectedRoute({ children, adminOnly = false }) {
  // Eliminar toda la lógica de protección: siempre mostrar children
  return children;
}

export default ProtectedRoute;
