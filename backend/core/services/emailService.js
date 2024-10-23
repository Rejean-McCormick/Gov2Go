// File: /backend/core/services/emailService.js

const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',  // Replace with your SMTP server
  port: 587,
  secure: false,  // Use TLS
  auth: {
    user: 'your-email@example.com',  // Replace with your email
    pass: 'your-email-password'  // Replace with your email password
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Log helper to track email status
const logStatus = (message) => {
  console.log(`${new Date().toISOString()} - ${message}`);
};

const emailService = {};

// Send verification email
emailService.sendVerificationEmail = (recipientEmail, verificationLink) => {
  const mailOptions = {
    from: '"Your Company" <no-reply@example.com>',
    to: recipientEmail,
    subject: 'Verify your account',
    text: `Please verify your account by clicking on the following link: ${verificationLink}`,
    html: `<p>Please verify your account by clicking on the following link: <a href="${verificationLink}">${verificationLink}</a></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logStatus(`Verification email failed to ${recipientEmail}: ${error.message}`);
      return;
    }
    logStatus(`Verification email sent to ${recipientEmail}: ${info.response}`);
  });
};

// Send password reset email
emailService.sendPasswordResetEmail = (recipientEmail, resetLink) => {
  const mailOptions = {
    from: '"Your Company" <no-reply@example.com>',
    to: recipientEmail,
    subject: 'Password Reset Request',
    text: `You can reset your password using the following link: ${resetLink}. This link will expire in 30 minutes.`,
    html: `<p>You can reset your password using the following link: <a href="${resetLink}">${resetLink}</a>. This link will expire in 30 minutes.</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logStatus(`Password reset email failed to ${recipientEmail}: ${error.message}`);
      return;
    }
    logStatus(`Password reset email sent to ${recipientEmail}: ${info.response}`);
  });
};

// Send notification email
emailService.sendNotificationEmail = (recipientEmail, subject, messageBody) => {
  const mailOptions = {
    from: '"Your Company" <no-reply@example.com>',
    to: recipientEmail,
    subject: subject,
    text: messageBody,
    html: `<p>${messageBody}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logStatus(`Notification email failed to ${recipientEmail}: ${error.message}`);
      return;
    }
    logStatus(`Notification email sent to ${recipientEmail}: ${info.response}`);
  });
};

module.exports = emailService;
 
