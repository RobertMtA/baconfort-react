# 🚀 BACONFORT Deploy Guide - Versión Universal

## Resumen del Proyecto

BACONFORT es una aplicación web completa para la gestión de departamentos temporarios que incluye:

- **Frontend**: React + Vite 
- **Backend**: Node.js + Express + MongoDB
- **Base de datos**: MongoDB Atlas
- **Características**: Sistema de propiedades, galería, reseñas con moderación, panel de administración

## 📋 Pre-requisitos

### Cuentas necesarias:
- [ ] GitHub (código fuente)
- [ ] MongoDB Atlas (base de datos)
- [ ] Plataforma frontend: Netlify, Vercel, etc.
- [ ] Plataforma backend: Railway, Fly.io, Vercel, etc.

## 🔧 Configuración del Backend

### 1. Preparar el repositorio
```bash
cd baconfort-backend
git add .
git commit -m "Configuración para deploy universal"
git push origin main
```

### 2. Configurar en tu plataforma de hosting

**Opciones recomendadas para backend:**
- **Railway** (fácil setup, buena capa gratuita)
- **Fly.io** (moderno, edge computing)  
- **Vercel** (para Node.js, serverless)
- **DigitalOcean App Platform**
- **AWS/GCP/Azure**

**Configuración típica:**
- **Repository**: tu-usuario/baconfort-backend
- **Branch**: main
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18+ recomendado

### 3. Variables de entorno necesarias
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/baconfort
JWT_SECRET=genera_un_secret_seguro_de_al_menos_32_caracteres
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.com
```

### 4. Verificar el deploy
```bash
# Health check
curl https://tu-backend.com/api/health

# API info
curl https://tu-backend.com/api

# Test login
curl -X POST https://tu-backend.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baconfort.com","password":"admin123"}'
```

## 🌐 Configuración del Frontend

### 1. Preparar el build
```bash
cd baconfort-react
# Crear archivo .env para producción
echo "VITE_API_URL=https://tu-backend.com/api" > .env.production
git add .
git commit -m "Configuración para frontend deploy"
git push origin main
```

### 2. Deploy en plataforma frontend

**Opciones recomendadas:**
- **Netlify** (especializado en SPA)
- **Vercel** (React optimizado)
- **GitHub Pages** (gratis para proyectos públicos)
- **Firebase Hosting**

**Configuración típica:**
- **Repository**: tu-usuario/baconfort-react
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18+

### 3. Variables de entorno en frontend
```bash
VITE_API_URL=https://tu-backend.com/api
```

**Importante**: Actualiza la URL con tu backend real.

## 🔗 Conectar Frontend y Backend

### 1. Actualizar CORS en backend
El backend ya está configurado para:
- `http://localhost:3000` (desarrollo)
- `http://localhost:5173` (Vite dev)
- `https://baconfort.netlify.app` (Netlify)
- Variable `FRONTEND_URL` (tu dominio)

### 2. Configurar variable en plataforma frontend
Asegúrate de que `VITE_API_URL` apunte a tu backend real.

## 🧪 Testing del deploy completo

```bash
# 1. Backend health
curl https://tu-backend.com/api/health

# 2. Frontend carga correctamente
# Visita tu frontend en el navegador

# 3. Test login desde frontend
# Ve a tu frontend → Login → admin@baconfort.com / admin123
```

## 📁 Estructura final

```
baconfort-project/
├── baconfort-backend/     # Deploy en plataforma backend
│   ├── server.js
│   ├── package.json
│   └── DEPLOYMENT_GENERIC.md
└── baconfort-react/       # Deploy en plataforma frontend
    ├── src/
    ├── vite.config.js
    ├── package.json
    └── NETLIFY_DEPLOY.md
```

## 🎯 URLs finales esperadas

- **Frontend**: `https://tu-proyecto.netlify.app` (o tu dominio)
- **Backend**: `https://tu-backend.railway.app` (o tu plataforma)
- **API Health**: `https://tu-backend.railway.app/api/health`

## ✅ Checklist final

- [ ] ✅ Backend deployado y funcionando
- [ ] ✅ Frontend deployado y funcionando  
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ MongoDB Atlas conectado
- [ ] ✅ CORS configurado correctamente
- [ ] ✅ Login funciona desde frontend
- [ ] ✅ API responde correctamente

## 🆘 Troubleshooting común

### "Failed to fetch"
- Verificar que `VITE_API_URL` apunte al backend correcto
- Verificar CORS en backend
- Verificar que backend esté en línea

### Error 500 en backend
- Revisar logs del hosting
- Verificar variables de entorno
- Verificar conexión a MongoDB Atlas

### Build failures
- Verificar versión de Node.js
- Instalar dependencias: `npm install`
- Verificar comandos de build

¡Deploy universal completado! 🚀
