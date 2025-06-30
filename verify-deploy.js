#!/usr/bin/env node

/**
 * Script de verificación pre-deploy para BACONFORT
 * Verifica que todos los archivos y configuraciones estén listos para deploy
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 BACONFORT Pre-Deploy Verification\n');

// Verificar estructura del backend
function checkBackend() {
  console.log('📦 Verificando Backend...');
  
  const backendPath = path.join(__dirname, 'baconfort-backend');
  const requiredFiles = [
    'package.json',
    'server.js',
    '.env.example',
    'models/Property.js',
    'models/User.js',
    'models/Review.js',
    'models/Gallery.js',
    'routes/auth.js',
    'routes/users.js',
    'routes/properties.js',
    'routes/reviews.js',
    'routes/gallery.js'
  ];

  let backendOk = true;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(backendPath, file);
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - FALTA`);
      backendOk = false;
    }
  });

  // Verificar package.json del backend
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(backendPath, 'package.json'), 'utf8'));
    if (packageJson.scripts && packageJson.scripts.start) {
      console.log('  ✅ Script de start configurado');
    } else {
      console.log('  ❌ Script de start faltante');
      backendOk = false;
    }
    
    if (packageJson.engines && packageJson.engines.node) {
      console.log('  ✅ Versión de Node.js especificada');
    } else {
      console.log('  ❌ Versión de Node.js no especificada');
      backendOk = false;
    }
  } catch (error) {
    console.log('  ❌ Error leyendo package.json del backend');
    backendOk = false;
  }

  return backendOk;
}

// Verificar estructura del frontend
function checkFrontend() {
  console.log('\n🎨 Verificando Frontend...');
  
  const frontendPath = path.join(__dirname, 'baconfort-react');
  const requiredFiles = [
    'package.json',
    'vite.config.js',
    'index.html',
    'src/main.jsx',
    'src/App.jsx',
    'src/services/api.js',
    'public/_redirects'
  ];

  let frontendOk = true;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(frontendPath, file);
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - FALTA`);
      frontendOk = false;
    }
  });

  // Verificar configuración de Vite
  try {
    const viteConfig = fs.readFileSync(path.join(frontendPath, 'vite.config.js'), 'utf8');
    if (viteConfig.includes('defineConfig')) {
      console.log('  ✅ Configuración de Vite válida');
    } else {
      console.log('  ❌ Configuración de Vite incorrecta');
      frontendOk = false;
    }
  } catch (error) {
    console.log('  ❌ Error leyendo vite.config.js');
    frontendOk = false;
  }

  // Verificar _redirects
  try {
    const redirects = fs.readFileSync(path.join(frontendPath, 'public/_redirects'), 'utf8');
    if (redirects.includes('/* /index.html 200')) {
      console.log('  ✅ Archivo _redirects configurado correctamente');
    } else {
      console.log('  ❌ Archivo _redirects mal configurado');
      frontendOk = false;
    }
  } catch (error) {
    console.log('  ❌ Error leyendo _redirects');
    frontendOk = false;
  }

  return frontendOk;
}

// Verificar configuración de API
function checkApiConfig() {
  console.log('\n🔗 Verificando configuración de API...');
  
  const frontendPath = path.join(__dirname, 'baconfort-react');
  const apiPath = path.join(frontendPath, 'src/services/api.js');
  
  try {
    const apiContent = fs.readFileSync(apiPath, 'utf8');
    if (apiContent.includes('import.meta.env.VITE_API_URL')) {
      console.log('  ✅ API configurada para usar variables de entorno');
      return true;
    } else {
      console.log('  ❌ API no configurada para variables de entorno');
      return false;
    }
  } catch (error) {
    console.log('  ❌ Error leyendo api.js');
    return false;
  }
}

// Función principal
function main() {
  const backendOk = checkBackend();
  const frontendOk = checkFrontend();
  const apiOk = checkApiConfig();
  
  console.log('\n📋 Resumen de verificación:');
  console.log(`Backend: ${backendOk ? '✅ Listo' : '❌ Necesita correcciones'}`);
  console.log(`Frontend: ${frontendOk ? '✅ Listo' : '❌ Necesita correcciones'}`);
  console.log(`API Config: ${apiOk ? '✅ Listo' : '❌ Necesita correcciones'}`);
  
  if (backendOk && frontendOk && apiOk) {
    console.log('\n🎉 ¡Todo listo para deploy!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Subir backend a GitHub');
    console.log('2. Configurar deploy en Render');
    console.log('3. Subir frontend a GitHub');
    console.log('4. Configurar deploy en Netlify');
    console.log('5. Actualizar variables de entorno con URLs reales');
  } else {
    console.log('\n⚠️  Corrige los problemas antes de hacer deploy');
    process.exit(1);
  }
}

// Ejecutar verificación
main();
