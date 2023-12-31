$(document).ready(function () {
    $("#registrationForm").submit(function (event) {
        event.preventDefault(); // Ngăn chặn gửi form mặc định

        // Lấy giá trị từ các trường nhập liệu
        const username = $("#username").val();
        const password = $("#password").val();
        // Thực hiện kiểm tra và xử lý dữ liệu ở đây
        if (username && password ) {
            // Đây là nơi bạn có thể thực hiện gửi dữ liệu đăng ký lên máy chủ
            // Sử dụng $.ajax() hoặc $.post() để gửi dữ liệu đăng ký đến máy chủ
            $.ajax({
                url: "/auth/login",
                type: "POST",
                data: JSON.stringify({ username, password }),
                contentType: "application/json; charset=utf-8",
                success: function (respone) {
                    console.log(respone);
                    window.location.href = '/';
                },
                error: function (error) {
                    $("#registrationMessage").text(error.error);
                    console.error("Lỗi khi gửi dữ liệu đăng nhập:", error);
                }
            });
        } else {
            $("#registrationMessage").text("Vui lòng điền đầy đủ thông tin.");
        }
    });
});