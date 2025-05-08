import React from 'react';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom'; // ✅ import BrowserRouter
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/Form.css';
import './Components/Sidebar/Sidebar.module.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap your app here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
