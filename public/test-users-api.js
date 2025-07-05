// Test directo en el navegador
// Ejecutar en la consola del navegador

// Importar las funciones del api.js
import { usersAPI } from './src/services/api.js';

// Función para probar usersAPI.getAll()
async function testUsersAPI() {
  console.log('🔍 Testing usersAPI.getAll()...');
  
  try {
    const result = await usersAPI.getAll();
    console.log('📊 Result:', result);
    
    if (result.success) {
      console.log(`✅ Found ${result.data.length} users:`);
      result.data.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
      });
    } else {
      console.log('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Exception:', error);
  }
}

// Ejecutar la prueba
testUsersAPI();
