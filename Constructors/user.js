const mongoose = require('mongoose');

// Schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

const User = mongoose.model('User', userSchema, 'User_Storage');

module.exports = User;