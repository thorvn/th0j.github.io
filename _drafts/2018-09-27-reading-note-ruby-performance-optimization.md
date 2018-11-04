---
layout: post
title:  "READING NOTE - Ruby Performance Optimization - Lỗi phổ biến về performance trong Ruby"
date:   2018-09-03 10:11:33 +0700
bigimg: /img/ruby.jpg
share-img: /img/ruby.jpg
tags: [programming, ruby, optimization]
---

### Tối ưu iterators

Iterators của Ruby có 2 vấn đề gây ảnh hưởng tới performance:
- Ruby GC sẽ không giải phóng object mà đang được iterating trước khi iterator kết thúc. Điều này có nghĩa là nếu bạn có một list các objects trong bộ nhớ thì nó sẽ được giữ lại ngay cả khi bạn không cần nó nữa.
- Iterators là functions do đó nó sẽ tạo ra các objects tạm ở behind the scences. Điều này làm tăng công việc cho GC và ảnh hưởng tới performance.

### Tránh iterators tạo thêm objects
- `each_with_index` làm tăng gấp đôi số lượng object
Những Ruby functions phổ biến làm chậm ứng dụng của bạn và những function thay thế nhưng có tốc độ nhanh hơn.

|      Iterator    | Enum | Array | Range |      Iterator    | Enum | Array | Range |
|------------------|----- |------ | ----- |------------------|----- |------ | ----- |
|        all       |  3   |   3   |   3   |        fill      |  0   |   -   |   -   |
|        any?      |  3   |   3   |   3   |        fill      |  0   |   -   |   -   | 
|        collect   |  3   |   3   |   3   |        fill      |  0   |   -   |   -   | 
|        all       |  3   |   3   |   3   |        fill      |  0   |   -   |   -   | 
| each_with_object |  3   |   3   |   3   |        fill      |  0   |   -   |   -   | 

NOTE: page 30

#### Date#parse
```ruby
require 'date' require 'benchmark'
date = "2014-05-23"
time = Benchmark.realtime do
100000.times do Date.parse(date)
end end
puts "%.3f" % time
```
```bash
$ ruby date_parsing1.rb
0.833
```
Giải pháp thay thế tốt hơn
```ruby
require 'date' require 'benchmark'
date = "2014-05-23"
time = Benchmark.realtime do
100000.times do Date.strptime(date, '%Y-%m-%d')
end end
puts "%.3f" % time
```

```bash
$ ruby date_parsing2.rb
0.182
```
Nhanh hơn 4.6 lần đúng ko nào.

```ruby
require 'date' require 'benchmark'
date = "2014-05-23"
time = Benchmark.realtime do
100000.times do
Date.civil(date[0,4].to_i, date[5,2].to_i, date[8,2].to_i)
end end
puts "%.3f" % time
```
```bash
$ ruby date_parsing3.rb
0.108
```