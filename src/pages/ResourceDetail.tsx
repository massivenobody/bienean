import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { VideoEmbed } from '../components/VideoEmbed'
import { Screen } from '../components/Screen'
import { categoryLabels, resources } from '../data/resources'

export function ResourceDetail() {
  const { id } = useParams()
  const r = resources.find((x) => x.id === id)

  if (!r) {
    return (
      <Screen>
        <PageHeader title="No encontrado" backTo="/recursos" />
        <p className="text-sm text-ink-600">Este recurso no existe.</p>
        <Link to="/recursos" className="mt-4 font-semibold text-brand-600">
          Volver al listado
        </Link>
      </Screen>
    )
  }

  return (
    <Screen>
      <PageHeader title={r.title} backTo="/recursos" />
      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-lg bg-brand-100 px-2 py-1 font-bold uppercase text-brand-800">
          {r.type === 'video' ? 'Video' : 'Artículo'}
        </span>
        <span className="rounded-lg bg-black/5 px-2 py-1 font-medium text-ink-600">
          {categoryLabels[r.category]}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-ink-600">{r.excerpt}</p>

      {r.type === 'video' && r.youtubeId ? (
        <div className="mt-6 space-y-3">
          <VideoEmbed youtubeId={r.youtubeId} title={r.title} />
          <p className="text-xs text-ink-500">
            Reproductor incrustado para la demo. Si no carga, ábrelo en YouTube
            con el botón de abajo.
          </p>
        </div>
      ) : null}

      {r.type === 'articulo' && r.body ? (
        <article className="mt-6 space-y-4 text-sm leading-relaxed text-ink-800">
          {r.body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      ) : null}

      {r.type === 'video' && r.externalUrl ? (
        <a
          href={r.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border-2 border-brand-200 bg-white px-5 text-[15px] font-semibold text-brand-700 transition hover:bg-brand-50 active:scale-[0.98]"
        >
          Abrir en YouTube
        </a>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-2">
        {r.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-surface px-3 py-1 text-xs text-ink-500"
          >
            #{t}
          </span>
        ))}
      </div>
    </Screen>
  )
}
