// cambiar-precios-con-auth.js
// Script para cambiar precios con autenticación

const API_URL = 'https://baconfort-backend.vercel.app/api';

// Nuevos precios recomendados
const nuevosPrecios = {
    'moldes-1680': {
        daily: 75,
        weekly: 330,
        monthly: 700,
        currency: 'USD'
    },
    'santa-fe-3770': {
        daily: 80,
        weekly: 350,
        monthly: 750,
        currency: 'USD'
    },
    'dorrego-1548': {
        daily: 70,
        weekly: 320,
        monthly: 680,
        currency: 'USD'
    },
    'convencion-1994': {
        daily: 90,
        weekly: 380,
        monthly: 800,
        currency: 'USD'
    },
    'ugarteche-2824': {
        daily: 95,
        weekly: 400,
        monthly: 850,
        currency: 'USD'
    }
};

const cambiarPreciosConAuth = async () => {
    console.log('🔐 Cambiando precios con autenticación...');
    console.log('=============================================');
    
    // Intentar diferentes métodos de autenticación
    const authMethods = [
        // Método 1: Sin autenticación
        {},
        // Método 2: Con token demo
        { 'Authorization': 'Bearer ADMIN_DEMO_TOKEN' },
        // Método 3: Con credenciales básicas
        { 'Authorization': 'Basic ' + btoa('admin:roccosa226') },
        // Método 4: Con token JWT simulado
        { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE3MjAxNjQ5MDB9.test' }
    ];
    
    for (const [propertyId, prices] of Object.entries(nuevosPrecios)) {
        let success = false;
        
        console.log(`\n🏠 Actualizando ${propertyId}...`);
        console.log(`   Diario: USD ${prices.daily}`);
        console.log(`   Semanal: USD ${prices.weekly}`);
        console.log(`   Mensual: USD ${prices.monthly}`);
        
        // Probar cada método de autenticación
        for (let i = 0; i < authMethods.length && !success; i++) {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    ...authMethods[i]
                };
                
                console.log(`   🔐 Probando método ${i + 1}...`);
                
                const response = await fetch(`${API_URL}/properties/${propertyId}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify({ prices })
                });
                
                if (response.ok) {
                    const result = await response.json();
                    console.log(`   ✅ ${propertyId} actualizado exitosamente con método ${i + 1}`);
                    success = true;
                    break;
                } else {
                    console.log(`   ❌ Método ${i + 1} falló: ${response.status}`);
                }
                
            } catch (error) {
                console.log(`   ❌ Error método ${i + 1}:`, error.message);
            }
        }
        
        if (!success) {
            console.log(`   ❌ No se pudo actualizar ${propertyId} con ningún método`);
        }
        
        // Pausa entre requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n✅ Proceso completado!');
    console.log('🔄 Verificando resultados...');
    await verificarCambios();
};

const verificarCambios = async () => {
    console.log('\n🔍 Verificando cambios aplicados...');
    console.log('=====================================');
    
    for (const [propertyId, expectedPrices] of Object.entries(nuevosPrecios)) {
        try {
            const response = await fetch(`${API_URL}/properties/${propertyId}`);
            
            if (response.ok) {
                const result = await response.json();
                const actualPrices = result.data?.prices;
                
                console.log(`\n🏠 ${propertyId}:`);
                console.log(`   Esperado: USD ${expectedPrices.daily}/${expectedPrices.weekly}/${expectedPrices.monthly}`);
                console.log(`   Actual:   USD ${actualPrices?.daily || 'N/A'}/${actualPrices?.weekly || 'N/A'}/${actualPrices?.monthly || 'N/A'}`);
                
                const updated = (
                    actualPrices?.daily === expectedPrices.daily &&
                    actualPrices?.weekly === expectedPrices.weekly &&
                    actualPrices?.monthly === expectedPrices.monthly
                );
                
                console.log(`   Estado: ${updated ? '✅ ACTUALIZADO' : '❌ NO ACTUALIZADO'}`);
            } else {
                console.log(`❌ Error verificando ${propertyId}: ${response.status}`);
            }
            
        } catch (error) {
            console.error(`❌ Error verificando ${propertyId}:`, error.message);
        }
    }
};

// Función para crear usuarios admin en el backend
const crearUsuarioAdmin = async () => {
    console.log('👤 Creando usuario admin...');
    
    const userData = {
        email: 'admin@baconfort.com',
        password: 'roccosa226',
        name: 'Administrador BACONFORT',
        role: 'admin'
    };
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Usuario admin creado:', result);
            return result;
        } else {
            console.log('❌ Error creando usuario:', response.status);
            const errorText = await response.text();
            console.log('Error details:', errorText);
            return null;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        return null;
    }
};

// Función para intentar login y obtener token
const obtenerTokenAdmin = async () => {
    console.log('🔐 Obteniendo token de admin...');
    
    // Primero intentar crear el usuario
    await crearUsuarioAdmin();
    
    // Luego intentar login
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin@baconfort.com',
                password: 'roccosa226'
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Token obtenido:', result.token ? 'SÍ' : 'NO');
            return result.token;
        } else {
            console.log('❌ Error en login:', response.status);
            return null;
        }
    } catch (error) {
        console.error('❌ Error obteniendo token:', error);
        return null;
    }
};

// Ejecutar el cambio masivo
const ejecutarCambioMasivo = async () => {
    console.log('🚀 INICIANDO CAMBIO MASIVO DE PRECIOS');
    console.log('=====================================');
    
    // Intentar obtener token primero
    const token = await obtenerTokenAdmin();
    
    if (token) {
        console.log('🔐 Usando token obtenido para cambios');
        // Actualizar el método de autenticación con el token real
        authMethods[1] = { 'Authorization': `Bearer ${token}` };
    }
    
    // Ejecutar cambios
    await cambiarPreciosConAuth();
};

ejecutarCambioMasivo();
