const ChatRoom = require("../models/ChatRoom")

class HomeController{
    async index(req,res){
        const rooms = await ChatRoom.find({ members: { $in: [req.user._id] } })
        .sort({ lastTimeUpdate: -1 }) // Sort by lastTimeUpdate in descending order
        .exec();        
        console.log(rooms);
        res.redirect(`/join/${rooms[0]._id}`);
    }
}

module.exports = new HomeController()