$(document).ready(function() {
    const messageInput = $("#message-input");
    const sendButton = $("#send-button");
    const chatMessages = $("#chat-messages");

    // Create a Socket.io connection
    const socket = io(); // Connect to the same host and port as the current web page

    // Handle Socket.io connection open
    socket.on("connect", () => {
        console.log("Socket.io connection established");
    });

    // Handle Socket.io messages received from the server
    socket.on("message", (message) => {
        const messageElement = $("<div>").addClass("message").text(message);
        chatMessages.append(messageElement);
    });

    // Handle Socket.io connection close
    socket.on("disconnect", () => {
        console.log("Socket.io connection closed");
    });

    sendButton.on("click", function() {
        let message = messageInput.val().trim();
        if (message !== "") {
            // Send the message to the Socket.io server
            socket.emit("message", message);
            messageInput.val("");
        }
    });
});
