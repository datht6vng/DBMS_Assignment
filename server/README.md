# Note: Mọi cái t viết đều có check đã xác thực chưa bằng code sau:

if (!req.isAuthenticated()) return res.status(200).json({ success: false, message: "Incorrect flow! You are not logged in!" })
Đảm bảo đừng flow sai

# login:

- Kiểm tra đăng nhập chưa: (giai đoạn sau)

  - Request:

    - method: GET
    - url: server_url/api/logged_in
    - data: {}
    - withCredentials: true // Gởi request nhớ có dòng này tại server set cần yêu cầu chứng chỉ

  - Response:
    - status: 200
    - data: {
      loggedIn: true/false,
      message: mô tả chi tiết
      }

- doSubmit khi ấn nút login

  - Request:

    - method: POST
    - url: server_url/api/login
    - data: {
      email: email,
      password: password
      }
    - withCredentials: true

  - Response:
    - status: 200
    - data: {
      success: true/false ứng với đăng nhập thành công hay thất bại,
      message: mô tả chi tiết,
      user: thông tin full về user, thất bại thì null,
      }

# register:

- Kiểm tra đăng nhập chưa: giống login

- doSubmit khi ấn register:

  - Request:

    - method: GET
    - url: server_url/api/register
    - data: {
      email: email,
      password: password,
      username: username,
      address: address,
      phone: phone,
      }
    - withCredentials: true

  - Response:
    - status: 200
    - data: {
      success: true/false,
      message: Mô tả chi tiết
      }

# logout

- Request:

  - method: GET
  - url: server_url/api/logout
  - data: {}
  - withCredentials: true

- Response:
  - status: 200
  - data: {
    success: true/false,
    message: mô tả chi tiết
    }

# change password

- Request:

  - method: POST
  - url: server_url/api/change_password
  - data: {
    oldPassword,
    newPassword
    }
  - withCredentials: true

- Response:
  - status: 200
  - data: {
    success: true/false,
    message: mô tả chi tiết
    }
- Note:
  Sau đó logout bắt đăng nhập lại do destroy session

# change user info:

- Note:

  - Tạm thời thì không cho đổi email, nếu muốn thì cũng có thể làm
  - Nếu mà không nhập thì gởi "" coi như không đổi

- Request:

  - method: POST
  - url: server_url/api/change_user_info
  - data: {
    newUsername,
    newAddress,
    newPhone,
    }
  - withCredentials: true

- Response:
  - status: 200
  - data: {
    success: true/false,
    message: mô tả chi tiết
    }

# reservation

- Note: database lưu thêm email để có gì phân biệt được
- Request:

  - method: POST
  - url: server_url/api/reservation
  - data: {
    numberOfPersons: number of persons, date: date, time: time, message: user message
    }
  - withCredentials: true

- Response:
  - status: 200
  - data: {
    success: true/false,
    message: mô tả chi tiết
    }

# reset passowrd:

T nghĩ là 1 trang cho 3 cái này thôi. Có ô nhập email rồi lấy mã khôi phục. Ở dưới có ô nhập cái mã đã lấy với mật khẩu mới. Chuyển trang thứ nhất là flow nó khó chịu thứ 2 nó bị lỗi bảo mật (api reset password nếu mà nằm riêng với check code thì đúng là hơi ngu, bị cái lỗi gọi thẳng api đó)

## Gởi email

- Request:

  - method: POST
  - url: server_url/api/get_reset_code
  - data: {email: email nhập ở textbox}
  - withCredentials: true

- Response:
  - status: 200
  - data: {
    success: false/true,
    message: mô tả chi tiết
    }

## Gởi code và password mới:

- Request:

  - method: POST
  - url: server_url/api/check_reset_code
  - data: {code: code nhập ở textbox, email: email nhập, password: password mới}
  - withCredentials: true

- Response:
  - status: 200
  - data: {
    success: false/true,
    message: mô tả chi tiết
    }
