$(document).ready(function () {
  const socket = io();
  const pathArray = window.location.pathname.split('/');
  const ROOMID = pathArray[pathArray.length - 1];
  const USERID = $('.modal-header p').text();
  const statusElement = $("#status");
  updateStatus(false);
  let date = null;
  $.ajax({
    url: `/api/v1/chatroom`,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      // Loop through the user data and populate the chat list
      const fisrtRoom = data.data[0]
      showRoomChat(fisrtRoom)
      const chatList = $('#chat-list');
      data.data.forEach(function (room) {
        const listItem = $('<li class="clearfix"></li>');
        listItem.append(`<img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar">`);
        const aboutDiv = $('<div class="about"></div>');
        aboutDiv.append(`<div class="name" data-id="${room._id}">${room.name}</div>`);
        listItem.append(aboutDiv);
        chatList.append(listItem);
      });
    },
    error: function () {
      console.error('Error loading user data.');
    }
  });
  function updateStatus(status) {
    if (status) {
      statusElement.text("Online").css("color", "green");
    } else {
      statusElement.text("Offline").css("color", "red");
    }
  }
  socket.on('user join',() =>{
    updateStatus(true);
  })
  
  socket.on('user left',() =>{
    updateStatus(false);
  })

  function showRoomChat() {
    socket.on('connect', () => {
      socket.emit('sendID', ROOMID);
    });
  }

  $.ajax({
    url: `/api/v1/chatroom/${ROOMID}`, // Replace with your API endpoint
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      populateChatHistory(data.messages);
    },
    error: function (error) {
      console.error('Error fetching chat history:', error);
    }
  });
  function populateChatHistory(messages) {
    const $chatHistory = $('.chat-history ul');
    $.each(messages, function (i, message) {
      if (date !== formatDateToDDMMYYYY(message.timestamp)) {
        console.log("ok");
        date = formatDateToDDMMYYYY(message.timestamp);
        $chatHistory.append(`
          <div class="centered-line">
        <p>${date}</p>
          </div>`);
      }
      const $li = $('<li>').addClass('clearfix');
      let messageType = [];
      if (message.userId == USERID) {
        messageType.push("text-right");
        messageType.push("other-message float-right");
        messageType.push(`<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
        `)
      } else {
        messageType.push("")
        messageType.push("my-message");
        messageType.push("")

      }
      $li.html(`
            <div class="message-data ${messageType[0]}">
                <span class="message-data-time">${formatDateToHHMM(message.timestamp)}</span>
                ${messageType[2]}
            </div>
            <div class="message ${messageType[1]}">${message.message}</div>
        `);
      $chatHistory.append($li);
    });
  }
  socket.on('new message', (msg) => {
    console.log(msg);
    if (msg.data.ROOMID == ROOMID) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      // Append the received message to the chat history
      $('.chat-history ul').append(`<li class="clearfix">
      <div class="message-data">
      <span class="message-data-time">${hours}:${minutes}</span>
  </div>
      <div class="message my-message">${msg.data.message}</div>
      </li>`);
    }
  })
  function sendMessage() {
    let message = $('#input-message').val(); // Replace with your actual input field ID or class
    if (message.trim() != '') {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      $('.chat-history ul').append(`<li class="clearfix">
    
      <div class="message-data text-right">
      <span class="message-data-time">${hours}:${minutes}</span>
      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
  </div>
  <div class="message other-message float-right ">${message}</div></li>`);
      socket.emit('new message', { message, ROOMID });
      $('#input-message').val('');
    }
  }
  function formatDateToDDMMYYYY(dateStr) {
    const dateObj = new Date(dateStr);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = dateObj.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }
  function formatDateToHHMM(dateStr) {
    const dateTime = new Date(dateStr);
    const hours = String(dateTime.getUTCHours()).padStart(2, '0');
    const minutes = String(dateTime.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`
  }

  // Event listener for your send button or enter key press
  $('#your-send-button-id').click(function () { // Replace with your send button ID or class
    sendMessage();
  });

  // Optionally, handle enter key press in the input field
  $('#input-message').keypress(function (e) {
    if (e.which == 13) { // Enter key pressed
      sendMessage();
    }
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', (data) => {
    console.log(data);
    showTypingStatus();
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', (data) => {
    hideTypingStatus();
  });

  function showTypingStatus() {
    $('#typing').show();
  }

  // Function to hide typing status
  function hideTypingStatus() {
    $('#typing').hide();
  }

  // Add event listener to your input field to detect typing
  $('#input-message').on('input', function () {
    if ($(this).val().trim() !== '') {
      socket.emit('typing')
    } else {
      socket.emit('stop typing')
    }
  });

});


