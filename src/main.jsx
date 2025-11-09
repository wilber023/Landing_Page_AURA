import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './landing/styles/globals.css'
import App from './landing/routes/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
