// Script para configurar variables de entorno en Vercel
const fs = require('fs');
const path = require('path');

console.log('🔧 Configuración de variables de entorno para Vercel\n');

// Leer variables de entorno del archivo .env
const envPath = path.join(__dirname, 'baconfort-backend', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  console.log('📋 Comandos para configurar variables de entorno en Vercel:');
  console.log('   (Ejecutar estos comandos en el dashboard de Vercel o usando Vercel CLI)\n');
  
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=');
    if (key && value) {
      console.log(`vercel env add ${key} production`);
      console.log(`   Valor: ${value.startsWith('"') ? value.slice(1, -1) : value}`);
      console.log('');
    }
  });
  
  console.log('\n🌐 O configura manualmente en Vercel Dashboard:');
  console.log('1. Ve a https://vercel.com/dashboard');
  console.log('2. Selecciona tu proyecto "baconfort-backend"');
  console.log('3. Ve a Settings > Environment Variables');
  console.log('4. Agrega cada variable de entorno:\n');
  
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=');
    if (key && value) {
      console.log(`   ${key} = ${value.startsWith('"') ? value.slice(1, -1) : value}`);
    }
  });
  
  console.log('\n⚠️  IMPORTANTE:');
  console.log('- Asegúrate de que NODE_ENV esté configurado como "production"');
  console.log('- Verifica que MONGODB_URI apunte a tu base de datos de producción');
  console.log('- Después de configurar, haz redeploy del proyecto');
  
} else {
  console.log('❌ No se encontró archivo .env en baconfort-backend');
}
