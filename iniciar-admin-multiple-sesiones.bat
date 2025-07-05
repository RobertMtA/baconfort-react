@echo off
echo.
echo 🔐 SOLUCION ADMIN MULTIPLE SESIONES - BACONFORT
echo ==============================================
echo.
echo 🚀 Reiniciando servidor con sesiones múltiples...
echo.

cd /d "%~dp0baconfort-react"

echo 📋 CREDENCIALES DISPONIBLES:
echo ============================
echo 1. Email: admin@baconfort.com  ^| Password: roccosa226
echo 2. Email: roberto@baconfort.com ^| Password: roccosa226
echo 3. Email: admin                ^| Password: roccosa226
echo.
echo 💡 AHORA MÚLTIPLES PERSONAS PUEDEN USAR EL ADMIN SIMULTÁNEAMENTE
echo.

echo 🔧 Verificando dependencias...
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

echo 🔄 Iniciando servidor con sesiones múltiples...
echo.
echo 💡 Para probar sesiones múltiples:
echo    1. Abre http://localhost:3000/admin en un navegador
echo    2. Abre http://localhost:3000/admin en otro navegador
echo    3. Ambos pueden hacer login simultáneamente
echo.

npm run dev

pause
