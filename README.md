# SSO Authentication System with Keycloak

## Giới thiệu dự án

Dự án này là hệ thống xác thực tập trung sử dụng **Single Sign-On (SSO)** kết hợp với **Keycloak** nhằm quản lý đăng nhập, phân quyền và xác thực người dùng cho nhiều ứng dụng trong cùng một hệ sinh thái.

Thay vì mỗi ứng dụng phải tự xây dựng chức năng đăng nhập riêng, hệ thống sử dụng Keycloak làm máy chủ xác thực trung tâm. Người dùng chỉ cần đăng nhập một lần và có thể truy cập các ứng dụng được cấp quyền mà không cần đăng nhập lại nhiều lần.

Dự án được phát triển với mục tiêu xây dựng một giải pháp xác thực an toàn, dễ mở rộng, dễ quản lý và phù hợp với các hệ thống có nhiều dịch vụ hoặc nhiều ứng dụng khác nhau.

---

## Mục tiêu dự án

Dự án hướng đến việc giải quyết các vấn đề thường gặp trong hệ thống nhiều ứng dụng, bao gồm:

- Quản lý tài khoản người dùng phân tán ở nhiều hệ thống
- Người dùng phải đăng nhập nhiều lần khi sử dụng các ứng dụng khác nhau
- Khó kiểm soát quyền truy cập tập trung
- Khó mở rộng khi có thêm ứng dụng mới
- Rủi ro bảo mật khi mỗi ứng dụng tự xử lý xác thực

Thông qua việc tích hợp Keycloak, hệ thống giúp tập trung hóa quá trình xác thực và phân quyền, đồng thời cải thiện trải nghiệm đăng nhập cho người dùng.

---

## Công nghệ sử dụng

- **Keycloak**: Quản lý định danh, xác thực và phân quyền
- **OpenID Connect / OAuth 2.0**: Giao thức xác thực và ủy quyền
- **JWT Token**: Truyền thông tin xác thực giữa Keycloak và ứng dụng
- **Frontend Application**: Ứng dụng giao diện người dùng
- **Backend Service / API**: Dịch vụ xử lý nghiệp vụ và bảo vệ tài nguyên
- **Role-Based Access Control (RBAC)**: Phân quyền người dùng theo vai trò

---

## Chức năng chính

### Đăng nhập tập trung

Hệ thống cho phép người dùng đăng nhập thông qua Keycloak. Sau khi đăng nhập thành công, người dùng có thể truy cập các ứng dụng được tích hợp mà không cần đăng nhập lại.

### Xác thực người dùng

Keycloak chịu trách nhiệm xác thực thông tin đăng nhập của người dùng và cấp token cho ứng dụng sau khi xác thực thành công.

### Quản lý phiên đăng nhập

Hệ thống hỗ trợ quản lý phiên đăng nhập của người dùng thông qua Keycloak. Khi phiên đăng nhập còn hiệu lực, người dùng có thể tiếp tục truy cập các ứng dụng trong hệ thống.

### Phân quyền truy cập

Người dùng được phân quyền dựa trên role hoặc group. Ứng dụng có thể kiểm tra quyền từ token để quyết định người dùng có được phép truy cập vào chức năng hoặc tài nguyên cụ thể hay không.

### Đăng xuất tập trung

Khi người dùng đăng xuất, hệ thống có thể kết thúc phiên đăng nhập tại Keycloak và hạn chế việc tiếp tục truy cập các ứng dụng đã được bảo vệ.

---

## Luồng hoạt động tổng quan

1. Người dùng truy cập vào ứng dụng.
2. Ứng dụng kiểm tra trạng thái đăng nhập của người dùng.
3. Nếu chưa đăng nhập, người dùng được chuyển hướng đến trang đăng nhập của Keycloak.
4. Người dùng thực hiện đăng nhập.
5. Keycloak xác thực thông tin người dùng.
6. Sau khi xác thực thành công, Keycloak cấp token cho ứng dụng.
7. Ứng dụng sử dụng token để xác định danh tính và quyền truy cập của người dùng.
8. Người dùng được phép truy cập vào các chức năng tương ứng với quyền được cấp.

---

## Vai trò của Keycloak trong dự án

Trong dự án này, Keycloak đóng vai trò là **Identity Provider** trung tâm, chịu trách nhiệm:

- Quản lý người dùng
- Xác thực đăng nhập
- Cấp access token và refresh token
- Quản lý role và group
- Cấu hình client cho từng ứng dụng
- Quản lý phiên đăng nhập
- Hỗ trợ đăng nhập một lần cho nhiều ứng dụng

Việc sử dụng Keycloak giúp giảm tải phần xử lý xác thực trong ứng dụng, đồng thời tăng tính bảo mật và khả năng mở rộng của hệ thống.

---
