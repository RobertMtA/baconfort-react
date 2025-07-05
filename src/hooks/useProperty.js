import { useState, useEffect, useCallback } from 'react';
import { propertyAPI } from '../services/api';

// Datos fallback para cuando el backend no esté disponible (IDs corregidos)
const fallbackData = {
  'moldes-1680': {
    id: 'moldes-1680',
    title: 'Moldes 1680',
    prices: {
      daily: 'USD 70',
      weekly: 'USD 400', 
      monthly: 'USD 1200',
      currency: 'USD'
    },
    description: {
      es: 'Exclusivo departamento de dos ambientes en edificio boutique con amenities premium en Belgrano.',
      en: 'Exclusive two-room apartment in a boutique building with premium amenities in Belgrano.',
      pt: 'Apartamento exclusivo de dois ambientes em edifício boutique com amenidades premium em Belgrano.'
    },
    amenities: {
      departamento: [
        { icon: 'fas fa-tv', text: 'Smart TV 55"' },
        { icon: 'fas fa-wifi', text: 'WiFi 500MB Fibra Óptica' },
        { icon: 'fas fa-snowflake', text: 'Aire Acondicionado F/C' },
        { icon: 'fas fa-door-closed', text: 'Balcón Francés' },
        { icon: 'fas fa-utensils', text: 'Cocina Completa' }
      ],
      servicios: [
        { icon: 'fas fa-shield-alt', text: 'Seguridad 24hs' },
        { icon: 'fas fa-tshirt', text: 'Lavarropas' },
        { icon: 'fas fa-concierge-bell', text: 'Portería' },
        { icon: '🧹', text: 'Servicio de Limpieza' }
      ],
      amenitiesEdificio: [
        { icon: 'fas fa-dumbbell', text: 'Gimnasio' },
        { icon: 'fas fa-swimming-pool', text: 'Piscina' },
        { icon: 'fas fa-sun', text: 'Terraza' },
        { icon: 'fas fa-users', text: 'SUM' }
      ]
    }
  },
  'santa-fe-3770': {
    id: 'santa-fe-3770',
    title: 'Santa Fe 3770',
    prices: {
      daily: 'USD 65',
      weekly: 'USD 380',
      monthly: 'USD 1100',
      currency: 'USD'
    },
    description: {
      es: 'Departamento moderno de un ambiente en el corazón de Palermo con todas las comodidades necesarias.',
      en: 'Modern one-bedroom apartment in the heart of Palermo with all necessary amenities.',
      pt: 'Apartamento moderno de um ambiente no coração de Palermo com todas as comodidades necessárias.'
    },
    amenities: {
      departamento: [
        { icon: 'fas fa-tv', text: 'Smart TV 49"' },
        { icon: 'fas fa-wifi', text: 'WiFi 300MB Fibra Óptica' },
        { icon: 'fas fa-snowflake', text: 'Aire Acondicionado Split' }
      ],
      servicios: [
        { icon: 'fas fa-shield-alt', text: 'Seguridad 24hs' },
        { icon: 'fas fa-tshirt', text: 'Laundry' }
      ],
      amenitiesEdificio: [
        { icon: 'fas fa-swimming-pool', text: 'Piscina Olímpica' },
        { icon: 'fas fa-dumbbell', text: 'Gimnasio Equipado' }
      ]
    }
  },
  ugarteche2824: {
    id: 'ugarteche2824',
    title: 'Ugarteche 2824',
    prices: {
      daily: 'USD 75',
      weekly: 'USD 450',
      monthly: 'USD 1300',
      currency: 'USD'
    },
    description: {
      es: 'Departamento de lujo en Palermo Botánico con vistas espectaculares.',
      en: 'Luxury apartment in Palermo Botánico with spectacular views.',
      pt: 'Apartamento de luxo em Palermo Botânico com vistas espetaculares.'
    },
    amenities: {
      departamento: [
        { icon: 'fas fa-tv', text: 'Smart TV 55"' },
        { icon: 'fas fa-wifi', text: 'WiFi 300MB Fibra Óptica' }
      ],
      servicios: [
        { icon: 'fas fa-shield-alt', text: 'Seguridad 24hs' }
      ],
      amenitiesEdificio: []
    }
  },
  dorrego1548: {
    id: 'dorrego1548',
    title: 'Dorrego 1548',
    prices: {
      daily: 'USD 60',
      weekly: 'USD 280',
      monthly: 'USD 1000',
      currency: 'USD'
    },
    description: {
      es: 'Departamento completo en Villa Crespo con excelente ubicación y conectividad.',
      en: 'Complete apartment in Villa Crespo with excellent location and connectivity.',
      pt: 'Apartamento completo em Villa Crespo com excelente localização e conectividade.'
    },
    amenities: {
      departamento: [
        { icon: 'fas fa-tv', text: 'Smart TV' },
        { icon: 'fas fa-wifi', text: 'WiFi' }
      ],
      servicios: [
        { icon: 'fas fa-shield-alt', text: 'Seguridad' }
      ],
      amenitiesEdificio: []
    }
  },
  convencion1994: {
    id: 'convencion1994',
    title: 'Convención 1994',
    prices: {
      daily: 'USD 55',
      weekly: 'USD 320',
      monthly: 'USD 950',
      currency: 'USD'
    },
    description: {
      es: 'Estudio exclusivo para dos personas en edificio boutique con amenidades premium en Palermo Hollywood.',
      en: 'Exclusive studio for two in a boutique building with premium amenities in Palermo Hollywood.',
      pt: 'Estúdio exclusivo para duas pessoas em edifício boutique com amenidades premium em Palermo Hollywood.'
    },
    amenities: {
      departamento: [
        { icon: 'fas fa-tv', text: 'Smart TV 32"' },
        { icon: 'fas fa-wifi', text: 'WiFi 300MB Fibra Óptica' }
      ],
      servicios: [
        { icon: 'fas fa-shield-alt', text: 'Seguridad 24hs' }
      ],
      amenitiesEdificio: []
    }
  }
};

