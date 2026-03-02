import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento root para montar la aplicación.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
