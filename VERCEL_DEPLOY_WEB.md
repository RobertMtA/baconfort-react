# 🌐 VERCEL DEPLOY - MÉTODO WEB (MÁS FÁCIL)

## 🚀 DEPLOY DESDE VERCEL.COM

Ya que el CLI puede tener problemas, vamos a usar el método web que es más confiable:

### Paso 1: Ve a Vercel Dashboard
1. Ve a [vercel.com](https://vercel.com)
2. Login con tu cuenta de GitHub
3. Click en **"Add New..."** → **"Project"**

### Paso 2: Importar desde GitHub
1. Busca tu repositorio **"baconfort3"**
2. Click en **"Import"**
3. **IMPORTANTE**: Cuando aparezcan las opciones, configura:
   - **Framework Preset**: Other
   - **Root Directory**: `baconfort-backend`
   - **Build Command**: `npm install`
   - **Output Directory**: (dejar vacío)
   - **Install Command**: `npm install`

### Paso 3: Configurar Variables de Entorno
Antes de hacer deploy, click en **"Environment Variables"** y agrega:

```
NODE_ENV = production
JWT_SECRET = super-secret-jwt-key-vercel-2024
FRONTEND_URL = https://baconfort.netlify.app
```

### Paso 4: Deploy
1. Click en **"Deploy"**
2. Espera a que termine (1-2 minutos)
3. ¡Listo! Tendrás tu URL

## 🎯 DESPUÉS DEL DEPLOY:

1. **Copia la URL** (algo como: `https://baconfort-backend-xxx.vercel.app`)
2. **Prueba**: `https://tu-url/api/health`
3. **Actualiza Netlify** con la nueva URL del backend

## 📱 Si prefieres continuar con CLI:

En la terminal, cuando aparezcan las preguntas, responde:
- **Set up and deploy?** → Y
- **Scope?** → Tu cuenta personal  
- **Link to existing?** → N
- **Project name?** → baconfort-backend
- **Directory?** → ./

## ✅ Archivos ya configurados:
- ✅ `vercel.json` - Configuración correcta
- ✅ `package.json` - Scripts listos
- ✅ `server.js` - Puerto dinámico

## 🚨 ¿Método preferido?
- **WEB** = Más fácil y visual
- **CLI** = Más rápido (cuando funciona)
