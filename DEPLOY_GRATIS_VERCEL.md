# 🚀 Deploy GRATIS en Vercel - Alternativa 100% Gratuita

## 🎯 **Vercel - 100% Gratis para APIs**

### **Paso 1: Preparar para Vercel**
Necesitamos crear un archivo `vercel.json` en la carpeta backend:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### **Paso 2: Deploy en Vercel**
1. Ve a: https://vercel.com
2. **Sign up with GitHub**
3. **Import Project** → Selecciona `baconfort3`
4. **Root Directory**: `baconfort-backend`
5. **Deploy**

### **Paso 3: Configurar Variables**
En Vercel Dashboard → **Settings** → **Environment Variables**:
```env
MONGODB_URI = mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/baconfort
JWT_SECRET = mi-super-secret-2025
FRONTEND_URL = https://baconfort.netlify.app
NODE_ENV = production
```

## 🌐 **URL del Backend**
Vercel te dará:
```
https://baconfort-backend.vercel.app
```

## 📝 **Configurar Frontend**
En Netlify:
```env
VITE_API_URL = https://baconfort-backend.vercel.app/api
```

---

**Vercel es 100% gratis pero requiere un archivo extra de configuración.**
