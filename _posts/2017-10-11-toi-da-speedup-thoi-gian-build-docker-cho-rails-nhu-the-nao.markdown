---
layout: post
title:  "Tôi đã speedup thời gian build docker cho Rails như thế nào?"
date:   2017-10-11 00:11:33 +0700
bigimg: /img/docker-banner.jpg
share-img: /img/docker-banner.jpg
tags: [coding]
---
Việc build docker cho Rails thì có rất nhiều bài viết hướng dẫn cho các bạn nhưng việc tối ưu cho nó thì mình chưa tìm thấy bài viết nào cả nên đây cũng là nguyên nhân chính mà tôi viết bài viết này.

## Let's start

Mình sẽ build môi trường production cho Rails do đó mình sử dụng docker images của alpine để tối ưu về memory.

Về các container thì mình sử dụng 1 container chạy Rails, 1 container chạy Postgres và 1 container chạy Redis.

Thông thường các bạn sẽ build Dockerfile như thế này:

{% highlight sh %}

FROM ruby:2.4.1-alpine3.6
RUN apk add --update build-base libffi-dev libxml2-dev libxslt-dev postgresql-dev nodejs tzdata bash
ENV RAILS_ENV=production \ APP_HOME=/app \
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY Gemfile* $APP_HOME/
RUN gem install bundler
RUN bundle install
COPY . $APP_HOME
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
{% endhighlight %}

Và sử dụng docker-compose để quản lý các container như thế này:

{% highlight yml %}

version: '2'
services:
  db:
    image: postgres:9.6.5-alpine
  backend:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis
    environment:
      - REDIS_URL=redis://redis:6379
    redis: 
      image: redis:4.0.2-alpine
    ports:
      - "6379:6379"
    command: redis-server
{% endhighlight %}

Nhưng chúng ta sẽ gặp một vấn đề là build cực kì lâu. Và việc test docker, destroy và rebuild thì thực sự mất rất nhiều thời gian. Và một lập trình viên có tâm như mình(há há) thì không muốn chuyện này xảy ra

## Nguyên nhân do đâu?

Nếu quan sát bạn sẽ thấy răng hầu hết khoảng thời gian khiến docker build lâu là vì nó phải bundle install tất cả các gem trong quá trình build. Và công việc này lặp lại khi bạn rebuild docker.

Vậy thì nếu làm cách nào đó bundle install 1 lần thì sẽ speed up nó rất nhiều đúng không?

## Hacking time
Mình sẽ improve docker của mình như sau:

{% highlight sh %}

FROM ruby:2.4.1-alpine3.6 
RUN apk add --update build-base libffi-dev libxml2-dev libxslt-dev postgresql-dev nodejs tzdata bash 
ENV RAILS_ENV=production \
    APP_HOME=/app \

ENV BUNDLE_PATH /bundle 

RUN mkdir -p $APP_HOME 
WORKDIR $APP_HOME 

RUN gem install bundler 
COPY Gemfile* $APP_HOME/ 

COPY . $APP_HOME

EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

{% endhighlight %}

{% highlight yml %}
version: '2' 
services: 
  db: 
    image: postgres:9.6.5-alpine 
    volumes: 
      - postgres-data:/var/lib/postgresql/data 
    backend: build: . 
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'" 
    ports: - "3000:3000" 
    depends_on: 
      - db 
      - redis 
    volumes: 
      - .:/app 
      - bundle:/bundle 
    environment: 
      - REDIS_URL=redis://redis:6379 
    redis: 
      image: redis:4.0.2-alpine 
      ports: 
        - "6379:6379" 
      volumes: 
        - redis-data:/var/lib/redis 
      command: redis-server 
volumes: 
  postgres-data: 
    driver: local 
  redis-data: 
    driver: local 
  bundle: 
    driver: local

{% endhighlight %}

Các bạn có thấy sự khác biệt không?

Mình đã sử dụng docker volume để cache lại các gem đã install từ container. Volume này được lưu trữ ở máy vật lý nên khi bạn destroy hay rebuild lại container cũng không có ảnh hưởng gì cả. Với cách cấu hình hiện tại thì docker của mình chỉ chứa các cấu hình và cài đặt, toàn bộ data sẽ được lưu trữ ở máy vật lý.

Done!


## Một số tips khi cấu hình docker:

### 1. COPY vs ADD

Cả COPY và ADD đều add các file ở máy local lên container, nhưng ADD sẽ có nhiều magic đằng sau nó. Như download file, giải nén file...

Bạn có thể thử dùng ADD vs một đường dẫn http, hay đường dẫn một file nén...

Vì vậy chỉ sử dụng ADD nếu bạn hiểu bạn muốn gì. Vì vậy luôn ưu tiên dùng COPY nhé.

### 2. ADD code vào sau cùng

ADD code sẽ làm mất hiệu lực việc cache file, do đó phải ưu tiên việc setup các library, dependencies trước

Thanks for reading and hapy leaning!!!
