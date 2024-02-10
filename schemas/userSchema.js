const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  referralBonus: {
    type: Number,
    default: 0
  },
  referral_code: {
    type: String,
    unique: true
  },
  parent_user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  children_user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  password: {
    type: String,
    required: true
  }
});

// Create a model from the schema
const Users = mongoose.model('User', userSchema);

module.exports = Users;
