import axios from 'axios';

// Sử dụng namespace Axios để truy cập các type
const apiClient: axios.AxiosInstance = axios.create({
  baseURL: 'http://dev.xacthucso.com.vn',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm Bearer Token
apiClient.interceptors.request.use((config: axios.AxiosRequestConfig<any>) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor để làm mới token khi hết hạn
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as axios.AxiosRequestConfig<any> & { _retry?: boolean };
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