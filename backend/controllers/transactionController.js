const mongoose = require('mongoose');

// Middleware to start a transaction
exports.startTransaction = async (req, res, next) => {
  console.log('Starting transaction...');
  req.session = await mongoose.startSession();
  req.session.startTransaction();
  next();
};

// Middleware to commit or rollback the transaction
exports.endTransaction = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      // Rollback the transaction in demo mode
      await req.session.abortTransaction();
      console.log('Transaction rolled back (no changes saved)');
    } else {
      // Commit the transaction for production
      await req.session.commitTransaction();
      console.log('Transaction committed (changes saved)');
    }
  } catch (error) {
    // If an error occurs, abort the transaction
    console.error('Transaction aborted due to an error', error);
    await req.session.abortTransaction();
  } finally {
    req.session.endSession();
    next();
  }
};
