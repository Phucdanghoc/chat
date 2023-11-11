const ChatRoom = require("../models/ChatRoom");
class ChatRoomController {

    async index(req, res) {
        //
        const roomId = req.params.id;
        try {
            const isMember = await ChatRoom
                .findOne({ _id: roomId, members: req.user._id })
                .exec();
        } catch (error) {
            console.log(error);
            res.render('404');
        }
        res.render('chatroom', { _id: req.user._id, username: req.user.username });
    }
    async getAll(req, res) {
        if (!req.isAuthenticated()) {
            res.status(400).json({ error: 'Login ?' });
        }
        const user = req.user
        const chatRooms = await ChatRoom.find({ members: user._id });
        res.status(200).json({ data: chatRooms });
    }


}

module.exports = new ChatRoomController();