# BACONFORT - Plataforma de Reservas

## 🏠 Descripción
Plataforma web completa para la gestión de reservas de propiedades en Buenos Aires, Argentina.

## 📁 Estructura del Proyecto

```
baconfort3/
├── baconfort-backend/         # Servidor Node.js + Express + MongoDB
├── baconfort-react/           # Frontend React + Vite
├── backup-limpieza/           # Archivos de respaldo
├── admin-credentials.json     # Credenciales de administración
├── working-token.json         # Token funcional
├── start.js                   # Script de inicio completo
├── verify.js                  # Verificador del sistema
├── package.json               # Configuración del proyecto
├── DEPLOY.md                  # Guía de deployment
└── README.md                  # Esta documentación
```

## 🚀 Inicio Rápido

### 1. Iniciar Backend
```bash
cd baconfort-backend
node server-emergency.js
```

### 2. Iniciar Frontend (nueva terminal)
```bash
cd baconfort-react
npm run dev
```

### 3. Acceder al Sistema
- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Backend API:** http://localhost:5000/api

## 🔐 Credenciales de Administración

### Panel de Admin
- **URL:** http://localhost:3000/admin
- **Código de acceso:** `BACONFORT_ADMIN_2025_7D3F9K2L`
- **Email:** `admin@baconfort.com`
- **Password:** `roccosa226`

## 🛠️ Scripts Disponibles

### Proyecto Completo
- `node start.js` - Inicia todo el sistema
- `node verify.js` - Verifica el funcionamiento

### Backend
- `cd baconfort-backend && node server-emergency.js` - Servidor funcional
- `cd baconfort-backend && npm start` - Servidor principal

### Frontend
- `cd baconfort-react && npm run dev` - Servidor de desarrollo
- `cd baconfort-react && npm run build` - Build de producción

## 🌐 Deployment

Ver el archivo `DEPLOY.md` para instrucciones detalladas de deployment en Vercel y Netlify.

## 📊 Características

- ✅ Sistema de reservas completo
- ✅ Panel de administración
- ✅ Gestión de propiedades
- ✅ Autenticación segura
- ✅ API REST completa
- ✅ Frontend responsive
- ✅ Base de datos MongoDB

## 🔧 Tecnologías

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer

### Frontend
- React 18
- Vite
- React Router
- Context API
- CSS Modules

## 📞 Soporte

- **Email:** roberto@baconfort.com
- **WhatsApp:** +54 11 3002-1074

## 📄 Licencia

Proyecto privado - Todos los derechos reservados.
