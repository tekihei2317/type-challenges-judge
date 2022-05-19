import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppProvider } from './providers'
import { AppRoutes } from './routes'

const root = document.getElementById('root')
if (root === null) {
  throw new Error('Root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
)
