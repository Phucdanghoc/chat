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

    // Render the registration page
    registerIndex(req, res) {
        res.render('register');
    }

    // Handle user login
    async login(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err;
            if (!user) {
                req.flash('error', "Login failed");
                res.redirect(`/login`);
            } else {
                req.logIn(user, (err) => {
                    if (err) throw err;
                    req.flash('success', "Login Success");
                  
                    res.redirect(`/`);
                });
            }
        })(req, res, next);
    }
    // Handle user logout
    async logout(req, res) {
        try {
            req.logout(); // Log the user out
            const socketId = req.session.socketId;
            await new Promise((resolve, reject) => {
                req.session.destroy((err) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            res.clearCookie('connect.sid');
            if (socketId) {
                _io.to(socketId).emit('logout');
                _io.sockets.sockets[socketId].disconnect(true);
            }

            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).send("Error during logout");
        }
    }


    // Handle user registration
    async register(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        try {
            const hashedPassword = await Service.hashPassword(password);
            const user = await User.create({ username, password: hashedPassword });
            req.session.user = user;
            res.status(200).json({ message: "Registration completed!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Registration failed" });
        }
    }
}

module.exports = new AuthController();
