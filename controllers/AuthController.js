const User = require("../models/User");
const Service = require("../services/AuthService");
const passport = require('passport');

class AuthController {
    // Render the login page
    loginIndex(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('login');
        }
    }
    // Handle user login
    async login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err;
            if (!user) {
                req.flash('error_msg', "Login failed");
                res.redirect(`/login`);
            } else {
                req.logIn(user, (err) => {
                    if (err) throw err;
                    req.flash('success_msg', "Login Success");
                    res.redirect(`/`);
                });
            }
        })(req, res, next);
    }
    // Handle user logout
    async logout(req, res) {
        req.logout(function(err) {
            if (err) {
              console.error(err);
            }
            res.redirect('/');
          });
    }
}

module.exports = new AuthController();
