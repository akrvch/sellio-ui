import React from 'react'
import { cn } from '@lib/cn'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  error?: string
  left?: React.ReactNode
  right?: React.ReactNode
  size?: 'medium' | 'small'
  inputClassName?: string
}

const fieldBase =
  'block w-full rounded-md border transition focus-visible:outline-none px-3'

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, inputClassName, error, disabled, left, right, size = 'medium', ...props },
  ref,
) {
  const isInvalid = Boolean(error)
  const border = isInvalid
    ? 'border-red-600'
    : 'border-gray-500 hover:border-brand-black'
  const ring = isInvalid
    ? 'focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2'
    : 'focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2'
  const colors = disabled
    ? 'bg-gray-100 text-gray-500 placeholder:text-gray-600'
    : 'bg-white text-brand-black placeholder:text-gray-600'
  const sizeClasses =
    size === 'small'
      ? 'text-[14px] leading-[22px] py-1.5'
      : 'text-[16px] leading-[24px] py-2'

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'relative flex items-center gap-2',
          disabled && 'cursor-not-allowed',
        )}
      >
        {left && <div className="pointer-events-none pl-3">{left}</div>}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          className={cn(
            fieldBase,
            sizeClasses,
            border,
            ring,
            colors,
            left && 'pl-0',
            right && 'pr-0',
            inputClassName,
          )}
          {...props}
        />
        {right && <div className="pr-3">{right}</div>}
      </div>
      {error && (
        <p className="mt-1 text-[12px] leading-[20px] text-red-600">{error}</p>
      )}
    </div>
  )
})


