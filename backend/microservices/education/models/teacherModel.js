// /backend/microservices/education/models/teacherModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Assuming there's a database configuration file

// Define the Teacher model
const Teacher = sequelize.define('Teacher', {
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
                msg: 'Teacher name is required'
            },
            len: {
                args: [3, 100],
                msg: 'Teacher name must be between 3 and 100 characters'
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
    assignedCourses: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: [],
        allowNull: true,
        validate: {
            isArray(value) {
                if (!Array.isArray(value)) {
                    throw new Error('Assigned courses must be an array of UUIDs');
                }
            }
        }
    }
}, {
    tableName: 'teachers',
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
Teacher.sync()
    .then(() => console.log('Teacher table created successfully'))
    .catch((error) => console.error('Error creating teacher table:', error));

module.exports = Teacher;
