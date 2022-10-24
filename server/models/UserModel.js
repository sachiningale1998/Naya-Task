const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{type: String},
    lastName:{type: String}, 
    email:{type: String, required:true, unique:true},
    password:{type: String},
    quote: { type: String },
  familyName: { type: String },
  givenName: { type: String },
  googleId: { type: String, unique: true  },
  imageUrl: { type: String },
})



const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;