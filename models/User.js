// models/User.js
const mongoose = require('mongoose');

// Define nested schemas first
const geoSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true }
});

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  suite: { type: String, required: true },
  city: {
    type: String,
    required: [true, 'City is required'],
    match: [/^[A-Za-z\s]+$/, 'City can only contain letters and spaces']
  },
  zipcode: {
    type: String,
    required: [true, 'Zip code is required'],
    match: [/^\d{5}-\d{4}$/, 'Zip code must match the format 12345-1234']
  },
  geo: { type: geoSchema, required: true }
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  catchPhrase: { type: String, required: true },
  bs: { type: String, required: true }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [4, 'Username must be at least 4 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    address: { type: addressSchema, required: true },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^1-\d{3}-\d{3}-\d{4}$/, 'Phone must match the format 1-123-123-1234']
    },
    website: {
      type: String,
      required: [true, 'Website is required'],
      match: [/^(http|https):\/\/[^ "]+$/, 'Website URL must start with http or https']
    },
    company: { type: companySchema, required: true }
  },
  { collection: 'usersdb' } // Explicitly define collection name
);

module.exports = mongoose.model('User', userSchema);
