'use strict';

const nodemailer = require('nodemailer');

// Configuración del transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const EmailService = {
  sendRecoveryEmail: async (email, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Recuperación de contraseña - Steel Body Gym',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .btn { 
              display: inline-block;
              padding: 12px 24px;
              background-color: #dc3545;
              color: white !important;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer { color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Recuperación de contraseña</h1>
            <p>Hola, recibimos una solicitud para restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
            <a href="${resetUrl}" class="btn">Restablecer contraseña</a>
            <p>Este enlace expirará en <strong>1 hora</strong>.</p>
            <p>Si no solicitaste este cambio, ignora este mensaje.</p>
            <div class="footer">
              <p>Steel Body Gym - Todos los derechos reservados</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    return transporter.sendMail(mailOptions);
  },

};

module.exports = EmailService;