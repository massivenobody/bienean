export type AppointmentMode = 'presencial' | 'virtual'

export type Appointment = {
  id: string
  mode: AppointmentMode
  psychologistId: string
  psychologistName: string
  dateIso: string
  timeLabel: string
  createdAt: string
}
