export type DemoQuestion = {
  id: string
  text: string
}

/** Preguntas de demostración — no constituyen un instrumento clínico. */
export const demoQuestions: DemoQuestion[] = [
  {
    id: 'q1',
    text: 'Últimamente te cuesta concentrarte incluso en tareas que antes te resultaban sencillas.',
  },
  {
    id: 'q2',
    text: 'Sientes el cuerpo tenso o “acelerado” sin un motivo claro varias veces a la semana.',
  },
  {
    id: 'q3',
    text: 'Te cuesta disfrutar cosas que antes te gustaban (series, salir, hobbies).',
  },
  {
    id: 'q4',
    text: 'Tu mente repite preocupaciones sobre el futuro académico aunque intentes distraerte.',
  },
]

export type DemoOutcome = {
  id: string
  title: string
  summary: string
  resourceIds: string[]
}

export const demoOutcomes: DemoOutcome[] = [
  {
    id: 'stress',
    title: 'Se observan señales tempranas de estrés',
    summary:
      'Es común en épocas de entregas y exámenes. Reforzar descanso, límites con el estudio y pedir apoyo puede marcar la diferencia.',
    resourceIds: ['r1', 'r3', 'r4'],
  },
  {
    id: 'anxiety',
    title: 'Se observan señales leves de ansiedad',
    summary:
      'La ansiedad puede avisar de que estás cargando demasiado. Técnicas de regulación y organización suelen ayudar; si persiste, valorar cita.',
    resourceIds: ['r4', 'r3', 'r2'],
  },
  {
    id: 'mood',
    title: 'Podrías estar experimentando cambios leves de estado de ánimo',
    summary:
      'Los altibajos existen, pero si se alargan o interfieren con tu día a día, conviene hablarlo con un profesional del servicio.',
    resourceIds: ['r6', 'r3', 'r1'],
  },
  {
    id: 'stable',
    title: 'Tu bienestar percibido parece relativamente estable',
    summary:
      'Sigue priorizando hábitos básicos: sueño, movimiento y conexión social. El autocuidado preventivo también cuenta.',
    resourceIds: ['r2', 'r5', 'r3'],
  },
]

/** Escala 1–5: mayor valor = más malestar en estas preguntas demo. */
export function outcomeFromScores(scores: number[]): DemoOutcome {
  const avg =
    scores.reduce((a, b) => a + b, 0) / Math.max(scores.length, 1)
  if (avg >= 4) return demoOutcomes[0]
  if (avg >= 3) return demoOutcomes[1]
  if (avg >= 2) return demoOutcomes[2]
  return demoOutcomes[3]
}
