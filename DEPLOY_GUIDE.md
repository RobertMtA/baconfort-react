# 🚀 BACONFORT Deploy Guide

## Resumen del Proyecto

BACONFORT es una aplicación web completa para la gestión de departamentos temporarios que incluye:

- **Frontend**: React + Vite (deploy en Netlify u otra plataforma)
- **Backend**: Node.js + Express + MongoDB (deploy universal)
- **Base de datos**: MongoDB Atlas
- **Características**: Sistema de propiedades, galería, reseñas con moderación, panel de administración

## 📋 Pre-requisitos

### Cuentas necesarias:
- [ ] GitHub (código fuente)
- [ ] MongoDB Atlas (base de datos)
- [ ] Netlify/Vercel (frontend hosting)
- [ ] Railway/Fly.io/Vercel (backend hosting)
- [ ] Cloudinary (gestión de imágenes - opcional)

## 🔧 Configuración del Backend

### 1. Preparar el repositorio
```bash
cd baconfort-backend
git add .
git commit -m "Configuración para deploy en Render"
git push origin main
```

### 2. Configurar en Render.com
1. **Crear Web Service**
   - Repository: `tu-usuario/baconfort-backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node.js 16+

### 3. Variables de entorno en Render
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/baconfort
JWT_SECRET=genera_un_secret_seguro_de_al_menos_32_caracteres
NODE_ENV=production
PORT=10000
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
FRONTEND_URL=https://tu-sitio.netlify.app
CORS_ORIGIN=https://tu-sitio.netlify.app
```

### 4. Verificar el deploy
- ✅ Endpoint health: `https://tu-backend.onrender.com/api/health`
- ✅ API info: `https://tu-backend.onrender.com/api`

## 🌐 Configuración del Frontend (Netlify)

### 1. Preparar el build
```bash
cd baconfort-react
# Crear archivo .env para producción
echo "VITE_API_URL=https://tu-backend.onrender.com/api" > .env.production
npm run build
```

### 2. Configurar en Netlify
1. **Site settings**
   - Repository: `tu-usuario/baconfort-frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 16+

### 3. Variables de entorno en Netlify
```bash
VITE_API_URL=https://tu-backend.onrender.com/api
NODE_ENV=production
```

### 4. Verificar el deploy
- ✅ Sitio funcionando: `https://tu-sitio.netlify.app`
- ✅ Admin panel: `https://tu-sitio.netlify.app/admin`
- ✅ API conectada correctamente

## 🔄 Actualizar CORS en Backend

Una vez que tengas la URL de Netlify, actualiza las variables de entorno en Render:
```bash
FRONTEND_URL=https://tu-sitio-real.netlify.app
CORS_ORIGIN=https://tu-sitio-real.netlify.app
```

## 📊 Testing Post-Deploy

### Backend Testing
```bash
# Health check
curl https://tu-backend.onrender.com/api/health

# API endpoints
curl https://tu-backend.onrender.com/api/properties
curl https://tu-backend.onrender.com/api/reviews
```

### Frontend Testing
1. **Navegación**: Verificar todas las rutas
2. **Administración**: Login y gestión de contenido
3. **Propiedades**: Visualización y datos
4. **Reseñas**: Envío y moderación
5. **Galería**: Carga de imágenes

## 🐛 Troubleshooting Común

### Backend Issues
- **Build failure**: Verificar package.json y dependencias
- **Database connection**: Revisar MONGODB_URI y whitelist de IPs
- **CORS errors**: Verificar FRONTEND_URL

### Frontend Issues
- **Blank page**: Verificar rutas y build
- **API errors**: Verificar VITE_API_URL
- **Assets not loading**: Verificar estructura de dist

## 📁 Estructura Final

```
baconfort/
├── baconfort-backend/     # Deploy en Render
│   ├── server.js
│   ├── package.json
│   ├── RENDER_DEPLOY.md
│   └── models/
└── baconfort-react/       # Deploy en Netlify
    ├── src/
    ├── public/
    ├── package.json
    ├── vite.config.js
    └── NETLIFY_DEPLOY.md
```

## 🎯 URLs Finales

Una vez completado el deploy:

- **Frontend**: `https://baconfort.netlify.app`
- **Backend**: `https://baconfort-backend.onrender.com`
- **Admin**: `https://baconfort.netlify.app/admin`
- **API Health**: `https://baconfort-backend.onrender.com/api/health`

## 📞 Soporte

Si encuentras problemas:
1. Revisar logs en las plataformas
2. Verificar variables de entorno
3. Testear endpoints individualmente
4. Verificar conexión a base de datos
