# 🌐 VERCEL DEPLOY - CONFIGURACIÓN FINAL

## ✅ DEPLOY EN PROCESO

Cuando termine el deploy inicial de Vercel, necesitarás configurar estas variables de entorno:

## 🔧 Variables de Entorno para Vercel

### Método 1: Por comando (después del deploy)
```bash
vercel env add NODE_ENV
# Valor: production

vercel env add JWT_SECRET  
# Valor: super-secret-jwt-key-vercel-2024

vercel env add FRONTEND_URL
# Valor: https://baconfort.netlify.app
```

### Método 2: Por Dashboard Web
1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `baconfort-backend`
3. Ve a **Settings** → **Environment Variables**
4. Agrega una por una:

```
NODE_ENV = production
JWT_SECRET = super-secret-jwt-key-vercel-2024  
FRONTEND_URL = https://baconfort.netlify.app
```

## 🚀 Después de configurar variables:

1. **Redeploy** el proyecto (Vercel lo hace automáticamente)
2. **Obtén la URL** (algo como: `https://baconfort-backend.vercel.app`)
3. **Prueba** los endpoints:
   - `https://tu-url.vercel.app/api/health`
   - `https://tu-url.vercel.app/api/test`

## 🔄 Actualizar Frontend

Una vez que tengas la URL de Vercel:
1. Ve a Netlify Dashboard
2. Site Settings → Environment Variables  
3. Agrega/actualiza:
   ```
   REACT_APP_API_URL = https://tu-url.vercel.app
   ```

## 📋 Credenciales de prueba:
```json
{
  "email": "admin@baconfort.com", 
  "password": "admin123"
}
```

## ✅ Ventajas de Vercel:
- Deploy automático desde GitHub
- Variables de entorno fáciles
- URLs bonitas
- Logs claros
- Escalabilidad automática
