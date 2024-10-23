// /backend/microservices/education/models/studentModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Assuming there's a database configuration file

// Define the Student model
const Student = sequelize.define('Student', {
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
                msg: 'Student name is required'
            },
            len: {
                args: [3, 100],
                msg: 'Student name must be between 3 and 100 characters'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Must be a valid email address'
            },
            notEmpty: {
                msg: 'Email is required'
            }
        }
    },
    enrolledCourses: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
        allowNull: true,
        validate: {
            isArray(value) {
                if (!Array.isArray(value)) {
                    throw new Error('Enrolled courses must be an array of UUIDs');
                }
            }
        }
    }
}, {
    tableName: 'students',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['id']
        },
        {
            unique: true,
            fields: ['email']
        }
    ]
});

// Sync the model with the database
Student.sync()
    .then(() => console.log('Student table created successfully'))
    .catch((error) => console.error('Error creating student table:', error));

module.exports = Student;