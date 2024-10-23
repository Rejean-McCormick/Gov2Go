// Import necessary modules
const cors = require('cors');
const csrf = require('csurf');
const express = require('express');

// Environment-based configuration
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS || '*'; // Default to allow all if not set

// CORS Configuration Function
function configureCORS(app) {
    const corsOptions = {
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, // Allow cookies to be sent
    };

    app.use(cors(corsOptions));
    console.log('CORS policy configured.');
}

// CSRF Protection Function
function enableCSRFProtection(app) {
    const csrfProtection = csrf({
        cookie: true, // Enable CSRF protection with cookies
    });

    app.use(csrfProtection);

    // Middleware to handle CSRF token errors
    app.use((err, req, res, next) => {
        if (err.code === 'EBADCSRFTOKEN') {
            res.status(403).json({ message: 'Form tampered with or missing CSRF token' });
        } else {
            next(err);
        }
    });

    console.log('CSRF protection enabled.');
}

// Export functions for use in the application
module.exports = {
    configureCORS,
    enableCSRFProtection,
};
 
