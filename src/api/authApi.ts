import apiClient from './apiClient';
import { paths } from './types'; // Type từ Swagger

type LoginWithPasswordBody = paths['/api/auth/login-with-password']['post']['requestBody']['content']['application/json'];
type LoginWithPasswordResponse = paths['/api/auth/login-with-password']['post']['responses']['200']['content']['application/json']['schema']['properties']['data'];

export const loginWithPassword = async (data: LoginWithPasswordBody): Promise<LoginWithPasswordResponse> => {
  const response = await apiClient.post('/api/auth/login-with-password', data);
  return response.data.data;
};
