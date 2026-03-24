import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'solid' | 'outline' | 'danger'
}

export function PrimaryButton({
  children,
  variant = 'solid',
  className = '',
  ...rest
}: Props) {
  const base =
    'inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-5 text-[15px] font-semibold transition active:scale-[0.98] disabled:opacity-50'
  const styles =
    variant === 'solid'
      ? 'bg-brand-500 text-white shadow-sm hover:bg-brand-600'
      : variant === 'danger'
        ? 'border-2 border-red-500 bg-white text-red-600 hover:bg-red-50'
        : 'border-2 border-brand-200 bg-white text-brand-700 hover:bg-brand-50'
  return (
    <button type="button" className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  )
}
