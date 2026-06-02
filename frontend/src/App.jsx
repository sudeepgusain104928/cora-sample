import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageSkeleton from './components/ui/PageSkeleton'

// Route-level code splitting — each page is its own chunk
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const LocationsPage = lazy(() => import('./pages/LocationsPage'))
const PatientResourcesPage = lazy(() => import('./pages/PatientResourcesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/patient-resources" element={<PatientResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
