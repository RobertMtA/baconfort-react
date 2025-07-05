@echo off
echo.
echo 🚀 SOLUCION INMEDIATA - BACONFORT
echo ================================
echo.
echo 🔧 Reiniciando servidor de desarrollo...
echo.

cd /d "%~dp0baconfort-react"

echo 📦 Verificando dependencias...
if not exist "node_modules" (
    echo 📥 Instalando dependencias...
    npm install
)

echo.
echo 🌐 Configuración actual:
echo - API URL: https://baconfort-backend.vercel.app/api
echo - Entorno: Desarrollo local
echo.

echo 🔄 Iniciando servidor...
echo.
echo 💡 El navegador se abrirá automáticamente
echo 💡 Si hay errores, presiona Ctrl+C y contacta soporte
echo.

npm run dev

pause
