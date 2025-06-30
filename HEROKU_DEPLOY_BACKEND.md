# 🚀 Deploy Backend en Heroku - SOLUCIÓN INMEDIATA

## 📋 **¿Por qué necesitas desplegar el backend?**

MongoDB Atlas = Solo la base de datos (almacena datos)
Backend = El código que procesa requests y se conecta a MongoDB
Frontend = React que necesita conectarse al backend

## ⚡ **Deploy en Heroku (5 minutos)**

### 1. **Instalar Heroku CLI**
```bash
# Descargar desde: https://devcenter.heroku.com/articles/heroku-cli
# O con npm:
npm install -g heroku
```

### 2. **Login y crear app**
```bash
cd baconfort-backend
heroku login
heroku create baconfort-backend-2025
```

### 3. **Configurar variables de entorno**
```bash
# MongoDB Atlas connection string
heroku config:set MONGODB_URI="mongodb+srv://usuario:password@cluster.mongodb.net/baconfort"

# JWT Secret
heroku config:set JWT_SECRET="mi-super-secret-2025"

# Frontend URL
heroku config:set FRONTEND_URL="https://baconfort.netlify.app"

# Node environment
heroku config:set NODE_ENV="production"
```

### 4. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### 5. **Obtener URL del backend**
```bash
heroku open
# O manualmente: https://baconfort-backend-2025.herokuapp.com
```

### 6. **Configurar frontend en Netlify**
- Ve a: https://app.netlify.com/sites/baconfort/settings/env
- Agrega: `VITE_API_URL = https://baconfort-backend-2025.herokuapp.com/api`
- Redeploy

## ✅ **Verificar que funciona**
```bash
# Test backend
curl https://baconfort-backend-2025.herokuapp.com/api/health

# Test login
curl -X POST https://baconfort-backend-2025.herokuapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baconfort.com","password":"admin123"}'
```

## 🎯 **Resultado Final**
- Frontend: https://baconfort.netlify.app ✅
- Backend: https://baconfort-backend-2025.herokuapp.com ✅
- Database: MongoDB Atlas ✅

---

**¿Quieres que te ayude con el deploy paso a paso?**
