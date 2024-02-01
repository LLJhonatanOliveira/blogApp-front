import React from 'react'
import ReactDOM from 'react-dom/client'
import ResetStyle from './style/ResetStyle'
import App from './App'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
    <ResetStyle />
    <App />
    </RecoilRoot>
  </React.StrictMode>,
)
