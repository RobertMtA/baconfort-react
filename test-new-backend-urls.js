// Script para probar la nueva URL del backend después del despliegue

const testUrls = [
  'https://baconfort-backend.vercel.app/',
  'https://baconfort-backend.vercel.app/api',
  'https://baconfort-backend.vercel.app/api/health',
  'https://baconfort-backend-aap74ltrq-robertogaona1985-1518s-projects.vercel.app/',
  'https://baconfort-backend-aap74ltrq-robertogaona1985-1518s-projects.vercel.app/api',
  'https://baconfort-backend-aap74ltrq-robertogaona1985-1518s-projects.vercel.app/api/health'
];

async function testBackendUrls() {
  console.log('🔍 Probando URLs del backend después del despliegue...\n');
  
  for (const url of testUrls) {
    console.log(`Probando: ${url}`);
    try {
      const response = await fetch(url);
      console.log(`  Status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`  ✅ Respuesta:`, JSON.stringify(data, null, 2));
      } else {
        console.log(`  ❌ Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
    console.log('');
  }
}

testBackendUrls();
