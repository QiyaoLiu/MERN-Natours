const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Load environment variables
dotenv.config({ path: './config.env' });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
  console.log(err.name, err.message);
  process.exit(1);
});

const startServer = async () => {
  let mongoServer;

  try {
    let DB;

    if (process.env.NODE_ENV === 'production') {
      // Use MongoDB Memory Server in production
      mongoServer = await MongoMemoryServer.create();
      DB = mongoServer.getUri();
      console.log('Using in-memory MongoDB (production)');
    } else {
      // Connect to actual MongoDB in development
      DB = process.env.DATABASE.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
      );
      if (!DB) {
        console.error('DATABASE environment variable is not set.');
        process.exit(1);
      }
      console.log('Using real MongoDB (development)');
    }

    await mongoose.connect(DB);
    console.log('Connected to MongoDB');

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

    // Clean up MongoDB Memory Server when the server shuts down
    process.on('SIGINT', async () => {
      if (mongoServer) {
        await mongoServer.stop();
      }
      mongoose.connection.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      if (mongoServer) {
        await mongoServer.stop();
      }
      mongoose.connection.close();
      process.exit(0);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();
