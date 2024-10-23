// File: /backend/core/database/dbSeeding.js

const dbConnection = require('./connection');
const fs = require('fs');
const path = require('path');

const seedData = {
    users: JSON.parse(fs.readFileSync(path.join(__dirname, 'seedData/users.json'), 'utf8')),
    roles: JSON.parse(fs.readFileSync(path.join(__dirname, 'seedData/roles.json'), 'utf8')),
    permissions: JSON.parse(fs.readFileSync(path.join(__dirname, 'seedData/permissions.json'), 'utf8')),
};

async function seedDatabase() {
    try {
        // Connect to the database
        const connection = await dbConnection.connect();

        // Optional: Clear existing data before seeding
        await clearDatabase();

        console.log('Seeding database with initial data...');

        // Seed Users
        for (const user of seedData.users) {
            await connection.query('INSERT INTO users (id, name, email, password, role_id) VALUES ($1, $2, $3, $4, $5)', [
                user.id,
                user.name,
                user.email,
                user.password,
                user.role_id,
            ]);
        }

        // Seed Roles
        for (const role of seedData.roles) {
            await connection.query('INSERT INTO roles (id, name) VALUES ($1, $2)', [
                role.id,
                role.name,
            ]);
        }

        // Seed Permissions
        for (const permission of seedData.permissions) {
            await connection.query('INSERT INTO permissions (id, name, role_id) VALUES ($1, $2, $3)', [
                permission.id,
                permission.name,
                permission.role_id,
            ]);
        }

        console.log('Database seeding completed successfully.');
        await dbConnection.disconnect();
    } catch (error) {
        console.error('Error during database seeding:', error);
    }
}

async function clearDatabase() {
    try {
        const connection = await dbConnection.connect();

        console.log('Clearing database before seeding...');
        await connection.query('DELETE FROM users');
        await connection.query('DELETE FROM roles');
        await connection.query('DELETE FROM permissions');

        console.log('Database cleared successfully.');
    } catch (error) {
        console.error('Error while clearing the database:', error);
    }
}

module.exports = {
    seedDatabase,
    clearDatabase,
};
 
