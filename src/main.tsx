import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppProvider } from './providers'
import { AppRoutes } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
)
