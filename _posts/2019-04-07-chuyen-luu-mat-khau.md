---
layout: post
title: 'Chuyện lưu mật khẩu'
date: 2019-04-07 00:11:33 +0700
bigimg: /img/password.jpg
share-img: /img/password.jpg
tags: [programming]
---

Hiện nay với sự phát triển của các framework được dựng sẵn tất cả mọi thứ nên hầu hết mọi người chỉ làm theo cách rập khuôn và ít quan tâm tới câu hỏi TẠI SAO? Các Rails devs chắc ko xa lạ gì với `gem brcypt` để mã hóa password đâu nhỉ? Nhưng các bạn có thắc mắc rằng `brcypt` là gì và tại sao lại là `brcypt` không?

# 1. Hash hay Encrypt?
Hash là mã hóa 1 chiều, không thể suy từ hash value ra password được. Encrypt là mã hóa 2 chiều. Do đó nếu dùng encrypt thì luôn tồn tại cách giải mã và chúng ta cần quan tâm tới việc để chìa khóa như thế nào cho an toàn.
Do đó để lưu mật khẩu tốt nhất nên dùng các giải thuật hash ví dụ như: md5, sha2, brcypt, scrypt... Và không nên sử dụng các giải thuật encrypt như RSA...

# 2. Hash liệu có đủ an toàn?

Mặc dù hash là mã hóa 1 chiều nhưng hash vẫn có thể bị tấn công gián tiếp bằng cách brute-force attach hay dictionary attach. Nếu chúng ta chỉ hash password thì nếu user đặt trùng password vs nhau sẽ có chuỗi hash giống nhau, từ đó attacker càng dễ dàng đoán được những mật khẩu thông dụng của người dùng và khi brute-force được một password thì các password còn tại cũng bị lộ.

Để khắc phục việc này thì `salt` ra đời. Mục đích của `salt` là khắc phục các điểm yếu trên. Thay vì hash(password) thì chúng ta nên đổi thành hash(salt + pasword) hay hash(pasword + salt). Ví dụ: hash(8nMQLcQJ0vsBzIW + 123456).
Vị trí đặt salt cũng sẽ gây khó dễ cho attackers, salt làm mật khẩu của user mạnh hơn và khi chuỗi salt này random cho từng user thì sẽ đảm bảo cho users có chuỗi hash khác nhau mặc dù cùng mật khẩu. Điều này gây ra khó khăn cho attackers rất nhiều.

# 3. Có phải lúc nào nhanh cũng tốt?
Với tốc độ phát triển của CPU, GPU thì các giải thuật hash như md5, sha1, sha2... sẽ bị brute force hàng triệu phép thử mỗi giây. Nếu bạn dùng những giải thuật này thì với cấu hình máy mạnh thì attacker có thể dễ dàng bruteforce mật khẩu của bạn.
Vậy thì phải làm thế nào? Hãy sử dụng những giải thuật slow hash như bcrypt,scrypt... Bcrypt có tốc độ hash khá chậm, chậm hơn khoảng vài ngàn lần so với sha1. Nên nếu bạn dùng bcrypt thì bạn đã giảm thiểu được khả năng bruteforce của attackers.

# 4. Tổng kết
Bcrypt gem đã bao gồm việc hash password cùng với salt và là một slow hash nên
theo mình đây là một công cụ tuyệt vời để hash password cho ứng dụng Rails của bạn.