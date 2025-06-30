# 🚨 CONFIGURACIÓN URGENTE - Conectar Frontend a Backend

## 🎯 **PROBLEMA ACTUAL:**
Tu frontend en Netlify está intentando conectarse a `localhost:5000` en lugar del backend en Render.

## ✅ **SOLUCIÓN PASO A PASO:**

### **PASO 1: Obtener URL del Backend en Render**

1. **Ve a tu Dashboard de Render:** https://dashboard.render.com
2. **Busca tu servicio de backend** (debería llamarse algo como `baconfort-backend`)
3. **Copia la URL completa** que aparece en el dashboard

**La URL se verá así:**
```
https://baconfort-backend-XXXXXX.onrender.com
```

### **PASO 2: Configurar Variable en Netlify**

1. **Ve a tu Dashboard de Netlify:** https://app.netlify.com
2. **Selecciona tu sitio** `baconfort` 
3. **Ve a:** Site settings → Environment variables
4. **Agregar nueva variable:**
   ```
   Variable name: VITE_API_URL
   Value: https://TU-BACKEND-URL.onrender.com/api
   ```
   
   ⚠️ **IMPORTANTE:** 
   - Reemplaza `TU-BACKEND-URL` con tu URL real de Render
   - DEBE incluir `/api` al final

**Ejemplo:**
```
VITE_API_URL=https://baconfort-backend-abc123.onrender.com/api
```

### **PASO 3: Redeploy del Frontend**

1. **En Netlify Dashboard → Deploys**
2. **Click en "Trigger deploy"**
3. **Selecciona "Deploy site"**
4. **Espera 2-3 minutos** hasta que termine

## 🧪 **VERIFICACIÓN:**

### **1. Test del Backend (opcional):**
Ejecuta en terminal (reemplaza con tu URL real):
```bash
curl https://TU-BACKEND-URL.onrender.com/api/health
```

**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "BACONFORT API is running"
}
```

### **2. Test del Frontend:**
1. **Ve a:** https://baconfort.netlify.app
2. **Intenta login con:**
   - Email: `admin@baconfort.com`
   - Password: `admin123`

## 📋 **CHECKLIST DE VERIFICACIÓN:**

- [ ] ✅ Obtuve la URL del backend en Render
- [ ] ✅ Configuré `VITE_API_URL` en Netlify 
- [ ] ✅ Incluí `/api` al final de la URL
- [ ] ✅ Hice redeploy del frontend
- [ ] ✅ El login ya funciona

## 🔍 **SI AÚN NO FUNCIONA:**

1. **Verificar en el navegador:**
   - Abre Developer Tools (F12)
   - Ve a Network tab
   - Intenta login
   - Verifica que las requests vayan a tu URL de Render, no a localhost

2. **Verificar variable:**
   - En Netlify → Site settings → Environment variables
   - Confirma que `VITE_API_URL` esté configurada correctamente

## 🎉 **RESULTADO ESPERADO:**

Después de completar estos pasos:
- ✅ No más errores de "Failed to fetch"
- ✅ Login funcional con admin@baconfort.com
- ✅ Admin panel accesible
- ✅ Conexión backend ↔ frontend funcionando

## ⚡ **COMANDOS RÁPIDOS PARA VERIFICAR:**

```bash
# Test health del backend (reemplaza URL)
curl https://TU-BACKEND-URL.onrender.com/api/health

# Test login (reemplaza URL)
curl -X POST https://TU-BACKEND-URL.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@baconfort.com", "password": "admin123"}'
```

---

**💡 CONSEJO:** Guarda la URL de tu backend, la necesitarás en el futuro para cualquier actualización.
