# 🚀 BACONFORT - Deployment Simplificado

## 🎯 Resumen Rápido

Tu proyecto BACONFORT está listo para deployment con esta arquitectura:

```
Frontend (Netlify) → Backend (Heroku/Railway) → MongoDB Atlas
```

## ⚡ Deploy en 5 Pasos

### 1. Backend (Heroku/Railway)
```bash
# En la carpeta baconfort-backend
git add .
git commit -m "Backend ready for deployment"
git push origin main
```

**Variables de entorno necesarias:**
- `MONGODB_URI` = tu connection string de MongoDB Atlas
- `JWT_SECRET` = cualquier string secreto
- `FRONTEND_URL` = https://baconfort.netlify.app

### 2. Frontend (Netlify)
**Variable de entorno en Netlify:**
- `VITE_API_URL` = https://tu-backend.herokuapp.com/api

### 3. Verificar Conexión
```bash
curl https://tu-backend.herokuapp.com/api/health
```

### 4. Test Login
```bash
curl -X POST https://tu-backend.herokuapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baconfort.com","password":"admin123"}'
```

### 5. Acceder a la App
- Frontend: https://baconfort.netlify.app
- Backend: https://tu-backend.herokuapp.com
- Login: admin@baconfort.com / admin123

## 🔧 Plataformas Recomendadas

### Backend
1. **Heroku** (Free tier disponible)
2. **Railway** (Fácil setup)
3. **DigitalOcean App Platform**

### Frontend
1. **Netlify** (Ideal para React)
2. **Vercel** (Alternativa excelente)

### Base de Datos
- **MongoDB Atlas** ✅ (Ya configurado)

## 🐛 Solución Rápida de Problemas

### "Failed to fetch" en frontend
- ✅ Configurar `VITE_API_URL` en Netlify
- ✅ Redeploy frontend después de configurar variable

### CORS errors
- ✅ Backend ya incluye configuración CORS para Netlify

### 500 Internal Server Error
- ✅ Verificar variables de entorno en backend
- ✅ Revisar logs del hosting provider

## 📁 Estructura del Proyecto

```
baconfort3/
├── baconfort-backend/     # Deploy en Heroku/Railway
│   ├── server.js         # ✅ Listo para production
│   ├── package.json      # ✅ Scripts configurados
│   └── .env.example      # Variables necesarias
├── baconfort-react/      # Deploy en Netlify
│   ├── src/
│   ├── package.json
│   └── .env.example
└── DEPLOY_GENERIC.md     # Esta guía
```

## 🎉 Demo Funcionando

Una vez desplegado, tendrás:
- **App completa** en Netlify
- **API funcionando** en Heroku/Railway
- **Login demo** con admin@baconfort.com
- **Conexión** a MongoDB Atlas

---

**¿Necesitas ayuda?** Revisa `DEPLOY_GENERIC.md` para guías detalladas por plataforma.
