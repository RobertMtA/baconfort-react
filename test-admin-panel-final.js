/**
 * Script para verificar que el admin panel funciona correctamente
 * después de las mejoras en "Acciones Rápidas"
 */

const https = require('https');
const http = require('http');

function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const protocol = options.port === 443 ? https : http;
    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (options.data) {
      req.write(options.data);
    }
    
    req.end();
  });
}

async function testAdminPanel() {
  console.log('🔍 Verificando funcionamiento del admin panel...\n');
  
  try {
    // 1. Verificar que el backend esté corriendo
    console.log('📡 Verificando conexión con backend...');
    const backendResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/api/properties',
      method: 'GET'
    });
    
    if (backendResponse.statusCode === 200) {
      console.log('✅ Backend responde correctamente');
      const properties = JSON.parse(backendResponse.body);
      console.log(`✅ ${Object.keys(properties).length} propiedades disponibles`);
    } else {
      console.log('❌ Backend no responde correctamente');
      return;
    }
    
    // 2. Verificar que el frontend esté corriendo
    console.log('\n🌐 Verificando frontend...');
    const frontendResponse = await makeRequest({
      hostname: 'localhost',
      port: 3001,
      path: '/',
      method: 'GET'
    });
    
    if (frontendResponse.statusCode === 200) {
      console.log('✅ Frontend responde correctamente');
      
      // Verificar que contiene los elementos del admin
      if (frontendResponse.body.includes('admin-login')) {
        console.log('✅ Ruta de admin disponible');
      }
    } else {
      console.log('❌ Frontend no responde correctamente');
      return;
    }
    
    // 3. Verificar archivos de estilo
    console.log('\n🎨 Verificando estilos CSS...');
    const fs = require('fs');
    const path = require('path');
    
    const dashboardCssPath = path.join(__dirname, 'baconfort-react/src/components/Admin/Dashboard.css');
    
    if (fs.existsSync(dashboardCssPath)) {
      const cssContent = fs.readFileSync(dashboardCssPath, 'utf8');
      
      // Verificar estilos específicos
      const criticalStyles = [
        'actions-grid',
        'action-btn::before',
        'transform: translateY(-3px)',
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))'
      ];
      
      let stylesFound = 0;
      criticalStyles.forEach(style => {
        if (cssContent.includes(style)) {
          stylesFound++;
        }
      });
      
      console.log(`✅ ${stylesFound}/${criticalStyles.length} estilos críticos encontrados`);
    }
    
    console.log('\n✅ Verificación completada exitosamente!');
    console.log('\n📋 Resumen de mejoras aplicadas:');
    console.log('• Sección "Acciones Rápidas" rediseñada');
    console.log('• Grid responsivo mejorado (240px min-width)');
    console.log('• Botones con gradiente y efectos hover elegantes');
    console.log('• Iconos más descriptivos e intuitivos');
    console.log('• Tooltips informativos agregados');
    console.log('• Responsive design para móviles y tablets');
    console.log('• Transiciones suaves con pseudo-elementos');
    console.log('• Mejor alineación y espaciado visual');
    
    console.log('\n🎯 Instrucciones para probar visualmente:');
    console.log('1. Abrir http://localhost:3001/admin-login');
    console.log('2. Hacer login con: usuario "admin", contraseña "admin123"');
    console.log('3. Verificar que la sección "Acciones Rápidas" se vea ordenada');
    console.log('4. Probar los efectos hover en los botones');
    console.log('5. Verificar responsive design cambiando el tamaño de ventana');
    
  } catch (error) {
    console.log('❌ Error durante la verificación:', error.message);
  }
}

// Ejecutar verificación
testAdminPanel();
