---
layout: post
title:  "READING NOTE - Ruby Performance Optimization - Tại sao Ruby chậm"
date:   2018-09-03 10:11:33 +0700
bigimg: /img/ruby.jpg
share-img: /img/ruby.jpg
tags: [programming, ruby, optimization]
---

### Tối ưu iterators

Iterators của Ruby có 2 vấn đề gây ảnh hưởng tới performance:
- Ruby GC sẽ không giải phóng object mà đang được iterating trước khi iterator kết thúc. Điều này có nghĩa là nếu bạn có một list các objects trong bộ nhớ thì nó sẽ được giữ lại ngay cả khi bạn không cần nó nữa.
- Iterators là functions do đó nó sẽ tạo ra các objects tạm ở behind the scences. Điều này làm tăng công việc cho GC và ảnh hưởng tới performance.
