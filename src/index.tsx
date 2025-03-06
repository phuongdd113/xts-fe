import React from 'react';
import { createRoot } from 'react-dom/client'; // Thay ReactDOM.render bằng createRoot
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import 'antd/dist/antd.css'; // Ant Design 4.x
import './index.css';

// Tạo root
const root = createRoot(document.getElementById('root')!); // Thêm ! để báo TypeScript rằng root không null

// Render ứng dụng
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);