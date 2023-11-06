$(document).ready(function () {
    const messageInput = $("#message-input");
    const sendButton = $("#send-button");
    const chatMessages = $("#chat-messages");
    const userId = $("h1").attr("data-id");

    // Create a Socket.io connection
    const socket = io();

    // Đăng nhập với tên người dùng
    const username = 'User1'; // Thay bằng tên người dùng của bạn
    socket.emit('setUsername', username);

    // Tham gia phòng chat
    const currentURL = window.location.href;

    // Tìm vị trí của "join/" trong URL
    const joinIndex = currentURL.indexOf("/join/");

    const roomId = currentURL.substring(joinIndex + 6); // +6 để bỏ qua "join/"
    console.log("roomId:", roomId);

    socket.emit('joinRoom', roomId);

    // Handle Socket.io messages received from the server
    socket.on('messageReceived', (message) => {
        const messageElement = $("<div>").addClass("message").text(message);
        chatMessages.append(messageElement);
    });

    // Handle Socket.io connection close
    socket.on("disconnect", () => {
        console.log("Socket.io connection closed");
    });

    sendButton.on("click", function () {
        let message = messageInput.val().trim();
        if (message !== "") {
            // Send the message to the Socket.io server
            socket.emit("chatMessage", { roomId, message,userId });
            messageInput.val("");
        }
    });
});
