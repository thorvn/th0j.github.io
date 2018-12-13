---
layout: post
title:  "Clean code Rule"
date:   2018-7-29 00:11:33 +0700
bigimg: /img/chrome-min.jpg
share-img: /img/chrome-min.jpg
tags: [programming]
---

Part 1 — Rack Deep Dive
Part 2 — Set up a Basic Framework
Part 3 — Autoloading and Utility Methods
Part 4 — Better Routing
Part 5 — Render, Redirect & Before_Action Methods in Controllers
Part 6 — Extract Complexities out of View with Helpers
Part 7 — Reduce Rework with Generators
Part 8 — Set up ORM for Read/Write to Database
Part 9 — Generate Database from Schema
Part 10 — Set up Migrations

# What does Rails do when client send a request?
1. App server(Thin, Puma, Webrick) nhận request, đẩy lên Rack, sau đó lên từng middleware. Middleware `routes` sẽ nhận `PATH_INFO` sau đó map vs file controller và method tương ứng, sau đó thực thi method đc gọi, trả kết quả về Rack, Rack trả kết quả về app server và cuối cùng là trả kết quả về người dùng.


### Ruby Tricks
1. `&:+`
“:+” means “the symbol +” just like “:foo” means “the symbol foo.” The & just means “pass as a block” -- the code block in curly-braces that usually comes after. So youʼre passing a symbol as if it were a block. Ruby knows to convert a symbol into a proc that calls it. When you do it with “plus”, you get “add these together.”
2. `require_relative`
The require_relative just means “require, but check from this fileʼs directory, not the load path”. Itʼs a fun, simple trick.

### Some Ruby web framework

- [Sinatra](https://github.com/sinatra/sinatra)
- [Hanami](https://github.com/hanami/hanami)
- [Camping](https://github.com/camping/camping)
- [Padrino](https://github.com/padrino/padrino-framework)
- [Cuba](https://github.com/soveran/cuba)
- [Savannah](https://github.com/billpatrianakos/savannah)
- [Busker](https://github.com/pachacamac/busker)
- [Merb](https://github.com/merb/merb)
- [Ramaze](https://github.com/ramaze/ramaze)

### Benchmark
https://github.com/DAddYE/web-frameworks-benchmark