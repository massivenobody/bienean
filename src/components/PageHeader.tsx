import { Link } from 'react-router-dom'

type Props = {
  title: string
  subtitle?: string
  backTo?: string
}

export function PageHeader({ title, subtitle, backTo }: Props) {
  return (
    <header className="mb-6 shrink-0">
      {backTo ? (
        <Link
          to={backTo}
          className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600"
        >
          <span aria-hidden>←</span> Volver
        </Link>
      ) : null}
      <h1 className="text-2xl font-bold tracking-tight text-ink-900">{title}</h1>
      {subtitle ? (
        <p className="mt-1 text-sm leading-relaxed text-ink-600">{subtitle}</p>
      ) : null}
    </header>
  )
}
