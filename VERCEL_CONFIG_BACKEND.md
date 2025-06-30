# 🌐 VERCEL - CONFIGURACIÓN BACKEND

## ⚙️ CONFIGURACIÓN ACTUAL NECESARIA:

### 📁 Root Directory
**MUY IMPORTANTE**: Cambiar a `baconfort-backend`

### 🔧 Build Settings
- **Framework Preset**: Other
- **Build Command**: `npm install`
- **Output Directory**: (vacío)
- **Install Command**: `npm install`

### 🌍 Variables de Entorno
Agregar estas variables ANTES del deploy:

```
NODE_ENV = production
JWT_SECRET = super-secret-jwt-key-vercel-2024
FRONTEND_URL = https://baconfort.netlify.app
```

## 🚀 DESPUÉS DEL DEPLOY:

1. **URL obtenida**: https://baconfort-react-xxx.vercel.app
2. **Endpoints a probar**:
   - https://tu-url/api/health
   - https://tu-url/api/test
   - https://tu-url/api/auth/login

## 🔄 ACTUALIZAR NETLIFY:

Una vez que tengas la URL del backend en Vercel:
1. Ve a Netlify Dashboard
2. Tu sitio → Site Settings → Environment Variables
3. Agrega/actualiza:
   ```
   REACT_APP_API_URL = https://tu-backend-url.vercel.app
   ```

## 📋 Credenciales de prueba:
```json
{
  "email": "admin@baconfort.com",
  "password": "admin123"
}
```

## 🎯 SIGUIENTE PASO:
**Configura el Root Directory como `baconfort-backend` y hace deploy**
