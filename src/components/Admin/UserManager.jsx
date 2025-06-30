import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContextAPI';
import './UserManager.css';

function UserManager() {
  const { user, getAllUsers, updateUser, deleteUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterRole]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getAllUsers();
      
      if (response.success) {
        console.log('📊 UserManager - Usuarios cargados:', response.data.length);
        setUsers(response.data);
      } else {
        console.error('Error cargando usuarios:', response.error);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rol
    if (filterRole !== 'all') {
      filtered = filtered.filter(u => u.role === filterRole);
    }

    setFilteredUsers(filtered);
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find(u => u._id === userId);
    
    if (!userToEdit) {
      alert('Usuario no encontrado');
      return;
    }
    
    setEditingUser({ ...userToEdit });
  };

  const handleSaveUser = async () => {
    if (!editingUser.name.trim() || !editingUser.email.trim()) {
      alert('Nombre y email son obligatorios');
      return;
    }

    // Verificar email único (excepto el usuario actual)
    const emailExists = users.find(u => 
      u._id !== editingUser._id && 
      u.email.toLowerCase() === editingUser.email.toLowerCase()
    );

    if (emailExists) {
      alert('Este email ya está en uso por otro usuario');
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateUser(editingUser._id, editingUser);
      
      if (result.success) {
        setEditingUser(null);
        loadUsers();
        alert('Usuario actualizado exitosamente');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error guardando usuario:', error);
      alert('Error al actualizar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    setIsLoading(true);
    console.log('🗑️ UserManager - Intentando eliminar usuario:', userId);
    
    try {
      const result = await deleteUser(userId);
      console.log('🗑️ UserManager - Resultado eliminación:', result);
      
      if (result.success) {
        setShowDeleteConfirm(null);
        loadUsers();
        alert('Usuario eliminado exitosamente');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      alert('Error al eliminar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    // Solo permitir cambios de rol para usuarios que NO sean el admin principal
    const userToChange = users.find(u => u._id === userId);
    
    if (userToChange.email === 'admin@baconfort.com') {
      alert('No puedes cambiar el rol del administrador principal');
      return;
    }

    // No permitir cambiar el propio rol
    if (userId === user._id) {
      alert('No puedes cambiar tu propio rol');
      return;
    }

    if (!confirm(`¿Estás seguro de cambiar el rol de ${userToChange?.name} a ${newRole}?`)) {
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser = { ...userToChange, role: newRole };
      const result = await updateUser(userId, updatedUser);
      
      if (result.success) {
        loadUsers();
        alert('Rol actualizado exitosamente');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error cambiando rol:', error);
      alert('Error al cambiar rol');
    } finally {
      setIsLoading(false);
    }
  };

  // Estadísticas
  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const guestUsers = users.filter(u => u.role === 'guest').length;

  return (
    <div className="user-manager">
      <div className="user-manager-header">
        <h2>
          <i className="fas fa-users"></i>
          Gestión de Usuarios
        </h2>
        
        <div className="stats-row">
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <div>
              <span className="stat-number">{totalUsers}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-crown"></i>
            <div>
              <span className="stat-number">{adminUsers}</span>
              <span className="stat-label">Admins</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-user"></i>
            <div>
              <span className="stat-number">{guestUsers}</span>
              <span className="stat-label">Usuarios</span>
            </div>
          </div>
        </div>
      </div>

      <div className="user-controls">
        <div className="search-section">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-section">
          <label htmlFor="roleFilter">Filtrar por rol:</label>
          <select 
            id="roleFilter"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="admin">Administradores</option>
            <option value="guest">Usuarios</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Cargando usuarios...</span>
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Fecha de Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(userData => (
                <tr key={userData._id} className={userData._id === user._id ? 'current-user' : ''}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {userData.role === 'admin' ? '👑' : '👤'}
                      </div>
                      <div className="user-details">
                        <span className="user-name">{userData.name}</span>
                        {userData._id === user._id && <span className="current-badge">Tú</span>}
                      </div>
                    </div>
                  </td>
                  <td>{userData.email}</td>
                  <td>
                    <select 
                      value={userData.role} 
                      onChange={(e) => 
                        handleChangeRole(userData._id, e.target.value)
                      }
                      disabled={userData.email === 'admin@baconfort.com' || userData._id === user._id || isLoading}
                      className={`role-select ${userData.role}`}
                    >
                      <option value="guest">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                  <td>
                    {new Date(userData.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditUser(userData._id)}
                        disabled={isLoading}
                        title="Editar usuario"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          console.log('🗑️ UserManager - Click en botón eliminar para usuario:', userData._id);
                          setShowDeleteConfirm(userData._id);
                        }}
                        disabled={userData.email === 'admin@baconfort.com' || userData._id === user._id || isLoading}
                        title="Eliminar usuario"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && !isLoading && (
            <div className="empty-state">
              <i className="fas fa-users-slash"></i>
              <p>No se encontraron usuarios</p>
              {searchTerm && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal de edición */}
      {editingUser && (
        <div className="modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-user-edit"></i>
                Editar Usuario
              </h3>
              <button 
                className="modal-close"
                onClick={() => setEditingUser(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="editName">Nombre</label>
                <input
                  type="text"
                  id="editName"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    name: e.target.value
                  })}
                  placeholder="Nombre del usuario"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="editEmail">Email</label>
                <input
                  type="email"
                  id="editEmail"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    email: e.target.value
                  })}
                  placeholder="Email del usuario"
                  disabled={editingUser.email === 'admin@baconfort.com'}
                />
                {editingUser.email === 'admin@baconfort.com' && (
                  <small className="form-note">No puedes cambiar el email del administrador principal</small>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="editRole">Rol</label>
                <select
                  id="editRole"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({
                    ...editingUser,
                    role: e.target.value
                  })}
                  disabled={editingUser.email === 'admin@baconfort.com' || editingUser._id === user._id}
                >
                  <option value="guest">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
                {(editingUser.email === 'admin@baconfort.com' || editingUser._id === user._id) && (
                  <small className="form-note">No puedes cambiar este rol</small>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setEditingUser(null)}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSaveUser}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    Guardar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-exclamation-triangle"></i>
                Confirmar Eliminación
              </h3>
            </div>
            
            <div className="modal-body">
              <p>¿Estás seguro de que quieres eliminar este usuario?</p>
              <p><strong>Esta acción no se puede deshacer.</strong></p>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(null)}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-trash"></i>
                    Eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManager;
