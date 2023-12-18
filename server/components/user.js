const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String, 
});//defiing user schema , email password.

const User = mongoose.model('User', userSchema);
//exporting user for use in login page
module.exports = User;