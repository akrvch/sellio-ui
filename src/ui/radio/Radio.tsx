import React from 'react'
import { cn } from '@lib/cn'

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label?: React.ReactNode
}

export default function Radio({
  id,
  label,
  className,
  disabled,
  ...props
}: RadioProps) {
  const inputId = React.useId()
  const resolvedId = id ?? inputId

  return (
    <label
      htmlFor={resolvedId}
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none group',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <span className="relative inline-flex">
        <input
          id={resolvedId}
          type="radio"
          className="peer sr-only"
          disabled={disabled}
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            'h-5 w-5 rounded-full border border-gray-500 bg-white transition',
            'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-yellow-400 peer-focus-visible:ring-offset-2',
            'peer-disabled:border-gray-300 peer-disabled:bg-gray-100',
            'peer-checked:border-indigo-600',
            'peer-checked:disabled:border-gray-300',
            'group-hover:border-brand-black',
            'peer-checked:group-hover:border-brand-black',
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 m-auto h-[10px] w-[10px] rounded-full bg-indigo-600 opacity-0 transition-opacity',
            'peer-checked:opacity-100',
            'peer-checked:group-hover:bg-brand-black',
            'peer-disabled:bg-gray-500',
          )}
        />
      </span>
      {label && <span className="text-[16px] text-brand-black">{label}</span>}
    </label>
  )
}


