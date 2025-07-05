// test-admin-price-update.js
// Script para probar la actualización de precios desde el admin

console.log('🔧 Probando actualización de precios desde admin...');

const testAdminPriceUpdate = async () => {
    const API_URL = 'https://baconfort-backend.vercel.app/api';
    
    try {
        // 1. Probar endpoint de salud
        console.log('🏥 1. Probando endpoint de salud...');
        const healthResponse = await fetch(`${API_URL}/health`);
        
        if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('✅ Backend funcionando:', healthData);
        } else {
            console.log('❌ Backend no responde:', healthResponse.status);
        }
        
        // 2. Probar autenticación admin
        console.log('🔐 2. Probando autenticación admin...');
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin@baconfort.com',
                password: 'roccosa226'
            })
        });
        
        let token = null;
        if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            token = loginData.token;
            console.log('✅ Login exitoso! Token:', token ? 'Obtenido' : 'No obtenido');
            
            // Guardar token en localStorage como lo hace el frontend
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('baconfort-token', token);
            }
        } else {
            console.log('❌ Error en login:', loginResponse.status);
            const errorText = await loginResponse.text();
            console.log('❌ Error details:', errorText);
        }
        
        // 3. Probar actualización de precios (simulando lo que hace el admin)
        console.log('💰 3. Probando actualización de precios...');
        const updateData = {
            prices: {
                daily: 85,
                weekly: 350,
                monthly: 750,
                currency: 'USD'
            }
        };
        
        const updateResponse = await fetch(`${API_URL}/properties/moldes-1680`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : 'Bearer ADMIN_DEMO_TOKEN'
            },
            body: JSON.stringify(updateData)
        });
        
        if (updateResponse.ok) {
            const result = await updateResponse.json();
            console.log('✅ Precios actualizados exitosamente!');
            console.log('📊 Resultado:', result);
        } else {
            console.log('❌ Error actualizando precios:', updateResponse.status);
            const errorText = await updateResponse.text();
            console.log('❌ Error details:', errorText);
            
            // Intentar con diferentes métodos de autenticación
            console.log('🔄 Intentando sin token...');
            const retryResponse = await fetch(`${API_URL}/properties/moldes-1680`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            
            if (retryResponse.ok) {
                const retryResult = await retryResponse.json();
                console.log('✅ Actualización exitosa sin token!');
                console.log('📊 Resultado:', retryResult);
            } else {
                console.log('❌ Error sin token también:', retryResponse.status);
            }
        }
        
    } catch (error) {
        console.error('❌ Error general:', error);
        console.log('\n💡 DIAGNÓSTICO:');
        console.log('- Verificar que el backend esté funcionando');
        console.log('- Verificar credenciales de admin');
        console.log('- Verificar configuración de CORS');
        console.log('- Contactar: robertogaona1985@gmail.com');
    }
};

testAdminPriceUpdate();
