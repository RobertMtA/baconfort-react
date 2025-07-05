// Verificar que los enlaces internos usen las rutas correctas
const puppeteer = require('puppeteer');

async function testNavigationLinks() {
  console.log('🔍 VERIFICANDO ENLACES INTERNOS...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Ir a la página principal
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
    
    // Obtener todos los enlaces
    const links = await page.evaluate(() => {
      const linkElements = document.querySelectorAll('a[href]');
      return Array.from(linkElements).map(link => ({
        href: link.href,
        text: link.textContent.trim()
      }));
    });
    
    console.log('📎 ENLACES ENCONTRADOS EN LA PÁGINA PRINCIPAL:');
    links.forEach(link => {
      const isPreferred = link.href.includes('/departamentos/');
      const isLegacy = /\/(moldes1680|santafe3770|dorrego1548|convencion1994|ugarteche2824)$/.test(link.href);
      
      let status = '✅ OK';
      if (isLegacy) {
        status = '⚠️ LEGACY';
      } else if (isPreferred) {
        status = '✅ PREFERIDO';
      }
      
      console.log(`  ${status} - ${link.href} (${link.text})`);
    });
    
    // Verificar que no haya enlaces legacy en la página principal
    const legacyLinks = links.filter(link => 
      /\/(moldes1680|santafe3770|dorrego1548|convencion1994|ugarteche2824)$/.test(link.href)
    );
    
    console.log(`\n📊 RESUMEN:`);
    console.log(`  Total de enlaces: ${links.length}`);
    console.log(`  Enlaces legacy: ${legacyLinks.length}`);
    console.log(`  Enlaces preferidos: ${links.filter(link => link.href.includes('/departamentos/')).length}`);
    
    if (legacyLinks.length === 0) {
      console.log('✅ PERFECTO: No hay enlaces legacy en la página principal');
    } else {
      console.log('⚠️ ADVERTENCIA: Algunos enlaces usan rutas legacy');
    }
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await browser.close();
  }
}

// Verificar si puppeteer está instalado
try {
  require('puppeteer');
  testNavigationLinks().catch(console.error);
} catch (error) {
  console.log('📎 VERIFICACIÓN MANUAL DE ENLACES:');
  console.log('  1. Navegar a http://localhost:3001/');
  console.log('  2. Verificar que todos los botones "Más Información" usen rutas /departamentos/');
  console.log('  3. Verificar que las tarjetas de departamentos usen rutas /departamentos/');
  console.log('  4. Confirmar que ambas rutas (legacy y nueva) funcionen correctamente');
  console.log('  5. Verificar que el admin panel muestre enlaces correctos');
}
