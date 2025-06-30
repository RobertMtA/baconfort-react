import { useState, useRef } from 'react';
import './ImageUploader.css';

function ImageUploader({ value, onChange, label = "Imagen", required = false, className = "" }) {
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  // Función para abrir el selector de archivos
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  // Función para convertir archivo a base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Función para manejar la selección de archivos
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    setUploading(true);
    setMessage('📤 Procesando imagen...');

    try {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setMessage('❌ Debe seleccionar una imagen válida');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('❌ La imagen es muy grande (máximo 5MB)');
        return;
      }

      // Crear nombre único para el archivo
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const fileName = `uploaded-${timestamp}-${Math.random().toString(36).substr(2, 9)}.${extension}`;

      // Convertir a base64 para almacenamiento y preview
      const base64 = await fileToBase64(file);
      setPreview(base64);

      // Guardar el base64 directamente para que funcione sin servidor
      onChange(base64);
      
      setMessage('✅ Imagen cargada correctamente');
      
      console.log('🖼️ DEBUG: Imagen procesada:', {
        originalName: file.name,
        fileName: fileName,
        size: file.size,
        type: file.type,
        base64Length: base64.length
      });
      
    } catch (error) {
      console.error('Error al procesar imagen:', error);
      setMessage('❌ Error al procesar la imagen');
    } finally {
      setUploading(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  // Función para manejar cambio manual de URL
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  // Función para limpiar imagen
  const clearImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`image-uploader ${className}`}>
      <label>
        <i className="fas fa-image"></i>
        {label} {required && '*'}
      </label>
      
      {/* Input oculto para archivos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {/* Controles de carga */}
      <div className="upload-controls">
        <div className="upload-buttons">
          <button
            type="button"
            onClick={openFileSelector}
            className="btn btn-primary btn-upload"
            disabled={uploading}
          >
            <i className="fas fa-upload"></i>
            {uploading ? 'Procesando...' : 'Subir desde Dispositivo'}
          </button>
          
          {preview && (
            <button
              type="button"
              onClick={clearImage}
              className="btn btn-danger btn-clear"
              disabled={uploading}
            >
              <i className="fas fa-trash"></i>
              Limpiar
            </button>
          )}
        </div>
        
        {/* Campo manual para URL (alternativo) */}
        <div className="manual-url">
          <small className="text-muted">O ingresa una URL manualmente:</small>
          <input
            type="text"
            className="form-control form-control-sm"
            value={value || ''}
            onChange={handleUrlChange}
            placeholder="/img/imagen-ejemplo.jpg"
            disabled={uploading}
          />
        </div>
      </div>

      {/* Mensaje de estado */}
      {message && (
        <div className={`upload-message ${message.includes('❌') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      {/* Preview de la imagen */}
      {preview && (
        <div className="image-preview">
          <img 
            src={preview} 
            alt="Preview"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
