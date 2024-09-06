const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');
const seedDatabase = require('./dev-data/data/seed');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED REJECTION! SHUTTING DOWN...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

// MongoDB connection
let mongoServer;
let DB;

if (process.env.NODE_ENV === 'production') {
  // Use MongoDB Memory Server in production for demo
  mongoServer = new MongoMemoryServer();
  mongoServer.getUri().then((uri) => {
    mongoose.connect(uri).then(() => {
      console.log('Connected to in-memory MongoDB');
      seedDatabase(); // Seed the database with initial data on start
    });
  });
} else {
  // Connect to real MongoDB in non-demo environments
  DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB');
  });
}

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

// Connect to the appropriate database (in-memory or real MongoDB)

// // console.log(process.env);
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB).then(() => {
//   // const con = mongoose.connection;
//   // console.log('Full Connection Object:', con);
//   console.log('Connected successfully to MongoDB');
// });

// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

// process.on('unhandledRejection', (err) => {
//   console.log('UNHANDLED REJECTION! SHUTTING DOWN...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
