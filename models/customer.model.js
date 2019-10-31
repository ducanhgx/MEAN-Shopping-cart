const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const product = require("./product.model");
var customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Full name can't be empty"
  },
  email: {
    type: String,
    required: "Email can't be empty",
    unique: true
  },
  password: {
    type: String,
    required: "Password can't be empty",
    minlength: [4, "Password must be atleast 4 character long"]
  },
  phone: {
    type: String,
    required: "phone can't be empty"
  },
  address: {
    type: String,
    required: "address can't be empty",
  },
  order: [
    {
      item: {
        type: Object,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalprice: {
    type: Number,
    required: true,
    default: 0
  },
  transactionhistory: [
    {
      order: [
        {
          item: {
            type: Object,
            required: true
          },
          qty: {
            type: Number,
            required: true
          },
          price: {
            type: Number,
            required: true
          }
        }
      ],
      totalprice: {
        type: Number,
        required: true,
      },
      createAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  saltSecret: String
});
customerSchema.set("timestamps", true);
// Custom validation for email
customerSchema.path("email").validate(val => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

// Events
customerSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
customerSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

customerSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP
  });
};

mongoose.model("customer", customerSchema);
