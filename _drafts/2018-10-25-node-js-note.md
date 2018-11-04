---
layout: post
title:  "Node JS"
date:   2018-10-08 10:11:33 +0700
bigimg: /img/ruby.jpg
share-img: /img/ruby.jpg
tags: [C++, C, VS Code]
---

# NodeJS là gì?
NodeJS là một javascript runtime, sử dụng V8 engine. V8 engine là một engine C++ sử dụng javascript code và compile thành machine code.

# Non-blocking I/O
Một ứng dụng web hầu hết tiêu tốn nhiều thời gian cho việc xử lý I/O như: read/write to database, make HTTP request. Non-blocking I/O nghĩa là trong khi user đang request đến một Url thì nó cũng có thể request tới để lấy dữ liệu từ database mà ko cần request đầu tiên xong thành công.


# Debug NodeJS
#### Debug in terminal
```bash
node inspect [file_name].js
```
#### Debug in Chrome
```bash
node --inspect-brk [file_name].js
```

#### Nodemon
Change `node` to `nodemon` to auto restart node application when change something in source code.

# Arrow Function
#### Không sử dụng `this` keyword bên trong arrow function, vì nó ko binding đc.

# Function Declarations vs Function Expressions
#### Function Declarations
Example:
```javascript
function bar() {
    return 3;
}
```
#### Function Expressions
Example:
```javascript
var a = function() {
    return 3;
}
```

#### 
Function expressions become more useful than function declarations:
- As closures
- As arguments to other functions
- As Immediately Invoked Function Expressions (IIFE)

### SQL vs NOSQL
| SQL                  | NOSQL                   |
|----------------------|------------------------ |
|        Table         |  Collection             |
|        Row/Record    |  Document               |

# References:
- https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/