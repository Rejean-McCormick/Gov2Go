// /backend/microservices/healthcare/models/doctorModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Assuming there's a database configuration file

// Define the Doctor model
const DoctorModel = sequelize.define('Doctor', {
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
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'doctors',
    indexes: [
        {
            fields: ['name']
        },
        {
            fields: ['specialty']
        }
    ]
});

// Sync the model with the database
DoctorModel.sync()
    .then(() => console.log('Doctor table created successfully'))
    .catch((error) => console.error('Error creating doctor table:', error));

module.exports = DoctorModel;
