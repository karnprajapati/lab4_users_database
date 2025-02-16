const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Define the POST route to insert a user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create user',
      error: error.message
    });
  }
});

// ✅ Define the GET route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching users',
      error: err.message
    });
  }
});

module.exports = router;
