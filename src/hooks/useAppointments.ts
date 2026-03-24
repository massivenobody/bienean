import { useCallback, useEffect, useState } from 'react'
import type { Appointment } from '../types/appointment'

const STORAGE_KEY = 'bienean-citas'

function load(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Appointment[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function save(list: Appointment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function useAppointments() {
  const [list, setList] = useState<Appointment[]>(() => load())

  useEffect(() => {
    save(list)
  }, [list])

  const add = useCallback((a: Appointment) => {
    setList((prev) => [a, ...prev])
  }, [])

  const remove = useCallback((id: string) => {
    setList((prev) => prev.filter((x) => x.id !== id))
  }, [])

  return { appointments: list, addAppointment: add, removeAppointment: remove }
}
