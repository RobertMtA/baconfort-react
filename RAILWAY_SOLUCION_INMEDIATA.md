# 🚀 RAILWAY DEPLOY - OPCIÓN LIMPIA

## 🆕 CREAR PROYECTO NUEVO EN RAILWAY

### Paso 1: Borrar el proyecto actual
1. Ve a tu proyecto fallido en Railway
2. Settings → Danger Zone → Delete Project

### Paso 2: Crear proyecto nuevo
1. Railway Dashboard → "New Project"
2. **"Deploy from GitHub repo"**
3. Selecciona `baconfort3`
4. **IMPORTANTE**: Cuando aparezcan las carpetas, selecciona **SOLO** `baconfort-backend`

### Paso 3: Variables de Entorno
Inmediatamente después del deploy, añade:

```env
NODE_ENV=production
JWT_SECRET=super-secret-jwt-key-railway-2024
PORT=5000
FRONTEND_URL=https://baconfort.netlify.app
```

### Paso 4: Configuración Manual
Si Railway no detecta automáticamente:

**Settings → Build:**
- Root Directory: `baconfort-backend`
- Build Command: `npm install`
- Start Command: `node server.js`

**Settings → Deploy:**
- Auto Deploy: ✅ Enabled
- Branch: main

## 🔧 ARCHIVOS QUE YA ESTÁN LISTOS:

✅ `package.json` - Scripts correctos
✅ `railway.json` - Configuración Railway
✅ `Procfile` - Comando alternativo
✅ `server.js` - Puerto dinámico

## 🎯 DESPUÉS DEL DEPLOY EXITOSO:

1. **Copia la URL pública** (ej: `https://baconfort-backend-production.railway.app`)
2. **Prueba**: `https://tu-url/api/health`
3. **Actualiza el frontend** con la nueva URL

## ⚠️ SI SIGUE FALLANDO:

Usar **VERCEL** como alternativa (ya tenemos `vercel.json` listo)
