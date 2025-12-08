import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@lib/cn'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  label?: string
  error?: boolean
  className?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

export default function Select({
  label,
  error,
  className,
  value,
  onChange,
  options,
  placeholder = 'Оберіть...',
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative" ref={containerRef}>
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-colors text-left',
            error ? 'border-red-500' : 'border-gray-300',
            disabled && 'bg-gray-100 cursor-not-allowed text-gray-500',
            !disabled && 'hover:border-gray-400'
          )}
        >
          <span className={selectedOption ? 'text-brand-black' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </button>

        {/* Arrow Icon */}
        <img 
          src="/icons/dropdown-arrow-down.svg" 
          alt="" 
          className={cn(
            'absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none h-4 w-4 transition-transform',
            isOpen && 'rotate-180'
          )}
        />

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors',
                  option.value === value && 'bg-indigo-50 text-indigo-600 font-medium'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

