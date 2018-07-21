---
layout: post
title: Integration Rails with React and Typescript
image: /img/hello_world.jpeg
---

Tại sao có bài viết này?
Với Rails thì có vẻ như ai cũng biết là nó là một framework của Ruby giúp chúng ta build một ứng dụng cực nhanh trong 1 khoảng thời gian ngắn. Đây cũng chính là lý do tôi thích Rails. Còn React thì giúp cho chúng ta xây dựng ứng dụng Single Page Application với tốc độ tải trang cực nhanh. Còn Typescript thì sao? Nếu thấy làm việc với Javascript quá khó khăn thì bạn nên thử Typescript, có thể xem như một phiên bản nâng cao của Javascript được phát triển bởi Microsoft. Giới thiệu chơi sơ thôi nhé, vì bài viết này tôi không phải giới thiệu về đặc điểm của các công nghệ này mà tôi muốn tích hợp tất cả những thứ hay ho này lại với nhau.

Gần đây Rails Framework phát hành version 5.1 hỗ trợ Webpack giúp tích hợp React và Rails dễ dàng hơn và tôi cũng gặp vài khó khăn trong việc cấu hình nên tôi viết bài viết này hi vọng giúp đỡ được những bạn giống tôi

## Cấu hình React On Rails với Webpacker
Đầu tiên thì chúng ta cần tạo một cái project bằng Rails

[code lang=bash]
rails new react_on_rails_demo -d postgresql –webpack=react
[/code]

Lưu ý rằng --webpack chỉ có ở phiên bản Rails 5.1 trở lên và đảm bảo máy của bạn có đầy đủ Ruby, Rails, Yarn, Postgresql nhé.
Sau khi tạo project xong bạn sẽ thấy vài điều khác lại so với cách tạo project Rails thông thường.

Tiếp theo chúng ta cần tạo một page, giả sử tôi tạo controller home và action là index như sau:

[code lang=bash]
rails g controller home index
[/code]

Update lại config/routes.rb một chút, tôi sẽ thay

[code lang=ruby]
get 'home/index'
[/code]

bằng

[code lang=ruby]
root 'home#index'
[/code]

Bây giờ chúng ta start server rails lên thử nhé.

[code lang=bash]
rails s
[/code]

Ok mọi thứ có vẻ ổn. Nhưng khoan, sau khi tạo project với Webpack thì chúng ta có thêm một thư mục chứa các component của React nằm ở đường dẫn: app/javascript/packs.
Nếu các bạn mở file app/javascript/packs/application.js thì các bạn sẽ thấy dòng lệnh:

[code lang=javascript]
console.log("Hello Word from Webpacker")
[/code]

Và nếu file này được gọi thì khi mở F12 lên bạn sẽ thấy dòng chữ “Hello Word from Webpacker” ở cửa sổ console đúng không nào? Thử xem?

Có vẻ là không có gì hiện ra cả. Hình như là chúng ta chưa include javascript file đó vào web. Vậy thì chúng ta thử include nó vào views/layouts/application.html.erb xem nhé.
Thêm dòng lệnh sau vào tag header

[code lang=ruby]
<%= javascript_pack_tag 'application' %>
[/code]
Refresh lại trang thử xem. Và chúng ta nhận được cái kết như thế này:


Có vẻ là Webpack không thấy được chúng ta đang nói tới file nào thì phải. Chính xác là chúng ta cần phải biên dịch lại các file này JS này trước khi sử dụng. Nếu các bạn từng làm React rồi chắc các bạn sẽ hiểu, nó khá giống với babel.
## Compile React
Nếu các bạn để ý thì khi tạo project chúng ta có thư mục bin, trong thư mục này có vài file khác biệt so với khi tạo project thông thường. Ở đây chúng ta cần chú ý đến các file: webpack và webpack-dev-server. Ở đây tôi sử dụng webpack-dev-server vì nó có khả năng tự compile khi code được thay đổi. Bạn vào terminal gõ câu lệnh sau tại root directory để compile React:

[code lang=bash]
bin/webpack-dev-server
[/code]

Refresh lại trang và thấy kết quả. Mở F12 và xem cửa sổ console. Mọi thứ Ok đúng không?

Một điểm rất thú vị ở đây, bạn click view source page và xem phần header
Bạn xem vào dòng tôi focus xem, có gì hay ho ở đây không? Chúng ta đang run server Rails trên port 3000 mà, nhưng ở đây là port 8080. Vậy có nghĩa là chúng ta đang chạy React ở một server khác.
## Cấu hình Typescript cho Webpacker
Chúng ta cần cài đặt thêm một vài package hỗ trợ typescript như sau:

[code lang=bash]
yarn add ts-loader typescript @types/react @types/react-dom
yarn remove prop-types
[/code]

Tiếp theo cần tạo file tsconfig.json tại thư mục gốc với nội dung như sau:

[code lang=javascript]
{
"compilerOptions": {
"declaration": false,
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
"lib": ["es6", "dom"],
"module": "es6",
"moduleResolution": "node",
"sourceMap": true,
"jsx": "react",
"target": "es5"
},
"exclude": [
"**/*.spec.ts",
"node_modules",
"public"
],
"compileOnSave": false
}
[/code]

Tạo loader config/webpack/loaders/typescript.js

[code lang=javascript]
module.exports = {
test: /.(ts|tsx)$/,
loader: 'ts-loader'
}
[/code]

Theo mặc định cấu hình để build React nằm ở config/webpacker.yml, để build Typescript chúng ta thêm .tsx vào danh sách extensions

Cấu hình cho Typescript đến đây là xong.
Lưu ý rằng React trên Typescript có phần mở rộng là .tsx chứ không phải là .jsx nữa nhé.

Tôi đã chuẩn bị một project sample, các bạn có thể clone về chạy thử. Hi vọng rằng nó sẽ giúp ích cho các bạn.
https://github.com/kensupermen/react_on_rails/tree/develop
