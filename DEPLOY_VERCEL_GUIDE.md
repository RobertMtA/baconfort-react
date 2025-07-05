# 🚀 GUÍA DE DESPLIEGUE EN VERCEL - BACONFORT

## 📋 RESUMEN
Vamos a desplegar tanto el backend (Node.js/Express) como el frontend (React/Vite) en Vercel.

## 🎯 ESTRUCTURA DE DESPLIEGUE
- **Backend**: Vercel Serverless Functions
- **Frontend**: Vercel Static Site
- **Base de datos**: MongoDB Atlas (ya configurada)

## 📝 PASOS PARA EL DESPLIEGUE

### 1. PREPARAR EL BACKEND PARA VERCEL

#### ✅ Ya configurado:
- `vercel.json` existe en `baconfort-backend/`
- Configuración de serverless functions correcta

#### ⚠️ Pendiente:
- Variables de entorno en Vercel
- Ajustar URLs del frontend para apuntar al backend desplegado

### 2. PREPARAR EL FRONTEND PARA VERCEL

#### ⚠️ Pendiente:
- Configurar variables de entorno para producción
- Ajustar API_URL para apuntar al backend en Vercel
- Configurar build para Vite

### 3. VARIABLES DE ENTORNO NECESARIAS

#### Backend (Vercel):
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=tu_jwt_secret
ADMIN_EMAIL=tu_email@ejemplo.com
ADMIN_PASSWORD=tu_password_admin
NODE_ENV=production
```

#### Frontend (Vercel):
```
VITE_API_URL=https://tu-backend.vercel.app/api
VITE_NODE_ENV=production
```

## 🛠️ COMANDOS PARA EJECUTAR

### Opción 1: Desplegar desde línea de comandos
```bash
# Instalar Vercel CLI
npm i -g vercel

# Backend
cd baconfort-backend
vercel --prod

# Frontend  
cd ../baconfort-react
vercel --prod
```

### Opción 2: Conectar repositorio GitHub a Vercel
1. Subir código a GitHub
2. Conectar repositorio en vercel.com
3. Configurar variables de entorno
4. Desplegar automáticamente

## 📁 ARCHIVOS DE CONFIGURACIÓN NECESARIOS

### Frontend - vite.config.js
```javascript
export default {
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 4173,
  }
}
```

### Backend - package.json (scripts)
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "echo 'No build needed'",
    "dev": "nodemon server.js"
  }
}
```

## 🔄 SIGUIENTES PASOS
1. Revisar configuración actual
2. Crear archivos de configuración faltantes
3. Configurar variables de entorno
4. Ejecutar despliegue
5. Probar endpoints en producción

¿Comenzamos con la configuración?
