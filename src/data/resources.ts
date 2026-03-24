export type ResourceCategory =
  | 'tiempo'
  | 'organizacion'
  | 'autocuidado'
  | 'ansiedad'
  | 'animo'

export type Resource = {
  id: string
  title: string
  type: 'articulo' | 'video'
  category: ResourceCategory
  excerpt: string
  body?: string
  durationMin?: number
  /** Enlace al vídeo en YouTube (pestaña nueva). */
  externalUrl?: string
  /** Si existe, se muestra miniatura y reproductor incrustado (demo visual). */
  youtubeId?: string
  tags: string[]
}

export const categoryLabels: Record<ResourceCategory, string> = {
  tiempo: 'Tiempo',
  organizacion: 'Organización',
  autocuidado: 'Autocuidado',
  ansiedad: 'Ansiedad',
  animo: 'Estado de ánimo',
}

function ytWatch(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}

export const resources: Resource[] = [
  {
    id: 'r1',
    title: 'Método Pomodoro sin culpa: estudia en bloques reales',
    type: 'articulo',
    category: 'tiempo',
    excerpt:
      'Cómo dividir tu jornada en intervalos cortos para reducir la fatiga mental y avanzar sin quemarte.',
    tags: ['estrés', 'estudio'],
    body: `El Pomodoro no es magia: es un ritual simple. Elige una tarea única, pon un temporizador de 25 minutos y trabaja solo en eso. Al terminar, descansa 5 minutos sin pantallas si puedes.

Si te distraes, anota la idea en un papel y vuelve a la tarea. Después de cuatro ciclos, toma un descanso más largo (15–30 min).

La clave es la constancia, no la perfección: mejor cuatro pomodoros honestos que ocho horas “mirando el PDF”.`,
  },
  {
    id: 'r4',
    title: 'Cómo el estrés afecta tu cerebro (y por qué importa en la U)',
    type: 'video',
    category: 'ansiedad',
    excerpt:
      'Animación TED-Ed: memoria, cortisol y por qué descansar y pedir ayuda no es “flojera”.',
    durationMin: 5,
    youtubeId: 'WuyPuH9ojCE',
    externalUrl: ytWatch('WuyPuH9ojCE'),
    tags: ['ansiedad', 'estrés'],
  },
  {
    id: 'r2',
    title: 'Tu semana en tres listas (urgente, importante, extra)',
    type: 'articulo',
    category: 'organizacion',
    excerpt:
      'Un sistema ligero para decidir qué hacer primero cuando todo parece prioridad número uno.',
    tags: ['organización', 'estrés'],
    body: `Haz tres listas:

1) Urgente y con fecha límite cercana.
2) Importante pero sin fecha inmediata.
3) Extra: cosas que te gustaría hacer si sobra energía.

Cada mañana elige 1–3 ítems de la lista 1 y máximo uno de la lista 2. La lista 3 existe para quitarte culpa: está ahí, pero no manda tu día.

Si una tarea lleva más de tres días saltando de lista, probablemente necesita dividirse en pasos más pequeños.`,
  },
  {
    id: 'r7',
    title: 'Trabajar con foco intenso (bloques, distracciones y descanso)',
    type: 'video',
    category: 'tiempo',
    excerpt:
      'Guía en vídeo sobre concentración sostenible: entorno, tiempo en bloques y errores típicos al estudiar.',
    durationMin: 12,
    youtubeId: 'lwX8d5ebnmc',
    externalUrl: ytWatch('lwX8d5ebnmc'),
    tags: ['tiempo', 'estudio', 'foco'],
  },
  {
    id: 'r3',
    title: 'Rutina de 10 minutos para bajar el cortisol antes de dormir',
    type: 'articulo',
    category: 'autocuidado',
    excerpt:
      'Movimientos suaves, respiración y una señal clara al cerebro de que el modo “examen” terminó.',
    tags: ['autocuidado', 'ansiedad'],
    body: `Antes de dormir: apaga notificaciones, ten una luz tenue y evita debates en redes.

1) 3 minutos de estiramiento de cuello y hombros.
2) 4 minutos de respiración 4-4-6 (inhala 4, mantén 4, exhala 6).
3) 3 minutos escribiendo en una línea qué fue lo mejor del día.

No busques “desconectar del todo”: busca una transición amable entre el día y el descanso.`,
  },
  {
    id: 'r5',
    title: 'Mantener la calma cuando sabes que vendrá estrés (TED)',
    type: 'video',
    category: 'ansiedad',
    excerpt:
      'Charla con ejemplos visuales: planificar en frío antes del caos, decisiones bajo presión y prevención de errores.',
    durationMin: 12,
    youtubeId: '8jPQjjsBbIc',
    externalUrl: ytWatch('8jPQjjsBbIc'),
    tags: ['estrés', 'exámenes', 'decisiones'],
  },
  {
    id: 'r8',
    title: 'Lenguaje corporal y confianza antes de exponer o participar',
    type: 'video',
    category: 'autocuidado',
    excerpt:
      'Charla TED muy vista: postura, presencia y pequeños hábitos que cambian cómo te sientes frente a otros.',
    durationMin: 21,
    youtubeId: 'Ks-_Mh1QhMc',
    externalUrl: ytWatch('Ks-_Mh1QhMc'),
    tags: ['exposiciones', 'autocuidado', 'confianza'],
  },
  {
    id: 'r9',
    title: 'Hacer amigo al estrés (en lugar de solo combatirlo)',
    type: 'video',
    category: 'animo',
    excerpt:
      'Perspectiva en vídeo sobre biología del estrés y cómo el significado que le das cambia su impacto en tu cuerpo.',
    durationMin: 14,
    youtubeId: 'RcGyVTAoWxs',
    externalUrl: ytWatch('RcGyVTAoWxs'),
    tags: ['estrés', 'ánimo', 'cuerpo'],
  },
  {
    id: 'r10',
    title: 'Dentro de la mente de un gran procrastinador',
    type: 'video',
    category: 'tiempo',
    excerpt:
      'Charla TED con humor: el “mono del instante”, el monstruo del pánico y cómo nombrar lo que evitas.',
    durationMin: 14,
    youtubeId: 'arj7oStGLkU',
    externalUrl: ytWatch('arj7oStGLkU'),
    tags: ['procrastinación', 'organización'],
  },
  {
    id: 'r6',
    title: 'Cuando el ánimo cae: micro-acciones que no te exigen “estar bien”',
    type: 'articulo',
    category: 'animo',
    excerpt:
      'Pequeños pasos para días grises: hidratación, luz natural y una sola tarea “ganable”.',
    tags: ['ánimo', 'autocuidado'],
    body: `No necesitas animarte de golpe. En días difíciles, elige una micro-acción: abrir la ventana, beber un vaso de agua, responder un solo correo.

La luz natural (aunque sea 10 minutos) ayuda a regular el ritmo circadiano. Si puedes, camina un tramo corto sin objetivo de ejercicio, solo cambiar de escenario.

Si llevas varias semanas con fatiga persistente, desánimo intenso o pensamientos de hacerte daño, es momento de pedir ayuda profesional presencial o de urgencias.`,
  },
  {
    id: 'r11',
    title: 'Cómo el sueño repara tu cerebro (y tu memoria)',
    type: 'video',
    category: 'animo',
    excerpt:
      'Animación TED-Ed: qué ocurre mientras duermes y por qué sacrificar sueño afecta el estudio al día siguiente.',
    durationMin: 5,
    youtubeId: 'mmEAl6x7_vm',
    externalUrl: ytWatch('mmEAl6x7_vm'),
    tags: ['sueño', 'ánimo', 'memoria'],
  },
]

export function resourcesByIds(ids: string[]): Resource[] {
  const set = new Set(ids)
  return resources.filter((r) => set.has(r.id))
}

export function youtubeThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
