# 🚀 Deploy Backend en Railway - Alternativa a Heroku

## 🎯 **Railway.app (Más fácil que Heroku)**

### 1. **Ir a Railway**
- Ve a: https://railway.app
- Sign up con GitHub

### 2. **Deploy desde GitHub**
1. **New Project** → **Deploy from GitHub repo**
2. Seleccionar tu repo: `baconfort3`
3. **Deploy** → Seleccionar folder: `baconfort-backend`

### 3. **Configurar Variables de Entorno**
En Railway Dashboard → Variables:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/baconfort
JWT_SECRET=mi-super-secret-2025
FRONTEND_URL=https://baconfort.netlify.app
NODE_ENV=production
PORT=5000
```

### 4. **Obtener URL**
Railway te dará una URL como:
`https://baconfort-backend-production.up.railway.app`

### 5. **Configurar Frontend**
En Netlify → Environment Variables:
`VITE_API_URL = https://tu-railway-url.up.railway.app/api`

## ✅ **Ventajas de Railway**
- ✅ Setup más fácil que Heroku
- ✅ Deploy automático desde GitHub
- ✅ Free tier generoso
- ✅ No necesita CLI

---

**Railway es más simple si prefieres interfaz web vs comandos.**
