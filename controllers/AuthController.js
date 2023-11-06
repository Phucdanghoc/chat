const User = require("../models/User");
const bcrypt = require('bcrypt');
const Service = require("../services/Service");
class AuthController{
    loginIndex(req,res){
        if (req.session.user ) {
            res.redirect('/');
        }
        res.render('login');
    }
    registerIndex(req,res){
        res.render('register');
    }
    async login(req,res){
        const { username, password } = req.body;
        if (!username && !password) {
            res.status(400).json({ error: 'Missing required fields' }); 
        }
        const user = await User.findOne({username : username});
        if (!user) {
            res.status(400).json({error: "User not found !"});
        }else if(await Service.comparePasswords(user.password)){
            req.session.user = user;
            res.status(200).json({message: "Login Completed !"});
        }else{
            res.status(400).json({error: "Password Invalid!"});
        }
        
    }
    async register(req,res){
        const { username, password } = req.body;
        if (!username && !password) {
            res.status(400).json({ error: 'Missing required fields' }); 

        }
        const hassPassword = await Service.hashPassword(password);
        const user = await User.create({username : username,password : hassPassword});
        if (user) {
            req.session.user = user;
            res.status(200).json({message: "Register Completed !"});
        }
        else{
            res.status(400).json({error: "Register Fail !"});
        }
    }
    async logout(req,res){
        req.session.destroy((err) => {
            if (err) {
              console.error('Error destroying session:', err);
              return res.status(500).send('Internal Server Error');
            }
            res.redirect('./login');
          });
        
    }
    
}

module.exports = new AuthController()