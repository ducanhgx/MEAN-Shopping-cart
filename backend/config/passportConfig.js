const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const KH = mongoose.model('customer');
passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            KH.findOne({ email: username },
                (err, kh) => {
                    console.log(kh)
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!kh)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!kh.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, kh);
                });
        })
);


// const admin = mongoose.model('admin');
// passport.use(
//     new localStrategy({ usernameField: 'email' },
//         (username, password, done) => {
//             console.log(username)
//             admin.findOne({ email: username },
//                 (err, admin) => {
//                     if (err)
//                         return done(err);
//                     // unknown user
//                     else if (!admin)
//                         return done(null, false, { message: 'Email is not registered' });
//                     // wrong password
//                     else if (!admin.verifyPassword(password))
//                         return done(null, false, { message: 'Wrong password.' });
//                     // authentication succeeded
//                     else
//                         return done(null, admin);
//                 });
//         })
// );