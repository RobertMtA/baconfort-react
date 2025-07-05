#!/usr/bin/env pwsh

# Script para desplegar el frontend en Vercel

Write-Host "🚀 Desplegando BACONFORT Frontend en Vercel..." -ForegroundColor Green
Write-Host ""

# Verificar que estamos en el directorio correcto
if (!(Test-Path "baconfort-react/package.json")) {
    Write-Host "❌ Error: No se encontró el directorio baconfort-react" -ForegroundColor Red
    Write-Host "   Asegúrate de ejecutar este script desde el directorio raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

# Cambiar al directorio del frontend
Set-Location "baconfort-react"

Write-Host "📁 Directorio actual: $(Get-Location)" -ForegroundColor Cyan

# Verificar archivos esenciales
$requiredFiles = @("package.json", ".env.production", "index.html")
$allFilesExist = $true

Write-Host "📦 Verificando archivos esenciales..." -ForegroundColor Cyan
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file - FALTA" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host "❌ Faltan archivos esenciales. Verifica la estructura del proyecto." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Configuración del Frontend:" -ForegroundColor Cyan

# Mostrar contenido de .env.production
if (Test-Path ".env.production") {
    Write-Host "   📄 Variables de entorno (.env.production):" -ForegroundColor White
    Get-Content ".env.production" | ForEach-Object {
        Write-Host "      $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⚠️  No se encontró .env.production" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔄 Instalando dependencias..." -ForegroundColor Green

# Instalar dependencias
try {
    npm install
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🏗️  Ejecutando build..." -ForegroundColor Green

# Hacer build del proyecto
try {
    npm run build
    Write-Host "✅ Build completado exitosamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error durante el build" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Desplegando en Vercel..." -ForegroundColor Green

# Desplegar en Vercel
try {
    vercel --prod
    Write-Host ""
    Write-Host "✅ ¡Despliegue del frontend completado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Enlaces importantes:" -ForegroundColor Cyan
    Write-Host "   Backend:  https://baconfort-backend.vercel.app" -ForegroundColor White
    Write-Host "   Frontend: https://baconfort-react.vercel.app (o tu dominio personalizado)" -ForegroundColor White
    Write-Host ""
    Write-Host "🧪 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "   1. Probar el registro de usuarios" -ForegroundColor White
    Write-Host "   2. Probar el login" -ForegroundColor White
    Write-Host "   3. Probar la creación de reservas" -ForegroundColor White
    Write-Host "   4. Probar el panel de administración" -ForegroundColor White
    Write-Host "   5. Verificar que todo funciona en producción" -ForegroundColor White
    
} catch {
    Write-Host "❌ Error durante el despliegue:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Posibles soluciones:" -ForegroundColor Yellow
    Write-Host "   1. Verifica que tengas Vercel CLI instalado: npm install -g vercel" -ForegroundColor White
    Write-Host "   2. Verifica que estés logueado: vercel login" -ForegroundColor White
    Write-Host "   3. Verifica que el build se haya completado correctamente" -ForegroundColor White
    Write-Host "   4. Revisa los errores de build si los hay" -ForegroundColor White
}

# Volver al directorio raíz
Set-Location ".."

Write-Host ""
Write-Host "🎉 ¡Despliegue completado! Tu aplicación BACONFORT está lista en producción." -ForegroundColor Green
