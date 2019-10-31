const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const _ = require("lodash");

const Customer = mongoose.model("customer");

module.exports.register = (req, res, next) => {
  console.log(req.body);
  var khachhang = new Customer();
  khachhang.name = req.body.name;
  khachhang.email = req.body.email;
  khachhang.phone = req.body.phone;
  khachhang.password = req.body.password;
  khachhang.address = req.body.address;
  khachhang.order = [];
  khachhang.transactionhistory = []
  // Customer.findOne({email : req.body.emai} , (err,doc) => {
  // if(!doc){
  //   khachhang.save((err, doc) => {
  //     console.log(err);
  //     if (!err) res.send(doc);
  //     else {
  //       if (err.code == 11000)
  //         res.status(422).send(["Duplicate email adrress found."]);
  //       else return res.status(400).json(err);
  //     }
  //   });
  // }
  // else{
  //   res.status(422).send(["Duplicate email adrress found."]);
  // }  
  // })
  khachhang.save((err, doc) => {
        if (!err) res.send(doc);
        else {
          if (err.code == 11000)
            res.status(422).send("Duplicate email adrress found.");
          else return res.status(400).json(err);
        }
      });
};

module.exports.authenticate = (req, res, next) => {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      (username, password, done) => {
        Customer.findOne({ email: username }, (err, kh) => {
          if (err) return done(err);
          // unknown user
          else if (!kh)
            return done(null, false, { email: false, message: "Email is not registered" });
          // wrong password
          else if (!kh.verifyPassword(password))
            return done(null, false, { password: false, message: "Wrong password." });
          // authentication succeeded
          else return done(null, kh);
        });
      }
    )
  );
  // call for passport authentication
  passport.authenticate("local", (err, kh, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (kh) return res.status(200).json({ token: kh.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.customerProfile = (req, res, next) => {
  Customer.findById({ _id: req._id }, (err, khachhang) => {
    if (!khachhang)
      res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else res.status(200).json({ status: true, result: _.pick(khachhang, ['address', 'email', 'name', 'phone', 'totalprice', 'order', 'createdAt']) });
  });
};
module.exports.putOrderCustomer = (req, res, next) => {
  Customer.findByIdAndUpdate(
    req._id,
    {
      $set: {
        order: req.body.order,
        totalprice: req.body.totalprice
      }
    },
    {
      new: true
    }
  ).exec((err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: "not fount id" });
    }
    res.status(200).json({ status: true });
  });
};
module.exports.putProfileCustomer = (req, res, next) => {
  Customer.findByIdAndUpdate(
    req._id,
    {
      $set: {
        name: req.body.name,
        emai: req.body.emai,
        phone: req.body.phone,
        address: req.body.address
      }
    },
    {
      new: true
    }
  ).exec((err, doc) => {
    if (err) {
      res.status(404).json({ status: false, messger: "not fount id" });
    }
    res.status(200).json({ status: true });
  });
};

module.exports.putTransactionHistoryCustomer = (req, res, next) => {
  const transactionhistory = {
    order: req.body.order,
    totalprice: req.body.totalprice
  }
  const update = {
    $set: { order: [], totalprice: 0 },
    $push: { transactionhistory: transactionhistory }
  };
  Customer.update(
    { _id: req._id },
    update,
    (err, doc) => {
      if (err) {
        res.status(404).json({ status: false, messger: err });
      }
      res.status(200).json({ status: true });
    }
  );
}
