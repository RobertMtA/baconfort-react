# 🚨 SOLUCIÓN INMEDIATA - Frontend No Conecta a Backend

## 🎯 **PROBLEMA:**
El frontend en `https://baconfort.netlify.app/` está intentando conectarse a `localhost:5000` en lugar del backend en Render.

## ✅ **SOLUCIÓN - 3 PASOS:**

### **PASO 1: Obtener URL del Backend**
1. Ve a **[Render Dashboard](https://dashboard.render.com)**
2. Busca tu servicio de backend 
3. Copia la URL (ejemplo: `https://baconfort-backend-abc123.onrender.com`)

### **PASO 2: Configurar Variable en Netlify**
1. Ve a **[Netlify Dashboard](https://app.netlify.com)**
2. Selecciona tu sitio `baconfort`
3. **Site settings** → **Environment variables**
4. **Add variable**:
   ```
   Key: VITE_API_URL
   Value: https://TU-BACKEND-URL.onrender.com/api
   ```
   ⚠️ **IMPORTANTE:** Incluye `/api` al final

### **PASO 3: Redeploy Frontend**
1. En Netlify Dashboard → **Deploys**
2. **Trigger deploy** → **Deploy site**
3. Esperar 2-3 minutos

## 🧪 **VERIFICACIÓN:**

### **Test del Backend:**
```bash
# Reemplaza TU-BACKEND-URL con tu URL real
curl https://TU-BACKEND-URL.onrender.com/api/health
```
**Respuesta esperada:**
```json
{"status":"OK","message":"BACONFORT API is running",...}
```

### **Test de Login:**
```bash
curl -X POST https://TU-BACKEND-URL.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@baconfort.com", "password": "admin123"}'
```

## 📋 **CHECKLIST:**

- [ ] ✅ Backend deployado en Render
- [ ] ✅ URL del backend obtenida  
- [ ] ✅ Variable `VITE_API_URL` configurada en Netlify
- [ ] ✅ Frontend redeployado
- [ ] ✅ Login funcionando

## 🔍 **DEBUGGING:**

Si aún no funciona:

1. **Verificar variable:** En Network tab del navegador, revisar que las requests vayan a la URL correcta
2. **Verificar CORS:** El backend incluye `https://baconfort.netlify.app` en CORS ✅
3. **Verificar backend:** Health endpoint respondiendo ✅

## 🎉 **RESULTADO ESPERADO:**

Después de estos pasos:
- ✅ Login con `admin@baconfort.com` / `admin123` funcionará
- ✅ No más errores `ERR_CONNECTION_REFUSED`
- ✅ Admin panel accesible

## ⚡ **URLs EJEMPLO:**

```bash
# Backend
https://baconfort-backend-abc123.onrender.com

# Variable Netlify
VITE_API_URL=https://baconfort-backend-abc123.onrender.com/api

# Frontend
https://baconfort.netlify.app
```

¡La solución es solo configurar correctamente la variable de entorno! 🚀
