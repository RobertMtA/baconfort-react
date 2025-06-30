# 🚀 RENDER - CONFIGURACIÓN CORRECTA

## ❌ PROBLEMA ACTUAL:
Render está intentando hacer build del frontend React en lugar del backend.

## ✅ SOLUCIÓN - CONFIGURACIÓN CORRECTA:

### 🔧 Configuración que necesitas:
```
Name: baconfort-backend
Region: Oregon (US West)
Branch: main
Root Directory: baconfort-backend  ← ¡ESTO ES CLAVE!
Runtime: Node
Build Command: npm install
Start Command: npm start
```

### 🌍 Variables de Entorno:
```
NODE_ENV = production
JWT_SECRET = mi-super-secreto-render-2024
```

## 🎯 PASOS INMEDIATOS:

### Opción 1: Arreglar el actual
1. Ve a Settings → Build & Deploy
2. Cambia Root Directory a: `baconfort-backend`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Manual Deploy

### Opción 2: Crear nuevo (MÁS FÁCIL)
1. Borra el servicio actual
2. New + → Web Service
3. Conecta baconfort3
4. **Root Directory: baconfort-backend**
5. Deploy

## 🚨 ¡EL ROOT DIRECTORY ES LO MÁS IMPORTANTE!
Sin esto, Render intenta hacer build del React en lugar del backend.
