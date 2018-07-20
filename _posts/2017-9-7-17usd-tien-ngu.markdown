---
layout: post
title:  "17 USD tiền ngu?"
date:   2017-09-07 00:11:33 +0700
tags: [coding]
---

Chuyện là nay muốn tập tành Devops á mà nên mua VPS về nghịch chơi.

Mình mua VPS ở Linode giá 5USD/tháng, thông số khá tốt: 1 CPU, 1G RAM, 1TB bandwidth.

Mới mua VPS là build một cái Ubuntu và setup server các kiểu. Cấu hình nginx, sql… rồi bê nguyên cái blog vào luôn. Setup xong rồi nhìn nó mà sung sướng lắm, lên facebook khoe domain, khoe vps các kiểu để mọi người vào ngắm rồi đi ngủ mất xác.

Ngày hôm sau ngủ dây đi làm bình thường thoai. Bật mail lên thì 1 nùi mail từ Linode title: “ToS Violation – Outbound DoS “, và nôi dung là “We have detected an outbound denial of service attack originating from your Linode…”. What the fuck? Cái quái gì vại, mình có DDOS thằng quái nào đâu. Đọc dòng đầu tiên mà giật hết cả mình, chẳng biết chuyện gì đang xảy ra. Truy cập thử lại mấy trang web của mình thì đậu xanh rau má, chết hết bà nó rồi.

Tiếp tục truy cập vào trang quản lý vps của linode thì 1 màu đỏ lè đỏ lẹt hiện lên, nó bảo rằng bạn đã sử dụng 300% bandwidth, ôi cái định mệnh đắng cay thay, vậy là sạch sẽ 3TB bandwidth. Trong lòng nghi ngờ service nào đó đã bị nhiễm trojan và nó tự động ddos một hệ thống khác nên nó bị mất bandwidth nhiều như vậy. Thế là rebuild lại server, mặc dù vẫn không biết là service nào nhiễm trojan vì mình đều install các app từ  repository mặc định của ubuntu chứ ko cài đặt từ repository lạ. Tiếp tục loay hoay setup lại website các kiểu rồi ăn ngủ mà trong lòng không yên.

Ngày hôm sau Linode tiếp tục gởi mail báo Outbound DoS, và dung lượng bandwidth mất khá lớn. Cách giải quyết tạm thời là xóa Linode đi và tìm hiểu nguyên nhân. Cái kết đắng cay khi kiểm tra tài khoản, mình bị trừ mất 17USD. Ôi thiệt là đau lòng quá đi à.

Cuối cùng reseach cả buổi trời rồi xác định được nguyên nhân là do minh bị hack vào server và chiếm quyền điều khiển, ddos từ vps của mình đến một hệ thống khác.

Ôi thế quái nào nó lại tấn công vps của mình dễ đến vậy, nhưng 2 lần trong 1 khoảng thời gian ngắn.

Nhưng giờ thì mình đã hiểu mình phạm sai lầm rất lớn khi cấu hình VPS và mình bị mất 17USD tiền học phí, gọi là tiền ngu cũng đc. =)))

Sau cú hích 17USD đó thì mình đã rút ra những kinh nghiệm về bảo mật server, hẹn các bạn ở bài viết sau, mình sẽ trình bày cách để bảo mật server tốt hơn và đỡ mất 17USD tiền ngu giống mình.

Thanks for reading and happy leaning!
