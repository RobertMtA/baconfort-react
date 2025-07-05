#!/usr/bin/env pwsh

# Script para verificar y configurar variables de entorno en Vercel usando CLI

Write-Host "🔍 Verificando configuración de Vercel..." -ForegroundColor Green
Write-Host ""

# Verificar que Vercel CLI está instalado
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI encontrado: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI no está instalado" -ForegroundColor Red
    Write-Host "   Instalar con: npm install -g vercel" -ForegroundColor Yellow
    exit 1
}

# Cambiar al directorio del backend
Set-Location "baconfort-backend"

Write-Host "📁 Directorio actual: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Verificar login
Write-Host "🔑 Verificando login..." -ForegroundColor Cyan
try {
    $whoami = vercel whoami
    Write-Host "✅ Logueado como: $whoami" -ForegroundColor Green
} catch {
    Write-Host "❌ No estás logueado en Vercel" -ForegroundColor Red
    Write-Host "   Ejecutar: vercel login" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "⚙️  Configurando variables de entorno..." -ForegroundColor Cyan
Write-Host ""

# Definir variables de entorno
$envVars = @{
    "NODE_ENV" = "production"
    "MONGODB_URI" = "mongodb+srv://BACONFORT:Roccosa226@cluster0.lzugghn.mongodb.net/baconfort?retryWrites=true&w=majority&appName=Cluster0"
    "JWT_SECRET" = "baconfort_jwt_secret_super_seguro_2024_cambiar_en_produccion"
    "CORS_ORIGIN" = "https://baconfort-frontend.vercel.app,https://baconfort-react.vercel.app,http://localhost:3000"
    "EMAIL_SERVICE" = "gmail"
    "EMAIL_USER" = "robertogaona1985@gmail.com"
    "EMAIL_APP_PASSWORD" = "usol qkca ftyo ymdu"
    "EMAIL_FROM" = "Baconfort <robertogaona1985@gmail.com>"
    "RATE_LIMIT_WINDOW_MS" = "900000"
    "RATE_LIMIT_MAX_REQUESTS" = "100"
}

# Configurar cada variable
foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    Write-Host "🔧 Configurando $key..." -ForegroundColor Yellow
    
    try {
        # Usar echo para pasar el valor por stdin
        echo $value | vercel env add $key production
        Write-Host "   ✅ $key configurado" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  $key - posiblemente ya configurado" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📋 Listando variables configuradas..." -ForegroundColor Cyan
try {
    vercel env ls
} catch {
    Write-Host "❌ Error al listar variables" -ForegroundColor Red
}

Write-Host ""
Write-Host "🚀 Haciendo redeploy..." -ForegroundColor Green
try {
    vercel --prod
    Write-Host "✅ Redeploy completado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🧪 Probando el backend..." -ForegroundColor Cyan
    
    # Esperar unos segundos para que el deployment termine
    Start-Sleep -Seconds 10
    
    # Probar el endpoint de health
    try {
        $response = Invoke-RestMethod -Uri "https://baconfort-backend.vercel.app/api/health" -Method GET
        Write-Host "✅ Health check exitoso!" -ForegroundColor Green
        Write-Host "📄 Respuesta:" -ForegroundColor Cyan
        $response | ConvertTo-Json
    } catch {
        Write-Host "❌ Health check falló" -ForegroundColor Red
        Write-Host "   Revisa los logs en Vercel Dashboard" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Error en el redeploy" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "🔗 Enlaces útiles:" -ForegroundColor Cyan
Write-Host "   Dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   Backend: https://baconfort-backend.vercel.app" -ForegroundColor White
Write-Host "   Health: https://baconfort-backend.vercel.app/api/health" -ForegroundColor White

# Volver al directorio raíz
Set-Location ".."
