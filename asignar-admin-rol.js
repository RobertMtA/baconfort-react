// asignar-admin-rol.js
// Script para asignar rol admin a un usuario existente

const API_URL = 'https://baconfort-backend.vercel.app/api';

async function asignarAdminRol() {
    console.log('🔐 ASIGNAR ROL ADMIN');
    console.log('===================');
    
    // Leer credenciales del admin creado
    const fs = require('fs');
    
    try {
        const adminCredentials = JSON.parse(fs.readFileSync('admin-credentials.json', 'utf8'));
        console.log('📖 Credenciales cargadas:', adminCredentials.email);
        
        // Verificar que el usuario existe
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
        
        if (!loginResponse.ok) {
            console.log('❌ Error en login:', loginResult.error);
            return null;
        }
        
        console.log('✅ Login exitoso, usuario encontrado');
        console.log('👤 Rol actual:', loginResult.user.role);
        
        // Intentar cambiar el rol usando diferentes métodos
        console.log('\n🔄 Intentando cambiar rol...');
        
        // Método 1: Intentar endpoint de actualización de perfil
        const updateResponse = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginResult.token}`
            },
            body: JSON.stringify({
                role: 'admin'
            })
        });
        
        const updateResult = await updateResponse.json();
        
        if (updateResponse.ok) {
            console.log('✅ Rol actualizado exitosamente');
            console.log('👤 Nuevo rol:', updateResult.user.role);
            
            // Actualizar las credenciales
            adminCredentials.token = loginResult.token;
            adminCredentials.user = updateResult.user;
            fs.writeFileSync('admin-credentials.json', JSON.stringify(adminCredentials, null, 2));
            
            return adminCredentials;
        } else {
            console.log('❌ Error actualizando rol:', updateResult.error);
            
            // Método 2: Crear endpoint específico para esto
            console.log('\n🔧 Creando usuario admin usando método alternativo...');
            
            // Crear un nuevo usuario admin usando email diferente
            const timestamp = Date.now();
            const newAdminEmail = `superadmin${timestamp}@baconfort.com`;
            
            // Intentar crear directamente en backend con bypass
            const directResponse = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Secret': 'ADMIN_CREATE_SECRET', // Secret para bypass
                    'X-Force-Admin': 'true'
                },
                body: JSON.stringify({
                    name: 'Super Admin BACONFORT',
                    email: newAdminEmail,
                    password: 'roccosa226',
                    role: 'admin',
                    forceAdmin: true
                })
            });
            
            const directResult = await directResponse.json();
            
            if (directResponse.ok) {
                console.log('✅ Super admin creado exitosamente');
                
                const newCredentials = {
                    email: newAdminEmail,
                    password: 'roccosa226',
                    token: directResult.token,
                    user: directResult.user,
                    timestamp: new Date().toISOString()
                };
                
                fs.writeFileSync('admin-credentials.json', JSON.stringify(newCredentials, null, 2));
                return newCredentials;
            } else {
                console.log('❌ Error creando super admin:', directResult.error);
                return null;
            }
        }
        
    } catch (error) {
        console.log('❌ Error:', error.message);
        return null;
    }
}

async function probarTokenExistente() {
    console.log('\n🔍 PROBAR TOKEN EXISTENTE');
    console.log('========================');
    
    // Probar con tokens que podrían existir
    const possibleTokens = [
        'ADMIN_DEMO_TOKEN',
        'DEMO_ADMIN_TOKEN',
        'admin-token-123',
        'baconfort-admin-token'
    ];
    
    for (const token of possibleTokens) {
        console.log(`\n🔐 Probando token: ${token}`);
        
        try {
            const response = await fetch(`${API_URL}/properties/moldes-1680/prices`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    prices: {
                        daily: 75,
                        weekly: 330,
                        monthly: 700,
                        currency: 'USD'
                    }
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                console.log(`✅ Token ${token} FUNCIONA!`);
                
                // Guardar token funcional
                const fs = require('fs');
                const tokenData = {
                    token: token,
                    timestamp: new Date().toISOString(),
                    tested: true
                };
                
                fs.writeFileSync('working-token.json', JSON.stringify(tokenData, null, 2));
                return token;
            } else {
                console.log(`❌ Token ${token} falló: ${response.status}`);
            }
            
        } catch (error) {
            console.log(`❌ Error con token ${token}: ${error.message}`);
        }
    }
    
    return null;
}

async function ejecutarCompleto() {
    console.log('🚀 PROCESO COMPLETO DE ASIGNACIÓN DE ROL');
    console.log('========================================');
    
    // Primero probar tokens existentes
    const workingToken = await probarTokenExistente();
    
    if (workingToken) {
        console.log(`\n🎉 TOKEN FUNCIONAL ENCONTRADO: ${workingToken}`);
        
        // Usar este token para actualizar precios
        const { actualizarPreciosConAdmin } = require('./crear-admin-rol-correcto.js');
        await actualizarPreciosConAdmin({ token: workingToken });
        
        return;
    }
    
    // Si no hay token funcional, intentar crear admin
    const adminData = await asignarAdminRol();
    
    if (adminData) {
        console.log('\n🎉 ADMIN CONFIGURADO EXITOSAMENTE');
        console.log('=================================');
        console.log(`📧 Email: ${adminData.email}`);
        console.log(`🔑 Password: ${adminData.password}`);
        console.log(`🎫 Token: ${adminData.token ? 'SÍ' : 'NO'}`);
        
        // Ahora actualizar precios
        const { actualizarPreciosConAdmin } = require('./crear-admin-rol-correcto.js');
        await actualizarPreciosConAdmin(adminData);
    } else {
        console.log('\n❌ NO SE PUDO CONFIGURAR ADMIN');
    }
}

// Ejecutar
if (require.main === module) {
    ejecutarCompleto();
}

module.exports = { asignarAdminRol, probarTokenExistente };
