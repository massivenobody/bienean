import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { PrimaryButton } from '../components/PrimaryButton'
import { Screen } from '../components/Screen'
import { useAppointmentsContext } from '../context/AppointmentsContext'
import { psychologists } from '../data/psychologists'
import {
  ALL_TIME_SLOTS,
  chunkWeeks,
  getDayAvailability,
  toIsoLocal,
  type TimeSlot,
} from '../lib/bookingDemo'
import type { AppointmentMode } from '../types/appointment'

type Step = 'modo' | 'detalle' | 'hora' | 'confirmar'

const WEEKDAYS_ES = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'] as const

function formatDay(d: Date): string {
  return d.toLocaleDateString('es', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function monthTitle(d: Date): string {
  const raw = d.toLocaleDateString('es', { month: 'long', year: 'numeric' })
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function addMonths(d: Date, delta: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1)
}

function monthsBetween(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

/** Fecha local de “hoy” a medianoche; se recalcula en cada render para alinear con el reloj del dispositivo. */
function getTodayLocal(): Date {
  const t = new Date()
  return new Date(t.getFullYear(), t.getMonth(), t.getDate())
}

export function BookAppointment() {
  const navigate = useNavigate()
  const { addAppointment } = useAppointmentsContext()
  const [step, setStep] = useState<Step>('modo')
  const [mode, setMode] = useState<AppointmentMode | null>(null)
  const [psychId, setPsychId] = useState<string | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)

  const today = getTodayLocal()
  const todayKey = today.getTime()

  const minMonth = useMemo(() => startOfMonth(today), [todayKey])
  const maxMonth = useMemo(() => addMonths(minMonth, 5), [minMonth])

  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(getTodayLocal()),
  )

  const psych = psychologists.find((p) => p.id === psychId)

  const canPrevMonth = monthsBetween(minMonth, viewMonth) > 0
  const canNextMonth = monthsBetween(viewMonth, maxMonth) > 0

  const calendarRows = useMemo(
    () => chunkWeeks(viewMonth.getFullYear(), viewMonth.getMonth()),
    [viewMonth],
  )

  const slotStateForSelected = useMemo(() => {
    if (!date || !psychId) return null
    return getDayAvailability(date, psychId, getTodayLocal())
  }, [date, psychId, todayKey])

  const selectDay = useCallback(
    (d: Date) => {
      if (!psychId) return
      const st = getDayAvailability(d, psychId, getTodayLocal())
      if (!st.hasAvailability) return
      setDate(d)
      setTime((prev) => {
        if (prev && st.freeSlots.includes(prev as TimeSlot)) return prev
        return null
      })
    },
    [psychId, todayKey],
  )

  function resetFlow() {
    setStep('modo')
    setMode(null)
    setPsychId(null)
    setDate(null)
    setTime(null)
    setViewMonth(startOfMonth(getTodayLocal()))
  }

  function confirm() {
    if (!mode || !psych || !date || !time) return
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `c-${Date.now()}`
    addAppointment({
      id,
      mode,
      psychologistId: psych.id,
      psychologistName: psych.name,
      dateIso: toIsoLocal(date),
      timeLabel: time,
      createdAt: new Date().toISOString(),
    })
    navigate('/citas', { replace: true, state: { booked: true } })
  }

  return (
    <Screen>
      <PageHeader
        title="Agenda tu cita"
        subtitle="Cita de acompañamiento psicopedagógico con personal de la universidad."
        backTo="/"
      />

      {step === 'modo' && (
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-sm text-ink-600">
            Elige cómo prefieres la sesión. En ambos casos recibirás confirmación
            en la app.
          </p>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => {
                setMode('presencial')
                setStep('detalle')
              }}
              className="rounded-2xl border-2 border-brand-200 bg-card p-5 text-left shadow-sm transition hover:border-brand-400"
            >
              <span className="text-lg font-bold text-ink-900">Presencial</span>
              <p className="mt-1 text-sm text-ink-600">
                Acude al campus en la franja acordada.
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('virtual')
                setStep('detalle')
              }}
              className="rounded-2xl border-2 border-brand-200 bg-card p-5 text-left shadow-sm transition hover:border-brand-400"
            >
              <span className="text-lg font-bold text-ink-900">Virtual</span>
              <p className="mt-1 text-sm text-ink-600">
                Videollamada (p. ej. Teams) con enlace enviado por correo.
              </p>
            </button>
          </div>
        </div>
      )}

      {step === 'detalle' && mode && (
        <div className="flex flex-1 flex-col gap-4">
          <div
            className={`rounded-2xl p-4 text-sm leading-relaxed ${
              mode === 'presencial'
                ? 'bg-brand-50 text-brand-900'
                : 'bg-violet-50 text-violet-950'
            }`}
          >
            {mode === 'presencial' ? (
              <>
                <strong className="font-semibold">Ubicación:</strong> para tu
                cita presencial dirígete al{' '}
                <strong>tercer piso del edificio Legacy</strong> (señalética
                Bienestar estudiantil).
              </>
            ) : (
              <>
                <strong className="font-semibold">Virtual:</strong> a tu correo
                institucional te llegará el enlace de la sala de Teams y la hora
                confirmada.
              </>
            )}
          </div>

          <p className="text-sm font-medium text-ink-900">
            Elige a tu psicólogo/a
          </p>
          <ul className="space-y-2">
            {psychologists.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    setPsychId(p.id)
                    setDate(null)
                    setTime(null)
                    setViewMonth(startOfMonth(getTodayLocal()))
                    setStep('hora')
                  }}
                  className={`w-full rounded-2xl border-2 px-4 py-3 text-left transition ${
                    psychId === p.id
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-black/10 bg-card hover:border-brand-300'
                  }`}
                >
                  <span className="font-semibold text-ink-900">{p.name}</span>
                  <p className="mt-0.5 text-xs text-ink-600">{p.shortBio}</p>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="text-sm font-medium text-brand-600"
            onClick={() => {
              setStep('modo')
              setMode(null)
            }}
          >
            Cambiar modalidad
          </button>
        </div>
      )}

      {step === 'hora' && mode && psychId && (
        <div className="flex flex-1 flex-col gap-5">
          <p className="text-sm text-ink-600">
            Elige el día en el calendario. Los huecos ocupados y los días
            completos son solo de demostración.
          </p>

          <div className="rounded-2xl border border-black/10 bg-card p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <button
                type="button"
                disabled={!canPrevMonth}
                onClick={() => setViewMonth((m) => addMonths(m, -1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-lg font-semibold text-ink-800 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Mes anterior"
              >
                ‹
              </button>
              <p className="min-w-0 flex-1 text-center text-[15px] font-bold capitalize text-ink-900">
                {monthTitle(viewMonth)}
              </p>
              <button
                type="button"
                disabled={!canNextMonth}
                onClick={() => setViewMonth((m) => addMonths(m, 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 text-lg font-semibold text-ink-800 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Mes siguiente"
              >
                ›
              </button>
            </div>

            <div
              className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-400"
              aria-hidden
            >
              {WEEKDAYS_ES.map((w) => (
                <div key={w} className="py-1">
                  {w}
                </div>
              ))}
            </div>

            <div className="mt-1 space-y-1">
              {calendarRows.map((row, ri) => (
                <div key={ri} className="grid grid-cols-7 gap-1">
                  {row.map((cell, ci) => {
                    if (!cell) {
                      return (
                        <div
                          key={`e-${ri}-${ci}`}
                          className="aspect-square rounded-xl"
                        />
                      )
                    }
                    const st = getDayAvailability(cell, psychId, today)
                    const selected =
                      date && toIsoLocal(cell) === toIsoLocal(date)
                    const isTodayCell = toIsoLocal(cell) === toIsoLocal(today)
                    const clickable = st.hasAvailability

                    let cellClass =
                      'relative flex aspect-square flex-col items-center justify-center rounded-xl border-2 text-sm font-semibold transition '

                    if (isTodayCell) {
                      cellClass += 'ring-2 ring-brand-500 ring-offset-1 ring-offset-card '
                    }

                    if (!clickable) {
                      cellClass +=
                        'cursor-not-allowed border-transparent bg-stone-100 text-stone-400'
                    } else if (selected) {
                      cellClass +=
                        'border-brand-500 bg-brand-500 text-white shadow-sm'
                    } else if (st.freeSlots.length <= 2) {
                      cellClass +=
                        'border-amber-200 bg-amber-50/80 text-ink-900 hover:border-amber-400'
                    } else {
                      cellClass +=
                        'border-black/10 bg-white text-ink-900 hover:border-brand-300'
                    }

                    return (
                      <button
                        key={toIsoLocal(cell)}
                        type="button"
                        disabled={!clickable}
                        onClick={() => selectDay(cell)}
                        className={cellClass}
                        aria-label={`${cell.getDate()} ${monthTitle(viewMonth)}${
                          isTodayCell ? ', hoy' : ''
                        }${
                          !clickable
                            ? ', sin disponibilidad'
                            : st.freeSlots.length <= 2
                              ? ', pocas franjas libres'
                              : ''
                        }`}
                      >
                        <span className="tabular-nums">{cell.getDate()}</span>
                        {clickable && !selected ? (
                          <span
                            className={`mt-0.5 h-1.5 w-1.5 rounded-full ${
                              st.freeSlots.length <= 2
                                ? 'bg-amber-500'
                                : 'bg-brand-500'
                            }`}
                            aria-hidden
                          />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex flex-wrap gap-3 rounded-xl bg-surface px-3 py-2 text-[11px] text-ink-600"
            role="note"
          >
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-brand-500"
                aria-hidden
              />
              Con franjas
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-amber-500"
                aria-hidden
              />
              Pocas franjas
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-stone-300"
                aria-hidden
              />
              Completo / fin de semana / pasado
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full border-2 border-brand-500"
                aria-hidden
              />
              Borde verde: hoy
            </span>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
              Hora
            </p>
            {!date ? (
              <p className="text-sm text-ink-500">
                Selecciona un día en el calendario para ver las franjas.
              </p>
            ) : slotStateForSelected ? (
              <div className="flex flex-wrap gap-2">
                {ALL_TIME_SLOTS.map((slot) => {
                  const taken = slotStateForSelected.takenSlots.includes(slot)
                  const selected = time === slot && !taken
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={taken}
                      onClick={() => !taken && setTime(slot)}
                      className={`min-w-[4.5rem] rounded-xl border-2 px-3 py-2 text-sm font-medium transition ${
                        taken
                          ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 line-through decoration-stone-400'
                          : selected
                            ? 'border-brand-500 bg-brand-500 text-white'
                            : 'border-black/10 bg-card text-ink-800 hover:border-brand-300'
                      }`}
                    >
                      {taken ? `${slot} · ocupado` : slot}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>

          <PrimaryButton
            disabled={!date || !time}
            onClick={() => setStep('confirmar')}
          >
            Continuar
          </PrimaryButton>
          <button
            type="button"
            className="text-sm font-medium text-brand-600"
            onClick={() => {
              setStep('detalle')
              setDate(null)
              setTime(null)
            }}
          >
            Volver a profesionales
          </button>
        </div>
      )}

      {step === 'confirmar' && mode && psych && date && time && (
        <div className="flex flex-1 flex-col gap-4">
          <div className="rounded-2xl border border-black/10 bg-card p-4 text-left shadow-sm">
            <p className="text-xs font-semibold uppercase text-ink-400">
              Resumen
            </p>
            <ul className="mt-2 space-y-1 text-sm text-ink-800">
              <li>
                <strong>Modalidad:</strong>{' '}
                {mode === 'presencial' ? 'Presencial' : 'Virtual'}
              </li>
              <li>
                <strong>Profesional:</strong> {psych.name}
              </li>
              <li>
                <strong>Fecha:</strong> {formatDay(date)} ({date.getFullYear()}
                )
              </li>
              <li>
                <strong>Hora:</strong> {time}
              </li>
            </ul>
          </div>
          <p className="text-xs text-ink-500">
            Al confirmar guardamos la cita en este dispositivo (demo local). En
            un producto real iría al sistema institucional.
          </p>
          <PrimaryButton onClick={confirm}>Confirmar cita</PrimaryButton>
          <button
            type="button"
            className="text-sm font-medium text-brand-600"
            onClick={() => setStep('hora')}
          >
            Editar horario
          </button>
          <button
            type="button"
            className="text-sm text-ink-500"
            onClick={resetFlow}
          >
            Empezar de nuevo
          </button>
        </div>
      )}
    </Screen>
  )
}
