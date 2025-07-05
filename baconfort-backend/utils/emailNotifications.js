// utils/emailNotifications.js
const nodemailer = require('nodemailer');

let emailTransporter;

// Configurar el transporter
try {
  emailTransporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
} catch (error) {
  console.error('Error configurando email transporter:', error);
}

// Función para enviar notificación de reserva al usuario
const sendUserReservationNotification = async (reservationData) => {
  if (!emailTransporter) {
    console.error('Email transporter no configurado');
    return false;
  }

  const { fullName, email, propertyName, checkIn, checkOut, guests, message } = reservationData;
  
  const checkInDate = new Date(checkIn).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const checkOutDate = new Date(checkOut).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Confirmación de Reserva - ${propertyName} | BaconFort`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #2c3e50; text-align: center; margin-bottom: 10px;">
            🏨 BaconFort - Confirmación de Reserva
          </h2>
          <p style="text-align: center; color: #7f8c8d; margin: 0;">
            Hemos recibido tu solicitud de reserva
          </p>
        </div>
        
        <div style="background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #3498db; margin-bottom: 20px;">¡Hola ${fullName}!</h3>
          
          <p style="color: #2c3e50; line-height: 1.6;">
            Gracias por elegirnos. Hemos recibido tu solicitud de reserva y la estamos procesando. 
            Te enviaremos una confirmación definitiva una vez que revisemos tu solicitud.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">📋 Detalles de tu Reserva:</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <strong style="color: #3498db;">🏠 Propiedad:</strong> ${propertyName}
              </li>
              <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <strong style="color: #3498db;">📅 Check-in:</strong> ${checkInDate}
              </li>
              <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <strong style="color: #3498db;">📅 Check-out:</strong> ${checkOutDate}
              </li>
              <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <strong style="color: #3498db;">👥 Huéspedes:</strong> ${guests} persona(s)
              </li>
              <li style="padding: 8px 0;">
                <strong style="color: #3498db;">📧 Email:</strong> ${email}
              </li>
            </ul>
          </div>
          
          ${message ? `
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #27ae60; margin-bottom: 10px;">💬 Tu mensaje:</h4>
              <p style="color: #2c3e50; margin: 0; font-style: italic;">"${message}"</p>
            </div>
          ` : ''}
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h4 style="color: #856404; margin-bottom: 10px;">⏰ Próximos Pasos:</h4>
            <ul style="color: #856404; margin: 0; padding-left: 20px;">
              <li>Revisaremos tu solicitud en las próximas 24 horas</li>
              <li>Te enviaremos un email con la confirmación definitiva</li>
              <li>Si tienes preguntas, no dudes en contactarnos</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; font-size: 14px;">
              Este es un email automático. Si tienes alguna pregunta, 
              puedes contactarnos respondiendo a este email.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px;">
          <p style="color: #7f8c8d; font-size: 12px; margin: 0;">
            © 2025 BaconFort. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log('✅ Email enviado al usuario:', email);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email al usuario:', error);
    return false;
  }
};

// Función para enviar notificación de reserva al admin
const sendAdminReservationNotification = async (reservationData) => {
  if (!emailTransporter) {
    console.error('Email transporter no configurado');
    return false;
  }

  const { fullName, email, phone, propertyName, checkIn, checkOut, guests, message } = reservationData;
  
  const checkInDate = new Date(checkIn).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const checkOutDate = new Date(checkOut).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: `🔔 Nueva Reserva - ${propertyName} | BaconFort Admin`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #e74c3c; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: white; text-align: center; margin-bottom: 10px;">
            🔔 Nueva Reserva Recibida
          </h2>
          <p style="text-align: center; color: white; margin: 0;">
            Tienes una nueva solicitud de reserva que requiere atención
          </p>
        </div>
        
        <div style="background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #e74c3c; margin-bottom: 20px;">📋 Detalles de la Reserva:</h3>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">🏠 Información de la Propiedad:</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <strong style="color: #e74c3c;">Propiedad:</strong> ${propertyName}
              </li>
              <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <strong style="color: #e74c3c;">Check-in:</strong> ${checkInDate}
              </li>
              <li style="padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                <strong style="color: #e74c3c;">Check-out:</strong> ${checkOutDate}
              </li>
              <li style="padding: 8px 0;">
                <strong style="color: #e74c3c;">Huéspedes:</strong> ${guests} persona(s)
              </li>
            </ul>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #27ae60; margin-bottom: 15px;">👤 Información del Cliente:</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 8px 0; border-bottom: 1px solid #d5e8d5;">
                <strong style="color: #27ae60;">Nombre:</strong> ${fullName}
              </li>
              <li style="padding: 8px 0; border-bottom: 1px solid #d5e8d5;">
                <strong style="color: #27ae60;">Email:</strong> ${email}
              </li>
              <li style="padding: 8px 0;">
                <strong style="color: #27ae60;">Teléfono:</strong> ${phone || 'No proporcionado'}
              </li>
            </ul>
          </div>
          
          ${message ? `
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #856404; margin-bottom: 10px;">💬 Mensaje del Cliente:</h4>
              <p style="color: #2c3e50; margin: 0; font-style: italic; border-left: 3px solid #ffc107; padding-left: 15px;">"${message}"</p>
            </div>
          ` : ''}
          
          <div style="background-color: #f8d7da; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545;">
            <h4 style="color: #721c24; margin-bottom: 10px;">⚠️ Acción Requerida:</h4>
            <ul style="color: #721c24; margin: 0; padding-left: 20px;">
              <li>Revisar la disponibilidad de la propiedad</li>
              <li>Contactar al cliente para confirmar la reserva</li>
              <li>Actualizar el estado de la reserva en el sistema</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #7f8c8d; font-size: 14px;">
              Reserva recibida el: ${new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px;">
          <p style="color: #7f8c8d; font-size: 12px; margin: 0;">
            © 2025 BaconFort Admin Panel. Sistema de notificaciones automáticas.
          </p>
        </div>
      </div>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log('✅ Email enviado al admin:', adminEmail);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email al admin:', error);
    return false;
  }
};

// Función para enviar email de recuperación de contraseña
const sendPasswordResetEmail = async (email, name, resetToken) => {
  if (!emailTransporter) {
    console.error('Email transporter no configurado');
    return false;
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
  const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperación de Contraseña - BaconFort',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-top: 0;">🔐 Recuperación de Contraseña</h2>
          <h3 style="color: #e74c3c; margin: 0;">BaconFort</h3>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #333; margin-top: 0;">Hola ${name},</h3>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en BaconFort.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
            Para crear una nueva contraseña, haz clic en el siguiente enlace:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Restablecer Contraseña
            </a>
          </div>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              <strong>⚠️ Importante:</strong> Este enlace expirará en 1 hora por seguridad.
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Si no solicitaste este cambio, puedes ignorar este email. Tu contraseña no será modificada.
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Si tienes problemas con el enlace, copia y pega la siguiente URL en tu navegador:
          </p>
          
          <div style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px; color: #666;">
            ${resetUrl}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
          <p>Este email fue enviado automáticamente desde BaconFort</p>
          <p>Si necesitas ayuda, contáctanos</p>
        </div>
      </div>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log('✅ Email de recuperación enviado exitosamente a:', email);
    return true;
  } catch (error) {
    console.error('❌ Error enviando email de recuperación:', error);
    return false;
  }
};

module.exports = {
  sendUserReservationNotification,
  sendAdminReservationNotification,
  sendPasswordResetEmail
};
