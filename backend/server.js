const dotenv = require('dotenv');
const path = require('path');
const app = require('./app');
const { connectDatabase, closeDatabase } = require('./utils/database');
const cron = require('node-cron');
const { exec } = require('child_process');

// Load environment variables
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
  console.log(err.name, err.message);
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDatabase();

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });

    process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! SHUTTING DOWN...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Set up a cron job to reset the database periodically
    cron.schedule('0 0 * * *', () => {
      // This example runs daily at midnight
      console.log('Running scheduled task to reset database...');
      exec('node seed.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing seed.js: ${error}`);
          return;
        }
        console.log(`seed.js output: ${stdout}`);
        if (stderr) {
          console.error(`seed.js error: ${stderr}`);
        }
      });
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('SIGTERM or SIGINT received, shutting down gracefully...');
      await closeDatabase();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();
