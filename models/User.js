const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//unique pour rendre l'email d'inscription unique
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}); 

//application du validator avant d'en faire un model
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);