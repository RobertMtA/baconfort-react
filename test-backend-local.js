// Script para probar el backend localmente antes del despliegue
const axios = require('axios');

const API_BASE = 'http://localhost:5000';

async function testBackend() {
    console.log('🧪 Probando backend localmente...\n');
    
    try {
        // Test 1: Verificar que el servidor esté corriendo
        console.log('1. Verificando que el servidor esté activo...');
        const healthResponse = await axios.get(`${API_BASE}/api/health`);
        console.log('   ✅ Servidor activo:', healthResponse.data);
        
        // Test 2: Verificar conexión a base de datos
        console.log('\n2. Verificando conexión a base de datos...');
        try {
            const dbResponse = await axios.get(`${API_BASE}/api/test-db`);
            console.log('   ✅ Base de datos conectada:', dbResponse.data);
        } catch (error) {
            console.log('   ❌ Error de base de datos:', error.response?.data || error.message);
        }
        
        // Test 3: Verificar endpoint de auth
        console.log('\n3. Verificando endpoint de autenticación...');
        try {
            const authResponse = await axios.post(`${API_BASE}/api/auth/login`, {
                email: 'test@example.com',
                password: 'test123'
            });
            console.log('   ✅ Endpoint de auth funciona');
        } catch (error) {
            if (error.response?.status === 401) {
                console.log('   ✅ Endpoint de auth funciona (error 401 esperado)');
            } else {
                console.log('   ❌ Error en auth:', error.response?.data || error.message);
            }
        }
        
        // Test 4: Verificar endpoint de reservas
        console.log('\n4. Verificando endpoint de reservas...');
        try {
            const reservationsResponse = await axios.get(`${API_BASE}/api/reservations`);
            console.log('   ✅ Endpoint de reservas funciona');
        } catch (error) {
            if (error.response?.status === 401) {
                console.log('   ✅ Endpoint de reservas funciona (error 401 esperado)');
            } else {
                console.log('   ❌ Error en reservas:', error.response?.data || error.message);
            }
        }
        
        console.log('\n🎉 Backend listo para despliegue!');
        
    } catch (error) {
        console.log('❌ Error general:', error.message);
        console.log('\n🔧 Acciones recomendadas:');
        console.log('1. Verificar que el servidor esté corriendo: npm start');
        console.log('2. Verificar variables de entorno en .env');
        console.log('3. Verificar conexión a MongoDB');
    }
}

// Ejecutar solo si el archivo es llamado directamente
if (require.main === module) {
    testBackend();
}

module.exports = { testBackend };
