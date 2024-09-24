import axios from 'axios';

// Tạo một axios instance với cấu hình cơ bản
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {},
});

console.log(process.env.REACT_APP_API_URL);

// Hàm để lấy giá trị cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Thêm interceptor để xử lý các yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = getCookie('accessToken');
    console.log("Access Token:", token); // Log token lấy được
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Đặt Content-Type cho các yêu cầu
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý phản hồi
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi là 401 (Unauthorized) và chưa thử lại
    if (error.response && (error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getCookie('refreshToken');
        console.log("Refresh Token:", refreshToken); // Log refresh token
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/refresh-token`, {
          refreshToken: refreshToken,
        });
        
        const { token } = response.data;
        console.log("New Access Token:", token); // Log token mới

        // Lưu token mới vào localStorage
        localStorage.setItem('accessToken', token);

        // Cập nhật token cho yêu cầu gốc
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;

        // Thực hiện lại yêu cầu gốc với token mới
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token failed', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;