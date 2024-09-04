const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const User = require('../models/userModel');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Endpoint to get roles
router.get('/roles', async (req, res) => {
  try {
    // Fetch unique roles from the database
    const roles = await User.distinct('role');

    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching roles',
    });
  }
});

//Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get(
  '/me',

  userController.getMe,
  userController.getUser
);
router.patch('/updateMe', userController.updateMe);
router.delete('/pauseMe', userController.pauseMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
