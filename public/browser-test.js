// Test directo para la consola del navegador
console.log('🔍 Testing from browser console...');

// Función para probar la API directamente
async function testAPIFromBrowser() {
  const API_BASE_URL = 'http://localhost:5000/api';
  
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      }
    });
    
    console.log('📊 Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error response:', errorData);
      return;
    }
    
    const data = await response.json();
    console.log('✅ Success response:', data);
    
    if (data.success) {
      console.log(`✅ Found ${data.data.length} users:`);
      data.data.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
      });
    }
  } catch (error) {
    console.error('❌ Fetch error:', error);
  }
}

// Ejecutar automáticamente
testAPIFromBrowser();

// Hacer disponible globalmente
window.testAPIFromBrowser = testAPIFromBrowser;
