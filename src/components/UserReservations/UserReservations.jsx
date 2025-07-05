import React, { useState, useEffect } from 'react';
import { getUserReservations, updateReservationStatus } from '../../services/api';
import './UserReservations.css';

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('active'); // active, completed, cancelled
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    console.log('📥 UserReservations: iniciando carga de reservas...');
    try {
      setLoading(true);
      setError(''); // Limpiar errores previos
      
      console.log('🔧 UserReservations: llamando getUserReservations...');
      console.log('🔧 UserReservations: función disponible?', typeof getUserReservations);
      
      const data = await getUserReservations();
      console.log('📊 UserReservations: datos recibidos:', data);
      
      // Verificar si data es un array, si no, crear array vacío
      if (Array.isArray(data)) {
        setReservations(data);
      } else if (data && data.data && Array.isArray(data.data)) {
        setReservations(data.data);
      } else {
        setReservations([]);
      }
      
    } catch (err) {
      console.error('Error al cargar reservas:', err);
      setError('Error al cargar reservas');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      return;
    }

    try {
      await updateReservationStatus(reservationId, 'cancelled');
      setReservations(prev => 
        prev.map(res => 
          res._id === reservationId 
            ? { ...res, status: 'cancelled' }
            : res
        )
      );
    } catch (err) {
      console.error('Error al cancelar reserva:', err);
      setError('Error al cancelar la reserva');
    }
  };

  const handleViewDetails = (reservation) => {
    console.log('🔍 Ver detalles de reserva:', reservation._id);
    setSelectedReservation(reservation);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedReservation(null);
  };

  const filterReservations = (status) => {
    const now = new Date();
    
    switch (status) {
      case 'active':
        return reservations.filter(res => 
          ['pending', 'confirmed'].includes(res.status) && 
          new Date(res.checkOut) >= now
        );
      case 'completed':
        return reservations.filter(res => 
          res.status === 'completed' || 
          (res.status === 'confirmed' && new Date(res.checkOut) < now)
        );
      case 'cancelled':
        return reservations.filter(res => res.status === 'cancelled');
      default:
        return reservations;
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      cancelled: 'Cancelada',
      completed: 'Completada'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const canCancelReservation = (reservation) => {
    const checkInDate = new Date(reservation.checkIn);
    const now = new Date();
    const diffTime = checkInDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return ['pending', 'confirmed'].includes(reservation.status) && diffDays > 1;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredReservations = filterReservations(activeTab);

  if (loading) {
    return (
      <div className="user-reservations-container">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i>
          <h3>Cargando reservas...</h3>
          <p>Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-reservations-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Error al cargar reservas</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button className="btn btn-primary" onClick={loadReservations}>
              <i className="fas fa-redo"></i>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-reservations-container">
      <div className="page-header">
        <h2>
          <i className="fas fa-calendar-alt"></i>
          Mis Reservas
        </h2>
        <p>Gestiona y revisa el historial de tus reservas</p>
      </div>

      {/* Estadísticas */}
      <div className="stats-cards">
        <div className="stat-card active">
          <i className="fas fa-clock"></i>
          <div>
            <h3>{filterReservations('active').length}</h3>
            <p>Reservas Activas</p>
          </div>
        </div>
        <div className="stat-card completed">
          <i className="fas fa-check-circle"></i>
          <div>
            <h3>{filterReservations('completed').length}</h3>
            <p>Completadas</p>
          </div>
        </div>
        <div className="stat-card cancelled">
          <i className="fas fa-times-circle"></i>
          <div>
            <h3>{filterReservations('cancelled').length}</h3>
            <p>Canceladas</p>
          </div>
        </div>
      </div>

      {/* Filtros de pestañas */}
      <div className="tab-filters">
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <i className="fas fa-clock"></i>
          Activas ({filterReservations('active').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          <i className="fas fa-check-circle"></i>
          Completadas ({filterReservations('completed').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          <i className="fas fa-times-circle"></i>
          Canceladas ({filterReservations('cancelled').length})
        </button>
      </div>

      {/* Lista de reservas */}
      <div className="reservations-list">
        {filteredReservations.length === 0 ? (
          <div className="no-reservations">
            <i className="fas fa-calendar-times"></i>
            <h3>No hay reservas en esta categoría</h3>
            <p>
              {activeTab === 'active' && 'No tienes reservas activas en este momento.'}
              {activeTab === 'completed' && 'No tienes reservas completadas.'}
              {activeTab === 'cancelled' && 'No tienes reservas canceladas.'}
            </p>
            
            {reservations.length === 0 && (
              <div className="empty-state-actions">
                <p>¿Es la primera vez que visitas? ¡Haz tu primera reserva!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.href = '/'}
                >
                  <i className="fas fa-plus"></i>
                  Hacer una Reserva
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={loadReservations}
                >
                  <i className="fas fa-redo"></i>
                  Actualizar
                </button>
              </div>
            )}
          </div>
        ) : (
          filteredReservations.map(reservation => (
            <div key={reservation._id} className="reservation-card">
              <div className="reservation-header">
                <div className="property-info">
                  <h4>{reservation.propertyName}</h4>
                  <span className="property-id">ID: {reservation.propertyId}</span>
                </div>
                <div className={getStatusClass(reservation.status)}>
                  {getStatusText(reservation.status)}
                </div>
              </div>

              <div className="reservation-details">
                <div className="detail-group">
                  <div className="detail-item">
                    <i className="fas fa-calendar-check"></i>
                    <div>
                      <strong>Check-in</strong>
                      <span>{formatDate(reservation.checkIn)}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-calendar-times"></i>
                    <div>
                      <strong>Check-out</strong>
                      <span>{formatDate(reservation.checkOut)}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-group">
                  <div className="detail-item">
                    <i className="fas fa-moon"></i>
                    <div>
                      <strong>Noches</strong>
                      <span>{calculateNights(reservation.checkIn, reservation.checkOut)}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-users"></i>
                    <div>
                      <strong>Huéspedes</strong>
                      <span>{reservation.guests}</span>
                    </div>
                  </div>
                </div>

                {reservation.specialRequests && (
                  <div className="special-requests">
                    <i className="fas fa-comment"></i>
                    <div>
                      <strong>Solicitudes especiales</strong>
                      <span>{reservation.specialRequests}</span>
                    </div>
                  </div>
                )}

                <div className="reservation-dates">
                  <small>
                    Reserva creada el {formatDate(reservation.createdAt)}
                  </small>
                </div>
              </div>

              <div className="reservation-actions">
                {canCancelReservation(reservation) && (
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleCancelReservation(reservation._id)}
                  >
                    <i className="fas fa-times"></i>
                    Cancelar Reserva
                  </button>
                )}
                
                <button 
                  className="btn btn-info"
                  onClick={() => handleViewDetails(reservation)}
                >
                  <i className="fas fa-eye"></i>
                  Ver Detalles
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de detalles de reserva */}
      {showDetailsModal && (
        <div className="details-modal">
          <div className="modal-content">
            <span className="close" onClick={closeDetailsModal}>&times;</span>
            <h3>Detalles de la Reserva</h3>
            
            {selectedReservation && (
              <div className="reservation-details-modal">
                <div className="detail-item">
                  <strong>Propiedad:</strong> {selectedReservation.propertyName}
                </div>
                <div className="detail-item">
                  <strong>ID de Propiedad:</strong> {selectedReservation.propertyId}
                </div>
                <div className="detail-item">
                  <strong>Check-in:</strong> {formatDate(selectedReservation.checkIn)}
                </div>
                <div className="detail-item">
                  <strong>Check-out:</strong> {formatDate(selectedReservation.checkOut)}
                </div>
                <div className="detail-item">
                  <strong>Noches:</strong> {calculateNights(selectedReservation.checkIn, selectedReservation.checkOut)}
                </div>
                <div className="detail-item">
                  <strong>Huéspedes:</strong> {selectedReservation.guests}
                </div>
                {selectedReservation.specialRequests && (
                  <div className="detail-item">
                    <strong>Solicitudes especiales:</strong> {selectedReservation.specialRequests}
                  </div>
                )}
                <div className="detail-item">
                  <strong>Estado:</strong> {getStatusText(selectedReservation.status)}
                </div>
                <div className="detail-item">
                  <strong>Fecha de creación:</strong> {formatDate(selectedReservation.createdAt)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReservations;
