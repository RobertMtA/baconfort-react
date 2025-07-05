# 🚀 Guía para Configurar Variables de Entorno en Vercel

## 📋 Paso a Paso para Configurar el Backend

### 1. Acceder a Vercel Dashboard
- Ve a: https://vercel.com/dashboard
- Inicia sesión con tu cuenta
- Busca tu proyecto `baconfort-backend`

### 2. Acceder a Configuración
- Haz clic en tu proyecto `baconfort-backend`
- Ve a la pestaña **Settings**
- En el menú lateral, selecciona **Environment Variables**

### 3. Agregar Variables de Entorno
Agrega las siguientes variables una por una:

#### Variables Principales:
```
NODE_ENV = production
```

```
MONGODB_URI = mongodb+srv://BACONFORT:Roccosa226@cluster0.lzugghn.mongodb.net/baconfort?retryWrites=true&w=majority&appName=Cluster0
```

```
JWT_SECRET = baconfort_jwt_secret_super_seguro_2024_cambiar_en_produccion
```

#### Variables de CORS:
```
CORS_ORIGIN = https://baconfort-frontend.vercel.app,https://baconfort-react.vercel.app,http://localhost:3000
```

#### Variables de Email:
```
EMAIL_SERVICE = gmail
```

```
EMAIL_USER = robertogaona1985@gmail.com
```

```
EMAIL_APP_PASSWORD = usol qkca ftyo ymdu
```

```
EMAIL_FROM = Baconfort <robertogaona1985@gmail.com>
```

#### Variables de Rate Limiting:
```
RATE_LIMIT_WINDOW_MS = 900000
```

```
RATE_LIMIT_MAX_REQUESTS = 100
```

### 4. Configurar Cloudinary (Opcional)
Si tienes cuenta de Cloudinary, agrega:
```
CLOUDINARY_CLOUD_NAME = tu_cloud_name
```

```
CLOUDINARY_API_KEY = tu_api_key
```

```
CLOUDINARY_API_SECRET = tu_api_secret
```

### 5. Hacer Redeploy
Después de configurar todas las variables:
- En la pestaña **Deployments**
- Haz clic en los tres puntos (...) del último deployment
- Selecciona **Redeploy**
- Espera a que termine el proceso

### 6. Verificar el Despliegue
Una vez completado, verifica que funcione:
- Visita: https://baconfort-backend.vercel.app/api/health
- Deberías ver una respuesta JSON como:
```json
{
  "status": "OK",
  "message": "BACONFORT API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "environment": "production"
}
```

## 🔧 Solución de Problemas

### Si sigues viendo errores 500:
1. **Verifica las variables**: Asegúrate de que todas las variables estén configuradas correctamente
2. **Revisa los logs**: Ve a la pestaña **Functions** en Vercel para ver los logs detallados
3. **Verifica MongoDB**: Asegúrate de que la conexión a MongoDB funciona
4. **Redeploy**: Haz un redeploy completo después de cambiar variables

### Si hay errores de CORS:
1. **Verifica CORS_ORIGIN**: Asegúrate de que incluya el dominio de tu frontend
2. **Actualiza frontend**: Asegúrate de que el frontend apunte a la URL correcta del backend

## 📋 Checklist Final
- [ ] Todas las variables de entorno configuradas
- [ ] Redeploy completado
- [ ] Health check funciona
- [ ] Endpoints de API responden
- [ ] Conexión a MongoDB establecida
- [ ] CORS configurado para frontend

## 🔗 Enlaces Útiles
- Dashboard Vercel: https://vercel.com/dashboard
- Backend URL: https://baconfort-backend.vercel.app
- Health Check: https://baconfort-backend.vercel.app/api/health
- API Info: https://baconfort-backend.vercel.app/api

## 🆘 Si Necesitas Ayuda
Si después de seguir todos estos pasos aún tienes problemas, revisa:
1. Los logs en Vercel Dashboard
2. La configuración de tu cuenta de MongoDB
3. Los permisos de tu cuenta de email
4. Que no haya caracteres especiales en las variables
