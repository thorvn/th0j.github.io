---
layout: post
title: First post!
image: /img/hello_world.jpeg
---

## Nền tảng
#### Mục đích của access modifier là gì? Tại sao phải cần access modifier?
Che dấu thông tin, bảo vệ tính toàn vẹn của dữ liệu bằng cách ngăn chặn người dùng thiết lập những giá trị không phù hợp
#### Class là gì? Object là gì? Sự khác nhau giữa Class và Object?
Class: Hiểu đơn giản class là một bản thiết kế chi tiết chứa các properties và method để tạo ra object.
Object: Là thể hiện của class và object chứa dữ liệu.
Giải thích bằng từ ngữ dân gian: Class được xem như bản thiết kế một căn nhà, nó định nghĩa kiểu dáng, các thành phần, quan hệ phòng ốc trong căn nhà… Nhưng đó chỉ là bản thiết kế, thực tế thì căn nhà chưa tồn tại. Object chính là căn nhà sau khi xây xong từ bản thiết kế, dữ liệu trong object chính là đồ đạt trong căn nhà mà những đồ đạt này ko có trong bản thiết kế.

#### Sự khác nhau giữa interface và abstract
Interface: Có thể hiểu interface là một module nhỏ, mỗi interface có thể gồm nhiều method phục vụ cho một module nhưng interface chỉ là mô hình, là lớp vỏ rỗng, nó không thể thực thi bất kì hành động nào. Ngoài ra interface hỗ trợ đa kế thừa.
Abstract: là class gồm nhiều đặc điểm chung của subclass, abstract class có thể chứa các hành động cụ thể. Khác với Interface thì Abstract class chỉ hỗ trợ đơn kế thừa.
Mối quan hệ giữa abstract và class kết thừa nó là quan hệ is-a. Còn quan hệ giữa một class khi implement interface là can-do hoặc -able

#### Polymorphism là gì?
Hiểu nôm na là mỗi đối tượng thể hiện những hành động khác nhau trong từng hoàn cảnh khác nhau

#### Encapsulation là gì? Mục đích Encapsulation đến với trái đất này là gì?
Tính đóng gói là đặc tính giúp các trạng thái bên trong được bảo vệ và tránh bị truy cập bởi code ở bên ngoài. Bất cứ truy cập nào vào bên trong phải thông qua một API public, các API này có nhiệm vụ kiểm tra tính hợp lệ… Vậy khi sử dụng đối tượng chúng ta không cần biết bên trong nó làm việc như thế nào, chỉ cần biết API này làm gì. Mục đích của tính đóng gói là giúp bảo toàn tính toàn vẹn của dữ liệu, tránh bị thay đổi ngoài ý muốn.
Diễn giải đơn giản: Bạn có thể thấy một viên thuốc, bạn có thể xem nó chữa những bênh gì, thành phần chính là gì, còn chi tiết hơn, cụ thể bên trong gồm những gì thì bạn hoàn toàn không biết.
#### Aggregation là gì?

Là mối quan hệ phụ thuộc(is a) giữa 2 đối tượng A và B mà đối tượng A chính là một thuộc tính của đối tượng B. Đối tượng A sẽ được khởi tạo trong đối tượng B. Đối tượng B có thể tồn tại mà ko có A, nhưng A không thể tồn tại mà ko có B.
Ví dụ đơn giản: Gỉa sử chúng ta có 2 đối tượng là “Vếu” và “Ngọc Trinh”. Ngọc Trinh có thể tồn tại không có Vếu nhưng Vếu không thể tồn tại 1 mình được đúng không nào
#### Composition là gì?
Aggregation cũng là mối quan hệ như Composition nhưng yếu hơn. Chúng ta gọi nó là mối quan hệ thành phần(has a)
Lúc này đối tượng B không phải là môi trường sống của đối tượng A nữa mà chỉ mà môi trường hoạt động.
Minh họa cho Aggregation thì tôi sẽ có 2 đối tượng là “Ngọc Trinh” và “Quần chip”. Quần chip là một phần của Ngọc Trinh nhưng lại không phụ thuộc hoàn toàn vào trạng thái tồn tại của Ngọc Trinh đúng không nào?

#### Từ khóa this là gì?

