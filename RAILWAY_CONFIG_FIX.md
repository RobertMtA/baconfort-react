# 🔧 CONFIGURACIÓN RAILWAY - Variables de Entorno

## 📋 **Variables que necesitas agregar en Railway Dashboard**

Ve a tu proyecto Railway → **Variables** y agrega estas:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=mi-super-secret-baconfort-2025
FRONTEND_URL=https://baconfort.netlify.app
```

### 📝 **Opcional: MongoDB URI (si tienes MongoDB Atlas)**
```env
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/baconfort
```

## ⚙️ **Settings de Railway**

### **Deploy Settings:**
- **Start Command**: `npm start`
- **Build Command**: `npm install` (o déjalo vacío)
- **Root Directory**: `/` (o `baconfort-backend` si seleccionaste el repo completo)

## 🔄 **Redeploy**

Después de configurar las variables:
1. **Deploy** → **Redeploy**
2. O haz un push al repo para trigger automático

## ✅ **Verificar Deploy**

Una vez que termine el deploy:
1. Railway te dará una URL como: `https://xxx.up.railway.app`
2. Testea: `https://tu-url.up.railway.app/api/health`

---

**¿Ya agregaste las variables? ¡Haz redeploy!**
