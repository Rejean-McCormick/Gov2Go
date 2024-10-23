// /backend/microservices/government/models/taxModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Assuming there's a database configuration file

// Define the Tax model
const TaxModel = sequelize.define('Tax', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    citizenId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'citizens',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    income: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: 'Income must be a decimal value'
            },
            min: {
                args: [0],
                msg: 'Income must be a positive value'
            }
        }
    },
    taxAmount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: 'Tax amount must be a decimal value'
            },
            min: {
                args: [0],
                msg: 'Tax amount must be a positive value'
            }
        }
    }
}, {
    timestamps: true,
    tableName: 'taxRecords',
    indexes: [
        {
            fields: ['citizenId']
        }
    ]
});

// Sync the model with the database
TaxModel.sync()
    .then(() => console.log('Tax table created successfully'))
    .catch((error) => console.error('Error creating tax table:', error));

module.exports = TaxModel;
