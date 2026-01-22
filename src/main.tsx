import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ContactPage from './pages/ContactPage.tsx'
import AutomationPortfolioPage from './pages/AutomationPortfolioPage.tsx'
import WebDesignPortfolioPage from './pages/WebDesignPortfolioPage.tsx'
import AppDevelopmentPortfolioPage from './pages/AppDevelopmentPortfolioPage.tsx'
import CustomSoftwarePortfolioPage from './pages/CustomSoftwarePortfolioPage.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'

// Disable browser's automatic scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/portfolio/automation" element={<AutomationPortfolioPage />} />
        <Route path="/portfolio/web-design" element={<WebDesignPortfolioPage />} />
        <Route path="/portfolio/app-development" element={<AppDevelopmentPortfolioPage />} />
        <Route path="/portfolio/custom-software" element={<CustomSoftwarePortfolioPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
