// OPCIÓN 2: Endpoint súper simple para agregar amenities
// Agregar al final de baconfort-backend/routes/properties.js

// ENDPOINT TEMPORAL - Agregar amenities rápidamente
router.post('/moldes-1680/add-amenities-fast', async (req, res) => {
  try {
    console.log('🚀 ENDPOINT RÁPIDO: Agregando amenities a moldes-1680');
    
    const newAmenities = {
      departamento: [
        { icon: 'fas fa-tv', text: 'Smart TV 65" 4K HDR' },
        { icon: 'fas fa-wifi', text: 'WiFi Fibra Óptica 1GB' },
        { icon: 'fas fa-snowflake', text: 'Aire Central Premium' },
        { icon: 'fas fa-utensils', text: 'Cocina Italiana Completa' },
        { icon: 'fas fa-coffee', text: 'Set Café Profesional' }
      ],
      servicios: [
        { icon: 'fas fa-shield-alt', text: 'Seguridad 24/7 Premium' },
        { icon: 'fas fa-concierge-bell', text: 'Concierge Multiidioma' },
        { icon: 'fas fa-broom', text: 'Housekeeping Diario' },
        { icon: 'fas fa-car', text: 'Valet Parking Incluido' }
      ],
      amenitiesEdificio: [
        { icon: 'fas fa-swimming-pool', text: 'Piscina Infinity Climatizada' },
        { icon: 'fas fa-dumbbell', text: 'Gym Tecnológico 24hs' },
        { icon: 'fas fa-spa', text: 'Spa & Wellness Center' },
        { icon: 'fas fa-sun', text: 'Rooftop Lounge & Bar' }
      ]
    };

    const result = await Property.findOneAndUpdate(
      { id: 'moldes-1680' },
      { 
        amenities: newAmenities,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (result) {
      console.log('✅ Amenities actualizadas exitosamente');
      res.json({
        success: true,
        message: 'Amenities agregadas exitosamente',
        data: {
          total: (result.amenities.departamento?.length || 0) +
                 (result.amenities.servicios?.length || 0) +
                 (result.amenities.amenitiesEdificio?.length || 0),
          updatedAt: result.updatedAt
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Propiedad no encontrada'
      });
    }
  } catch (error) {
    console.error('❌ Error agregando amenities:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// USO:
// POST http://localhost:5000/api/properties/moldes-1680/add-amenities-fast
