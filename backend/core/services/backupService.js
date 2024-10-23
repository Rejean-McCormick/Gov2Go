// File: /backend/core/services/backupService.js

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

// Backup service to manage database and file backups
const backupService = {};

// Helper function to log status of backup or restore
const logStatus = (message) => {
  console.log(`${new Date().toISOString()} - ${message}`);
};

// Function to create a database backup
backupService.createDatabaseBackup = (dbConnectionDetails, backupPath) => {
  const backupFile = path.join(backupPath, `db-backup-${Date.now()}.sql.gz`);
  
  // Example for a MySQL database backup command
  const backupCommand = `mysqldump -u ${dbConnectionDetails.user} -p${dbConnectionDetails.password} ${dbConnectionDetails.database} | gzip > ${backupFile}`;
  
  exec(backupCommand, (error) => {
    if (error) {
      logStatus(`Database backup failed: ${error.message}`);
      return;
    }
    logStatus(`Database backup created at ${backupFile}`);
  });
};

// Function to create a file system backup
backupService.createFileBackup = (directories, backupPath) => {
  const archiveFile = path.join(backupPath, `file-backup-${Date.now()}.tar.gz`);
  
  const tarCommand = `tar -czf ${archiveFile} ${directories.join(' ')}`;
  
  exec(tarCommand, (error) => {
    if (error) {
      logStatus(`File backup failed: ${error.message}`);
      return;
    }
    
    // Optional encryption step
    const encryptionKey = 'your-encryption-key';  // Replace with a secure key
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    
    const input = fs.createReadStream(archiveFile);
    const output = fs.createWriteStream(`${archiveFile}.enc`);
    
    input.pipe(cipher).pipe(output);
    
    output.on('finish', () => {
      logStatus(`File backup created and encrypted at ${archiveFile}.enc`);
    });
  });
};

// Function to restore a backup
backupService.restoreBackup = (backupType, backupLocation) => {
  if (backupType === 'database') {
    const restoreCommand = `gunzip < ${backupLocation} | mysql -u user -p password database`; // Adjust details
    
    exec(restoreCommand, (error) => {
      if (error) {
        logStatus(`Database restore failed: ${error.message}`);
        return;
      }
      logStatus('Database restored successfully.');
    });
    
  } else if (backupType === 'file') {
    const decryptionKey = 'your-encryption-key';  // Replace with the decryption key used earlier
    const decipher = crypto.createDecipher('aes-256-cbc', decryptionKey);
    
    const input = fs.createReadStream(`${backupLocation}.enc`);
    const output = fs.createWriteStream(backupLocation.replace('.enc', ''));
    
    input.pipe(decipher).pipe(output);
    
    output.on('finish', () => {
      const extractCommand = `tar -xzf ${backupLocation.replace('.enc', '')}`;
      
      exec(extractCommand, (error) => {
        if (error) {
          logStatus(`File restore failed: ${error.message}`);
          return;
        }
        logStatus('File backup restored successfully.');
      });
    });
  }
};

module.exports = backupService;
 
