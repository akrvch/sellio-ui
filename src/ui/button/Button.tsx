import React from 'react'
import { cn } from '@lib/cn'

type ButtonVariant = 'contained' | 'subtle' | 'outlined' | 'ghost'
type ButtonSize = 'small' | 'medium'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  )
}

export default function Button({
  variant = 'contained',
  size = 'medium',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed'

  // padding: 8px -> p-2
  const sizeClasses = size === 'small' ? 'text-[14px]' : 'text-[16px] font-bold'

  const variantClasses =
    variant === 'contained'
      ? 'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-300 disabled:bg-gray-100 disabled:text-gray-400 focus-visible:ring-indigo-600'
      : variant === 'subtle'
      ? 'bg-indigo-100 text-brand-black hover:bg-indigo-100/80 active:bg-indigo-300 disabled:bg-gray-100 disabled:text-gray-400 focus-visible:ring-indigo-600'
      : variant === 'outlined'
      ? 'border border-gray-900 text-brand-black hover:bg-gray-100 active:bg-gray-300 disabled:text-gray-400 disabled:border-gray-300 focus-visible:ring-gray-900'
      : 'text-brand-black hover:bg-gray-100 active:bg-gray-300 disabled:text-gray-400 focus-visible:ring-gray-900'

  return (
    <button
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(base, sizeClasses, variantClasses, className)}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}


