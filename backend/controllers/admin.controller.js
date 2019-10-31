const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const _ = require('lodash');
const Customer = mongoose.model("customer");
const Admin = mongoose.model('admin');

module.exports.register = (req, res, next) => {
    var admin = new Admin();
    admin.fullName = req.body.fullName;
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    passport.use(
        new localStrategy({ usernameField: 'email' },
            (username, password, done) => {
                Admin.findOne({ email: username },
                    (err, admin) => {
                        if (err)
                            return done(err);
                        // unknown user
                        else if (!admin)
                            return done(null, false, { message: 'Email is not registered' });
                        // wrong password
                        else if (!admin.verifyPassword(password))
                            return done(null, false, { message: 'Wrong password.' });
                        // authentication succeeded
                        else
                            return done(null, admin);
                    });
            })
    );
    // call for passport authentication
    passport.authenticate('local', (err, admin, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered Admin
        else if (admin) return res.status(200).json({ "token": admin.generateJwt() });
        // unknown Admin or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.adminProfile = (req, res, next) => {
    Admin.findById({ _id: req._id },
        (err, admin) => {
            // console.log(admin)
            if (!admin)
                return res.status(404).json({ status: false, message: 'Admin record not found.' });
            else
                return res.status(200).json({ status: true, result: _.pick(admin, ['fullName', 'email']) });
        }
    );
}

module.exports.customers = (req, res, next) => {
    Customer.find({},
        (err, doc) => {
            if (err)
                return res.status(404).json({ status: false });
            else
                return res.status(200).json({ status: true, result: doc});
        }
    );
}

module.exports.deleteCustomer = (req, res, next) => {
    let id = req.params.id
    Customer.findByIdAndDelete(id, (err, doc) => {
      if (err) {
        res.status(404).json({ status: false, messger: "not fount id" });
      }
      res.status(200).json({ status: true });
    })
}