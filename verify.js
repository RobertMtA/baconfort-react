// Verificación final
const verify = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/properties/moldes1680?_=' + Date.now());
    const data = await response.json();
    
    console.log('📊 Servicios actuales:');
    data.data.amenities.servicios.forEach((s, i) => console.log(`  ${i+1}. ${s.text}`));
    
    const hasCochera = data.data.amenities.servicios.some(s => s.text === 'Cochera Opcional');
    console.log(hasCochera ? '❌ Cochera Opcional todavía existe' : '✅ Cochera Opcional eliminada');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

verify();
