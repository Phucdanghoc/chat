const User = require('../models/User');
const Service = require('../services/AuthService');

const LocalStrategy = require('passport-local').Strategy;



module.exports = function (passport) {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Tên người dùng không tồn tại' });
            }

            if (await Service.comparePasswords(password, user.password)) {

                return done(null, user);
            }
            else {
                console.log("not pass");
                return done(null, false, { message: 'Mật khẩu không đúng' });
            }
        } catch (err) {
            console.log(err)
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
