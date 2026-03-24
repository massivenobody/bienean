import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { PrimaryButton } from '../components/PrimaryButton'
import { Screen } from '../components/Screen'
import {
  demoQuestions,
  outcomeFromScores,
  type DemoOutcome,
} from '../data/assessment'
import { resourcesByIds } from '../data/resources'

const scaleLabels = [
  { v: 1, l: 'Nada' },
  { v: 2, l: 'Poco' },
  { v: 3, l: 'A veces' },
  { v: 4, l: 'Bastante' },
  { v: 5, l: 'Mucho' },
] as const

const linkBtnOutline =
  'inline-flex min-h-12 w-full items-center justify-center rounded-2xl border-2 border-brand-200 bg-white px-5 text-[15px] font-semibold text-brand-700 transition hover:bg-brand-50 active:scale-[0.98]'

export function Assessment() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [outcome, setOutcome] = useState<DemoOutcome | null>(null)

  const q = demoQuestions[index]
  const isLast = index >= demoQuestions.length - 1

  function pick(value: number) {
    const nextScores = [...scores, value]
    setScores(nextScores)
    if (isLast) {
      setOutcome(outcomeFromScores(nextScores))
    } else {
      setIndex((i) => i + 1)
    }
  }

  function restart() {
    setIndex(0)
    setScores([])
    setOutcome(null)
  }

  if (outcome) {
    const recs = resourcesByIds(outcome.resourceIds)
    return (
      <Screen>
        <PageHeader
          title="Resultado (demo)"
          subtitle="Esto es una simulación para la presentación del producto."
          backTo="/"
        />
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-left">
          <p className="text-lg font-bold text-brand-900">{outcome.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-brand-900/90">
            {outcome.summary}
          </p>
        </div>
        <p className="mt-4 text-sm font-medium text-ink-900">
          Te recomendamos este contenido en la app
        </p>
        <ul className="mt-2 space-y-2">
          {recs.map((r) => (
            <li key={r.id}>
              <Link
                to={`/recursos/${r.id}`}
                className="block rounded-2xl border border-black/10 bg-card px-4 py-3 text-left shadow-sm transition hover:border-brand-300"
              >
                <span className="text-xs font-semibold uppercase text-brand-600">
                  {r.type === 'video' ? 'Video' : 'Artículo'}
                </span>
                <p className="mt-1 text-sm font-semibold text-ink-900">
                  {r.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-3">
          <button
            type="button"
            className={linkBtnOutline}
            onClick={() => navigate('/recursos')}
          >
            Ver todos los recursos
          </button>
          <PrimaryButton variant="solid" onClick={restart}>
            Repetir demo
          </PrimaryButton>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <PageHeader
        title="¿Cómo te sientes?"
        subtitle="Al terminar verás un mensaje orientativo y enlaces a material de autocuidado. No es un diagnóstico."
        backTo="/"
      />

      <div className="mb-2 flex justify-between text-xs text-ink-400">
        <span>
          Pregunta {index + 1} de {demoQuestions.length}
        </span>
        <span>Demo</span>
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border border-black/10 bg-card p-5 shadow-sm">
        <p className="text-[15px] font-medium leading-relaxed text-ink-900">
          {q.text}
        </p>
        <p className="mt-4 text-xs text-ink-500">
          Indica cuánto encaja contigo últimamente (últimas semanas).
        </p>
        <div className="mt-6 grid grid-cols-5 gap-2">
          {scaleLabels.map(({ v, l }) => (
            <button
              key={v}
              type="button"
              onClick={() => pick(v)}
              className="flex flex-col items-center gap-1 rounded-xl border-2 border-black/10 bg-surface py-3 text-center transition hover:border-brand-400 hover:bg-brand-50"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{
                  background: `hsl(${120 - v * 18}, 65%, ${48 + v * 4}%)`,
                }}
              >
                {v}
              </span>
              <span className="px-0.5 text-[10px] font-medium leading-tight text-ink-600">
                {l}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-ink-400">
          Escala de ejemplo — no sustituye una valoración profesional.
        </p>
      </div>
    </Screen>
  )
}
