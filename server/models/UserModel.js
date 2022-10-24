const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    givenName:{type: String},
    familyName:{type: String}, 
    email:{type: String, required:true, unique:true},
    password:{type: String},
    quote: { type: String },
  googleId: { type: String },
  imageUrl: { type: String },
})



const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;