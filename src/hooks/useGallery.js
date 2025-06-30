import { useState, useEffect, useCallback } from 'react';
import { galleryAPI } from '../services/api';
import galleryEventManager from '../utils/GalleryEventManager';

// Hook para cargar galería de imágenes desde la base de datos
export const useGallery = (propertyId) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  // Mapeo de IDs de página a IDs de base de datos
  const propertyIdMap = {
    'moldes1680': 'moldes-1680',
    'santafe3770': 'santa-fe-3770',
    'dorrego1548': 'dorrego-1548',
    'convencion1994': 'convencion-1994',
    'ugarteche2824': 'ugarteche-2824'
  };

  const loadGallery = useCallback(async (forceRefresh = false) => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Usar el ID correcto para la base de datos
      const dbPropertyId = propertyIdMap[propertyId] || propertyId;
      
      const response = await galleryAPI.getByProperty(dbPropertyId);
      
      if (response.success) {
        const galleryImages = response.images || [];
        const imageUrls = galleryImages.map(img => img.url);
        const main = galleryImages.find(img => img.isMain);
        
        setImages(imageUrls);
        setMainImage(main?.url || imageUrls[0]);
      } else {
        setError(`Error al cargar galería: ${response.error || 'Error desconocido'}`);
      }
    } catch (err) {
      console.error(`❌ GALLERY HOOK: Error:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [propertyId, propertyIdMap]);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  // Suscribirse a eventos de cambio de galería
  useEffect(() => {
    const dbPropertyId = propertyIdMap[propertyId] || propertyId;
    
    const unsubscribe = galleryEventManager.subscribe(dbPropertyId, () => {
      loadGallery(true);
    });

    return unsubscribe;
  }, [propertyId, loadGallery, propertyIdMap]);

  const refreshGallery = () => {
    loadGallery(true);
  };

  return {
    images,
    mainImage,
    loading,
    error,
    refreshGallery
  };
};

export default useGallery;
