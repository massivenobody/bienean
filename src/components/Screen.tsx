import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function Screen({ children, className = '' }: Props) {
  return (
    <div
      className={`mx-auto flex min-h-[100dvh] w-full max-w-lg flex-col px-4 pb-8 pt-[max(1rem,env(safe-area-inset-top))] ${className}`}
    >
      {children}
    </div>
  )
}
