// controllers/userController.js

const User = require('../models/User');

// Handle creating a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json({
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    // If validation fails, Mongoose throws an error
    return res.status(400).json({
      message: 'Failed to create user',
      error: error.message,
    });
  }
};
