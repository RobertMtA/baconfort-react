# 🚀 BACONFORT - Guía de Deployment Genérica

## 📋 Arquitectura de Deployment

```
Frontend (React/Vite) → Backend (Node.js/Express) → MongoDB Atlas
```

## 🏗️ Opciones de Deployment

### Backend (Node.js/Express)
- **Heroku** (Recomendado)
- **Railway**
- **DigitalOcean App Platform**
- **AWS Elastic Beanstalk**
- **Vercel** (para APIs)

### Frontend (React/Vite)
- **Netlify** (Recomendado)
- **Vercel**
- **GitHub Pages**
- **Firebase Hosting**

### Base de Datos
- **MongoDB Atlas** ✅ (Ya configurado)

## ⚙️ Configuración del Backend

### Variables de Entorno Requeridas:
```env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/baconfort
JWT_SECRET=tu-secret-super-secreto
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.netlify.app
```

### Scripts de Package.json:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 🔧 Configuración del Frontend

### Variables de Entorno:
```env
VITE_API_URL=https://tu-backend.herokuapp.com/api
```

### Build Commands:
```bash
npm install
npm run build
```

### Publish Directory: `dist`

## 🔗 Conexión Frontend-Backend

1. **Desplegar Backend** primero y obtener la URL
2. **Configurar variable** `VITE_API_URL` en el frontend
3. **Desplegar Frontend** con la variable configurada
4. **Verificar conexión** con curl o browser

## ✅ Endpoints de Verificación

```bash
# Health check
curl https://tu-backend.herokuapp.com/api/health

# API info
curl https://tu-backend.herokuapp.com/api

# Test login
curl -X POST https://tu-backend.herokuapp.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baconfort.com","password":"admin123"}'
```

## 🐛 Troubleshooting

### Frontend conecta a localhost en producción
- ✅ Verificar que `VITE_API_URL` esté configurada
- ✅ Hacer redeploy después de configurar la variable
- ✅ Verificar en Network tab que las requests vayan a la URL correcta

### CORS errors
- ✅ Agregar la URL del frontend a la configuración CORS del backend
- ✅ Verificar que `FRONTEND_URL` esté configurada

### Database connection failed
- ✅ Verificar que `MONGODB_URI` sea correcta
- ✅ Whitelist IP 0.0.0.0/0 en MongoDB Atlas para production

## 📚 Guías Específicas

- `NETLIFY_DEPLOY.md` - Deployment en Netlify
- `HEROKU_DEPLOY.md` - Deployment en Heroku
- `RAILWAY_DEPLOY.md` - Deployment en Railway

## 🎯 Demo Credentials

```
Email: admin@baconfort.com
Password: admin123
```

## 🔄 Pipeline de Deployment

1. **Commit cambios** a GitHub
2. **Deploy backend** (automático con git integration)
3. **Obtener URL** del backend
4. **Configurar variable** `VITE_API_URL` en frontend
5. **Deploy frontend** (automático con git integration)
6. **Verificar** funcionamiento completo

---

**Nota:** Esta guía es genérica y aplicable a múltiples plataformas de hosting. Adapta las URLs y configuraciones según tu proveedor elegido.
