// reset-admin-password.js
// Script para resetear contraseña del admin

const API_URL = 'https://baconfort-backend.vercel.app/api';

async function resetAdminPassword() {
    console.log('🔐 Reseteando contraseña del admin...');
    console.log('====================================');
    
    try {
        // Intentar reset de contraseña
        const email = 'admin@baconfort.com';
        
        console.log('📧 Solicitando reset de contraseña para:', email);
        
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            console.log('✅ Email de reset enviado');
            console.log('📬 Revisa el email para el código de reset');
            console.log('');
            console.log('🔄 Usa el código que recibas para cambiar la contraseña');
            console.log('   Endpoint: POST /api/auth/reset-password');
            console.log('   Body: { email, code, newPassword }');
            
            return true;
        } else {
            console.log('❌ Error:', response.status);
            console.log('📋 Respuesta:', result);
            return false;
        }
        
    } catch (error) {
        console.log('❌ Error:', error.message);
        return false;
    }
}

// También intentar con otros emails posibles
async function probarOtrosEmails() {
    console.log('\n🔍 Probando otros emails de admin...');
    console.log('====================================');
    
    const emails = [
        'admin@baconfort.com',
        'admin@gmail.com',
        'admin@test.com',
        'roberto@baconfort.com',
        'test@baconfort.com'
    ];
    
    for (const email of emails) {
        try {
            console.log(`\n👤 Probando login con: ${email}`);
            
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: 'roccosa226'
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                console.log(`✅ Login exitoso con: ${email}`);
                console.log('🎫 Token:', result.token);
                console.log('👤 Usuario:', result.user);
                
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
                console.log(`❌ Falló con ${email}: ${response.status}`);
            }
            
        } catch (error) {
            console.log(`❌ Error con ${email}:`, error.message);
        }
    }
    
    return null;
}

// Ejecutar si se llama directamente
if (require.main === module) {
    (async () => {
        const token = await probarOtrosEmails();
        if (!token) {
            await resetAdminPassword();
        }
    })();
}

module.exports = { resetAdminPassword, probarOtrosEmails };
