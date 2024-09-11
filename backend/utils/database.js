// const mongoose = require('mongoose');

// // Function to replace placeholders in the URI
// const getDatabaseUri = () => {
//   const uri = process.env.DATABASE_URI;
//   const username = process.env.DATABASE_USERNAME;
//   const password = process.env.DATABASE_PASSWORD;

//   if (!uri || !username || !password) {
//     console.error(
//       'DATABASE_URI, DATABASE_USERNAME, or DATABASE_PASSWORD is not set.'
//     );
//     process.exit(1);
//   }

//   // Replace placeholders in the URI
//   return uri.replace('<USERNAME>', username).replace('<PASSWORD>', password);
// };

// const connectDatabase = async () => {
//   const DB = getDatabaseUri();

//   if (process.env.NODE_ENV === 'staging') {
//     console.log('Connecting to MongoDB staging environment...');
//   } else {
//     console.log('Connecting to MongoDB development environment...');
//   }

//   try {
//     await mongoose.connect(DB);
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1);
//   }
// };

// const closeDatabase = async () => {
//   await mongoose.connection.close();
//   console.log('MongoDB connection closed');
// };

// module.exports = { connectDatabase, closeDatabase };
