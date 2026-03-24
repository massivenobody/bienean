import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Screen } from '../components/Screen'

const items = [
  {
    title: 'Acompañamiento psicopedagógico',
    body: 'Espacios breves para hablar de carga académica, hábitos y ajuste a la vida universitaria.',
    to: '/citas/reservar',
  },
  {
    title: 'Talleres y charlas',
    body: 'Gestión emocional, procrastinación, primeros auxilios psicológicos entre pares (según calendario).',
    to: '/recursos',
  },
  {
    title: 'Material de autocuidado',
    body: 'Lecturas y vídeos curados para momentos de estrés, organización y autocuidado.',
    to: '/recursos',
  },
  {
    title: 'Orientación y derivación',
    body: 'Si necesitas otro nivel de atención, te orientamos hacia recursos clínicos o de salud.',
    to: '/emergencia',
  },
] as const

export function Services() {
  return (
    <Screen>
      <PageHeader
        title="Servicios"
        subtitle="Todo lo que ofrece bienestar estudiantil en un solo lugar."
        backTo="/"
      />
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.title}>
            <Link
              to={it.to}
              className="block rounded-2xl border border-black/10 bg-card p-4 text-left shadow-sm transition hover:border-brand-300"
            >
              <p className="font-bold text-ink-900">{it.title}</p>
              <p className="mt-1 text-sm text-ink-600">{it.body}</p>
              <span className="mt-2 inline-block text-sm font-semibold text-brand-600">
                Ir →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Screen>
  )
}
