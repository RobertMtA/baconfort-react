// INSTRUCCIONES DE SEGURIDAD PARA BACONFORT ADMIN

## 🔐 NIVELES DE SEGURIDAD IMPLEMENTADOS

### NIVEL 1: Ofuscación Básica ✅ (ACTUAL)
- Credenciales codificadas en base64
- Tokens de sesión con expiración
- Verificación de tiempo de sesión

### NIVEL 2: Variables de Entorno (OPCIONAL)
- Usar archivo .env.local
- No commitear credenciales al repositorio
- Cambiar credenciales por variables

### NIVEL 3: Backend Real (RECOMENDADO PARA PRODUCCIÓN)
- Servidor con base de datos
- Autenticación JWT real
- Encriptación robusta

## 📋 CREDENCIALES ACTUALES OFUSCADAS

Usuario: YWRtaW4= (decodificar base64)
Contraseña: YmFjb25mb3J0MjAyNA== (decodificar base64)

## 🛡️ MEJORAS DE SEGURIDAD IMPLEMENTADAS

1. ✅ Credenciales no están en texto plano
2. ✅ Tokens de sesión con expiración (4 horas)
3. ✅ Verificación de tiempo de sesión
4. ✅ Limpieza automática de sesiones inválidas
5. ✅ Utilidades de seguridad separadas

## ⚠️ ADVERTENCIAS

- Las credenciales siguen siendo visibles con herramientas de desarrollo
- Para máxima seguridad, implementar backend real
- No usar en aplicaciones con datos críticos sin backend

## 🔄 PARA CAMBIAR CREDENCIALES

Editar SecurityUtils.js líneas 13-14:
- Cambiar 'YWRtaW4=' por new_username_in_base64
- Cambiar 'YmFjb25mb3J0MjAyNA==' por new_password_in_base64

Generador online de base64: https://www.base64encode.org/
