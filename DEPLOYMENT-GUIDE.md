# 🚀 GUÍA DE DEPLOYMENT NETLIFY + RAILWAY

## PASO 1: DEPLOY DEL BACKEND EN RAILWAY

### A. Configurar Railway
1. Ve a https://railway.app e inicia sesión con GitHub
2. Crea un nuevo proyecto: "New Project" → "Deploy from GitHub repo"
3. Selecciona el repositorio: `RobertMtA/baconfort-react`
4. En "Service Name" pon: `baconfort-backend`
5. En "Root Directory" pon: `baconfort-backend`

### B. Variables de Entorno en Railway
Ve a tu proyecto → Settings → Variables y agrega:

```
NODE_ENV=production
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/baconfort
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_gmail
PORT=3000
```

### C. Obtener URL de Railway
1. Después del deploy, ve a Settings → Networking
2. Copia la URL (algo como: https://baconfort-backend-production.up.railway.app)
3. Esta URL la necesitarás para Netlify

## PASO 2: DEPLOY DEL FRONTEND EN NETLIFY

### A. Configurar Netlify
1. Ve a https://netlify.com e inicia sesión con GitHub
2. Clic en "New site from Git"
3. Conecta con GitHub y selecciona `RobertMtA/baconfort-react`
4. Build settings:
   - Base directory: dejar vacío
   - Build command: `cd baconfort-react && npm install && npm run build`
   - Publish directory: `baconfort-react/dist`

### B. Variables de Entorno en Netlify
Ve a Site settings → Environment variables y agrega:
```
VITE_API_URL=https://tu-url-de-railway.up.railway.app
```

### C. Actualizar netlify.toml
Actualiza el archivo `netlify.toml` con la URL correcta de Railway.

## PASO 3: VERIFICACIÓN

### A. Testear Backend
1. Abre la URL de Railway + `/health`
2. Debe responder: `{"status": "OK", "timestamp": "..."}`

### B. Testear Frontend
1. Abre la URL de Netlify
2. Verifica que cargue la página principal
3. Testea login/registro
4. Verifica que las consultas funcionen

## COSTOS ESTIMADOS
- **Railway**: $5/mes (después de $5 gratis)
- **Netlify**: $0/mes (plan gratuito)
- **MongoDB Atlas**: $0/mes (plan gratuito 512MB)
- **Total**: $5/mes

## DOMINIOS PERSONALIZADOS (OPCIONAL)
- **Netlify**: Puedes agregar tu dominio gratis
- **Railway**: Requiere plan Pro ($20/mes) para dominio personalizado

¿COMENZAMOS CON EL DEPLOYMENT?
