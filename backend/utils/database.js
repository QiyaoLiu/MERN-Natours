const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDatabase = async () => {
  let DB;

  if (process.env.NODE_ENV === 'production') {
    // Use MongoDB Memory Server in production
    mongoServer = await MongoMemoryServer.create();
    DB = mongoServer.getUri();
    console.log('Using in-memory MongoDB');
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
    console.log('Using real MongoDB');
  }

  await mongoose.connect(DB);
  console.log('Connected to MongoDB');
};

const closeDatabase = async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
};

module.exports = { connectDatabase, closeDatabase };
