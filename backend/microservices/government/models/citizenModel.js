// /backend/microservices/government/models/citizenModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Assuming there's a database configuration file

// Define the Citizen model
const CitizenModel = sequelize.define('Citizen', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Citizen name is required'
            },
            len: {
                args: [3, 100],
                msg: 'Citizen name must be between 3 and 100 characters'
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 255],
                msg: 'Address cannot exceed 255 characters'
            }
        }
    },
    idNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'ID Number is required'
            },
            len: {
                args: [6, 20],
                msg: 'ID Number must be between 6 and 20 characters'
            }
        }
    }
}, {
    timestamps: true,
    tableName: 'citizens',
    indexes: [
        {
            unique: true,
            fields: ['idNumber']
        }
    ]
});

// Sync the model with the database
CitizenModel.sync()
    .then(() => console.log('Citizen table created successfully'))
    .catch((error) => console.error('Error creating citizen table:', error));

module.exports = CitizenModel;
