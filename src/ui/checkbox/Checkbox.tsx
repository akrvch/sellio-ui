import React from 'react'
import { cn } from '@lib/cn'

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label?: React.ReactNode
}

export default function Checkbox({
  id,
  label,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  const inputId = React.useId()
  const resolvedId = id ?? inputId

  return (
    <label
      htmlFor={resolvedId}
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <span className="relative inline-flex">
        <input
          id={resolvedId}
          type="checkbox"
          className="peer sr-only"
          disabled={disabled}
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            'h-5 w-5 rounded-[4px] border border-gray-500 bg-white transition',
            'peer-hover:border-brand-black',
            'peer-active:border-indigo-600',
            'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-yellow-400 peer-focus-visible:ring-offset-2',
            'peer-disabled:border-gray-300 peer-disabled:bg-gray-100',
            'peer-checked:border-indigo-600 peer-checked:bg-indigo-600',
            'peer-checked:hover:border-brand-black peer-checked:hover:bg-brand-black',
            'peer-checked:active:bg-indigo-600 peer-checked:active:border-indigo-600',
            'peer-checked:disabled:bg-gray-300 peer-checked:disabled:border-gray-300',
          )}
        />
        <svg
          className={cn(
            'pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 transition-opacity',
            'peer-checked:opacity-100',
            'peer-disabled:text-white',
          )}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 10.5l3 3 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && <span className="text-[16px] text-brand-black">{label}</span>}
    </label>
  )
}


