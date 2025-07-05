// Prueba rápida para verificar la carga del video
console.log('🎬 VERIFICANDO VIDEO DE MOLDES...');

// Crear un elemento video para probar
const video = document.createElement('video');
video.src = '/video/video-portada-moldes-1680.mp4';
video.muted = true;
video.preload = 'metadata';

video.addEventListener('loadedmetadata', () => {
  console.log('✅ Video cargado correctamente');
  console.log('📊 Duración:', video.duration.toFixed(2), 'segundos');
  console.log('📐 Dimensiones:', video.videoWidth, 'x', video.videoHeight);
});

video.addEventListener('error', (e) => {
  console.error('❌ Error cargando video:', e);
  console.error('🔍 Código de error:', video.error?.code);
  console.error('🔍 Mensaje de error:', video.error?.message);
});

video.addEventListener('canplay', () => {
  console.log('▶️ Video listo para reproducir');
});

// Agregar el video al DOM temporalmente para probar
document.body.appendChild(video);

// Limpiar después de 5 segundos
setTimeout(() => {
  document.body.removeChild(video);
  console.log('🧹 Video de prueba eliminado');
}, 5000);

console.log('🎬 Iniciando prueba de carga...');
