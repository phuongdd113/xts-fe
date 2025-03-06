import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { loginWithPassword } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { identifier: string; password: string }) => {
    try {
      const response = await loginWithPassword(values);
      dispatch(login({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      }));
      message.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      message.error('Đăng nhập thất bại!');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>XTS Product Traceability</h1>
      <Form onFinish={onFinish} layout="vertical" style={{ maxWidth: '300px', margin: '0 auto' }}>
        <Form.Item
          name="identifier"
          label="Email hoặc SĐT"
          rules={[{ required: true, message: 'Vui lòng nhập email hoặc số điện thoại!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;