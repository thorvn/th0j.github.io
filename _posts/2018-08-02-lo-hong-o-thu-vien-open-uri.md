---
layout: post
title:  "Lổ hổng ở thư viện open-uri"
date:   2018-8-02 00:11:33 +0700
bigimg: /img/chrome-min.jpg
share-img: /img/chrome-min.jpg
tags: [programming, security, rails]
---

### Open-uri

Nếu bạn là Rails developer thì mình nghĩ chắc bạn không còn xa lạ gì với thư viện này đâu phải ko?
Thông thường các bạn muốn đọc nội dung của một trang web thì các bạn sẽ làm như vầy phải ko?
![Open URI](/img/openuri.png)
Đoạn code tương tự như vậy bạn sẽ gặp ở rất nhiều các bài hướng dẫn trên mạng, các hướng dẫn về crawler bằng Ruby.
Ví dụ như:
- [phan-tich-cu-phap-html](https://viblo.asia/p/phan-tich-cu-phap-html-voinokogiri-mrDGMJXOezL)
- [https://kipalog.com/posts/Viet-trinh-download-co-thanh-tien-trinh-voi-ruby](https://kipalog.com/posts/Viet-trinh-download-co-thanh-tien-trinh-voi-ruby)

Nhưng thử custom lại một chút xem sao. 
![Open URI](/img/openuri-1.png)

Ở đây thì thay vì hard code url mình đưa nó về  dạng params để truyền vào cho tiện thoai. Đoạn code có vẻ như vô hại nhỉ?
Nhưng hay cẩn thận, method `open` của `openuri` là một wrapper của `Kernel#open`, và method này giúp bạn thực thi lệnh của hệ thống. Và dựa vào đây attacker có thể remote code execution.


### Exploitation
Giả sử mình có một api viết bằng Rails có routes là `{{domain}}/api/v1/fetchurl?` như sau:
![Open URI](/img/openuri-2.png)

Vậy attacker có thể làm gì?
Đơn giản mình gởi lên 1 request như vầy:
        https://tedstack.com/api/v1/fetchurl?url=|cat ./config/database.yml
Thì mình đã có toàn bộ thông tin về database của website hiện tại.
Hoặc:
        https://tedstack.com/api/v1/fetchurl?url=|rm /*
Chuyện gì xảy ra chắc bạn cũng hiểu.

Ngoài ra bạn có thể làm nhiều việc khác tùy bạn muốn gì thôi.
Lưu ý là quyền hạn exec dựa trên quuyền hiện tại của `user` đang run website của bạn. Nếu website chạy trên quyền root thì chắc hiểu rồi hen.


### References:
- https://nets.ec/Command_Injection
- https://rorsecurity.info/portfolio/command-injection-in-rails
- https://twin.github.io/improving-open-uri/