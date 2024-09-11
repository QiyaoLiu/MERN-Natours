const dotenv = require('dotenv');
const path = require('path');
const app = require('./app');
const { connectDatabase, closeDatabase } = require('./utils/database');

// Load environment variables based on NODE_ENV
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
