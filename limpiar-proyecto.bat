@echo off
echo 🧹 INICIANDO LIMPIEZA DEL PROYECTO BACONFORT
echo ==========================================
echo.

echo 📂 Eliminando archivos de pruebas HTML...
del /f /q "arreglar-localhost.html" 2>nul
del /f /q "config-usuario.html" 2>nul
del /f /q "debug-localstorage.html" 2>nul
del /f /q "debug-promotion-buttons-frontend.html" 2>nul
del /f /q "debug-reservations-sistema.html" 2>nul
del /f /q "debug-token-headers.html" 2>nul
del /f /q "setup-and-test.html" 2>nul
del /f /q "simulate-user-login.html" 2>nul
del /f /q "sistema-funcionando.html" 2>nul
del /f /q "test-profile-persistence.html" 2>nul
del /f /q "test-registro-usuario.html" 2>nul
del /f /q "test-sistema-usuario.html" 2>nul
del /f /q "verificacion-final.html" 2>nul
del /f /q "produccion-baconfort.html" 2>nul

echo 📄 Eliminando archivos de scripts de pruebas...
del /f /q "check-price-consistency.js" 2>nul
del /f /q "console-debug-final.js" 2>nul
del /f /q "console-debug-promotions.js" 2>nul
del /f /q "create-production-promotions.js" 2>nul
del /f /q "create-test-promotion.js" 2>nul
del /f /q "debug-promotion-prices.js" 2>nul
del /f /q "debug-promotions-api.js" 2>nul
del /f /q "debug-reservations-api.js" 2>nul
del /f /q "debug-specific-request.js" 2>nul
del /f /q "quick-test.js" 2>nul
del /f /q "setup-user-token.js" 2>nul
del /f /q "sistema-funcionando.js" 2>nul
del /f /q "sync-check.js" 2>nul
del /f /q "test-api-completo.js" 2>nul
del /f /q "test-auth-debugging.js" 2>nul
del /f /q "test-button-creation.js" 2>nul
del /f /q "test-complete-flow.js" 2>nul
del /f /q "test-create-pro-button.js" 2>nul
del /f /q "test-create-promotions-pro.js" 2>nul
del /f /q "test-creation-accordion.js" 2>nul
del /f /q "test-edit-functionality.js" 2>nul
del /f /q "test-login.js" 2>nul
del /f /q "test-price-sync-integration.js" 2>nul
del /f /q "test-price-update.js" 2>nul
del /f /q "test-profile-final.js" 2>nul
del /f /q "test-profile-persistence.js" 2>nul
del /f /q "test-promotion-apis.js" 2>nul
del /f /q "test-promotion-buttons-browser.js" 2>nul
del /f /q "test-promotion-buttons.js" 2>nul
del /f /q "test-promotion-editing.js" 2>nul
del /f /q "test-reserva-completa.js" 2>nul
del /f /q "test-reservations-complete.js" 2>nul
del /f /q "test-user-login.js" 2>nul
del /f /q "verificacion-final.js" 2>nul
del /f /q "verify-promotion-price-sync.js" 2>nul

echo 📋 Eliminando archivos de documentación temporal...
del /f /q "BOTONES_PROMOCIONES_REPARADOS.md" 2>nul
del /f /q "DIAGNOSTICO_CREAR_PROMOCIONES_PRO.md" 2>nul
del /f /q "MIGRACION_PROMOCIONES_PRODUCCION.md" 2>nul
del /f /q "PERSISTENCIA_DATOS_COMPLETADA.md" 2>nul
del /f /q "PRICE_SYNC_IMPLEMENTATION_COMPLETE.md" 2>nul
del /f /q "PROBLEMA_PERFIL_RESUELTO.md" 2>nul
del /f /q "PROYECTO_LIMPIO_FINAL.md" 2>nul
del /f /q "RESERVAS_PROBLEMA_RESUELTO.md" 2>nul
del /f /q "RESERVAS_PROBLEMA_RESUELTO_FINAL.md" 2>nul
del /f /q "SISTEMA_COMPLETADO.md" 2>nul
del /f /q "SISTEMA_PERSISTENCIA_OPERATIVO.md" 2>nul
del /f /q "SISTEMA_PROMOCIONES_OPERATIVO.md" 2>nul
del /f /q "WHATSAPP_NUMERO_ACTUALIZADO.md" 2>nul

echo 🗂️ Eliminando archivos temporales...
del /f /q "token-actual.txt" 2>nul

echo.
echo ✅ LIMPIEZA COMPLETADA
echo =====================

echo.
echo 📦 ARCHIVOS CONSERVADOS (PRODUCCIÓN):
echo - baconfort-backend/ (Servidor backend)
echo - baconfort-react/ (Frontend React)
echo - package.json (Configuración del proyecto)
echo - package-lock.json (Lock de dependencias)
echo - README.md (Documentación principal)
echo - netlify.toml (Configuración de despliegue)
echo - .gitignore (Configuración de Git)
echo - .git/ (Repositorio Git)
echo - .vercel/ (Configuración de Vercel)

echo.
echo 🎯 ESTRUCTURA FINAL LIMPIA:
echo ├── baconfort-backend/    # API y servidor
echo ├── baconfort-react/      # Frontend React
echo ├── package.json          # Config proyecto
echo ├── README.md             # Documentación
echo ├── netlify.toml          # Deploy config
echo └── .git/                 # Control de versiones

echo.
echo 🚀 EL PROYECTO ESTÁ LISTO PARA PRODUCCIÓN
echo ==========================================
echo.
pause
