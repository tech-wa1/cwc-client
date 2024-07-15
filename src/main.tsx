import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'
import anttheme from './anttheme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={anttheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
