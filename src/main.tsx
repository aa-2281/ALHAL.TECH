import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
const ContactPage = lazy(() => import('./pages/ContactPage.tsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.tsx'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage.tsx'))
const AutomationPortfolioPage = lazy(() => import('./pages/AutomationPortfolioPage.tsx'))
const WebDesignPortfolioPage = lazy(() => import('./pages/WebDesignPortfolioPage.tsx'))
const AppDevelopmentPortfolioPage = lazy(() => import('./pages/AppDevelopmentPortfolioPage.tsx'))
const CustomSoftwarePortfolioPage = lazy(() => import('./pages/CustomSoftwarePortfolioPage.tsx'))
import ScrollToTop from './components/ScrollToTop.tsx'

// Disable browser's automatic scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/portfolio/automation" element={<AutomationPortfolioPage />} />
          <Route path="/portfolio/web-design" element={<WebDesignPortfolioPage />} />
          <Route path="/portfolio/app-development" element={<AppDevelopmentPortfolioPage />} />
          <Route path="/portfolio/custom-software" element={<CustomSoftwarePortfolioPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
