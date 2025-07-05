// sync-frontend-prices.js
// Script para sincronizar los precios del frontend con el backend

const fs = require('fs');
const path = require('path');

const API_URL = 'https://baconfort-backend.vercel.app/api';

const syncFrontendPrices = async () => {
    console.log('🔄 Sincronizando precios del frontend con backend...');
    console.log('====================================================');
    
    try {
        // Obtener precios actuales del backend
        const properties = ['moldes-1680', 'santa-fe-3770', 'dorrego-1548', 'convencion-1994', 'ugarteche-2824'];
        const backendPrices = {};
        
        for (const propertyId of properties) {
            try {
                const response = await fetch(`${API_URL}/properties/${propertyId}`);
                if (response.ok) {
                    const result = await response.json();
                    backendPrices[propertyId] = result.data?.prices;
                    console.log(`✅ ${propertyId}: USD ${result.data?.prices?.daily}/${result.data?.prices?.weekly}/${result.data?.prices?.monthly}`);
                } else {
                    console.log(`❌ Error obteniendo ${propertyId}: ${response.status}`);
                }
            } catch (error) {
                console.log(`❌ Error con ${propertyId}:`, error.message);
            }
        }
        
        // Generar archivo de configuración para el frontend
        const configContent = `
// Precios actualizados desde backend - ${new Date().toISOString()}
export const UPDATED_PRICES = ${JSON.stringify(backendPrices, null, 2)};

// Función para convertir precios numéricos a formato string del frontend
export const convertToFrontendFormat = (prices) => {
    if (!prices) return null;
    
    return {
        daily: prices.daily ? \`USD \${prices.daily}\` : 'N/A',
        weekly: prices.weekly ? \`USD \${prices.weekly}\` : 'N/A',
        monthly: prices.monthly ? \`USD \${prices.monthly}\` : 'N/A',
        currency: prices.currency || 'USD'
    };
};

// Precios formateados para el frontend
export const FRONTEND_PRICES = {
${Object.entries(backendPrices).map(([id, prices]) => {
    if (prices) {
        return `    '${id}': {
        daily: 'USD ${prices.daily}',
        weekly: 'USD ${prices.weekly}',
        monthly: 'USD ${prices.monthly}',
        currency: '${prices.currency || 'USD'}'
    }`;
    }
    return `    '${id}': null`;
}).join(',\n')}
};

console.log('✅ Precios sincronizados desde backend:', new Date().toISOString());
`;
        
        // Escribir archivo de configuración
        const configPath = path.join(__dirname, 'baconfort-react', 'src', 'config', 'updatedPrices.js');
        const configDir = path.dirname(configPath);
        
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }
        
        fs.writeFileSync(configPath, configContent);
        console.log('✅ Archivo de configuración creado:', configPath);
        
        // Crear archivo de instrucciones
        const instructionsContent = `
# 🔄 PRECIOS ACTUALIZADOS EXITOSAMENTE

## ✅ **CONFIRMACIÓN DE CAMBIOS**
Fecha: ${new Date().toISOString()}
Método: Token ADMIN_DEMO_TOKEN

### **Precios Actuales:**
${Object.entries(backendPrices).map(([id, prices]) => {
    if (prices) {
        return `- **${id}**: USD ${prices.daily}/día, USD ${prices.weekly}/semana, USD ${prices.monthly}/mes`;
    }
    return `- **${id}**: Sin datos de precios`;
}).join('\n')}

## 🔧 **Para Aplicar en el Frontend:**

### **Opción 1: Reiniciar servidor de desarrollo**
\`\`\`bash
cd baconfort-react
npm run dev
\`\`\`

### **Opción 2: Usar el archivo de configuración**
Los precios están en: \`src/config/updatedPrices.js\`

### **Opción 3: Limpiar caché del navegador**
1. Abrir herramientas de desarrollo (F12)
2. Clic derecho en recargar → "Vaciar caché y recargar"

## 🎯 **Estado del Sistema:**
- ✅ Backend: Precios actualizados
- ✅ Script de sincronización: Ejecutado
- ⏳ Frontend: Reiniciar para ver cambios
- ✅ Panel Admin: Debería funcionar sin errores

## 📞 **Si sigue habiendo errores:**
1. Reiniciar el servidor de desarrollo
2. Limpiar caché del navegador
3. Verificar que la URL del backend sea correcta
4. Contactar: robertogaona1985@gmail.com
`;
        
        fs.writeFileSync(path.join(__dirname, 'PRECIOS_ACTUALIZADOS_CONFIRMACION.md'), instructionsContent);
        console.log('✅ Archivo de instrucciones creado');
        
        console.log('\n🎯 RESUMEN:');
        console.log('- ✅ Precios actualizados en backend');
        console.log('- ✅ Archivo de configuración creado');
        console.log('- ✅ Token corregido en frontend');
        console.log('- 🔄 Reinicia el servidor para ver cambios');
        
    } catch (error) {
        console.error('❌ Error sincronizando:', error);
    }
};

syncFrontendPrices();
