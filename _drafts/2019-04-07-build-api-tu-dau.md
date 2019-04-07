---
layout: post
title: 'Clean code Rule'
date: 2018-7-29 00:11:33 +0700
bigimg: /img/chrome-min.jpg
share-img: /img/chrome-min.jpg
tags: [programming]
---

1. JSON serialization

- Data preparation: https://github.com/Netflix/fast_jsonapi
- Transformation to the JSON format: https://github.com/ohler55/oj

  References: https://buttercms.com/blog/json-serialization-in-rails-a-complete-guide

2. Authentication:

- Sử dụng `Bcrypt` để mã hóa mật khẩu.
	- Chúng ta cần một hash algorithm và không nên chọn một encryption algorithm để không thể suy ngược ra password.
	- Mặc dù không thể suy ngược ra password nhưng có thể brute force nên chúng ta cần chọn slow-hash algorithm để cản trở gây chậm thời gian brute force.

	- Bcrypt có sẵn salt nên mỗi lần mã hóa 1 input thì sẽ có output khác nhau (MD5 thì khi input giống nhau luôn cho output giống nhau). Bcrypt sử dụng random 128 bit salt nên sẽ bảo vệ được user ngay cả khi user sử dụng các mật khẩu thông thường và đơn giản. Mục đích của salt là biến một mật khẩu yếu thành một mật khẩu mạnh hơn.

	
	References: https://vnhacker.blogspot.com/2018/05/bam-mat-khau-ung-cach.html

