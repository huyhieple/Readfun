"use strict";
$(document).ready(function () {
    $("#type").mouseenter(function () {
        $.ajax({
            url: "http://localhost:3000/get-categories",
            method: "GET",
            dataType: "json",
            success: function (data) {
                let menu = $("#category-list");
                menu.empty(); // Xóa nội dung cũ trước khi cập nhật
                
                let rowCount = 0;
                let row = $("<div class='row'></div>"); // Tạo dòng đầu tiên

                data.forEach((item) => {
                    let listItem = $("<p class='dropdown-item'></p>").text(item.type_name);
                    row.append(listItem);
                    rowCount++;

                    if (rowCount === 8) { // Khi đủ 8 mục, thêm vào menu và tạo dòng mới
                        menu.append(row);
                        row = $("<div class='row'></div>");
                        rowCount = 0;
                    }
                });

                if (rowCount > 0) {
                    menu.append(row); // Thêm dòng cuối cùng nếu chưa đủ 8 mục
                }

                menu.show(); // Hiển thị menu
            },
            error: function (xhr, status, error) {
                console.error("Lỗi tải thể loại:", error);
            },
        });
    });

    $("#type").mouseleave(function () {
        $("#category-list").hide(); // Ẩn menu khi rời chuột khỏi `#type`
    });
});
