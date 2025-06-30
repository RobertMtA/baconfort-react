# 🏠 BACONFORT - Gestión de Departamentos Temporarios

Sistema web completo para la gestión y reserva de departamentos temporarios con panel de administración.

## 🚀 Características

- **Frontend React moderno** con Vite
- **Backend Node.js + Express** robusto
- **Base de datos MongoDB Atlas** en la nube
- **Sistema de autenticación JWT**
- **Galería de imágenes optimizada**
- **Panel de administración completo**
- **Deploy universal** (funciona en cualquier plataforma)

## 📁 Estructura del Proyecto

```
baconfort-project/
├── baconfort-backend/          # API Node.js + Express
│   ├── server.js              # Servidor principal
│   ├── package.json          
│   └── DEPLOYMENT_GENERIC.md   # Guía de deploy
├── baconfort-react/           # Frontend React + Vite
│   ├── src/                   # Código fuente
│   ├── public/               # Imágenes y assets
│   ├── vite.config.js
│   └── package.json
└── DEPLOY_GUIDE_UNIVERSAL.md  # Guía completa de deploy
```

## ⚡ Inicio Rápido

### Backend (Node.js)
```bash
cd baconfort-backend
npm install
npm start
# Servidor en http://localhost:5000
```

### Frontend (React)
```bash
cd baconfort-react
npm install
npm run dev
# App en http://localhost:5173
```

## 🔐 Credenciales Demo

```
Email: admin@baconfort.com
Password: admin123
```

## 🌐 Deploy en Producción

### Plataformas recomendadas:

**Backend:**
- Railway (fácil y gratis)
- Fly.io (moderno)
- Vercel (serverless)
- DigitalOcean App Platform

**Frontend:**  
- Netlify (especializado en SPA)
- Vercel (React optimizado)
- GitHub Pages (gratis)

### Variables de entorno necesarias:

**Backend:**
```bash
MONGODB_URI=mongodb+srv://...
JWT_SECRET=tu-secreto-seguro
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.com
```

**Frontend:**
```bash
VITE_API_URL=https://tu-backend.com/api
```

## 📋 API Endpoints

- `GET /api/health` - Estado del servidor
- `POST /api/auth/login` - Autenticación
- `GET /api/properties` - Lista de propiedades
- `GET /api/reviews` - Reseñas

## 🛠️ Tecnologías

### Frontend
- React 18
- Vite
- React Router
- Axios
- CSS Modules

### Backend  
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT
- CORS
- bcryptjs

## 📖 Documentación

- [Guía de Deploy Universal](./DEPLOY_GUIDE_UNIVERSAL.md)
- [Configuración Backend](./baconfort-backend/DEPLOYMENT_GENERIC.md)
- [Configuración Frontend](./baconfort-react/NETLIFY_DEPLOY.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License

---

**¿Necesitas ayuda con el deploy?** Revisa la [Guía Universal de Deploy](./DEPLOY_GUIDE_UNIVERSAL.md) 🚀
