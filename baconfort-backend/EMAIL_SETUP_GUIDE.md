# CONFIGURACIÓN DE VARIABLES DE ENTORNO EN VERCEL

## Variables requeridas para el sistema de emails:

1. **EMAIL_USER**: robertogaona1985@gmail.com
2. **EMAIL_APP_PASSWORD**: usol qkca ftyo ymdu
3. **ADMIN_EMAIL**: robertogaona1985@gmail.com

## Cómo configurar en Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega estas variables:

```
EMAIL_USER = robertogaona1985@gmail.com
EMAIL_APP_PASSWORD = usol qkca ftyo ymdu  
ADMIN_EMAIL = robertogaona1985@gmail.com
```

## Funcionalidades implementadas:

✅ **Email al Usuario:**
- Confirmación de reserva recibida
- Detalles completos de la reserva
- Diseño profesional en HTML
- Próximos pasos claros

✅ **Email al Admin:**
- Notificación de nueva reserva
- Información completa del cliente
- Acciones requeridas
- Formato fácil de leer

✅ **Características técnicas:**
- Envío asíncrono (no bloquea la reserva)
- Manejo de errores robusto
- Templates HTML responsivos
- Formato de fechas en español

## Para probar:
1. Hacer una reserva desde el frontend
2. Verificar que lleguen ambos emails
3. Revisar que el contenido sea correcto

## Logs para verificar:
```
📧 Enviando notificaciones de email...
✅ Email enviado al usuario: [email]
✅ Email enviado al admin: [email]
✅ Notificaciones de email programadas
```
