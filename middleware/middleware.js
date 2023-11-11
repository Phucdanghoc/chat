class Middleware{
    auth(req,res,next){
        try {
            if (req.isAuthenticated()) {
                next()
            }else{
                res.redirect('/auth/login');
            }
        } catch (error) {
            res.redirect('/auth/login');
        }
    }
    
}

module.exports = new Middleware()