const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const chatMessages = document.getElementById('chatMessages');

  sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText !== '') {
      appendMessage('You', messageText);
      messageInput.value = '';
    }
  });
  function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span>${sender}:</span> <p>${message}</p>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }