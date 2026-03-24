import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppointmentsProvider } from './context/AppointmentsContext'
import { Appointments } from './pages/Appointments'
import { Assessment } from './pages/Assessment'
import { BookAppointment } from './pages/BookAppointment'
import { Emergency } from './pages/Emergency'
import { Home } from './pages/Home'
import { ResourceDetail } from './pages/ResourceDetail'
import { Resources } from './pages/Resources'
import { Services } from './pages/Services'

export default function App() {
  return (
    <BrowserRouter>
      <AppointmentsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/citas" element={<Appointments />} />
          <Route path="/citas/reservar" element={<BookAppointment />} />
          <Route path="/autoevaluacion" element={<Assessment />} />
          <Route path="/recursos" element={<Resources />} />
          <Route path="/recursos/:id" element={<ResourceDetail />} />
          <Route path="/emergencia" element={<Emergency />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppointmentsProvider>
    </BrowserRouter>
  )
}
