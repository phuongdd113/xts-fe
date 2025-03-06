import axios from 'axios';

// Không cần khai báo AxiosInstance riêng, axios.create() tự động trả về type đúng
const apiClient = axios.create({
  baseURL: 'http://dev.xacthucso.com.vn', // Thay bằng URL API thực tế khi có
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm Bearer Token vào mỗi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Làm mới token khi hết hạn
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const { data } = await axios.get('/api/auth/refresh', {
          baseURL: 'http://dev.xacthucso.com.vn',
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;