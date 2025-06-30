# 🚀 CONFIGURACIÓN FINAL NETLIFY - VARIABLES DE ENTORNO

## ✅ PROBLEMA RESUELTO
- ❌ **Problema:** Frontend hacía peticiones a `localhost:5000` en producción
- ✅ **Solución:** Configurar `VITE_API_URL` en Netlify y corregir todas las URLs hardcodeadas

## 🔧 PASOS PARA CONFIGURAR NETLIFY

### 1. Acceder al Panel de Netlify
1. Ir a [https://app.netlify.com](https://app.netlify.com)
2. Iniciar sesión con la cuenta
3. Encontrar el sitio **baconfort** (https://baconfort.netlify.app)

### 2. Configurar Variable de Entorno
1. En el sitio, ir a **Site settings**
2. En el menú lateral, hacer clic en **Environment variables**
3. Hacer clic en **Add variable**
4. Configurar:
   ```
   Key: VITE_API_URL
   Value: https://baconfort-react-2.onrender.com
   ```
5. Hacer clic en **Save**

### 3. Redeploy del Sitio
1. Ir a **Deploys** en el panel principal
2. Hacer clic en **Trigger deploy** → **Deploy site**
3. Esperar a que termine el build (2-3 minutos)

## 📱 VERIFICACIÓN DEL FUNCIONAMIENTO

### Backend (Render)
✅ **URL:** https://baconfort-react-2.onrender.com
✅ **Health Check:** https://baconfort-react-2.onrender.com/api/health
✅ **Status:** Funcionando correctamente

### Frontend (Netlify)
🔄 **URL:** https://baconfort.netlify.app
🔄 **Status:** Actualizándose con nueva configuración

## 🛠️ CAMBIOS TÉCNICOS REALIZADOS

### Variables de Entorno
```bash
# Antes (Create React App)
REACT_APP_API_URL=https://baconfort-react-2.onrender.com

# Después (Vite)
VITE_API_URL=https://baconfort-react-2.onrender.com
```

### Archivos Modificados
1. **baconfort-react/.env** - Cambio de variable de entorno
2. **api.js** - Configuración centralizada de API_URL
3. **TestGallery.jsx** - URL dinámica
4. **ReservationForm.jsx** - URL dinámica
5. **UserReservations.jsx** - URLs dinámicas (3 endpoints)
6. **MyReservations.jsx** - URLs dinámicas (2 endpoints)
7. **AdminReservations.jsx** - URLs dinámicas (2 endpoints)

### Patrón de Importación
```javascript
// En cada componente que hace API calls
import { API_URL } from '../../services/api';

// Usar en fetch
const response = await fetch(`${API_URL}/api/endpoint`);
```

## 🧪 TESTS DE FUNCIONAMIENTO

### 1. Test de Conexión
```bash
curl -s https://baconfort-react-2.onrender.com/api/health
```
**Resultado esperado:** `{"status":"OK","message":"BACONFORT API is running"}`

### 2. Test de Login
1. Ir a https://baconfort.netlify.app
2. Intentar login con:
   - Email: `test@example.com`
   - Password: `password123`
3. **Debe funcionar sin errores de "Failed to fetch"**

### 3. Test de Propiedades
1. Navegar a cualquier propiedad
2. Los datos deben cargar correctamente
3. No debe haber errores de `localhost:5000` en la consola

## 📊 CHECKLIST FINAL

- [x] Backend deployado en Render (funcionando)
- [x] Variables de entorno corregidas (VITE_API_URL)
- [x] URLs hardcodeadas eliminadas
- [x] Build del frontend exitoso
- [x] Commit y push a GitHub
- [ ] Variable configurada en Netlify
- [ ] Redeploy de Netlify
- [ ] Test de login funcionando
- [ ] Test de APIs funcionando

## 🎯 PRÓXIMOS PASOS

1. **Configurar VITE_API_URL en Netlify** (CRÍTICO)
2. **Hacer redeploy de Netlify**
3. **Probar login desde frontend en producción**
4. **Verificar que todas las APIs funcionen**

## 🚨 TROUBLESHOOTING

### Si el login sigue fallando:
1. Verificar que la variable `VITE_API_URL` esté configurada en Netlify
2. Verificar que el redeploy se haya completado
3. Abrir DevTools y verificar que las peticiones vayan a Render, no localhost
4. Verificar que el backend esté despierto (hacer una petición a `/api/health`)

### Comandos de emergencia:
```bash
# Despertar el backend
curl https://baconfort-react-2.onrender.com/api/health

# Verificar variables en local
npm run dev
# En consola del navegador: console.log(import.meta.env.VITE_API_URL)
```

---
**Última actualización:** 30 de junio de 2025
**Estado:** ✅ Configuración técnica completa, pendiente configuración en Netlify
