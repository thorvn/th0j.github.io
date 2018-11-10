---
layout: post
title:  "Postman - Những điều có thể bạn biết rồi!!!"
date:   2018-8-25 10:11:33 +0700
bigimg: /img/tai-sao-tui-thich-veu-head.jpg
share-img: /img/tai-sao-tui-thich-veu-head.jpg
tags: [programming, progressive framwork, react, angular, vue, veu]
---

### Postman là gì?
Postman là một công cụ giúp chúng ta có thể test API dễ dàng hơn. Chúng ta có thể gọi HTTP request bằng nhiều methods khác nhau như: GET, POST, PUT, PATCH, DELETE... mà không cần phải viết bất kì dòng code nào. Ngoài ra Postman còn giúp chúng ta lưu trữ các request và share với nhiều người khác hoặc lưu trữ lại để sử dụng sau này. Tới đây thì có thể nhiều bạn biết rồi, nhưng mình sẽ share cho các bạn vài tricks để làm việc vs Postman hiệu quả nhất.

### Cài đặt và sử dụng
Cài đặt và cách sử dụng thì bạn có thể hỏi bác "Gồ" thêm vì nó khá đơn giản và có khá nhiều bài viết về vấn đề này cho nên mình sẽ không đi sâu. Mục tiêu của mình là các tricks thoai nhé.

### Biến môi trường

Thông thường khi phát triển một website sẽ có 3 môi trường khác nhau: `local`, 'staging', `production`. Mỗi một môi trường sẽ có các `domain`, `subdomain` hay `port` khác nhau, nói chung khác nhau gì thì tùy bạn thôi, nhưng mình sẽ gọi chung là khác nhau cái `base_url`. Khi chúng ta có 1 cái request mà muốn test trên 3 môi trường khác nhau thì ta phải tạo 3 cái request có thông số giống hệt nhau và khác nhau cái `base_url`. Điều này gây bất tiện khi test API do đó Postman cho phép chúng ta setup biến môi trường để setup những giá trị khác nhau cho từng môi trường một cách hiệu quả.

Như hình dưới đây thì mình đã setup 4 môi trường khác nhau trên Postman
![postman_3](/img/postman_3.jpg)

Ứng với mỗi môi trường thì mình đều setup các giá trị khác nhau
![postman_1](/img/postman_1.jpg)

Như trước đây nếu không sử dụng biến môi trường mình sẽ tạo 2 request và lưu lại ở collections như sau:
```
localhost:3000/api/v2/urls
123.com:3000/api/v2/urls
```
Nhưng sau khi đã setup biến môi trường cho Postman thì mình chỉ cần lưu 1 request cho collection là:
```
{{base_url}}/api/v2/urls
```
![postman_2](/img/postman_2.jpg)
Sau đó mình chỉ việc chọn môi trường và gởi request này đi, `base_url` sẽ được map vs giá trị `base_url` mà mình đã setup từ biến môi trường.

### Make Postman great again
