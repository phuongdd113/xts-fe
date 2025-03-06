import apiClient from './apiClient';
import { paths } from './types';

// Type cho request body
type LoginWithPasswordBody =
  paths['/api/auth/login-with-password']['post']['requestBody']['content']['application/json'];

// Type cho response data (lấy trực tiếp AuthResponseDto)
type LoginWithPasswordResponse =
  paths['/api/auth/login-with-password']['post']['responses']['200']['content']['application/json']['data'];

export const loginWithPassword = async (
  data: LoginWithPasswordBody
): Promise<LoginWithPasswordResponse> => {
  const response = await apiClient.post<LoginWithPasswordResponse>(
    '/api/auth/login-with-password',
    data
  );
  return response.data;
};