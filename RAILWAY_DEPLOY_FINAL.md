# 🚀 RAILWAY DEPLOY - GUÍA FINAL PASO A PASO

## ✅ Paso 1: Cambios Subidos a GitHub ✅
Los cambios ya están subidos. El repositorio está listo para Railway.

## 🔧 Paso 2: Configurar Railway

### 2.1 Crear Nuevo Proyecto en Railway
1. Ve a [railway.app](https://railway.app)
2. Haz login con GitHub
3. Click en **"New Project"**
4. Selecciona **"Deploy from GitHub repo"**
5. Busca y selecciona tu repositorio `baconfort3`

### 2.2 Configurar el Backend
1. Railway detectará múltiples carpetas
2. **IMPORTANTE**: Selecciona solo la carpeta `baconfort-backend`
3. O en configuración avanzada, establece:
   - **Root Directory**: `baconfort-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2.3 Variables de Entorno
Agrega estas variables en Railway:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=tu-jwt-secret-super-seguro-aqui
MONGODB_URI=tu-mongodb-connection-string
FRONTEND_URL=https://baconfort.netlify.app
```

### 2.4 Configuración de Puerto
- Railway asigna automáticamente un puerto
- Nuestro código ya está configurado para usar `process.env.PORT`
- No necesitas cambiar nada

## 🌐 Paso 3: Obtener URL del Backend

Después del deploy:
1. Ve a tu proyecto en Railway
2. Click en tu servicio
3. Ve a la pestaña **"Settings"**
4. Copia la **"Public URL"** (algo como: `https://tu-app.railway.app`)

## 🔄 Paso 4: Actualizar Frontend

Actualiza la URL del backend en tu frontend de Netlify:
- En tu código React, cambia la API URL a la URL de Railway
- Variables de entorno en Netlify:
  ```
  REACT_APP_API_URL=https://tu-app.railway.app
  ```

## 🧪 Paso 5: Probar Conexión

Prueba estos endpoints:
- `https://tu-app.railway.app/api/health`
- `https://tu-app.railway.app/api/test`
- `https://tu-app.railway.app/api/auth/login`

## 📋 Credenciales de Prueba
```json
{
  "email": "admin@baconfort.com",
  "password": "admin123"
}
```

## 🔧 Archivos Importantes Configurados

### ✅ server.js
- Puerto dinámico configurado
- CORS configurado para Railway
- Endpoints optimizados
- Manejo de errores mejorado

### ✅ package.json
```json
{
  "name": "baconfort-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### ✅ vercel.json (Backup)
Por si necesitas cambiar a Vercel después

## 🚨 Troubleshooting

### Si Railway no detecta el proyecto:
1. Asegúrate de que `package.json` esté en `baconfort-backend/`
2. Verifica que `server.js` esté en la raíz de `baconfort-backend/`

### Si hay errores de build:
1. Revisa los logs en Railway Dashboard
2. Verifica que todas las dependencias estén en `package.json`

### Si no responde:
1. Verifica que el puerto sea `process.env.PORT`
2. Revisa las variables de entorno
3. Checa los logs de Railway

## 🎯 Siguiente Paso
**Ve a Railway y crea el proyecto ahora** ⬆️

Una vez que tengas la URL de Railway, actualiza el frontend en Netlify.
