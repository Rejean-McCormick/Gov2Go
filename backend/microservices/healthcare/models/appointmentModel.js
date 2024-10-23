// /backend/microservices/healthcare/models/appointmentModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Assuming there's a database configuration file

// Define the Appointment model
const AppointmentModel = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'patients',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    doctorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'doctors',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    appointmentTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'appointmentTime must be a valid date'
            }
        }
    }
}, {
    timestamps: true,
    tableName: 'appointments',
    indexes: [
        {
            fields: ['patientId']
        },
        {
            fields: ['doctorId']
        }
    ]
});

// Sync the model with the database
AppointmentModel.sync()
    .then(() => console.log('Appointment table created successfully'))
    .catch((error) => console.error('Error creating appointment table:', error));

module.exports = AppointmentModel;
