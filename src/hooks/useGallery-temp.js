import { useState, useEffect } from 'react';
import { galleryAPI } from '../services/api';

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

  const loadGallery = async (forceRefresh = false) => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Usar el ID correcto para la base de datos
      const dbPropertyId = propertyIdMap[propertyId] || propertyId;
      
      console.log(`🖼️ GALLERY HOOK: Cargando galería para ${propertyId} (DB: ${dbPropertyId})${forceRefresh ? ' (FORCE REFRESH)' : ''}`);
      
      // Agregar timestamp para evitar caché si es force refresh
      const endpoint = forceRefresh ? 
        `${dbPropertyId}?t=${Date.now()}` : 
        dbPropertyId;
      
      const response = await galleryAPI.getByProperty(endpoint);
      
      if (response.success) {
        const galleryImages = response.images || [];
        
        // Convertir a formato esperado por los componentes existentes
        const imageUrls = galleryImages.map(img => img.url);
        
        // Encontrar imagen principal
        const main = galleryImages.find(img => img.isMain);
        
        setImages(imageUrls);
        setMainImage(main?.url || imageUrls[0]);
        
        console.log(`✅ GALLERY HOOK: ${galleryImages.length} imágenes cargadas para ${propertyId}`);
      } else {
        console.warn(`⚠️ GALLERY HOOK: Error en respuesta:`, response);
        setError(`Error al cargar galería: ${response.error || 'Error desconocido'}`);
      }
    } catch (err) {
      console.error(`❌ GALLERY HOOK: Error cargando galería para ${propertyId}:`, err);
      setError(err.message);
      
      // Fallback a imágenes estáticas si hay error
      const fallbackImages = getFallbackImages(propertyId);
      console.log('📁 GALLERY HOOK: Usando imágenes fallback:', fallbackImages);
      setImages(fallbackImages);
      setMainImage(fallbackImages[0]);
    } finally {
      setLoading(false);
  useEffect(() => {
    loadGallery();
  }, [propertyId]);

  // Función para refrescar la galería manualmente
  const refreshGallery = () => loadGallery(true);

  // Función para obtener imágenes de fallback
  const getFallbackImages = (propId) => {
    const fallbackMap = {
      'moldes1680': [
        'img/img-moldes1.jpg',
        'img/img-moldes2.jpg',
        'img/img-moldes3.jpg',
        'img/img-moldes4.jpg',
        'img/img-moldes5.jpg',
        'img/img-moldes6.jpg'
      ],
      'santafe3770': [
        'img/img-santa-fe1.jpg',
        'img/img-santa-fe2.jpg',
        'img/img-santa-fe3.jpg',
        'img/img-santa-fe4.jpg',
        'img/img-santa-fe5.jpg'
      ],
      'dorrego1548': [
        'img/img-dorrego1.jpg',
        'img/img-dorrego2.jpg',
        'img/img-dorrego3.jpg',
        'img/img-dorrego4.jpg'
      ],
      'convencion1994': [
        'img/img-convencion1.jpg',
        'img/img-convencion2.jpg',
        'img/img-convencion3.jpg',
        'img/img-convencion4.jpg'
      ],
      'ugarteche2824': [
        'img/img-ugarteche1.jpg',
        'img/img-ugarteche2.jpg',
        'img/img-ugarteche3.jpg'
      ]
    };
    
    return fallbackMap[propId] || [];
  };

  return {
    images,
    mainImage,
    loading,
    error,
    refreshGallery,
    // Funciones de utilidad para debugging
    getFallbackImages: () => getFallbackImages(propertyId)
  };
};

export default useGallery;