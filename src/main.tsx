import React from 'react'
import ReactDOM from 'react-dom/client'
import ResetStyle from './style/ResetStyle'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResetStyle />
    <App />
  </React.StrictMode>,
)
