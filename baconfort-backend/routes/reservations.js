const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { authenticateToken, adminAuth } = require('../middleware/auth');
const { sendUserReservationNotification, sendAdminReservationNotification, sendUserCancellationNotification, sendAdminCancellationNotification } = require('../utils/emailNotifications');

// @route   POST /api/reservations
// @desc    Crear una nueva reserva
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      propertyId,
      propertyName,
      checkIn,
      checkOut,
      guests,
      fullName,
      email,
      phone,
      message
    } = req.body;

    // Validaciones básicas
    if (!propertyId || !propertyName || !checkIn || !checkOut || !guests || !fullName || !email || !message) {
      return res.status(400).json({
        message: 'Todos los campos obligatorios deben ser completados'
      });
    }

    // Validar fechas
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return res.status(400).json({
        message: 'La fecha de check-in no puede ser anterior a hoy'
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        message: 'La fecha de check-out debe ser posterior al check-in'
      });
    }

    // Crear la reserva
    const reservation = new Reservation({
      userId: req.user.id || req.user._id,
      userEmail: req.user.email,
      userName: req.user.name,
      propertyId,
      propertyName,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      fullName,
      email,
      phone,
      message,
      status: 'pending'
    });

    await reservation.save();

    // Enviar notificaciones por email
    try {
      console.log('📧 Enviando notificaciones de email...');
      console.log('🏠 Property name received:', propertyName);
      
      // Datos para los emails
      const emailData = {
        fullName,
        email,
        phone,
        propertyName,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        message
      };

      // Enviar email al usuario (no bloquear si falla)
      sendUserReservationNotification(emailData).catch(error => {
        console.error('Error enviando email al usuario:', error);
      });

      // Enviar email al admin (no bloquear si falla)
      sendAdminReservationNotification(emailData).catch(error => {
        console.error('Error enviando email al admin:', error);
      });

      console.log('✅ Notificaciones de email programadas');
    } catch (error) {
      console.error('❌ Error programando emails:', error);
      // No fallar la reserva si hay error con los emails
    }

    res.status(201).json({
      message: 'Reserva creada exitosamente',
      reservation: {
        id: reservation._id,
        propertyName: reservation.propertyName,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        guests: reservation.guests,
        status: reservation.status,
        createdAt: reservation.createdAt
      }
    });

  } catch (error) {
    console.error('Error creando reserva:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/reservations/my
// @desc    Obtener todas las reservas del usuario autenticado
// @access  Private
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id || req.user._id })
      .sort({ createdAt: -1 }); // Más recientes primero

    res.json(reservations);

  } catch (error) {
    console.error('Error obteniendo reservas del usuario:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/reservations
// @desc    Obtener todas las reservas del usuario autenticado
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id || req.user._id })
      .sort({ createdAt: -1 }); // Más recientes primero

    res.json(reservations);

  } catch (error) {
    console.error('Error obteniendo reservas:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/reservations/:id
// @desc    Obtener una reserva específica del usuario
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      userId: req.user.id || req.user._id
    });

    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      });
    }

    res.json(reservation);

  } catch (error) {
    console.error('Error obteniendo reserva:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/reservations/:id/cancel
// @desc    Cancelar una reserva
// @access  Private
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      userId: req.user.id || req.user._id
    });

    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      });
    }

    if (reservation.status === 'cancelled') {
      return res.status(400).json({
        message: 'La reserva ya está cancelada'
      });
    }

    if (reservation.status === 'completed') {
      return res.status(400).json({
        message: 'No se puede cancelar una reserva completada'
      });
    }

    reservation.status = 'cancelled';
    reservation.cancelledAt = new Date();
    await reservation.save();

    // Enviar notificaciones por email
    console.log('📧 Enviando notificaciones de cancelación...');
    
    // Preparar datos para las notificaciones
    const notificationData = {
      _id: reservation._id,
      fullName: reservation.fullName,
      email: reservation.email,
      propertyName: reservation.propertyName,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      guests: reservation.guests,
      cancelledAt: reservation.cancelledAt
    };

    // Enviar email al usuario (no bloquear si falla)
    try {
      await sendUserCancellationNotification(notificationData);
    } catch (emailError) {
      console.error('❌ Error enviando email al usuario:', emailError);
    }

    // Enviar email al admin (no bloquear si falla)
    try {
      await sendAdminCancellationNotification(notificationData);
    } catch (emailError) {
      console.error('❌ Error enviando email al admin:', emailError);
    }

    res.json({
      message: 'Reserva cancelada exitosamente',
      reservation
    });

  } catch (error) {
    console.error('Error cancelando reserva:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/reservations/admin/all
// @desc    Obtener todas las reservas (solo admin)
// @access  Private (Admin only)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    // Verificar que sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Acceso denegado. Solo administradores pueden ver todas las reservas.'
      });
    }

    const reservations = await Reservation.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(reservations);

  } catch (error) {
    console.error('Error obteniendo todas las reservas:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/reservations/admin/:id/status
// @desc    Actualizar estado de una reserva (solo admin)
// @access  Private/Admin
router.put('/admin/:id/status', adminAuth, async (req, res) => {
  try {
    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Acceso denegado. Solo administradores pueden cambiar estados.'
      });
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Estado inválido. Estados válidos: pending, confirmed, cancelled, completed'
      });
    }

    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      });
    }

    reservation.status = status;
    reservation.updatedAt = new Date();
    await reservation.save();

    res.json({
      message: 'Estado de reserva actualizado exitosamente',
      reservation: {
        id: reservation._id,
        status: reservation.status,
        updatedAt: reservation.updatedAt
      }
    });
  } catch (error) {
    console.error('Error actualizando estado de reserva:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

// @route   DELETE /api/reservations/admin/:id
// @desc    Eliminar una reserva (solo admin)
// @access  Private (Admin only)
router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    console.log('🗑️ ADMIN: Eliminando reserva:', req.params.id);
    
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      });
    }
    
    // Guardar información de la reserva antes de eliminarla
    const reservationInfo = {
      id: reservation._id,
      propertyName: reservation.propertyName,
      userName: reservation.fullName || reservation.userName,
      userEmail: reservation.email || reservation.userEmail,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut
    };
    
    // Eliminar la reserva
    await Reservation.findByIdAndDelete(req.params.id);
    
    console.log('✅ ADMIN: Reserva eliminada exitosamente:', reservationInfo);
    
    res.json({
      message: 'Reserva eliminada exitosamente',
      deletedReservation: reservationInfo
    });
    
  } catch (error) {
    console.error('❌ ADMIN: Error eliminando reserva:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
