import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
const BASENAME = import.meta.env.VITE_BASENAME || "/RED-PRODUCT/";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
    <App />
    </BrowserRouter>
  </StrictMode>,
)
