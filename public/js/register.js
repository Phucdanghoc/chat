$(document).ready(function () {
    $("#registrationForm").submit(function (event) {
        event.preventDefault(); // Ngăn chặn gửi form mặc định

        // Lấy giá trị từ các trường nhập liệu
        const username = $("#username").val();
        const password = $("#password").val();
        console.log(username,password);
        // Thực hiện kiểm tra và xử lý dữ liệu ở đây
        if (username && password ) {
            // Đây là nơi bạn có thể thực hiện gửi dữ liệu đăng ký lên máy chủ
            // Sử dụng $.ajax() hoặc $.post() để gửi dữ liệu đăng ký đến máy chủ
            $.ajax({
                url: "/auth/register",
                type: "POST",
                data: JSON.stringify({ username, password }),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#registrationMessage").text("Đăng ký thành công!");
                },
                error: function (error) {
                    $("#registrationMessage").text(error.error);
                    console.error("Lỗi khi gửi dữ liệu đăng ký:", error);
                }
            });
        } else {
            $("#registrationMessage").text("Vui lòng điền đầy đủ thông tin.");
        }
    });
});