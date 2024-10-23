// /backend/microservices/healthcare/models/patientModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Assuming there's a database configuration file

// Define the Patient model
const PatientModel = sequelize.define('Patient', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    medicalHistory: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    contactInfo: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
            isValid(value) {
                if (value && (typeof value !== 'object' || Array.isArray(value))) {
                    throw new Error('contactInfo must be a valid JSON object');
                }
            }
        }
    }
}, {
    timestamps: true,
    tableName: 'patients',
    indexes: [
        {
            fields: ['name']
        }
    ]
});

// Sync the model with the database
PatientModel.sync()
    .then(() => console.log('Patient table created successfully'))
    .catch((error) => console.error('Error creating patient table:', error));

module.exports = PatientModel;
