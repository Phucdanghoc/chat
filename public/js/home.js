
$(document).ready(function () {


    $.ajax({
        url: "/api/chatroom",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            populateChatRooms(data);
        },
        error: function (error) {
            console.error('Lỗi khi lấy danh sách phòng chat:', error);
        }
    });

    setTimeout(function () {
        $('#success-msg, #error-msg').fadeOut('slow');
    }, 5000);

});

function populateChatRooms(chatRooms) {
    const chatRoomList = $('#chat-room-list');
    console.log(chatRooms.data);
    chatRooms.data.forEach(room => {
        const listItem = $('<li>').addClass('list-group-item');
        const link = $('<a>')
            .attr('href', `/join/${room._id}`)
            .addClass('text-decoration-none text-dark')
            .text(room.name);
        listItem.append(link);
        chatRoomList.append(listItem);
    });
}
