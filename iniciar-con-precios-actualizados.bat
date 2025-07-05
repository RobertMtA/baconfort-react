@echo off
echo.
echo 🎯 PRECIOS ACTUALIZADOS - BACONFORT
echo ===================================
echo.
echo ✅ CAMBIOS APLICADOS EXITOSAMENTE:
echo.
echo 💰 Moldes 1680:     USD 75/día, USD 330/semana, USD 700/mes
echo 💰 Santa Fe 3770:   USD 80/día, USD 350/semana, USD 750/mes
echo 💰 Dorrego 1548:    USD 70/día, USD 320/semana, USD 680/mes
echo 💰 Convención 1994: USD 90/día, USD 380/semana, USD 800/mes
echo 💰 Ugarteche 2824:  USD 95/día, USD 400/semana, USD 850/mes
echo.
echo 🔧 ERRORES CORREGIDOS:
echo - ✅ Token de autenticación actualizado
echo - ✅ Precios sincronizados con backend
echo - ✅ Error "Failed to fetch" solucionado
echo.
echo 🚀 Reiniciando servidor para aplicar cambios...
echo.

cd /d "%~dp0baconfort-react"

echo 🧹 Limpiando caché...
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo 📦 Verificando dependencias...
if not exist "node_modules" (
    echo 📥 Instalando dependencias...
    npm install
)

echo.
echo 🌐 URLs disponibles:
echo - Frontend: http://localhost:3000
echo - Admin Panel: http://localhost:3000/admin
echo - Backend: https://baconfort-backend.vercel.app/api
echo.
echo 💡 CREDENCIALES ADMIN:
echo - Email: admin@baconfort.com
echo - Password: roccosa226
echo.
echo 🔄 Iniciando servidor con precios actualizados...
echo.

npm run dev

pause
