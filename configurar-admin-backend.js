// configurar-admin-backend.js
// Script para configurar usuario admin en backend

const API_URL = 'https://baconfort-backend.vercel.app/api';

async function configurarAdminBackend() {
    console.log('🔐 CONFIGURANDO ADMIN EN BACKEND');
    console.log('=================================');
    
    try {
        // Credenciales de admin
        const adminCredentials = {
            email: 'admin@baconfort.com',
            password: 'roccosa226',
            name: 'Administrador BACONFORT'
        };
        
        console.log('👤 Intentando login con credenciales existentes...');
        
        // Primero intentar login
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: adminCredentials.email,
                password: adminCredentials.password
            })
        });
        
        const loginResult = await loginResponse.json();
        
        if (loginResponse.ok && loginResult.success) {
            console.log('✅ Login exitoso con credenciales existentes');
            console.log('👤 Usuario:', loginResult.user.email);
            console.log('🔑 Rol:', loginResult.user.role);
            console.log('🎫 Token:', loginResult.token ? 'Obtenido' : 'No obtenido');
            
            // Guardar credenciales
            const fs = require('fs');
            const adminData = {
                email: adminCredentials.email,
                password: adminCredentials.password,
                token: loginResult.token,
                user: loginResult.user,
                timestamp: new Date().toISOString()
            };
            
            fs.writeFileSync('admin-backend-credentials.json', JSON.stringify(adminData, null, 2));
            console.log('💾 Credenciales guardadas en admin-backend-credentials.json');
            
            return adminData;
        }
        
        console.log('❌ Login falló, intentando crear usuario...');
        
        // Si login falla, intentar crear usuario
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminCredentials)
        });
        
        const registerResult = await registerResponse.json();
        
        if (registerResponse.ok && registerResult.success) {
            console.log('✅ Usuario admin creado exitosamente');
            console.log('👤 Usuario:', registerResult.user.email);
            console.log('🔑 Rol:', registerResult.user.role);
            console.log('🎫 Token:', registerResult.token ? 'Obtenido' : 'No obtenido');
            
            // Guardar credenciales
            const fs = require('fs');
            const adminData = {
                email: adminCredentials.email,
                password: adminCredentials.password,
                token: registerResult.token,
                user: registerResult.user,
                timestamp: new Date().toISOString()
            };
            
            fs.writeFileSync('admin-backend-credentials.json', JSON.stringify(adminData, null, 2));
            console.log('💾 Credenciales guardadas en admin-backend-credentials.json');
            
            return adminData;
        } else {
            console.log('❌ Error creando usuario:', registerResult.error);
            
            // Si el usuario ya existe, intentar recuperar contraseña
            if (registerResult.error?.includes('existe') || registerResult.error?.includes('registrado')) {
                console.log('🔄 Usuario ya existe, intentando recuperar contraseña...');
                
                const resetResponse = await fetch(`${API_URL}/auth/forgot-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: adminCredentials.email
                    })
                });
                
                const resetResult = await resetResponse.json();
                
                if (resetResponse.ok) {
                    console.log('✅ Email de recuperación enviado');
                    console.log('📧 Revisa el correo para el código de reset');
                } else {
                    console.log('❌ Error enviando email de recuperación:', resetResult.error);
                }
            }
            
            return null;
        }
        
    } catch (error) {
        console.log('❌ Error de conexión:', error.message);
        return null;
    }
}

async function probarTokenDemo() {
    console.log('\n🔍 PROBANDO TOKEN DEMO');
    console.log('======================');
    
    try {
        // Probar con token demo
        const response = await fetch(`${API_URL}/properties/moldes-1680`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
            }
        });
        
        if (response.ok) {
            console.log('✅ Token ADMIN_DEMO_TOKEN funciona');
            
            // Guardar token demo
            const fs = require('fs');
            const tokenData = {
                token: 'ADMIN_DEMO_TOKEN',
                type: 'demo',
                timestamp: new Date().toISOString(),
                functional: true
            };
            
            fs.writeFileSync('admin-demo-token.json', JSON.stringify(tokenData, null, 2));
            console.log('💾 Token demo guardado en admin-demo-token.json');
            
            return 'ADMIN_DEMO_TOKEN';
        } else {
            console.log('❌ Token demo no funciona');
            return null;
        }
        
    } catch (error) {
        console.log('❌ Error probando token demo:', error.message);
        return null;
    }
}

async function ejecutarConfiguracion() {
    console.log('🚀 CONFIGURACIÓN COMPLETA DE ADMIN');
    console.log('===================================');
    
    // Paso 1: Configurar admin en backend
    const adminData = await configurarAdminBackend();
    
    // Paso 2: Probar token demo
    const demoToken = await probarTokenDemo();
    
    // Resumen final
    console.log('\n📊 RESUMEN DE CONFIGURACIÓN');
    console.log('============================');
    
    if (adminData) {
        console.log('✅ Usuario admin configurado en backend');
        console.log(`📧 Email: ${adminData.email}`);
        console.log(`🔑 Password: ${adminData.password}`);
        console.log(`🎫 Token: ${adminData.token ? 'Disponible' : 'No disponible'}`);
    } else {
        console.log('❌ No se pudo configurar usuario admin');
    }
    
    if (demoToken) {
        console.log('✅ Token demo funcional');
        console.log(`🎫 Token: ${demoToken}`);
    } else {
        console.log('❌ Token demo no funcional');
    }
    
    console.log('\n🎯 PRÓXIMOS PASOS:');
    console.log('1. Usar admin@baconfort.com / roccosa226 para login');
    console.log('2. Configurar acceso en frontend con setup-admin-access.js');
    console.log('3. Desplegar cambios en Vercel');
}

// Ejecutar
if (require.main === module) {
    ejecutarConfiguracion();
}

module.exports = { configurarAdminBackend, probarTokenDemo };
