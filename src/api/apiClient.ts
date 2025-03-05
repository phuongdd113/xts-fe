import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://your-api-base-url', // Thay bằng URL API thực tế của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      const { data } = await axios.get('/api/auth/refresh', {
        baseURL: 'http://your-api-base-url',
        headers: { Authorization: `Bearer ${refreshToken}` },
      });
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
