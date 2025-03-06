import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = AntLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Dashboard</Menu.Item>
          <Menu.Item key="2">Doanh nghiệp</Menu.Item>
          <Menu.Item key="3">Sản phẩm</Menu.Item>
          <Menu.Item key="4">Tem</Menu.Item>
        </Menu>
      </Sider>
      <AntLayout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div style={{ float: 'right', marginRight: '20px' }}>
            <a onClick={handleLogout}>Đăng xuất</a>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;