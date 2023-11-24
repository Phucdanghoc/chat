const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
class ChatRoomController {

    async index(req, res) {
        //
        const roomId = req.params.id;
        const chatroom = await ChatRoom
            .findOne({ _id: roomId })
        res.render('chatroom1', { _id: req.user._id, username: chatroom.name });
    }

    async getAll(req, res) {
        if (!req.isAuthenticated()) {
            res.status(400).json({ error: 'Login ?' });
        }
        const user = req.user
        const chatRooms = await ChatRoom.find({ members: user._id });
        res.status(200).json({ data: chatRooms });
    }
    async getMessageByChatRoom(req, res) {
        const roomId = req.params.id;
        const messages = await Message.find({ roomId: roomId }).sort({ timestamp: 1 }).exec();
        res.status(200).json({ messages });
    }


}

module.exports = new ChatRoomController();