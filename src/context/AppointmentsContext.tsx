import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { useAppointments } from '../hooks/useAppointments'
import type { Appointment } from '../types/appointment'

type Ctx = {
  appointments: Appointment[]
  addAppointment: (a: Appointment) => void
  removeAppointment: (id: string) => void
}

const AppointmentsContext = createContext<Ctx | null>(null)

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const { appointments, addAppointment, removeAppointment } = useAppointments()
  const value = useMemo(
    () => ({ appointments, addAppointment, removeAppointment }),
    [appointments, addAppointment, removeAppointment],
  )
  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointmentsContext() {
  const ctx = useContext(AppointmentsContext)
  if (!ctx) {
    throw new Error('useAppointmentsContext debe usarse dentro del proveedor')
  }
  return ctx
}
