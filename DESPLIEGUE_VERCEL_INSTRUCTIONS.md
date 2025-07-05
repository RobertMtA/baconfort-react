# INSTRUCCIONES DE DESPLIEGUE EN VERCEL

## 🚀 DESPLIEGUE AUTOMÁTICO

### Paso 1: Frontend (React)
El frontend se despliega automáticamente desde GitHub cuando hay cambios en la rama `main`.

**URL de producción**: https://baconfort-react.vercel.app/

### Paso 2: Configurar acceso admin
1. Ir a https://baconfort-react.vercel.app/admin
2. Abrir consola del navegador (F12)
3. Ejecutar:
```javascript
// Configurar acceso
localStorage.setItem('baconfort_admin_access_code', 'BACONFORT_ADMIN_2025_7D3F9K2L');
localStorage.setItem('baconfort_admin_session_token', 'BACONFORT_ADMIN_SESSION_' + Date.now());
localStorage.setItem('baconfort_admin_last_access', Date.now().toString());

// Verificar configuración
console.log('✅ Acceso configurado. Recarga la página.');
```
4. Recargar la página
5. Usar credenciales:
   - **Email**: admin@baconfort.com
   - **Password**: roccosa226

## 🔧 VERIFICACIÓN POST-DESPLIEGUE

### 1. Verificar endpoints de backend
```bash
curl https://baconfort-backend.vercel.app/api/health
```

### 2. Verificar precios actualizados
```bash
curl https://baconfort-backend.vercel.app/api/properties/moldes-1680
```

### 3. Verificar frontend
- Acceder a https://baconfort-react.vercel.app/
- Verificar que los precios se muestren correctamente
- Probar navegación entre páginas

### 4. Verificar acceso admin
- Ir a https://baconfort-react.vercel.app/admin
- Configurar acceso según instrucciones arriba
- Verificar que el panel admin funcione

## 🛠️ SOLUCIÓN DE PROBLEMAS

### Si el acceso admin no funciona:
1. Limpiar localStorage:
```javascript
localStorage.clear();
```
2. Reconfigurar acceso según Paso 2
3. Verificar que el dominio sea correcto

### Si los precios no se actualizan:
1. Verificar backend: https://baconfort-backend.vercel.app/api/properties
2. Ejecutar desde consola:
```javascript
fetch('/api/properties/moldes-1680').then(r => r.json()).then(console.log);
```

### Si hay errores 404:
1. Verificar que los archivos estén en el build (`dist/`)
2. Revisar configuración de rutas en Vercel
3. Verificar que todas las rutas estén definidas en `App.jsx`

## 📱 URLS IMPORTANTES

- **Frontend**: https://baconfort-react.vercel.app/
- **Backend**: https://baconfort-backend.vercel.app/
- **Admin Panel**: https://baconfort-react.vercel.app/admin
- **API Health**: https://baconfort-backend.vercel.app/api/health

## 🔐 CREDENCIALES

- **Admin Email**: admin@baconfort.com
- **Admin Password**: roccosa226
- **Admin Token**: ADMIN_DEMO_TOKEN (para backend)
- **Access Code**: BACONFORT_ADMIN_2025_7D3F9K2L

## ✅ ESTADO ACTUAL

- ✅ Backend desplegado y funcional
- ✅ Frontend buildado correctamente
- ✅ Precios actualizados (75/80/70/90/95 USD diarios)
- ✅ Sistema de seguridad implementado
- ✅ Protección de rutas configurada
- ⏳ Desplegando en Vercel...

---

**Nota**: El despliegue en Vercel es automático desde GitHub. Los cambios se reflejan en 1-2 minutos.
