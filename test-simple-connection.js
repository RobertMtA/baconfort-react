// test-simple-connection.js
// Script simple para probar la conexión

console.log('🚀 Iniciando test simple...');

const testConnection = async () => {
    try {
        console.log('📡 Probando conexión a Vercel...');
        
        const response = await fetch('https://baconfort-backend.vercel.app/api/health');
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Conexión exitosa!');
            console.log('📊 Respuesta:', data);
        } else {
            console.log('❌ Error HTTP:', response.status);
        }
        
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
};

testConnection();
