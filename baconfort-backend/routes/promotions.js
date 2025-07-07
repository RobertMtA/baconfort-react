const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');
const Property = require('../models/Property');
const { optionalAuth, adminAuth } = require('../middleware/auth');

// @route   GET /api/promotions
// @desc    Obtener todas las promociones activas
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      limit = 10, 
      page = 1, 
      featured = false,
      propertyId,
      active = true 
    } = req.query;

    const filter = {};
    if (active === 'true') filter.isActive = true;
    if (featured === 'true') filter.isFeatured = true;
    if (propertyId) filter.propertyId = propertyId;

    // Solo mostrar promociones vigentes al público
    if (!req.user || req.user.role !== 'admin') {
      const now = new Date();
      filter.validFrom = { $lte: now };
      filter.validTo = { $gte: now };
    }

    const promotions = await Promotion.find(filter)
      .sort({ priority: -1, isFeatured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Promotion.countDocuments(filter);

    res.json({
      success: true,
      data: promotions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error obteniendo promociones:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// @route   GET /api/promotions/admin
// @desc    Obtener todas las promociones para administración
// @access  Admin
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const { 
      limit = 20, 
      page = 1, 
      status = 'all',
      propertyId 
    } = req.query;

    const filter = {};
    if (status === 'active') filter.isActive = true;
    if (status === 'inactive') filter.isActive = false;
    if (status === 'expired') {
      filter.validTo = { $lt: new Date() };
    }
    if (propertyId && propertyId !== 'all') filter.propertyId = propertyId;

    const promotions = await Promotion.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Promotion.countDocuments(filter);

    console.log(`✅ ADMIN PROMOTIONS: Encontradas ${promotions.length} promociones`);

    res.json({
      success: true,
      data: promotions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('❌ ADMIN PROMOTIONS: Error obteniendo promociones:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// @route   POST /api/promotions
// @desc    Crear nueva promoción
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
  try {
    const {
      title,
      description,
      propertyId,
      discountType,
      discountValue,
      originalPrice,
      validFrom,
      validTo,
      image,
      terms,
      priority,
      isFeatured,
      maxRedemptions
    } = req.body;

    // Verificar que la propiedad existe
    const property = await Property.findOne({ id: propertyId });
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Propiedad no encontrada'
      });
    }

    // Calcular precio promocional
    let promotionalPrice = originalPrice;
    if (discountType === 'percentage') {
      promotionalPrice = originalPrice - (originalPrice * (discountValue / 100));
    } else if (discountType === 'fixed') {
      promotionalPrice = originalPrice - discountValue;
    }

    const promotion = new Promotion({
      title,
      description,
      propertyId,
      propertyName: property.title,
      discountType,
      discountValue,
      originalPrice,
      promotionalPrice: Math.round(promotionalPrice),
      validFrom: new Date(validFrom),
      validTo: new Date(validTo),
      image,
      terms: terms || '',
      priority: priority || 0,
      isFeatured: isFeatured || false,
      maxRedemptions,
      createdBy: req.user?.id || 'admin'
    });

    await promotion.save();

    console.log(`✅ PROMOTION CREATED: ${promotion.title} para ${promotion.propertyName}`);

    res.status(201).json({
      success: true,
      message: 'Promoción creada exitosamente',
      data: promotion
    });

  } catch (error) {
    console.error('❌ Error creando promoción:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/promotions/:id
// @desc    Actualizar promoción
// @access  Admin
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({
        success: false,
        error: 'Promoción no encontrada'
      });
    }

    const updates = { ...req.body };
    
    console.log(`🔧 ACTUALIZANDO PROMOCIÓN ${req.params.id}:`);
    console.log('📝 Datos recibidos:', updates);
    
    // Solo recalcular precio promocional si:
    // 1. Se están actualizando campos de descuento Y
    // 2. NO se está enviando un precio promocional explícito
    const isUpdatingDiscountFields = !!(updates.originalPrice || updates.discountType || updates.discountValue);
    const isManualPriceUpdate = updates.hasOwnProperty('promotionalPrice');
    
    console.log('🔍 ¿Actualizando campos de descuento?', isUpdatingDiscountFields);
    console.log('🔍 ¿Precio promocional manual?', isManualPriceUpdate);
    
    if (isUpdatingDiscountFields && !isManualPriceUpdate) {
      console.log('🔢 Recalculando precio promocional automáticamente...');
      const originalPrice = updates.originalPrice || promotion.originalPrice;
      const discountType = updates.discountType || promotion.discountType;
      const discountValue = updates.discountValue || promotion.discountValue;

      if (discountType === 'percentage') {
        updates.promotionalPrice = Math.round(originalPrice - (originalPrice * (discountValue / 100)));
        console.log(`💰 Precio calculado (${discountValue}%): ${updates.promotionalPrice}`);
      } else if (discountType === 'fixed') {
        updates.promotionalPrice = Math.round(originalPrice - discountValue);
        console.log(`💰 Precio calculado (-$${discountValue}): ${updates.promotionalPrice}`);
      }
    } else if (isManualPriceUpdate) {
      console.log(`💰 Usando precio promocional manual: ${updates.promotionalPrice}`);
    } else {
      console.log('📝 Sin cambios en precios');
    }

    Object.assign(promotion, updates);
    await promotion.save();

    console.log(`✅ PROMOTION UPDATED: ${promotion.title}`);
    console.log(`💰 Precios finales - Original: $${promotion.originalPrice}, Promocional: $${promotion.promotionalPrice}`);
    console.log('📋 Datos completos guardados:', {
      title: promotion.title,
      originalPrice: promotion.originalPrice,
      promotionalPrice: promotion.promotionalPrice,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue
    });

    res.json({
      success: true,
      message: 'Promoción actualizada exitosamente',
      data: promotion
    });

  } catch (error) {
    console.error('❌ Error actualizando promoción:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// @route   DELETE /api/promotions/:id
// @desc    Eliminar promoción
// @access  Admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({
        success: false,
        error: 'Promoción no encontrada'
      });
    }

    await Promotion.findByIdAndDelete(req.params.id);

    console.log(`✅ PROMOTION DELETED: ${promotion.title}`);

    res.json({
      success: true,
      message: 'Promoción eliminada exitosamente'
    });

  } catch (error) {
    console.error('❌ Error eliminando promoción:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/promotions/:id/toggle-status
// @desc    Activar/desactivar promoción
// @access  Admin
router.put('/:id/toggle-status', adminAuth, async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({
        success: false,
        error: 'Promoción no encontrada'
      });
    }

    promotion.isActive = !promotion.isActive;
    await promotion.save();

    console.log(`✅ PROMOTION STATUS: ${promotion.title} - ${promotion.isActive ? 'Activada' : 'Desactivada'}`);

    res.json({
      success: true,
      message: `Promoción ${promotion.isActive ? 'activada' : 'desactivada'} exitosamente`,
      data: promotion
    });

  } catch (error) {
    console.error('❌ Error cambiando estado de promoción:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// @route   PUT /api/promotions/:id/priority
// @desc    Actualizar prioridad de promoción
// @access  Admin
router.put('/:id/priority', adminAuth, async (req, res) => {
  try {
    const { priority } = req.body;
    
    if (priority === undefined || priority === null) {
      return res.status(400).json({
        success: false,
        error: 'Prioridad es requerida'
      });
    }

    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({
        success: false,
        error: 'Promoción no encontrada'
      });
    }

    const oldPriority = promotion.priority;
    promotion.priority = parseInt(priority);
    await promotion.save();

    console.log(`✅ PROMOTION PRIORITY: ${promotion.title} - ${oldPriority} → ${promotion.priority}`);

    res.json({
      success: true,
      message: 'Prioridad actualizada exitosamente',
      data: promotion
    });

  } catch (error) {
    console.error('❌ Error actualizando prioridad de promoción:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;
