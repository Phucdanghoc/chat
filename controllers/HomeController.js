class HomeController{
    index(req,res){
       
        res.render('chatroom1');
    }
}

module.exports = new HomeController()