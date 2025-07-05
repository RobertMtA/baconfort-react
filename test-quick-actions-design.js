const puppeteer = require('puppeteer');

async function testQuickActionsDesign() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navegar al admin panel
    await page.goto('http://localhost:3000/admin-login');
    
    // Esperar a que cargue el formulario de login
    await page.waitForSelector('input[type="text"]');
    
    // Hacer login
    await page.type('input[type="text"]', 'admin');
    await page.type('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Esperar a que cargue el dashboard
    await page.waitForSelector('.quick-actions', { timeout: 10000 });
    
    console.log('✅ Admin panel cargado exitosamente');
    
    // Verificar que la sección "Acciones Rápidas" esté presente
    const quickActionsSection = await page.$('.quick-actions');
    if (quickActionsSection) {
      console.log('✅ Sección "Acciones Rápidas" encontrada');
      
      // Verificar que los botones estén correctamente estilizados
      const actionButtons = await page.$$('.action-btn');
      console.log(`✅ ${actionButtons.length} botones de acción encontrados`);
      
      // Verificar que el grid se vea bien
      const actionsGrid = await page.$('.actions-grid');
      const gridStyles = await page.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          gridTemplateColumns: styles.gridTemplateColumns,
          gap: styles.gap
        };
      }, actionsGrid);
      
      console.log('✅ Estilos del grid:', gridStyles);
      
      // Tomar screenshot para verificar visualmente
      await page.setViewport({ width: 1200, height: 800 });
      await page.screenshot({ 
        path: 'quick-actions-desktop.png', 
        fullPage: true 
      });
      
      // Probar vista móvil
      await page.setViewport({ width: 768, height: 1024 });
      await page.screenshot({ 
        path: 'quick-actions-tablet.png', 
        fullPage: true 
      });
      
      await page.setViewport({ width: 480, height: 800 });
      await page.screenshot({ 
        path: 'quick-actions-mobile.png', 
        fullPage: true 
      });
      
      console.log('✅ Screenshots tomados para diferentes tamaños de pantalla');
      
      // Probar interacción hover
      await page.setViewport({ width: 1200, height: 800 });
      await page.hover('.action-btn:first-child');
      await page.screenshot({ 
        path: 'quick-actions-hover.png', 
        fullPage: true 
      });
      
      console.log('✅ Efecto hover probado');
      
    } else {
      console.log('❌ Sección "Acciones Rápidas" no encontrada');
    }
    
  } catch (error) {
    console.error('❌ Error al probar el diseño:', error.message);
  } finally {
    await browser.close();
  }
}

// Ejecutar la prueba
testQuickActionsDesign().catch(console.error);
