# 🔧 SOLUCIÓN: Frontend conectando a localhost

## 🔍 **Problema Identificado**

El frontend en `https://baconfort.netlify.app/` está intentando conectarse a `localhost:5000` porque **NO tiene configurada la variable de entorno `VITE_API_URL`**.

### Evidencia en los logs:
```
localhost:5000/api/auth/login:1 Failed to load resource: net::ERR_CONNECTION_REFUSED
POST http://localhost:5000/api/auth/login net::ERR_CONNECTION_REFUSED
```

## ✅ **Solución Paso a Paso**

### 1. **Verificar Backend Desplegado**
Primero necesitas tener el backend funcionando en alguna plataforma:
- Heroku: `https://tu-app.herokuapp.com`
- Railway: `https://tu-app.railway.app`
- DigitalOcean: `https://tu-app.ondigitalocean.app`

### 2. **Configurar Variable en Netlify**

1. Ve a: https://app.netlify.com/sites/baconfort/settings/env
2. Agrega nueva variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://TU-BACKEND-URL.com/api`

### 3. **Redeploy en Netlify**
Después de configurar la variable, haz un redeploy manual.

### 4. **Verificar**
El frontend debería conectarse a tu backend, no a localhost.

## 🚀 **Deploy Rápido del Backend**

Si no tienes el backend desplegado, opciones rápidas:

### Heroku (Recomendado)
```bash
cd baconfort-backend
git add .
git commit -m "Ready for Heroku deploy"

# Crear app en Heroku
heroku create tu-app-name

# Configurar variables
heroku config:set MONGODB_URI="tu-connection-string"
heroku config:set JWT_SECRET="tu-secret"
heroku config:set FRONTEND_URL="https://baconfort.netlify.app"

# Deploy
git push heroku main
```

### Railway (Alternativa)
1. Ve a railway.app
2. Connect GitHub repo
3. Deploy baconfort-backend folder
4. Configurar variables de entorno

## 🔗 **URLs Objetivo**

- **Frontend**: https://baconfort.netlify.app ✅
- **Backend**: https://tu-backend.herokuapp.com (pendiente)
- **Variable**: `VITE_API_URL=https://tu-backend.herokuapp.com/api`

## ⚡ **Test Rápido**

Una vez configurado:
```bash
# Verificar backend
curl https://tu-backend.herokuapp.com/api/health

# Test login
curl -X POST https://tu-backend.herokuapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baconfort.com","password":"admin123"}'
```

---

**¿Tienes el backend desplegado? Si no, ¿qué plataforma prefieres: Heroku o Railway?**
