import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Screen } from '../components/Screen'
import {
  categoryLabels,
  resources,
  youtubeThumbnailUrl,
  type ResourceCategory,
} from '../data/resources'

const categories: ResourceCategory[] = [
  'tiempo',
  'organizacion',
  'autocuidado',
  'ansiedad',
  'animo',
]

export function Resources() {
  const [params] = useSearchParams()
  const qRaw = params.get('q')?.trim().toLowerCase() ?? ''
  const [cat, setCat] = useState<ResourceCategory | 'todas'>('todas')

  const filtered = useMemo(() => {
    const list = resources.filter((r) => {
      if (cat !== 'todas' && r.category !== cat) return false
      if (!qRaw) return true
      const blob =
        `${r.title} ${r.excerpt} ${r.tags.join(' ')}`.toLowerCase()
      return blob.includes(qRaw)
    })
    if (!qRaw && cat === 'todas') {
      return [...list].sort((a, b) => {
        if (a.type === b.type) return 0
        return a.type === 'video' ? -1 : 1
      })
    }
    return list
  }, [cat, qRaw])

  return (
    <Screen>
      <PageHeader
        title="Cápsulas de bienestar"
        subtitle="Vídeos con vista previa y reproductor dentro de la app, más lecturas cortas para el día a día."
        backTo="/"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCat('todas')}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            cat === 'todas'
              ? 'bg-brand-500 text-white'
              : 'bg-black/5 text-ink-700'
          }`}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              cat === c
                ? 'bg-brand-500 text-white'
                : 'bg-black/5 text-ink-700'
            }`}
          >
            {categoryLabels[c]}
          </button>
        ))}
      </div>

      {qRaw ? (
        <p className="mt-3 text-sm text-ink-600">
          Resultados para «{params.get('q')}»: {filtered.length}
        </p>
      ) : null}

      <ul className="mt-4 space-y-4">
        {filtered.map((r) => (
          <li key={r.id}>
            <Link
              to={`/recursos/${r.id}`}
              className="block overflow-hidden rounded-2xl border border-black/10 bg-card text-left shadow-sm transition hover:border-brand-300"
            >
              {r.type === 'video' && r.youtubeId ? (
                <div className="relative aspect-video w-full bg-black">
                  <img
                    src={youtubeThumbnailUrl(r.youtubeId)}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/20 to-black/30">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-xl text-brand-600 shadow-lg ring-2 ring-white/80"
                      aria-hidden
                    >
                      ▶
                    </span>
                  </div>
                  {r.durationMin ? (
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white">
                      {r.durationMin} min
                    </span>
                  ) : null}
                </div>
              ) : null}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-lg bg-brand-100 px-2 py-0.5 text-[11px] font-bold uppercase text-brand-800">
                    {r.type === 'video' ? 'Video' : 'Lectura'}
                  </span>
                  <span className="text-xs text-ink-400">
                    {categoryLabels[r.category]}
                  </span>
                </div>
                <p className="mt-2 text-[15px] font-bold text-ink-900">
                  {r.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  {r.excerpt}
                </p>
                {r.type === 'video' && !r.youtubeId && r.durationMin ? (
                  <p className="mt-2 text-xs text-ink-400">
                    ~{r.durationMin} min
                  </p>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-ink-500">
          No hay resultados. Prueba otra categoría o búsqueda desde inicio.
        </p>
      ) : null}
    </Screen>
  )
}
