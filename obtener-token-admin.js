// obtener-token-admin.js
// Script para obtener token de admin válido

const API_URL = 'https://baconfort-backend.vercel.app/api';

async function obtenerTokenAdmin() {
    console.log('🔐 Obteniendo token de admin...');
    console.log('==============================');
    
    try {
        // Intentar login con las credenciales admin
        const loginData = {
            email: 'admin@baconfort.com',
            password: 'roccosa226'
        };
        
        console.log('👤 Intentando login con:', loginData.email);
        
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            console.log('✅ Login exitoso');
            console.log('🎫 Token:', result.token);
            console.log('👤 Usuario:', result.user.email);
            console.log('🔑 Rol:', result.user.role);
            
            // Guardar token en archivo para uso posterior
            const fs = require('fs');
            const tokenData = {
                token: result.token,
                user: result.user,
                timestamp: new Date().toISOString()
            };
            
            fs.writeFileSync('admin-token.json', JSON.stringify(tokenData, null, 2));
            console.log('💾 Token guardado en admin-token.json');
            
            return result.token;
        } else {
            console.log('❌ Error en login:', response.status);
            console.log('📋 Respuesta:', result);
            return null;
        }
        
    } catch (error) {
        console.log('❌ Error:', error.message);
        return null;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    obtenerTokenAdmin();
}

module.exports = obtenerTokenAdmin;
