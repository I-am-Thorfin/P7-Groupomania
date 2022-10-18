const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  lastname : { type: String, required: true },
  firstname : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isadmin : {type: Boolean, required: false, default: false },
  avatar : { type: String, required: false, default : "http://localhost:8000/images/default/avatardefault.png"
}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);