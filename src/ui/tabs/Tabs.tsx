import React from 'react'
import { cn } from '@lib/cn'

export type TabItem = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export type TabsProps = {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

export default function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
}: TabsProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(
    defaultValue ?? items[0]?.value ?? '',
  )
  const current = isControlled ? (value as string) : internal

  const setValue = (val: string) => {
    if (!isControlled) setInternal(val)
    onValueChange?.(val)
  }

  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" aria-orientation="horizontal" className="flex gap-2">
        {items.map((item) => {
          const selected = item.value === current
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={selected}
              disabled={item.disabled}
              className={cn(
                'p-2 rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2',
                'border-indigo-200 text-brand-black',
                'hover:bg-indigo-50',
                selected && 'bg-indigo-100',
                item.disabled &&
                  'cursor-not-allowed border-gray-300 text-gray-500 bg-gray-100 hover:bg-gray-100',
              )}
              onClick={() => !item.disabled && setValue(item.value)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}


