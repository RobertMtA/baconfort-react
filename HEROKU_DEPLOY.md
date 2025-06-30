# 🚀 BACONFORT - Deploy en Heroku

## ⚡ Setup Rápido

### 1. Preparar Backend

```bash
cd baconfort-backend
git init
git add .
git commit -m "Initial commit for Heroku"
```

### 2. Crear App en Heroku

```bash
# Instalar Heroku CLI
# En terminal:
heroku create baconfort-backend
```

### 3. Configurar Variables de Entorno

```bash
heroku config:set MONGODB_URI="mongodb+srv://usuario:password@cluster.mongodb.net/baconfort"
heroku config:set JWT_SECRET="tu-secret-super-secreto"
heroku config:set NODE_ENV="production"
heroku config:set FRONTEND_URL="https://baconfort.netlify.app"
```

### 4. Deploy

```bash
git push heroku main
```

### 5. Verificar

```bash
heroku logs --tail
curl https://baconfort-backend.herokuapp.com/api/health
```

## 🔧 Variables de Entorno Completas

En Heroku Dashboard → Settings → Config Vars:

```
MONGODB_URI = mongodb+srv://usuario:password@cluster.mongodb.net/baconfort
JWT_SECRET = mi-secreto-super-seguro-123
NODE_ENV = production
FRONTEND_URL = https://baconfort.netlify.app
PORT = (automático)
```

## ✅ Configuración Automática

Heroku detecta automáticamente:
- `package.json` scripts
- Puerto desde `process.env.PORT`
- Comando start: `node server.js`

## 🐛 Troubleshooting

### Build fails
- ✅ Verificar que `package.json` tenga script "start"
- ✅ Verificar que `server.js` use `process.env.PORT`

### App crashes
- ✅ Revisar logs: `heroku logs --tail`
- ✅ Verificar variables de entorno: `heroku config`

### Database connection fails
- ✅ Verificar `MONGODB_URI` esté configurada
- ✅ Whitelist 0.0.0.0/0 en MongoDB Atlas

## 🔗 URLs Finales

- **Backend**: https://baconfort-backend.herokuapp.com
- **Health Check**: https://baconfort-backend.herokuapp.com/api/health
- **API**: https://baconfort-backend.herokuapp.com/api

## 📱 Frontend (Netlify)

Configurar en Netlify:
```
VITE_API_URL = https://baconfort-backend.herokuapp.com/api
```

---

**✅ Backend listo en Heroku. Ahora configura el frontend en Netlify con la URL de arriba.**