#### Liệt kê một vài nguyên lý thiết kế hướng đối tượng
Single Responsibility Principle (SRP)
Open-Closed Principle(OCP)
Liskov Substitution Principle (LSP)
Interface Segregation Principle (ISP)
Dependency Injection or Inversion Principle (DIP)
DRY (Don’t repeat yourself)
Encapsulate What Changes
Favor Composition over Inheritance
Programming for Interface not Implementation
Delegation principle

## SQL
#### Phân biệt các phép join trong SQL.
https://gist.github.com/kensupermen/52149e6659b2c4ea9dae4baeab45365d

#### Index trong SQL là gì?
Index được tạo ra qua các column trong table hoặc view. Index giúp tăng tốc độ tìm kiếm thông qua giải thuật B-tree.
Thiết kế Index:
Vì Index được tạo ra qua việc thêm column hoặc tạo thêm view nên nó làm tăng dung lượng ổ cứng. Ngoài ra Index sẽ tự động cập nhật khi chúng ta thêm, xóa, sửa dữ liệu nên chúng ta cần phải tính toán chi phí để tránh ảnh hưởng tới hiệu suất hệ thống. Vì vậy cần cân nhắc khi đánh Index cho column.
Một số lưu ý để cải thiện hiệu suất cho ứng dụng khi dùng Index:
  – Không nên đánh Index cho table nhỏ vì đôi khi việc tìm kiếm dữ liệu trên index lại mất nhiều chi phí hơn là thao tác scan table.
  – Không nên đánh Index trên colum thường xuyên bị update…
  – Càng nhiều giá trị bị trùng lặp thì tốc độ tìm kiếm bằng Index lại càng chậm. Do đó nên đánh index ở các unique column.
#### Sự khác nhau giữa DELETE và TRUNCATE
TRUNCATE là lệnh xóa toàn bộ dữ liệu của table mà không có sự ghi nhận ở transaction log nên tốc độ thực thi khá nhanh. TRUNCATE không đi kèm điều kiện do đó chúng ta chỉ có thể xóa toàn bộ dữ liệu mà không thể xóa 1/2 table hay 1/4 table …
Thực tế lệnh TRUNCATE không hề xóa dữ liệu mà nó chỉ hủy cấp phát các trang dữ liệu và xóa con trỏ đến chỉ mục. Dữ liệu vẫn tồn tại cho đến khi nó bị ghi đè. Vì vậy thao tác TRUNCATE thực thi rất nhanh.DELETE là lệnh xóa dữ liệu theo dòng có thể kèm điều kiện và có sự ghi nhận mỗi dòng được xóa ở transaction log do đó tốc độ xử lý sẽ chậm hơn TRUNCATE, và cũng vì vậy mà khi sử dụng DELELE để xóa một lượng lớn dữ liệu ở server thì transaction log sẽ phình ra rất to.Một lưu ý là TRUNCATE không hỗ trợ transaction nên khi dữ liệu đã xóa thì không thể rollback lại được.

#### Sự khác nhau giữa WHERE và HAVING
WHERE là filter kết quả theo từng dòng.
HAVING là filter kết quả theo từng group. HAVING đi kèm với GROUP BY

## DevOps
Sự khác nhau giữa Vagrant và Docker

## Thuật Toán

#### B-Tree là gì? Ứng dụng của B-Tree?
#### Hash Table là gì?

## WEB

#### RESTful là gì?
RESTful định nghĩa kiến trúc để thiết kế Webservice.
Vậy đầu tiên bạn phải hiểu webservice là gì?
Khi bạn truy cập vào một trang web bằng trình duyệt thì bạn nhận được một nội dung của trang web dành cho người dùng cuối. Còn webservice là một dịch vụ web cung cấp các dữ liệu thô dạng xml, json… nên webservice được sử dụng bởi các ứng dụng, và các ứng dụng này sẽ “chế biến” dữ liệu thô trước khi trả về cho người dùng.

#### Sự khác nhau giữa SOAP và REST

SOAP là một giao thức. REST là một kiến trúc sử dụng giao thức HTTP.
SOAP tốn nhiều băng thông. REST tốn ít băng thông.
SOAP chỉ hỗ trợ XML. REST hỗ trợ xml, json, text, html
SOAP ít được ưa chuộng.
#### Session là gì? Cookies là gì?


##### Ket
Bài viết sẽ được tiếp tục cập nhật 🙂 Nếu các bạn có câu hỏi hoặc câu trả lời nào hay về quá trình phỏng vấn thì hi vọng các bạn có thể comment vào bài viét và tôi sẽ bổ sung vào bài viết để bài viết được tốt hơn
