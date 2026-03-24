/** Franjas base para la demo (misma lista que en la UI). */
export const ALL_TIME_SLOTS = [
  '9:00',
  '10:30',
  '12:00',
  '15:00',
  '16:30',
  '18:00',
] as const

export type TimeSlot = (typeof ALL_TIME_SLOTS)[number]

function hash32(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

function toIsoLocal(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function isWeekend(d: Date): boolean {
  const day = d.getDay()
  return day === 0 || day === 6
}

function isBeforeDay(a: Date, b: Date): boolean {
  return toIsoLocal(a) < toIsoLocal(b)
}

export type DayAvailability = {
  iso: string
  freeSlots: TimeSlot[]
  takenSlots: TimeSlot[]
  fullyBooked: boolean
  hasAvailability: boolean
  isWeekend: boolean
  isPast: boolean
}

/**
 * Demo: disponibilidad estable por día + profesional.
 * Algunos días laborables quedan completos; otros tienen huecos ocupados.
 */
export function getDayAvailability(
  day: Date,
  psychId: string,
  today: Date,
): DayAvailability {
  const iso = toIsoLocal(day)
  const weekend = isWeekend(day)
  const past = isBeforeDay(day, today)

  if (weekend || past) {
    return {
      iso,
      freeSlots: [],
      takenSlots: [...ALL_TIME_SLOTS],
      fullyBooked: true,
      hasAvailability: false,
      isWeekend: weekend,
      isPast: past,
    }
  }

  const h = hash32(`${iso}|${psychId}`)
  const mode = h % 13

  if (mode === 0) {
    return {
      iso,
      freeSlots: [],
      takenSlots: [...ALL_TIME_SLOTS],
      fullyBooked: true,
      hasAvailability: false,
      isWeekend: false,
      isPast: false,
    }
  }

  const mask = (h >>> 8) & 0x3f
  const taken: TimeSlot[] = []
  const free: TimeSlot[] = []
  ALL_TIME_SLOTS.forEach((slot, i) => {
    if ((mask >> i) & 1) taken.push(slot)
    else free.push(slot)
  })

  if (free.length === 0) {
    return {
      iso,
      freeSlots: [],
      takenSlots: [...ALL_TIME_SLOTS],
      fullyBooked: true,
      hasAvailability: false,
      isWeekend: false,
      isPast: false,
    }
  }

  return {
    iso,
    freeSlots: free,
    takenSlots: taken,
    fullyBooked: false,
    hasAvailability: true,
    isWeekend: false,
    isPast: false,
  }
}

export { toIsoLocal }

export function chunkWeeks(year: number, month: number): (Date | null)[][] {
  const first = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0).getDate()
  const startPad = (first.getDay() + 6) % 7
  const cells: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= lastDay; d++) {
    cells.push(new Date(year, month, d))
  }
  while (cells.length % 7 !== 0) cells.push(null)
  const rows: (Date | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }
  return rows
}
