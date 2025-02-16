// scripts/importUsers.js
require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../models/User'); // Ensure path is correct
const connectDB = require('../config/db'); // Import DB connection

const importData = async () => {
  try {
    await connectDB();

    // Read JSON file
    const data = fs.readFileSync('./UsersData.json', 'utf8');
    const users = JSON.parse(data);

    // Clear existing data before importing (optional)
    await User.deleteMany();
    console.log('Existing users removed.');

    // Insert new data
    await User.insertMany(users);
    console.log('Users imported successfully!');
    process.exit();
  } catch (err) {
    console.error(`Error importing users: ${err.message}`);
    process.exit(1);
  }
};

importData();
