---
layout: post
title:  "READ NOTE - Ruby Performance Optimization - Tại sao Ruby chậm"
date:   2018-09-03 10:11:33 +0700
bigimg: /img/ruby.jpg
share-img: /img/ruby.jpg
tags: [programming, ruby, optimization]
---

### Tại sao Ruby chậm?

```ruby
require "benchmark"

num_rows = 100000
num_cols = 10
data = Array.new(num_rows) { Array.new(num_cols) { "x" * 1000 } }

time = Benchmark.realtime do
  csv = data.map { |row| row.join(",") }.join("\n")
end
puts time.round(2)
```

Chạy đoạn chương trình trên với các version Ruby khác nhau thử xem ví dụ: 1.9.3, 2.0, 2.1, và 2.2.

|                 | 1.9.3 | 2.0   | 2.1   | 2.2 |
|-----------------|-------|-------|-------|-----|
| Execution time  | 9.18  | 11.42 | 2.56  |2.43 |

Các bạn có thể thấy ở các version cũ của Ruby như 1.9.3 và 2.0 thì đoạn code trên chạy cực kì chậm. Nhưng điều gì khiến nó chậm như vậy?

Chúng ta thử chạy lại đoạn chương trình trên nhưng disable GC thử xem nhé:

```ruby
require "benchmark"

num_rows = 100000
num_cols = 10
data = Array.new(num_rows) { Array.new(num_cols) { "x"*1000 } }

GC.disable

time = Benchmark.realtime do
  csv = data.map { |row| row.join(",") }.join("\n")
end
puts time.round(2)
```

|                       | 1.9.3 | 2.0   | 2.1   | 2.2  |
|-----------------------|-------|-------|-------|------|
| GC enabled            | 9.18  | 11.42 | 2.56  | 2.43 |
| GC disabled           | 1.14  | 1.15  | 1.19  | 1.16 |
| % thời gian GC xử lý  | 88%   | 90%   | 55%   | 52%  |

Bạn có thấy tại sao code chậm không? Chương trình của chúng ta dành đa số thời gian vào việc xử lý ở GC. Khoảng 90% ở các Ruby version cũ và 50% ở Ruby version mới hơn.

Có phải là Ruby GC chậm hay do source code chúng ta tiêu tốn quá nhiều memory? Câu trả lời là cả 2.

Việc tiêu tốn quá nhiều memory là bản chất của Ruby. Đây là một hiệu ứng phụ của cách thiết kế ngôn ngữ này. "Everything is an object" có nghĩa là chương trình cần rất nhiều bộ nhớ để represent Ruby object. Ngoài ra việc GC chậm là vấn đề rất lớn trong việc phát triển Ruby, cũng rất may mắn là ở các version mới thì tốc độ GC được cải thiện đáng kể nhờ có Ruby virtual machine(VM) để precompiled code, ở các version cũ hơn thì không có VM mà đi qua syntax tree.

### Tối ưu bộ nhớ

Tiêu thụ bộ nhớ nhiều là điều khiến Ruby chậm. Để tối ưu thì chúng ta cần giảm việc tiêu thụ bộ nhớ, điều này sẽ khiến giảm thời gian làm việc của GC.

Có bạn sẽ hỏi rằng nếu thời gian GC làm việc chậm như vậy thì tại sao lại cần nó? Sao chúng ta ko disable nó đi? Việc disable GC sẽ làm tăng lượng RAM tiêu thụ, đến một mức nào đó hệ điều hành sẽ bị out of memory nếu chúng ta ko giải phóng nó đi.

Quay lại ví dụ cũ, những dòng csv được tạo ra bên trong block thực chất được lưu tạm thời trong bộ nhớ cho đến khi chúng được join với `\n`. Đó cũng là nguyên nhân chính trong việc làm chậm chương trình.

Vậy thì chúng ta se refactor lại và ko sử dụng bộ nhớ trung gian như sau:


```ruby
require "benchmark"
num_rows = 100000
num_cols = 10
data = Array.new(num_rows) { Array.new(num_cols) { "x" * 1000 } }

time = Benchmark.realtime do
  csv = ''

  num_rows.times do |i|
    num_cols.times do |j|
      csv << data[i][j]
      csv << "," unless j == num_cols - 1
    end
    csv << "\n" unless i == num_rows - 1
  end
end

puts time.round(2)
```

Đoạn code nhìn xấu hơn trước nhỉ? Nhưng nó đã nhanh hơn trước nhiều rồi đấy. Compare thử nào:

|            | 1.9.3 | 2.0   | 2.1   | 2.2  |
| GC enabled | 9.18  | 11.42 | 2.56  | 2.43 |
| GC disabled | 1.14  | 1.15  | 1.19  | 1.16 |
| Optimized  | 1.01  | 1.06  | 1.05  | 1.09 |

Bằng việc thay đổi khá nhỏ nhưng nó đã speed up đoạn source của bạn khoảng 2 đến 10 lần đấy. Optimization memory rất đơn giản: `just review, think and rewrite`.

Nguyên lý 80-20 trong việc optimization performance của Ruby luôn đúng: 80% của việc cải thiện performance đến từ việc optimization memory, 20% còn lại là những việc khác. Do đó hãy ưu tiên optimization memory, có lẽ bạn sẽ không cần thiết phải làm gì thêm nữa.


### Tổng kết
- Nguyên nhân chính trong việc Ruby chậm là do việc tiêu thụ bộ nhớ và GC làm việc quá lâu để giải phóng bộ nhớ.
- Trong Ruby, khi tối ưu performance hãy nghĩ về việc tối ưu memory trước.
- Việc nâng cấp Ruby version sẽ giúp tối ưu performance nhưng chưa phải là giải pháp tối ưu nhất.
- Loop lồng nhau chưa hẳn đã chậm, code xấu hơn chưa hẳn là không tốt, miễn sao tối ưu được bộ nhớ là được.