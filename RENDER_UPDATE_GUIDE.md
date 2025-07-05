# 🚀 ACTUALIZACIÓN INMEDIATA DEL BACKEND

## ✅ PROBLEMA IDENTIFICADO
- Frontend conectado correctamente a Render ✅
- Backend actual muy básico, falta endpoints ❌
- Login fallando por configuración incompleta ❌

## 🔧 SOLUCIÓN INMEDIATA

### OPCIÓN 1: Reemplazar archivo en Render (MÁS RÁPIDO)

1. **Ir a Render Dashboard:**
   - https://dashboard.render.com
   - Buscar servicio **baconfort-react-2**

2. **Ir a Connect Repository:**
   - En el servicio, ir a **Settings**
   - **Build & Deploy** → **Connected Repository**

3. **Reemplazar server.js:**
   - El archivo `server-simple.js` que acabamos de crear tiene todas las rutas necesarias
   - Copiar contenido de `server-simple.js` y reemplazar `server.js` en el repositorio

### OPCIÓN 2: Manual Deploy (ALTERNATIVA)

Si tienes acceso al repositorio del backend en Render:
1. Reemplazar el contenido de `server.js` con el de `server-simple.js`
2. Hacer commit y push
3. Render detectará automáticamente y hará redeploy

## 📋 CONTENIDO CORRECTO DEL server.js

El archivo `server-simple.js` incluye:

### ✅ Login funcional:
```javascript
// Credenciales: admin@baconfort.com / admin123
app.post('/api/auth/login', ...)
```

### ✅ Propiedades completas:
```javascript
// Datos para: moldes1680, santafe3770, dorrego1548, convencion1994, ugarteche2824
app.get('/api/properties/:propertyId', ...)
```

### ✅ Endpoints adicionales:
- `/api/auth/me` - Información del usuario
- `/api/reservations` - GET/POST reservas
- `/api/gallery/:propertyId` - Galerías

## 🧪 VERIFICACIÓN POST-DEPLOY

Una vez actualizado el backend en Render (5-10 minutos):

### 1. Test Backend:
```bash
curl https://baconfort-react-2.onrender.com/api/properties/moldes1680
```
**Resultado esperado:** Datos de la propiedad, no error 404

### 2. Test Login:
- Ir a: https://baconfort.netlify.app
- Email: `admin@baconfort.com`
- Password: `admin123`
- **Resultado esperado:** Login exitoso

### 3. Test Completo:
- Navegación a propiedades sin errores 404
- Datos cargando correctamente
- No más "Endpoint not found"

## ⏱️ TIEMPO ESTIMADO
- **Actualización en Render:** 5-10 minutos
- **Test completo funcionando:** 10-15 minutos

---
**🎯 ARCHIVO A USAR:** `server-simple.js` → Copiar contenido a `server.js` en Render
