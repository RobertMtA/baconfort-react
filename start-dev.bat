@echo off
echo 🚀 Iniciando BACONFORT Server...
echo.
cd /d "%~dp0baconfort-react"
if exist package.json (
    echo ✅ Directorio correcto encontrado
    echo 📂 Ubicación: %cd%
    echo.
    npm run dev
) else (
    echo ❌ Error: No se encontró package.json en baconfort-react
    echo 📂 Ubicación actual: %cd%
    pause
)
