# 🎉 ¡BACKEND FUNCIONANDO EN RENDER!

## ✅ ESTADO ACTUAL:
- **Backend URL**: https://baconfort-react-2.onrender.com
- **Estado**: Funcionando (puede tardar en despertar)
- **Endpoints disponibles**: /api/health, /api/test, /api/auth/login

## 🔄 CONFIGURACIÓN PARA NETLIFY:

### Variable de Entorno a Agregar:
```
REACT_APP_API_URL=https://baconfort-react-2.onrender.com
```

### Pasos en Netlify:
1. **Site Settings** → **Environment variables**
2. **Add variable** o **Edit existing**:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://baconfort-react-2.onrender.com`
3. **Save**
4. **Deploys** → **Trigger deploy** → **Deploy site**

## 🧪 DESPUÉS DEL DEPLOY:

### Credenciales de prueba:
```
Email: admin@baconfort.com
Password: admin123
```

### URLs para probar el backend:
- Health: https://baconfort-react-2.onrender.com/api/health
- Test: https://baconfort-react-2.onrender.com/api/test
- Login: https://baconfort-react-2.onrender.com/api/auth/login

## 🚨 NOTA IMPORTANTE:
**Render gratis se "duerme"** después de 15 minutos sin uso.
- Primera carga: 10-30 segundos (despertar)
- Siguientes cargas: Instantáneas

## ✅ TODO LISTO:
1. ✅ Backend deployado en Render
2. 🔄 Frontend configurando en Netlify
3. 🎯 Login funcionará después del redeploy

¡Ya casi terminamos! 🚀
