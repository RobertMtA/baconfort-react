// verificar-crear-admin.js
// Script para verificar y crear usuario admin

const API_URL = 'https://baconfort-backend.vercel.app/api';

async function verificarCrearAdmin() {
    console.log('🔐 Verificando usuario admin...');
    console.log('==============================');
    
    try {
        // Primero intentar login
        const loginData = {
            email: 'admin@baconfort.com',
            password: 'roccosa226'
        };
        
        console.log('👤 Intentando login con admin existente...');
        
        let response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        
        let result = await response.json();
        
        if (response.ok && result.success) {
            console.log('✅ Admin ya existe y login exitoso');
            console.log('🎫 Token:', result.token);
            return result.token;
        }
        
        // Si no existe, crear admin
        console.log('👤 Admin no existe, creando...');
        
        const adminData = {
            name: 'Administrador',
            email: 'admin@baconfort.com',
            password: 'roccosa226'
        };
        
        response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminData)
        });
        
        result = await response.json();
        
        if (response.ok && result.success) {
            console.log('✅ Admin creado exitosamente');
            console.log('🎫 Token:', result.token);
            console.log('👤 Usuario:', result.user.email);
            
            // Guardar token
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
            console.log('❌ Error creando admin:', response.status);
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
    verificarCrearAdmin();
}

module.exports = verificarCrearAdmin;
