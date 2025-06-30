# 🚀 BACONFORT Backend - Deploy Universal

## ✅ Backend configurado para deploy en cualquier plataforma

Este servidor está optimizado para funcionar en:
- **Vercel** (Serverless)
- **Railway** 
- **Fly.io**
- **DigitalOcean App Platform**
- **AWS/GCP/Azure**
- **Heroku** (legacy)
- **VPS tradicional**

## 📋 Configuración requerida

### Variables de entorno necesarias:
```bash
PORT=5000                    # Auto-asignado en la mayoría de plataformas
NODE_ENV=production
MONGODB_URI=mongodb+srv://... # Tu conexión a MongoDB Atlas
JWT_SECRET=tu-secreto-super-seguro
FRONTEND_URL=https://tu-frontend.com
```

### Build Commands (según plataforma):
```bash
# Install
npm install

# Start (producción)
npm start

# Build (si es necesario)
npm run build
```

## 🔧 Endpoints disponibles

- `GET /api/health` - Estado del servidor
- `GET /api` - Info de la API
- `GET /api/test` - Endpoint de prueba
- `POST /api/auth/login` - Login (demo: admin@baconfort.com / admin123)
- `GET /api/auth/verify` - Verificar token
- `GET /api/properties` - Propiedades
- `GET /api/reviews` - Reviews

## 🌐 CORS configurado para:
- `http://localhost:3000` (desarrollo)
- `http://localhost:5173` (Vite dev)
- `https://baconfort.netlify.app` (Netlify)
- Variable `FRONTEND_URL` (tu dominio)

## 🧪 Verificar deploy

```bash
# Health check
curl https://tu-backend.com/api/health

# Test login
curl -X POST https://tu-backend.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baconfort.com","password":"admin123"}'
```

## 📝 Notas importantes

1. **MongoDB Atlas**: Configurar IP whitelist o usar `0.0.0.0/0`
2. **CORS**: Actualizar `FRONTEND_URL` con tu dominio real
3. **JWT_SECRET**: Usar valor seguro en producción
4. **Puerto**: Se auto-asigna via `process.env.PORT`

¡Backend listo para cualquier plataforma! 🎯
