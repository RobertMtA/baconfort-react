const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del backend para Vercel...\n');

// Verificar archivos esenciales
const backendDir = path.join(__dirname, 'baconfort-backend');
const requiredFiles = [
  'server.js',
  'package.json',
  'vercel.json',
  '.env'
];

console.log('📁 Verificando archivos esenciales:');
requiredFiles.forEach(file => {
  const filePath = path.join(backendDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTA`);
  }
});

// Verificar package.json
const packageJsonPath = path.join(backendDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log('\n📦 Package.json:');
  console.log(`  ✅ Name: ${packageJson.name}`);
  console.log(`  ✅ Version: ${packageJson.version}`);
  console.log(`  ✅ Main: ${packageJson.main}`);
  console.log(`  ✅ Scripts:`, Object.keys(packageJson.scripts || {}));
  console.log(`  ✅ Dependencies:`, Object.keys(packageJson.dependencies || {}));
}

// Verificar vercel.json
const vercelJsonPath = path.join(backendDir, 'vercel.json');
if (fs.existsSync(vercelJsonPath)) {
  const vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
  console.log('\n⚙️  Vercel.json:');
  console.log(`  ✅ Version: ${vercelJson.version}`);
  console.log(`  ✅ Builds: ${vercelJson.builds.length} build(s)`);
  console.log(`  ✅ Routes: ${vercelJson.routes.length} route(s)`);
}

// Verificar .env
const envPath = path.join(backendDir, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  console.log('\n🔐 Variables de entorno:');
  envLines.forEach(line => {
    const key = line.split('=')[0];
    console.log(`  ✅ ${key}`);
  });
} else {
  console.log('\n❌ No se encontró archivo .env');
}

console.log('\n🎯 Recomendaciones para el despliegue:');
console.log('1. Configurar variables de entorno en Vercel Dashboard');
console.log('2. Verificar que todas las dependencias estén en package.json');
console.log('3. Revisar los logs de Vercel para errores específicos');
console.log('4. Probar el servidor en local antes del despliegue');
