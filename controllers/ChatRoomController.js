const ChatRoom = require("../models/ChatRoom");

class ChatRoomController{
    index(req,res){
        res.render('chatroom');
    }
    async getAll(req,res){
        if (!req.session.user) {
            res.status(400).json({ error: 'Login ?' }); 
        }
        const user = req.session.user
        const chatRooms = await ChatRoom.find({ members: user._id });
        res.status(200).json({data: chatRooms});
    }
}

module.exports = new ChatRoomController();