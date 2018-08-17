---
layout: post
title:  "Capistrano"
date:   2018-7-29 00:11:33 +0700
bigimg: /img/chrome-min.jpg
share-img: /img/chrome-min.jpg
tags: [programming]
---

### Cau truc cua deploy.rb

1. :application là tên ứng dụng sẽ deploy
2. :repo_url là Github repository URL
3. :deploy_to là thư mục sẽ chứa code deploy
4. :linked_files là các file dùng chung cho các bản deploy như secrets.yml, .env, database.yml, ...
5. :linked_dirs là các thư mục dùng chung cho các bản deploy
6. :keep_releases là số lượng bản deploy sẽ giữ lại. Tương đương với số lần bạn có thể rollback lại



##### Kiem tra Capistrano tuong tac vs server duoc hay chua
bundle exec cap staging deploy:check

##### Xu ly loi Permission denied (publickey).
Lỗi này xảy ra khi bạn không có quyền truy cập lên github dưới quyền hiện tại. Vì shell hiện tại ko đọc được publickey. Xử lý bằng cách như sau:
Tạo SSH key và tạo file `~/.ssh/config`:
```bash
Host github.com
User git
IdentityFile ~/.ssh/github_rsa
```
