# 🚀 BACONFORT - Deploy en Railway

## ⚡ Setup Súper Rápido

### 1. Conectar GitHub

1. Ve a [railway.app](https://railway.app)
2. Login con GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecciona `baconfort3` repository
5. Selecciona carpeta `baconfort-backend`

### 2. Configurar Variables de Entorno

En Railway Dashboard → Variables:

```
MONGODB_URI = mongodb+srv://usuario:password@cluster.mongodb.net/baconfort
JWT_SECRET = mi-secreto-super-seguro-123
NODE_ENV = production
FRONTEND_URL = https://baconfort.netlify.app
```

### 3. Deploy Automático

Railway automáticamente:
- ✅ Detecta `package.json`
- ✅ Ejecuta `npm install`
- ✅ Ejecuta `npm start`
- ✅ Asigna dominio público

### 4. Obtener URL

En Railway Dashboard verás:
```
https://baconfort-backend-production-xxxx.up.railway.app
```

### 5. Verificar

```bash
curl https://tu-url-railway.up.railway.app/api/health
```

## 🎯 Ventajas de Railway

- ✅ **Setup en 2 minutos**
- ✅ **Deploy automático** desde GitHub
- ✅ **HTTPS gratuito**
- ✅ **Variables de entorno** fáciles
- ✅ **Logs en tiempo real**

## 🔧 Configuración Detallada

### Variables Requeridas:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/baconfort
JWT_SECRET=cualquier-string-secreto-aqui
NODE_ENV=production
FRONTEND_URL=https://baconfort.netlify.app
```

### Start Command (automático):
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

## 🐛 Troubleshooting

### Deploy fails
- ✅ Verificar que estés en carpeta `baconfort-backend`
- ✅ Verificar `package.json` con script "start"

### App no responde
- ✅ Ver logs en Railway Dashboard
- ✅ Verificar variables de entorno configuradas

### CORS errors
- ✅ Verificar `FRONTEND_URL` apunte a Netlify

## 🔗 URLs Finales

Después del deploy tendrás:
- **Backend**: https://baconfort-backend-production-xxxx.up.railway.app
- **Health**: https://tu-url/api/health
- **API**: https://tu-url/api

## 📱 Configurar Frontend

En Netlify, configurar:
```
VITE_API_URL = https://tu-url-railway.up.railway.app/api
```

## ⚡ Re-deploy

Cada push a GitHub redeploya automáticamente. O usar:
```bash
# En Railway Dashboard → Deploy → Trigger Deploy
```

---

**✅ Railway es ideal si quieres deploy súper rápido y simple desde GitHub.**
