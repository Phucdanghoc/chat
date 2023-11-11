$(document).ready(function () {
    const socket = io();
    const $messages = $('.messages');
    const $inputMessage = $('.inputMessage');
    const url = window.location.href;
    const parts = url.split('/');

    const roomId = parts[parts.length - 1]; // Assuming the ID is at the end of the URL
    socket.on('connect', () => {
        socket.emit('sendID', roomId); // Replace 'sendID' with your desired event name
    });
    // Function to add a message to the chat
    function addMessage(message) {
        const $messageDiv = $('<li class="message"/>').text(message);
        $messages.append($messageDiv);
    }

    // Handle sending a new message
    function sendMessage() {
        const message = $inputMessage.val();
        if (message.trim() !== '') {
            socket.emit('new message', {message,roomId});
            addMessage(`You: ${message}`);
            $inputMessage.val('');
        }
    }

    // Listen for new messages from the server
    socket.on('new message', (message) => {
        addMessage(message);
    });

    // Handle form submission to send a message
    $('form').submit(function () {
        sendMessage();
        return false; // Prevent the page from refreshing
    });

    // Handle Enter key press to send a message
    $inputMessage.keydown(function (event) {
        if (event.which === 13) {
            sendMessage();
        }
    });

    // lấy sự kiện từ server ./services/SocketService.js
    // bắt sự kiện từ đó rồi xử lí ở đây để hiện thị tin nhắn,
    //gửi tin nhắn về server, người dùng online
    // 
});