// Hook para cargar información completa de la propiedad desde el backend
export const useProperty = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Mapeo de IDs de página a IDs de base de datos (corregido con IDs reales)
  const propertyIdMap = {
    'moldes-1680': 'moldes-1680',      // ← Usar ID real del backend
    'moldes1680': 'moldes-1680',       // ← Compatibilidad
    'santa-fe-3770': 'santa-fe-3770', // ← Usar ID real del backend
    'santafe3770': 'santa-fe-3770',   // ← Compatibilidad
    'dorrego-1548': 'dorrego-1548',   // ← Corregido: usar ID con guiones
    'dorrego1548': 'dorrego-1548',    // ← Compatibilidad
    'convencion-1994': 'convencion-1994', // ← Corregido: usar ID con guiones
    'convencion1994': 'convencion-1994', // ← Compatibilidad
    'ugarteche-2824': 'ugarteche-2824', // ← Corregido: usar ID con guiones
    'ugarteche2824': 'ugarteche-2824'  // ← Compatibilidad
  };

  const loadProperty = useCallback(async () => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsUsingFallback(false);

      // Usar el ID correcto para la base de datos
      const dbPropertyId = propertyIdMap[propertyId] || propertyId;
      
      console.log(`🏠 PROPERTY HOOK: Intentando cargar desde backend: ${propertyId} → ${dbPropertyId}`);
      
      // Intentar cargar desde el backend con timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Backend timeout')), 5000)
      );
      
      const apiPromise = propertyAPI.getProperty(dbPropertyId, { 
        cacheBust: Date.now() 
      });
      
      const response = await Promise.race([apiPromise, timeoutPromise]);
      
      if (response.success && response.data) {
        const backendData = response.data;
        
        console.log(`✅ PROPERTY HOOK: Datos cargados desde backend para ${propertyId}:`, {
          id: backendData.id,
          updatedAt: backendData.updatedAt,
          amenitiesCount: {
            departamento: backendData.amenities?.departamento?.length || 0,
            servicios: backendData.amenities?.servicios?.length || 0,
            amenitiesEdificio: backendData.amenities?.amenitiesEdificio?.length || 0
          },
          amenitiesPreview: {
            departamento: backendData.amenities?.departamento?.slice(0, 2).map(a => a.text) || [],
            servicios: backendData.amenities?.servicios?.slice(0, 2).map(a => a.text) || [],
            amenitiesEdificio: backendData.amenities?.amenitiesEdificio?.slice(0, 2).map(a => a.text) || []
          }
        });
        
        // Convertir precios numéricos a formato de string para el frontend
        const formattedPrices = {
          daily: `USD ${backendData.prices.daily}`,
          weekly: `USD ${backendData.prices.weekly}`,
          monthly: `USD ${backendData.prices.monthly}`,
          currency: backendData.prices.currency || 'USD'
        };
        
        const propertyData = {
          ...backendData,
          prices: formattedPrices
        };
        
        setProperty(propertyData);
      } else {
        throw new Error('Backend response invalid');
      }
    } catch (err) {
      console.warn(`⚠️ PROPERTY HOOK: Error cargando desde backend para ${propertyId}:`, {
        error: err.message,
        stack: err.stack,
        propertyId: propertyId,
        dbPropertyId: propertyIdMap[propertyId] || propertyId
      });
      
      // Usar datos fallback
      const fallback = fallbackData[propertyIdMap[propertyId] || propertyId];
      if (fallback) {
        console.log(`🔄 PROPERTY HOOK: Usando datos fallback para ${propertyId}:`, {
          id: fallback.id,
          amenitiesCount: {
            departamento: fallback.amenities?.departamento?.length || 0,
            servicios: fallback.amenities?.servicios?.length || 0,
            amenitiesEdificio: fallback.amenities?.amenitiesEdificio?.length || 0
          }
        });
        setProperty(fallback);
        setIsUsingFallback(true);
      } else {
        console.error(`❌ PROPERTY HOOK: No hay datos fallback para ${propertyId}`);
        setError(`No hay datos disponibles para la propiedad: ${propertyId}`);
      }
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    loadProperty();
  }, [loadProperty]);

  // Función para refrescar los datos manualmente
  const refreshProperty = useCallback(() => {
    loadProperty();
  }, [loadProperty]);

  return {
    property,
    loading,
    error,
    refreshProperty,
    isUsingFallback
  };
};

export default useProperty;
