const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true}, 
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    name:{type: String},
    quote: { type: String },
  familyName: { type: String },
  givenName: { type: String },
  googleId: { type: String },
  imageUrl: { type: String },
})

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;