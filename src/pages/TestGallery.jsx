import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/api';

const TestGallery = () => {
  const [galleryState, setGalleryState] = useState({
    loading: true,
    images: [],
    error: null,
    rawResponse: null
  });

  useEffect(() => {
    const testGallery = async () => {
      try {
        console.log('🧪 TEST: Iniciando test de galería...');
        
        const response = await fetch(`${API_URL}/api/gallery/moldes-1680`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('🧪 TEST: Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('🧪 TEST: Data received:', data);

        setGalleryState({
          loading: false,
          images: data.images || [],
          error: null,
          rawResponse: data
        });

      } catch (error) {
        console.error('🧪 TEST: Error:', error);
        setGalleryState({
          loading: false,
          images: [],
          error: error.message,
          rawResponse: null
        });
      }
    };

    testGallery();
  }, []);

  if (galleryState.loading) {
    return <div>🔄 Cargando test de galería...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🧪 Test de Galería - moldes-1680</h1>
      
      {galleryState.error && (
        <div style={{ color: 'red', background: '#ffe6e6', padding: '10px', marginBottom: '10px' }}>
          ❌ Error: {galleryState.error}
        </div>
      )}

      <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
        <strong>Estado:</strong><br/>
        • Imágenes encontradas: {galleryState.images.length}<br/>
        • Loading: {galleryState.loading ? 'Sí' : 'No'}<br/>
        • Error: {galleryState.error || 'Ninguno'}<br/>
      </div>

      {galleryState.images.length > 0 && (
        <div>
          <h2>📸 Imágenes ({galleryState.images.length}):</h2>
          {galleryState.images.map((img, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
              <strong>{img.title}</strong><br/>
              <small>{img.url}</small><br/>
              <img src={img.url} alt={img.title} style={{ maxWidth: '200px', maxHeight: '150px' }} />
            </div>
          ))}
        </div>
      )}

      <details style={{ marginTop: '20px' }}>
        <summary>🔍 Respuesta completa de la API</summary>
        <pre style={{ background: '#f8f8f8', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(galleryState.rawResponse, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default TestGallery;
