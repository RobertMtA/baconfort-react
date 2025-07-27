# 🚀 INSTRUCCIONES DE DEPLOY PARA HOSTINGER - BACONFORT

## ✅ ARCHIVOS PREPARADOS

Los archivos están listos en la carpeta `hostinger-build/`:

### 📁 **FRONTEND** (`hostinger-build/frontend/`)
- ✅ Build de producción de React
- ✅ Archivo `.htaccess` incluido
- ✅ Todas las imágenes y videos
- ✅ Assets optimizados

### 📁 **BACKEND** (`hostinger-build/backend/`)
- ✅ Código del servidor Node.js
- ✅ Archivos `.env.production` 
- ✅ Todos los modelos y rutas
- ✅ Middlewares y utilidades

## 🔧 PRÓXIMOS PASOS

### **1. SUBIR ARCHIVOS A HOSTINGER**

#### Frontend:
```bash
# Subir TODO el contenido de hostinger-build/frontend/ a public_html/
# - index.html
# - assets/ (CSS, JS, fuentes)
# - img/ y video/ (media)
# - .htaccess (importante!)
```

#### Backend:
```bash
# Crear carpeta api/ en el servidor
# Subir TODO el contenido de hostinger-build/backend/ a api/
# - server.js
# - package.json
# - routes/, models/, middleware/, utils/
# - .env.production
```

### **2. CONFIGURAR NODE.JS EN HOSTINGER**

1. Ir al panel de control de Hostinger
2. Buscar la sección "Node.js"
3. Seleccionar la versión más reciente (16+)
4. Configurar:
   - **Documento raíz**: `/api/`
   - **Archivo de inicio**: `server.js`
   - **Modo de aplicación**: Producción

### **3. INSTALAR DEPENDENCIAS**

En el terminal de Hostinger (o SSH):
```bash
cd api/
npm install --production
```

### **4. CONFIGURAR VARIABLES DE ENTORNO**

En el panel de Hostinger, agregar estas variables:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/baconfort?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
EMAIL_USER=baconfort.centro@gmail.com
EMAIL_APP_PASSWORD=tu_app_password_gmail
ADMIN_EMAIL=baconfort.centro@gmail.com
ADMIN_PASSWORD=tu_password_admin_seguro
FRONTEND_URL=https://tudominio.com
CORS_ORIGIN=https://tudominio.com
PORT=3001
```

### **5. CONFIGURAR MONGODB ATLAS**

1. Ir a [MongoDB Atlas](https://cloud.mongodb.com/)
2. Crear un cluster gratuito
3. Crear un usuario de base de datos
4. Obtener la connection string
5. Agregar las IPs de Hostinger a las whitelist

### **6. CONFIGURAR GMAIL APP PASSWORD**

1. Ir a tu cuenta de Google
2. Activar verificación en 2 pasos
3. Ir a "Contraseñas de aplicación"
4. Generar una contraseña para "Otra aplicación"
5. Usar esa contraseña en EMAIL_APP_PASSWORD

## 🔍 VERIFICACIÓN

### **Comprobar que todo funciona:**

1. **Frontend**: `https://tudominio.com`
2. **API Health**: `https://tudominio.com/api/health`
3. **Backend**: `https://tudominio.com/api/properties`

### **Respuestas esperadas:**

```json
// /api/health
{
  "status": "OK",
  "timestamp": "2025-07-26T...",
  "database": "connected",
  "environment": "production"
}

// /api/properties
[
  {
    "id": "...",
    "title": "Santa Fe 3770",
    "address": "...",
    ...
  }
]
```

## 🎯 ESTRUCTURA FINAL EN HOSTINGER

```
public_html/
├── index.html (frontend)
├── assets/ (CSS, JS, imágenes)
├── img/ y video/
├── .htaccess
└── api/
    ├── server.js
    ├── package.json
    ├── .env.production
    ├── routes/
    ├── models/
    ├── middleware/
    └── utils/
```

## 🚨 PROBLEMAS COMUNES

### **Error de CORS:**
- Verificar CORS_ORIGIN en variables de entorno
- Verificar .htaccess en public_html/

### **Error 404 en rutas:**
- Verificar que .htaccess esté en public_html/
- Verificar reglas de rewrite

### **Error de base de datos:**
- Verificar MONGODB_URI
- Verificar whitelist de IPs en MongoDB Atlas

### **Error de emails:**
- Verificar EMAIL_APP_PASSWORD
- Verificar que sea contraseña de aplicación, no la normal

## 🎉 ¡LISTO!

Una vez completados estos pasos, tu aplicación Baconfort estará funcionando en Hostinger con:

- ✅ Frontend React optimizado
- ✅ Backend Node.js con MongoDB
- ✅ Sistema de emails funcionando
- ✅ Autenticación de admin
- ✅ Health checks y monitoreo

**¡Tu aplicación estará live en tu dominio!** 🚀
