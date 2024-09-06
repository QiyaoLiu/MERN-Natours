const fs = require('fs');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

// Read JSON files
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// Seed database function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();

    // Seed data
    await User.create(users);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Failed to seed database:', err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Connect to MongoDB and start the seeding process
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
