---
layout: post
title:  "Web application security testing - Note"
date:   2018-09-29 10:11:33 +0700
bigimg: /img/ruby.jpg
share-img: /img/ruby.jpg
tags: [programming, ruby, optimization]
---

### Thu thập thông tin về server (Fingerprint Web Server)
Thu thập thông tin về kiến trúc mạng và phần mềm đang chạy trên server. Ví dụ bạn có thể dụng netcat để xem HTTP response header từ server như sau:
```bash
$ nc 202.41.76.251 80
HEAD / HTTP/1.0

HTTP/1.1 200 OK
Date: Mon, 16 Jun 2003 02:53:29 GMT
Server: Apache/1.3.3 (Unix)  (Red Hat/Linux)
Last-Modified: Wed, 07 Oct 1998 11:18:14 GMT
ETag: "1813-49b-361b4df6"
Accept-Ranges: bytes
Content-Length: 1179
Connection: close
Content-Type: text/html
```
Nhìn vào kết quả trên thì bạn có thể biết được server đang chạy Apache version 1.3.3 trên Linux.

Công cụ:
- httprint - http://net-square.com/httprint.html
- httprecon - http://www.computec.ch/projekte/httprecon/
- Netcraft - http://www.netcraft.com
- Desenmascaram - http:/desenmascara.me


### Review Webserver Metafiles for Information Leakage
Kiểm tra dữ liệu từ file robot.txt

### Liệt kê tất cả các ứng dụng public trên Webserver
Dùng `nmap` để quét toàn bộ và show ra các port được public để từ đó biết được các ứng dụng chạy trên server.
Ví dụ: 
```bash
nmap –PN –sT –sV –p0-65535 192.168.1.100
901/tcp openhttp SambaSWATadministrationserver 1241/tcp open ssl Nessus security scanner
3690/tcp open unknown
8000/tcp open http-alt?
8080/tcp open http Apache Tomcat/Coyote JSP engine 1.1
```

### Các lỗ hổng thường gặp

- XSS
- SQL Injection
- File uploads(Null Byte Injection)
- Including local and remote files
- eval()
- Cross-site request forgery – CSRF
Các lỗi thường gặp: Injection (SQL/Command/Template/…), Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), Server Side Request Forgery (SSRF), Insecure Direct Object References (IDOR), XML External Entity (XXE),…

# Directory indexing
Chức năng web server cho phép liệt kê tất cả nội dung bên trong một thư mục mà không có tập tin cơ sở
- Phòng chống:
Thiết lập quyền hợp lý trên các thư mục chứa nội dung web.
Sử dụng mod_security để lọc dữ liệu đầu vào

```
SecFilterScanOutput On
SecFilterSelective OUTPUT “\<title\>Index of /”
```

# Path Traversal
Có thể gọi là: “dot-dot-slash”, “directory traversal”,”directory clumbing” và “backtracking” là hình thức tấn công truy cập đến những file và thư mục mà được lưu bên ngoài thư mục webroot.
Example:
```
GET /../../../../../some/file HTTP/1.0
GET /..%255c..%255c..%255csome/file HTTP/1.0
GET /..%u2216..%u2216some/file HTTP/1.0
```
- Phòng chống:
Sử dụng mod_security để lọc dữ liệu đầu vào
```
SecFilterSelective SCRIPT_FILENAME “/scripts/foo.cgi” chain
SecFilterSelective ARG_home “!^[a-zA-Z].{15,}\.txt”
```
### Lab resource:

- [Billu box](https://www.vulnhub.com/entry/billu-b0x,188)
- [Pentesterlab](https://medium.com/@Kan1shka9/pentesterlab-php-include-and-post-exploitation-walkthrough-8a85bcfa7b1d)
- BWAPP
- DVWA (Damn Vulnerable Web Application)

### References:
- http://www.hvaonline.net/hvaonline/posts/list/38687.hva