const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { auth } = require('../middleware/auth');

// @route   POST /api/reservations
// @desc    Crear una nueva reserva
// @access  Private
router.post('/', auth, async (req, res) => {
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
      userId: req.user._id,
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

// @route   GET /api/reservations
// @desc    Obtener todas las reservas del usuario autenticado
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id })
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
router.get('/:id', auth, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      userId: req.user._id
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
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      userId: req.user._id
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
    await reservation.save();

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
router.get('/admin/all', auth, async (req, res) => {
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
router.put('/admin/:id/status', auth, async (req, res) => {
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

module.exports = router;
