const ChatRoom = require("../models/ChatRoom")
const User = require("../models/User")
const Service = require("../services/Service");

class Test{
    async index(req,res){
        try {
            // Tạo 2 người dùng
            const user1 = await User.create({ username: 'user1', password: await Service.hashPassword('user1') });
            const user2 = await User.create({ username: 'user2', password: await Service.hashPassword('user2') });
            const user3 = await User.create({ username: 'user3', password: await Service.hashPassword('user3') });
    
            // Tạo 2 phòng chat
            const chatRoom1 = await ChatRoom.create({
                name: 'Chat Room 1',
                description: 'Description for Chat Room 1',
                members: [user1._id], // Phòng chat này có 1 thành viên
            });
            
            const chatRoom2 = await ChatRoom.create({
                name: 'Chat Room 2',
                description: 'Description for Chat Room 2',
                members: [user1._id, user2._id, user3._id], // Phòng chat này có 3 thành viên
            });
    
            console.log('Chat rooms and users created successfully');
        } catch (error) {
            console.error('Error creating chat rooms and users:', error);
        } 
    }
}

module.exports = new Test()