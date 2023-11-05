
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
});

function populateChatRooms(chatRooms) {
    const chatRoomList = $('.chat-room-list');
    console.log(chatRooms.data);
    chatRooms.data.forEach(room => {
        const listItem = $('<li>').addClass('chat-room-list-item');
        listItem.text(room.name);
        chatRoomList.append(listItem);
    });
}