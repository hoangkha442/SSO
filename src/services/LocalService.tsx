const token = "token";

// đặt 1 key dung chung để setItem
export const userLocalStorage = {
  set: (userData:any) => {
    // convert dữ liệu từ Ob sang json
    let userJSON = JSON.stringify(userData);
    // lưu xuống local
    localStorage.setItem(token, userJSON);
  },
  get: () => {
    //lấy dữ liệu lên
    let userJSON = localStorage.getItem(token);
    if (userJSON) {
      return JSON.parse(userJSON);
    } else {
      return null;
    }
  },
  remove: () => {
    localStorage.removeItem(token);
  },
};