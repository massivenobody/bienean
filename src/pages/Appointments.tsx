import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { PrimaryButton } from '../components/PrimaryButton'
import { Screen } from '../components/Screen'
import { useAppointmentsContext } from '../context/AppointmentsContext'

export function Appointments() {
  const location = useLocation()
  const booked = Boolean(
    (location.state as { booked?: boolean } | null)?.booked,
  )
  const { appointments, removeAppointment } = useAppointmentsContext()
  const [cancelMode, setCancelMode] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function cancelSelected() {
    selected.forEach((id) => removeAppointment(id))
    setSelected(new Set())
    setCancelMode(false)
  }

  return (
    <Screen>
      <PageHeader
        title="Tus citas agendadas"
        subtitle="Gestiona tus próximas sesiones con bienestar estudiantil."
        backTo="/"
      />

      {booked ? (
        <p
          className="mb-4 rounded-2xl bg-brand-100 px-4 py-3 text-sm font-medium text-brand-900"
          role="status"
        >
          ¡Listo! Tu cita quedó guardada en esta demo.
        </p>
      ) : null}

      {appointments.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center">
          <p className="text-ink-600">Aún no tienes citas en esta demo.</p>
          <Link
            to="/citas/reservar"
            className="font-semibold text-brand-600 underline"
          >
            Agenda tu primera cita
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {appointments.map((a) => {
            const d = new Date(a.dateIso + 'T12:00:00')
            const dayStr = d.toLocaleDateString('es', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })
            const isSel = selected.has(a.id)
            return (
              <li key={a.id}>
                <button
                  type="button"
                  disabled={!cancelMode}
                  onClick={() => cancelMode && toggle(a.id)}
                  className={`w-full rounded-2xl border-2 px-4 py-3 text-left transition ${
                    cancelMode && isSel
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-black/8 bg-card shadow-sm'
                  } ${cancelMode ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <p className="text-sm font-semibold text-ink-900">
                    {dayStr} · {a.timeLabel}
                  </p>
                  <p className="mt-1 text-xs text-ink-600">
                    {a.mode === 'virtual' ? 'Cita virtual' : 'Cita presencial'}{' '}
                    · {a.psychologistName}
                  </p>
                  {a.mode === 'presencial' ? (
                    <p className="mt-1 text-xs font-medium text-brand-700">
                      Edificio Legacy, 3.er piso
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-ink-500">
                      Enlace por correo institucional
                    </p>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <div className="mt-6 space-y-3">
        <Link
          to="/citas/reservar"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-900 text-2xl text-white shadow-md"
          aria-label="Agregar nueva cita"
        >
          +
        </Link>

        <div className="rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-950">
          <strong className="font-semibold">Recuerda:</strong> si llegas más de{' '}
          <strong>20 minutos tarde</strong>, la cita puede cancelarse de forma
          automática. Te enviaremos recordatorios en un entorno real.
        </div>

        {appointments.length > 0 ? (
          <>
            {!cancelMode ? (
              <PrimaryButton
                variant="outline"
                onClick={() => setCancelMode(true)}
              >
                Elegir citas para cancelar
              </PrimaryButton>
            ) : (
              <>
                <p className="text-center text-sm text-ink-600">
                  Toca las citas que quieras cancelar.
                </p>
                <PrimaryButton
                  variant="danger"
                  disabled={selected.size === 0}
                  onClick={cancelSelected}
                >
                  Cancelar selección ({selected.size})
                </PrimaryButton>
                <button
                  type="button"
                  className="w-full text-sm font-medium text-ink-500"
                  onClick={() => {
                    setCancelMode(false)
                    setSelected(new Set())
                  }}
                >
                  Salir del modo cancelación
                </button>
              </>
            )}
          </>
        ) : null}
      </div>
    </Screen>
  )
}
