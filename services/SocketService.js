const User = require("../models/User");
const Message = require("../models/Message");
const ChatRoom = require("../models/ChatRoom");

 

class SocketService {
    async connection(socket) {
        let numUsers = 0;
        const userId = socket.request.session.passport.user;
        const user = await User.findById(userId);

        socket.username = user.username;
        socket.on('user join', () => {
            socket.broadcast.emit("user join")
        });

        // nhận tin nhắn và gửi về cho sv
        socket.on('new message', (data) => {
            console.log(data);
            Message.create({ message: data.message, userId: userId, roomId: data.ROOMID });
            socket.broadcast.emit('new message', {
                data
            });
        });

        socket.on('typing', () => {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        socket.on('stop typing', () => {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        });
    }
}


module.exports = new SocketService();
