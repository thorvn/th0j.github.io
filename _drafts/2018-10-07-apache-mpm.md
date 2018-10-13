---
layout: post
title:  "Tìm hiểu về Apache web server"
date:   2018-09-29 10:11:33 +0700
bigimg: /img/ruby.jpg
share-img: /img/ruby.jpg
tags: [programming, ruby, optimization]
---

### MPM là gì
MPM(Multi processing module) là cơ chế hoạt động của Apache, cơ chế này sẽ quyết định cách thức tiếp nhận và xử lý request từ client.
- Apache 2.4 hỗ trợ 3 modules: event, prefork, worker
- MPM không phải là module, nó được compile vs source code khi cài đặt
- Apache chỉ có thể chạy một MPM vào một thời điểm.

Xác định cơ chế của MPM(Multi processing module) apache
```bash
apache2 -V
```

- Prefork: Sử dụng nhiều child process với một thread. Tại một thời điểm thì mỗi process đó sẽ chỉ xử lý chỉ một request. Do đó Prefork cần nhiều tài nguyên hơn Worker và Event. Prefork là MPM mặc định của Apache
- Worker: Sử dụng nhiều child process với nhiều thread(multi-process, multi-threaded). Và mỗi thread sẽ xử lý một request tại một thời điểm. Worker có thể handle đc nhiều request hơn và cần ít tài nguyên hơn Prefork.
- Event: Event MPM dựa trên mô hình MPM worker, nên nó cũng gần giống với mpm worker. Cho phép truy cập và xử lý các yêu cầu bất đồng bộ (asynchronous).
Nó tạo ra nhiều child process, với nhiều thread. Mỗi parent process chịu trách nhiệm chạy các child process. Mỗi child process tạo ra một số lượng thread cố định (Số lượng thread được định nghĩa trong chỉ thị “ThreadsPerChild“).

### Bảo mật Apache

### References
- http://notes.viphat.work/toi-uu-kien-toan-va-bao-mat-apache
- http://forum.congdonglinux.vn/threads/prefork-vs-worker-for-apache.1021/