---
layout: post
title:  "Khai thác lổ hổng ở thư viện open-uri"
date:   2018-8-03 00:11:33 +0700
bigimg: /img/openuri-3.jpg
share-img: /img/openuri-3.jpg
tags: [programming, security, rails, commad injection, open-uri]
---

### Open-uri

Nếu bạn là Rails developer thì mình nghĩ chắc bạn không còn xa lạ gì với thư viện này đâu phải ko?
Thông thường các bạn muốn đọc nội dung của một trang web thì các bạn sẽ làm như vầy phải ko?
![Open URI](/img/openuri.png)
Đoạn code tương tự như vậy bạn sẽ gặp ở rất nhiều các bài hướng dẫn trên mạng, các hướng dẫn về crawler bằng Ruby.
Ví dụ như:
- [Phan-tich-cu-phap-html](https://viblo.asia/p/phan-tich-cu-phap-html-voinokogiri-mrDGMJXOezL)
- [Viet-trinh-download-co-thanh-tien-trinh-voi-ruby](https://kipalog.com/posts/Viet-trinh-download-co-thanh-tien-trinh-voi-ruby)

Nhưng thử custom lại một chút xem sao. 
![Open URI](/img/openuri-1.png)

Ở đây thì thay vì hard code url mình đưa nó về  dạng params để truyền vào cho tiện thoai. Đoạn code có vẻ như vô hại nhỉ?

Nhưng hay cẩn thận, method `open` của `openuri` là một wrapper của `Kernel#open`, và method này giúp bạn thực thi một OS command. Và dựa vào đây attacker có thể remote code execution.
Lỗ hổng này được gọi là `command injection`. Các bạn muốn tìm hiểu thêm có thể google nhé!

### Command injection có gì nguy hiểm?
Giả sử mình có một api viết bằng Rails có routes là `{{domain}}/api/v1/fetchcontent?` như sau:
![Open URI](/img/openuri-2.png)

Vậy attacker có thể làm gì?
Attacker có thể chèn một OS command đằng sau params truyền lên bằng kí tự `|`. Giả sữ OS mình host trang web mình là Unix OS như Ubuntu thì mình có thể  gởi lên 1 request như vầy:

        https://tedstack.com/api/v1/fetchcontent?url=https://tedstack.com|cat ./config/database.yml

Thì mình đã có toàn bộ thông tin về database của website hiện tại.
Hoặc:

        https://tedstack.com/api/v1/fetchcontent?url=https://tedstack.com|rm /*

Chuyện gì xảy ra chắc bạn cũng hiểu.

Quyền hạn exec OS command dựa trên quyền hiện tại của `user` đang run website đó. Nếu website chạy trên quyền root thì chắc hiểu rồi hen.

Ngoài ra bạn có thể làm nhiều việc khác như tạo một user trong hệ thống và chiếm quyền điều khiển của hệ thống... Và sau đó làm gì tiếp theo thì.... tùy sự `sáng tạo` của bạn.

### Tổng kết
Đây là một lỗi cực kì nguy hiểm theo sự đánh giá của mình. Với lỗi này thì bạn thỏa sức sáng tạo với nhiều kịch bản tấn công khác nhau. Nếu bạn có kịch bản nào thú vị hơn thì chia sẻ với mình nhé.

Còn nếu project của bạn đang sử dụng `open-uri` thì hãy cẩn thận.

##### Bài viết mang tính chất trao đổi và học hỏi nên hi vọng bạn không dùng nó cho mục đích xấu.

### References:
- [https://nets.ec/Command_Injection](https://nets.ec/Command_Injection)
- [https://rorsecurity.info/portfolio/command-injection-in-rails](https://rorsecurity.info/portfolio/command-injection-in-rails)
- [https://twin.github.io/improving-open-uri/](https://twin.github.io/improving-open-uri)