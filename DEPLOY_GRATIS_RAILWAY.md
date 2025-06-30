# 🚀 Deploy GRATIS en Railway - 3 Pasos

## 🎯 **Railway.app - La opción más fácil y gratis**

### **Paso 1: Crear cuenta en Railway**
1. Ve a: https://railway.app
2. **Sign up with GitHub** (usa tu cuenta de GitHub)
3. ✅ **$5 gratis al mes** (más que suficiente)

### **Paso 2: Deploy automático**
1. **New Project** → **Deploy from GitHub repo**
2. Busca y selecciona: `baconfort3` (tu repo)
3. **Select a service** → Elegir carpeta: `baconfort-backend`
4. ✅ **Deploy automático** comienza

### **Paso 3: Configurar variables**
En el dashboard de Railway → **Variables**:
```env
MONGODB_URI = mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/baconfort
JWT_SECRET = mi-super-secret-2025
FRONTEND_URL = https://baconfort.netlify.app
NODE_ENV = production
```

## 🌐 **Obtener URL del Backend**
Railway te dará una URL como:
```
https://baconfort-backend-production-xxxx.up.railway.app
```

## 📝 **Configurar Frontend en Netlify**
1. Ve a: https://app.netlify.com/sites/baconfort/settings/env
2. **Add variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://tu-railway-url.up.railway.app/api`
3. **Save** → **Redeploy**

## ✅ **Verificar que funciona**
```bash
# Test backend en Railway
curl https://tu-railway-url.up.railway.app/api/health

# Test login
curl -X POST https://tu-railway-url.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baconfort.com","password":"admin123"}'
```

## 🎉 **Resultado Final**
- ✅ **Frontend**: https://baconfort.netlify.app
- ✅ **Backend**: https://tu-railway-url.up.railway.app  
- ✅ **Database**: MongoDB Atlas
- ✅ **Login funcionando**: admin@baconfort.com / admin123

---

**¿Tienes cuenta de GitHub? ¡Empezamos con Railway!**
