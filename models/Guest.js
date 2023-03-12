const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const GuestSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type:  String,
    required: true,
  }

})


module.exports = mongoose.model('Guest', GuestSchema)
