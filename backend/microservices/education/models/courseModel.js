// /backend/microservices/education/models/courseModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Assuming there's a database configuration file

// Define the Course model
const Course = sequelize.define('Course', {
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
                msg: 'Course name is required'
            },
            len: {
                args: [3, 100],
                msg: 'Course name must be between 3 and 100 characters'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Course description is required'
            },
            len: {
                args: [10, 1000],
                msg: 'Course description must be between 10 and 1000 characters'
            }
        }
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Course duration is required'
            },
            is: {
                args: /^[0-9]+ (weeks|months)$/,
                msg: 'Course duration must specify weeks or months (e.g., "8 weeks")'
            }
        }
    }
}, {
    tableName: 'courses',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['id']
        }
    ]
});

// Sync the model with the database
Course.sync()
    .then(() => console.log('Course table created successfully'))
    .catch((error) => console.error('Error creating course table:', error));

module.exports = Course;
