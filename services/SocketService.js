const User = require("../models/User");
const Message = require("../models/Message");
const ChatRoom = require("../models/ChatRoom");

class SocketService {
    async connection(socket) {
        let numUsers = 0;
        let roomId;
        const userId = socket.request.session.passport.user;
        const user = await User.findById(userId);

        socket.username = user.username;
        socket.on('sendID', (id) => {
            roomId = id;
            console.log('Received ID:', id);
        });
        
        if (!roomId) {
            return;
        }

        // nhận tin nhắn và gửi về cho sv
        socket.on('new message', async (data) => {
            await Message.create({ message: data.message, userId: userId, roomId: data.roomId });
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
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
            if (addedUser) {
                --numUsers;

                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });
    }
}


module.exports = new SocketService();
