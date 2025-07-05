import { useState, useEffect } from 'react';
import { API_URL } from '../../services/api';
import './AdminReservations.css';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = async () => {
    try {
      console.log('🔄 RESERVAS: Cargando reservas desde backend...');
      const response = await fetch(`${API_URL}/reservations/admin/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
        }
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ RESERVAS: Respuesta completa:', responseData);
        
        // Extraer el array de reservas de la respuesta
        const reservationsArray = responseData.data || responseData;
        console.log('✅ RESERVAS: Datos cargados:', reservationsArray.length, 'reservas');
        
        setReservations(reservationsArray);
        setError(null);
      } else {
        const errorData = await response.json();
        console.error('❌ RESERVAS: Error del servidor:', errorData);
        setError(errorData.message || 'Error cargando reservas');
      }
    } catch (err) {
      console.error('❌ RESERVAS: Error de conexión:', err);
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  const changeReservationStatus = async (reservationId, newStatus) => {
    console.log('🔄 Cambiando estado:', { reservationId, newStatus });
    try {
      const response = await fetch(`${API_URL}/reservations/admin/${reservationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setReservations(prev => prev.map(reservation => 
          reservation._id === reservationId 
            ? { ...reservation, status: newStatus, updatedAt: new Date().toISOString() }
            : reservation
        ));
        alert(`✅ Estado cambiado a: ${newStatus}`);
        console.log('✅ Estado actualizado exitosamente');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al cambiar estado');
        console.error('❌ Error del servidor:', errorData);
      }
    } catch (err) {
      console.error('❌ Error changing reservation status:', err);
      alert('Error de conexión al cambiar estado');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { text: 'Pendiente', class: 'status-pending' },
      confirmed: { text: 'Confirmada', class: 'status-confirmed' },
      cancelled: { text: 'Cancelada', class: 'status-cancelled' },
      completed: { text: 'Completada', class: 'status-completed' }
    };
    
    const statusInfo = statusMap[status] || { text: status, class: 'status-unknown' };
    
    return (
      <span className={`status-badge ${statusInfo.class}`}>
        {statusInfo.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'all') return true;
    return reservation.status === filter;
  });

  const getStatusCounts = () => {
    return {
      all: reservations.length,
      pending: reservations.filter(r => r.status === 'pending').length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      cancelled: reservations.filter(r => r.status === 'cancelled').length,
      completed: reservations.filter(r => r.status === 'completed').length
    };
  };

  if (loading) {
    return (
      <div className="admin-reservations-container">
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando reservas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-reservations-container">
        <div className="error">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Error cargando reservas</h3>
          <p>{error}</p>
          <button onClick={fetchAllReservations} className="retry-btn">
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  const statusCounts = getStatusCounts();

  return (
    <div className="admin-reservations-container">
      <div className="page-header">
        <h2>
          <i className="fas fa-calendar-check"></i>
          Gestión de Reservas
        </h2>
        <p>Administra todas las reservas del sistema</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <i className="fas fa-calendar-alt"></i>
          <div>
            <h3>{statusCounts.all}</h3>
            <p>Total Reservas</p>
          </div>
        </div>
        <div className="stat-card pending">
          <i className="fas fa-clock"></i>
          <div>
            <h3>{statusCounts.pending}</h3>
            <p>Pendientes</p>
          </div>
        </div>
        <div className="stat-card confirmed">
          <i className="fas fa-check-circle"></i>
          <div>
            <h3>{statusCounts.confirmed}</h3>
            <p>Confirmadas</p>
          </div>
        </div>
        <div className="stat-card cancelled">
          <i className="fas fa-times-circle"></i>
          <div>
            <h3>{statusCounts.cancelled}</h3>
            <p>Canceladas</p>
          </div>
        </div>
      </div>

      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Todas ({statusCounts.all})
        </button>
        <button 
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pendientes ({statusCounts.pending})
        </button>
        <button 
          className={filter === 'confirmed' ? 'active' : ''}
          onClick={() => setFilter('confirmed')}
        >
          Confirmadas ({statusCounts.confirmed})
        </button>
        <button 
          className={filter === 'cancelled' ? 'active' : ''}
          onClick={() => setFilter('cancelled')}
        >
          Canceladas ({statusCounts.cancelled})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completadas ({statusCounts.completed})
        </button>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="no-reservations">
          <i className="fas fa-calendar-times"></i>
          <h3>No hay reservas</h3>
          <p>No se encontraron reservas para el filtro seleccionado.</p>
        </div>
      ) : (
        <>
          {/* Vista desktop - Tabla */}
          <div className="reservations-table-container">
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Propiedad</th>
                  <th>Fechas</th>
                  <th>Huéspedes</th>
                  <th>Contacto</th>
                  <th>Estado</th>
                  <th>Creada</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td>
                      <div className="user-info">
                        <strong>{reservation.userName}</strong>
                        <small>{reservation.userEmail}</small>
                      </div>
                    </td>
                    <td>
                      <div className="property-info">
                        <strong>{reservation.propertyName}</strong>
                        <small>ID: {reservation.propertyId}</small>
                      </div>
                    </td>
                    <td>
                      <div className="dates-info">
                        <div>
                          {formatDate(reservation.checkIn)}
                          <br />
                          {formatDate(reservation.checkOut)}
                        </div>
                        <small>{calculateNights(reservation.checkIn, reservation.checkOut)} noches</small>
                      </div>
                    </td>
                    <td>{reservation.guests}</td>
                    <td>
                      <div className="contact-info">
                        <div>{reservation.fullName}</div>
                        <small>{reservation.email}</small>
                        {reservation.phone && <small>{reservation.phone}</small>}
                      </div>
                    </td>
                    <td>{getStatusBadge(reservation.status)}</td>
                    <td>
                      <small>{formatDateTime(reservation.createdAt)}</small>
                    </td>
                    <td>
                      <div className="actions">
                        <div className="quick-actions">
                          <button 
                            className="view-btn"
                            onClick={() => alert('Mensaje: ' + (reservation.message || 'Sin mensaje'))}
                            title="Ver mensaje completo"
                          >
                            👁️ Ver
                          </button>
                          
                          <button 
                            className="confirm-btn"
                            onClick={() => changeReservationStatus(reservation._id, 'confirmed')}
                            title="Confirmar reserva"
                            style={{ display: reservation.status === 'pending' ? 'inline-block' : 'none' }}
                          >
                            ✅ OK
                          </button>
                          
                          <button 
                            className="cancel-btn"
                            onClick={() => changeReservationStatus(reservation._id, 'cancelled')}
                            title="Cancelar reserva"
                            style={{ display: reservation.status === 'pending' ? 'inline-block' : 'none' }}
                          >
                            ❌ No
                          </button>
                          
                          <button 
                            className="complete-btn"
                            onClick={() => changeReservationStatus(reservation._id, 'completed')}
                            title="Marcar como completada"
                            style={{ display: reservation.status === 'confirmed' ? 'inline-block' : 'none' }}
                          >
                            🏁 Done
                          </button>
                        </div>
                        
                        <select 
                          className="status-selector"
                          value={reservation.status}
                          onChange={(e) => changeReservationStatus(reservation._id, e.target.value)}
                          title="Cambiar estado"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmada</option>
                          <option value="cancelled">Cancelada</option>
                          <option value="completed">Completada</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista móvil - Cards */}
          <div className="mobile-reservations">
            {filteredReservations.map((reservation) => (
              <div key={reservation._id} className="reservation-card">
                <div className="reservation-header">
                  <div className="reservation-title">
                    {reservation.propertyName}
                  </div>
                  {getStatusBadge(reservation.status)}
                </div>
                
                <div className="reservation-details">
                  <div className="detail-row">
                    <span className="detail-label">Usuario:</span>
                    <span className="detail-value">
                      {reservation.userName}<br />
                      <small>{reservation.userEmail}</small>
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Fechas:</span>
                    <span className="detail-value">
                      {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}<br />
                      <small>{calculateNights(reservation.checkIn, reservation.checkOut)} noches</small>
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Huéspedes:</span>
                    <span className="detail-value">{reservation.guests}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Contacto:</span>
                    <span className="detail-value">
                      {reservation.fullName}<br />
                      <small>{reservation.email}</small>
                      {reservation.phone && <><br /><small>{reservation.phone}</small></>}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Creada:</span>
                    <span className="detail-value">
                      <small>{formatDateTime(reservation.createdAt)}</small>
                    </span>
                  </div>
                </div>
                
                <div className="mobile-actions">
                  <button 
                    className="view-btn"
                    onClick={() => alert('Mensaje: ' + (reservation.message || 'Sin mensaje'))}
                    title="Ver mensaje completo"
                  >
                    👁️ Ver
                  </button>
                  
                  {reservation.status === 'pending' && (
                    <>
                      <button 
                        className="confirm-btn"
                        onClick={() => changeReservationStatus(reservation._id, 'confirmed')}
                        title="Confirmar reserva"
                      >
                        ✅ OK
                      </button>
                      
                      <button 
                        className="cancel-btn"
                        onClick={() => changeReservationStatus(reservation._id, 'cancelled')}
                        title="Cancelar reserva"
                      >
                        ❌ No
                      </button>
                    </>
                  )}
                  
                  {reservation.status === 'confirmed' && (
                    <button 
                      className="complete-btn"
                      onClick={() => changeReservationStatus(reservation._id, 'completed')}
                      title="Marcar como completada"
                    >
                      🏁 Done
                    </button>
                  )}
                  
                  <select 
                    className="status-selector"
                    value={reservation.status}
                    onChange={(e) => changeReservationStatus(reservation._id, e.target.value)}
                    title="Cambiar estado"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="confirmed">Confirmada</option>
                    <option value="cancelled">Cancelada</option>
                    <option value="completed">Completada</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminReservations;
