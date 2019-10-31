const admin = require('../models/admin.model');
const mongoose = require('mongoose');

const url = 'mongodb://localhost/WebBanHang'
mongoose.connect(url, { useNewUrlParser: true });

let newAdmin = new admin({
  fullName: "admin",
  email: "admin@gmail.com",
  password: 123456,
})
//email : admin@gmail.com
//password : 123456
newAdmin.save((err,doc) => {
  if (err) {
   console.log(err)
  }
  mongoose.disconnect();
})
