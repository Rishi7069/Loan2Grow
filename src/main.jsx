import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import App from './App'
import store from './store/store'


import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
)