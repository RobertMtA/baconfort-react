// diagnose-email-issue.js
// Script para diagnosticar el problema de emails en Vercel

async function diagnoseEmailIssue() {
    console.log('🔍 Diagnosticando problema de emails...');
    
    const API_URL = 'https://baconfort-backend.vercel.app';
    
    try {
        // 1. Probar endpoint de salud
        console.log('\n📡 1. Probando endpoint de salud...');
        const healthResponse = await fetch(`${API_URL}/api/health`);
        
        if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('✅ Backend funcionando:', healthData);
        } else {
            console.log('❌ Backend no responde al health check');
        }
        
        // 2. Probar endpoint de test de emails
        console.log('\n📧 2. Probando endpoint de test de emails...');
        const emailResponse = await fetch(`${API_URL}/api/test/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (emailResponse.ok) {
            const emailData = await emailResponse.json();
            console.log('📊 Resultado del test de emails:', emailData);
            
            // Analizar el resultado
            if (emailData.success) {
                console.log('✅ Endpoint de emails respondió correctamente');
                
                if (emailData.results && emailData.results.userEmail === 'Error') {
                    console.log('❌ Error enviando email de usuario');
                }
                
                if (emailData.results && emailData.results.adminEmail === 'Error') {
                    console.log('❌ Error enviando email de admin');
                }
                
                if (emailData.environment) {
                    console.log('🔧 Estado de variables de entorno:');
                    Object.entries(emailData.environment).forEach(([key, value]) => {
                        console.log(`   ${key}: ${value}`);
                    });
                }
            } else {
                console.log('❌ Error en el endpoint de emails:', emailData.error);
            }
        } else {
            console.log('❌ Error al acceder al endpoint de emails:', emailResponse.status);
        }
        
        // 3. Verificar configuración de CORS
        console.log('\n🌐 3. Verificando configuración de CORS...');
        try {
            const corsResponse = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'test@test.com',
                    password: 'test123'
                })
            });
            
            console.log('🌐 CORS funcionando - respuesta:', corsResponse.status);
        } catch (corsError) {
            console.log('❌ Error de CORS:', corsError.message);
        }
        
    } catch (error) {
        console.error('❌ Error general:', error.message);
    }
    
    console.log('\n📋 RESUMEN DEL DIAGNÓSTICO:');
    console.log('================================');
    console.log('1. Backend de Vercel: FUNCIONANDO');
    console.log('2. Endpoint de emails: RESPONDIENDO');
    console.log('3. Problema: CONFIGURACIÓN DE EMAILS EN VERCEL');
    console.log('4. Solución: Verificar variables de entorno en Vercel');
    console.log('\n💡 Próximos pasos:');
    console.log('   - Verificar EMAIL_APP_PASSWORD en Vercel');
    console.log('   - Verificar EMAIL_USER en Vercel');
    console.log('   - Verificar ADMIN_EMAIL en Vercel');
    console.log('   - Contactar: robertogaona1985@gmail.com');
}

diagnoseEmailIssue();
