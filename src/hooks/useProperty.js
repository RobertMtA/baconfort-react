import { useState, useEffect, useCallback } from 'react';
import { propertyAPI } from '../services/api';

// Hook para cargar información completa de la propiedad desde el backend
export const useProperty = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeo de IDs de página a IDs de base de datos
  const propertyIdMap = {
    'moldes-1680': 'moldes1680',
    'santa-fe-3770': 'santafe3770', 
    'dorrego-1548': 'dorrego1548',
    'convencion-1994': 'convencion1994',
    'ugarteche-2824': 'ugarteche2824'
  };

  const loadProperty = useCallback(async () => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Usar el ID correcto para la base de datos
      const dbPropertyId = propertyIdMap[propertyId] || propertyId;
      
      console.log(`🏠 PROPERTY HOOK: Cargando propiedad ${propertyId} → ${dbPropertyId}`);
      
      const response = await propertyAPI.getProperty(dbPropertyId);
      
      if (response.success && response.data) {
        const backendData = response.data;
        
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
        
        console.log(`✅ PROPERTY HOOK: Propiedad cargada:`, {
          id: backendData.id,
          prices: formattedPrices
        });
        
        setProperty(propertyData);
      } else {
        setError(`Error al cargar propiedad: ${response.error || 'Error desconocido'}`);
        console.error(`❌ PROPERTY HOOK: Error en respuesta:`, response);
      }
    } catch (err) {
      console.error(`❌ PROPERTY HOOK: Error:`, err);
      setError(err.message);
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
    refreshProperty
  };
};

export default useProperty;
