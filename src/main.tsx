import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppProvider } from './components/AppProvider'
import { AppRoutes } from './components/AppRoutes'

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
