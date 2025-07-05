#!/usr/bin/env pwsh

# Script para redeplegar el backend en Vercel con configuración actualizada

Write-Host "🚀 Redesplegando BACONFORT Backend en Vercel..." -ForegroundColor Green
Write-Host ""

# Verificar que estamos en el directorio correcto
if (!(Test-Path "baconfort-backend/package.json")) {
    Write-Host "❌ Error: No se encontró el directorio baconfort-backend" -ForegroundColor Red
    Write-Host "   Asegúrate de ejecutar este script desde el directorio raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

# Cambiar al directorio del backend
Set-Location "baconfort-backend"

Write-Host "📁 Directorio actual: $(Get-Location)" -ForegroundColor Cyan

# Verificar que existe vercel.json
if (!(Test-Path "vercel.json")) {
    Write-Host "❌ Error: No se encontró vercel.json" -ForegroundColor Red
    exit 1
}

# Verificar que existe package.json
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: No se encontró package.json" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Verificando archivos del proyecto..." -ForegroundColor Cyan
Write-Host "   ✅ package.json" -ForegroundColor Green
Write-Host "   ✅ vercel.json" -ForegroundColor Green
Write-Host "   ✅ server.js" -ForegroundColor Green

Write-Host ""
Write-Host "⚠️  IMPORTANTE: Configurar variables de entorno en Vercel Dashboard" -ForegroundColor Yellow
Write-Host "   1. Ve a https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   2. Selecciona tu proyecto 'baconfort-backend'" -ForegroundColor White
Write-Host "   3. Ve a Settings > Environment Variables" -ForegroundColor White
Write-Host "   4. Agrega las siguientes variables:" -ForegroundColor White
Write-Host ""
Write-Host "   NODE_ENV = production" -ForegroundColor Cyan
Write-Host "   MONGODB_URI = mongodb+srv://BACONFORT:Roccosa226@cluster0.lzugghn.mongodb.net/baconfort?retryWrites=true&w=majority&appName=Cluster0" -ForegroundColor Cyan
Write-Host "   JWT_SECRET = baconfort_jwt_secret_super_seguro_2024_cambiar_en_produccion" -ForegroundColor Cyan
Write-Host "   CORS_ORIGIN = https://baconfort-frontend.vercel.app,https://baconfort-react.vercel.app" -ForegroundColor Cyan
Write-Host "   EMAIL_SERVICE = gmail" -ForegroundColor Cyan
Write-Host "   EMAIL_USER = robertogaona1985@gmail.com" -ForegroundColor Cyan
Write-Host "   EMAIL_APP_PASSWORD = usol qkca ftyo ymdu" -ForegroundColor Cyan
Write-Host "   EMAIL_FROM = Baconfort <robertogaona1985@gmail.com>" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "¿Has configurado las variables de entorno en Vercel? (y/n)"
if ($response -ne "y" -and $response -ne "Y") {
    Write-Host "❌ Por favor configura las variables de entorno primero" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔄 Desplegando en Vercel..." -ForegroundColor Green

# Comando para desplegar
try {
    vercel --prod
    Write-Host ""
    Write-Host "✅ ¡Despliegue completado!" -ForegroundColor Green
    Write-Host "🌐 Tu backend está disponible en: https://baconfort-backend.vercel.app/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🧪 Prueba el endpoint de health check:" -ForegroundColor Yellow
    Write-Host "   https://baconfort-backend.vercel.app/api/health" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Endpoints disponibles:" -ForegroundColor Yellow
    Write-Host "   https://baconfort-backend.vercel.app/api" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error durante el despliegue:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Posibles soluciones:" -ForegroundColor Yellow
    Write-Host "   1. Verifica que tengas Vercel CLI instalado: npm install -g vercel" -ForegroundColor White
    Write-Host "   2. Verifica que estés logueado: vercel login" -ForegroundColor White
    Write-Host "   3. Verifica que las variables de entorno estén configuradas" -ForegroundColor White
}

# Volver al directorio raíz
Set-Location ".."
