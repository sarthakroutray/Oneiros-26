import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import AdminPage from './components/AdminPage.tsx'

window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin69" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
