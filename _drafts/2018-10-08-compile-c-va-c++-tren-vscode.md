---
layout: post
title:  "Compile C/C++ trên VSCode"
date:   2018-10-08 10:11:33 +0700
bigimg: /img/ruby.jpg
share-img: /img/ruby.jpg
tags: [C++, C, VS Code]
---

### Tại sao tui viết cái này
Dạo này tui muốn luyện lại cấu trúc dữ liệu với giải thuật bằng C/C++ nên tui phải setup thoai. Nhưng quan trọng là tui mất thời gian khá lâu để tìm hiểu việc setup này, tui tìm thì ra cái đống hùm bà lằng gì gì đó, setup task này nọ tùm lum mà ko vừa ý tui nên giờ tui muốn note lại. Lưu ý rằng bài viết này chỉ nhằm mục đích compile và test source C/C++ nhỏ thôi nhé.

### Compile C/C++ trên Unix
Thông thường trên môi trường Unix thì để compile C/C++ thì chúng ta cần `gcc` hoặc `g++`, và chúng ta sẽ gõ lệnh bằng tay để compile. Ví dụ tui có file `sodoku.c` cần compile thì tui sẽ làm như sau:
```bash
gcc sodoku.c -o sodoku # Compile
./sodoku # Run
# Hoặc viết gọn lại như sau:
gcc sodoku.c -o sodoku && ./sodoku
```
Tui cảm thấy cách compile khá là thủ công do đó tui muốn tích hợp vào editor hiện tại.

### Bắt đầu nào
1. Bài viết này hướng dẫn trên VSCode nhé, nên bắt buộc cài đặt VScode
2. Extensions cần thiết `Code Runner`.
3. Vào setting.json của VSCode thêm đoạn json sau:
```json
"code-runner.runInTerminal": true,
"code-runner.executorMap": {
    "c": "g++ $fileName -o $fileNameWithoutExt && ./$fileNameWithoutExt",
    "cpp": "g++ $fileName -o $fileNameWithoutExt && ./$fileNameWithoutExt"
},
```
Lưu lại và .... Done.

Test bằng cách mở một file C/C++ sau đó nhấn `Ctrl + Alt + N` để VSCode mở terminal, compile và thực thi chương trình cho bạn.

Nhưng lúc này bạn sẽ gặp một vấn đề là bạn thấy xuất hiện cả file binary khá là loạn xạ ở thư mục hiện tại, do đó sẽ khá là khó để quản lý source code. Do đó tui đã gom nhóm cái đống bùi nhùi sau khi compile ra vào 1 thư mục riêng, để tiện cho việc quản lý bằng cây thư mục hoặc có thể ignore khi push lên github chẳng hạn.
Để làm việc này tui tạo một thư mục nữa ở thu mục hiện tại và đặt tên là `bin`. Sau đó tui có một chỉnh sửa nhỏ cho code runner ở file setting.json như sau:

```json
"code-runner.runInTerminal": true,
"code-runner.executorMap": {
    "c": "g++ $fileName -o bin/$fileNameWithoutExt && bin/$fileNameWithoutExt",
    "cpp": "g++ $fileName -o bin/$fileNameWithoutExt && bin/$fileNameWithoutExt"
},
```

Ok fine, lưu lại và run source code xem nào. Tất cả các file sau khi compile đều đã được quăng vào thư mục `bin` đúng không nào, giờ thì cây thu mục quá đẹp đúng ko?

### Note 
Trước đây mình dùng gcc để compile file `*.c` nhưng không hiểu sao gặp vài lỗi compile linh tinh mà ko hiểu lý do(có lẽ sẽ tìm hiểu sau). Mình đã thử dùng Clang trên MacOS và GNU GCC nhưng không khắc phục được. Sau đó đã mình đổi gcc thành g++ và mọi thứ hoạt động trở lại cả trên Clang và GNU GCC, nhưng trên Clang vẫn còn 1 số warning.

### Cài đặt GNU GCC trên MacOS
Sử dụng `brew install gcc` để cài đặt GNU GCC.
Sau khi cài đặt xong thì gcc sẽ nằm ở thư mục `/usr/local/Cellar/gcc`. Bạn có thể truy cập vào thư mục version của gcc sau đó tìm thư mục bin để sử dụng. Ở hiện tại mình vừa cài đặt GNU GCC 8.2, mình sẽ có đường dẫn như sau:  `/usr/local/Cellar/gcc/8.2.0/bin/gcc-8`.
Như các bạn thấy thì GNU GCC không cài đặt đè trực tiếp lên Clang mà tạo ra 1 file bin khác tên là `gcc-8`.
Do đó bạn có thể dùng gcc(Clang) hay gcc-8(Gnu) để compile đề được.
