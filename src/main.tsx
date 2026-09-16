import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ensureFreshBuild } from './shared/ensureFreshBuild'

void ensureFreshBuild()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
