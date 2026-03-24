import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Screen } from '../components/Screen'

function greetingForHour(h: number): string {
  if (h < 12) return 'Buenos días'
  if (h < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

const tiles = [
  {
    to: '/citas/reservar',
    label: 'Agenda tu cita',
    desc: 'Presencial o virtual con el equipo',
    emoji: '🩺',
    className: 'from-brand-400/20 to-brand-600/10',
  },
  {
    to: '/citas',
    label: 'Tus citas',
    desc: 'Ver, recordar o cancelar',
    emoji: '📅',
    className: 'from-emerald-200/40 to-brand-100/30',
  },
  {
    to: '/autoevaluacion',
    label: '¿Cómo te sientes?',
    desc: 'Demo de autoevaluación',
    emoji: '🧠',
    className: 'from-violet-200/50 to-fuchsia-100/40',
  },
  {
    to: '/recursos',
    label: 'Cápsulas de bienestar',
    desc: 'Vídeos con vista previa y lecturas para el día a día',
    emoji: '💊',
    className: 'from-amber-200/50 to-orange-100/40',
  },
] as const

export function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const greeting = useMemo(
    () => greetingForHour(new Date().getHours()),
    [],
  )

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed) {
      navigate(`/recursos?q=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/recursos')
    }
  }

  return (
    <Screen>
      <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white shadow-[var(--shadow-soft)]">
        <form onSubmit={onSearchSubmit} className="relative mb-5">
          <label htmlFor="home-search" className="sr-only">
            Buscar en recursos
          </label>
          <input
            id="home-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar recursos, temas, ansiedad…"
            className="w-full rounded-2xl border-2 border-white/30 bg-white/15 py-3.5 pl-4 pr-12 text-[15px] text-white placeholder:text-white/70 outline-none backdrop-blur-sm focus:border-white/80"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-white/20 text-lg"
            aria-label="Buscar"
          >
            🔍
          </button>
        </form>
        <p className="text-lg font-semibold leading-snug">
          {greeting}
          <span className="font-normal text-white/90">
            {' '}
            — ¿cómo te sientes hoy?
          </span>
        </p>
        <p className="mt-2 text-sm text-white/85">
          Este espacio es para ti: agendar, explorar y cuidarte sin juicios.
        </p>
      </div>

      <nav
        className="mt-6 grid grid-cols-2 gap-3"
        aria-label="Accesos principales"
      >
        {tiles.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={`group flex flex-col rounded-2xl border border-black/5 bg-gradient-to-br ${t.className} p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
          >
            <span className="text-2xl" aria-hidden>
              {t.emoji}
            </span>
            <span className="mt-3 text-[15px] font-bold text-ink-900">
              {t.label}
            </span>
            <span className="mt-1 text-xs leading-relaxed text-ink-600">
              {t.desc}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-6 space-y-3">
        <Link
          to="/servicios"
          className="flex items-center justify-between rounded-2xl border border-ink-900/10 bg-card px-4 py-3.5 text-left text-sm font-medium text-ink-900 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <span aria-hidden>⚙️</span>
            Todos nuestros servicios
          </span>
          <span className="text-ink-400">→</span>
        </Link>

        <Link
          to="/emergencia"
          className="flex items-center gap-3 rounded-2xl border-2 border-red-400/80 bg-red-50 px-4 py-4 text-left"
        >
          <span className="text-2xl" aria-hidden>
            🚨
          </span>
          <div>
            <p className="text-sm font-bold text-red-800">
              Emergencia o crisis
            </p>
            <p className="text-xs text-red-700/90">
              Si estás en peligro inmediato, usa estos contactos.
            </p>
          </div>
        </Link>
      </div>

      <p className="mt-8 text-center text-[11px] leading-relaxed text-ink-400">
        Demostración web — no sustituye valoración clínica ni emergencias.
      </p>
    </Screen>
  )
}
