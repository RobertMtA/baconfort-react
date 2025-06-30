# BACONFORT Development Server Starter
Write-Host "🚀 Iniciando BACONFORT Server..." -ForegroundColor Green
Write-Host ""

$projectPath = Join-Path $PSScriptRoot "baconfort-react"

if (Test-Path (Join-Path $projectPath "package.json")) {
    Write-Host "✅ Directorio correcto encontrado" -ForegroundColor Green
    Write-Host "📂 Ubicación: $projectPath" -ForegroundColor Cyan
    Write-Host ""
    
    Set-Location $projectPath
    npm run dev
} else {
    Write-Host "❌ Error: No se encontró package.json en baconfort-react" -ForegroundColor Red
    Write-Host "📂 Ubicación actual: $(Get-Location)" -ForegroundColor Yellow
    Read-Host "Presiona Enter para continuar"
}
