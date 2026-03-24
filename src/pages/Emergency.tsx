import { PageHeader } from '../components/PageHeader'
import { Screen } from '../components/Screen'

export function Emergency() {
  return (
    <Screen>
      <PageHeader
        title="Emergencia o crisis"
        subtitle="Si tú o alguien cercano está en riesgo inmediato, actúa ya. Información orientativa para Bogotá, Colombia."
        backTo="/"
      />

      <div className="space-y-4 rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-left">
        <p className="text-sm font-bold text-red-950">
          Si hay peligro inmediato para la vida o integridad, llama a la línea
          nacional de emergencias <strong>123</strong> (Colombia) o acude al
          servicio de urgencias más cercano.
        </p>
        <p className="text-xs leading-relaxed text-red-900/95">
          Los datos siguientes son de referencia pública (Secretaría Distrital de
          Salud de Bogotá y canales oficiales). Confirma siempre en sitios
          institucionales actualizados.
        </p>
        <ul className="space-y-3 text-sm text-red-950">
          <li className="rounded-xl border border-red-200/80 bg-white/80 p-3">
            <strong className="block text-red-900">Línea 123 — Emergencias</strong>
            <span className="mt-1 block text-red-800">
              Atención de emergencias en salud (incluye crisis que requieren
              respuesta inmediata).
            </span>
            <a
              className="mt-2 inline-block font-semibold text-red-700 underline"
              href="tel:123"
            >
              Llamar al 123
            </a>
          </li>
          <li className="rounded-xl border border-red-200/80 bg-white/80 p-3">
            <strong className="block text-red-900">
              Línea 106 — Apoyo psicológico (Bogotá)
            </strong>
            <span className="mt-1 block text-red-800">
              Orientación y acompañamiento en salud mental, disponible las 24
              horas según la Secretaría Distrital de Salud.
            </span>
            <a
              className="mt-2 inline-block font-semibold text-red-700 underline"
              href="tel:106"
            >
              Llamar al 106
            </a>
            <div className="mt-2 flex flex-col gap-1 text-xs text-red-800">
              <span>
                WhatsApp (canal publicitado por la línea):{' '}
                <a
                  className="font-semibold underline"
                  href="https://wa.me/573007548933"
                  target="_blank"
                  rel="noreferrer"
                >
                  +57 300 754 8933
                </a>
              </span>
              <span>
                Correo:{' '}
                <a
                  className="font-semibold underline"
                  href="mailto:linea106@saludcapital.gov.co"
                >
                  linea106@saludcapital.gov.co
                </a>
              </span>
            </div>
          </li>
          <li className="rounded-xl border border-red-200/80 bg-white/80 p-3">
            <strong className="block text-red-900">
              Línea Salvavidas — Niños, adolescentes y jóvenes (Bogotá)
            </strong>
            <span className="mt-1 block text-red-800">
              Contención en crisis y prevención del suicidio en población
              joven; número difundido por la red de salud mental de Bogotá.
            </span>
            <a
              className="mt-2 inline-block font-semibold text-red-700 underline"
              href="tel:+573117668666"
            >
              Llamar al 311 766 8666
            </a>
          </li>
          <li className="rounded-xl border border-red-200/80 bg-white/80 p-3">
            <strong className="block text-red-900">Línea Púrpura</strong>
            <span className="mt-1 block text-red-800">
              Orientación ante violencias basadas en género (línea nacional
              gratuita).
            </span>
            <a
              className="mt-2 inline-block font-semibold text-red-700 underline"
              href="tel:018000112137"
            >
              018000 112 137
            </a>
          </li>
        </ul>
      </div>

      <section className="mt-6 rounded-2xl border border-black/10 bg-card p-4 text-left shadow-sm">
        <h2 className="text-sm font-bold text-ink-900">
          En la universidad (datos de demostración)
        </h2>
        <ul className="mt-3 space-y-3 text-sm text-ink-800">
          <li>
            <strong>Conmutador Bienestar (Colombia):</strong>{' '}
            <a className="font-semibold text-brand-700 underline" href="tel:+576017458800">
              +57 (601) 745 8800
            </a>
            <span className="mt-1 block text-xs text-ink-500">
              Opción 3: acompañamiento psicopedagógico. Lun–vie 8:00–18:00.
            </span>
          </li>
          <li>
            <strong>Enfermería y primeros auxilios:</strong>{' '}
            <span className="font-medium text-ink-900">piso 1</span>, ala
            sur del edificio central (entrada por la plaza). Atención inmediata
            para crisis leves, signos vitales y derivación a urgencias si hace
            falta.
          </li>
          <li>
            <strong>Oficinas de Bienestar Universitario:</strong>{' '}
            <span className="font-medium text-ink-900">piso 3</span>, módulo de
            psicopedagogía y orientación académica. Ahí coordinas citas,
            talleres y primera escucha.
          </li>
          <li>
            <strong>Correo (ejemplo):</strong>{' '}
            <a
              className="font-semibold text-brand-700 underline"
              href="mailto:bienestar@universidadbogota.edu.co"
            >
              bienestar@universidadean.edu.co
            </a>
          </li>
        </ul>
      </section>
    </Screen>
  )
}
