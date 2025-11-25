import React from 'react'
import { cn } from '@lib/cn'

export type BreadcrumbItem = {
  label: string
  href?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  variant?: 'title' | 'body'
  separator?: React.ReactNode
  className?: string
}

function CrumbLink({
  item,
  isCurrent,
  variant,
}: {
  item: BreadcrumbItem
  isCurrent: boolean
  variant: 'title' | 'body'
}) {
  const base =
    'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2'
  const interactive = 'hover:underline active:underline active:text-indigo-600'
  const disabled = 'text-gray-400 pointer-events-none cursor-default'
  const size = variant === 'title' ? 'text-[16px] font-bold' : 'text-[16px]'
  const color = isCurrent ? 'text-indigo-600 underline decoration-1 underline-offset-4' : 'text-brand-black'
  const display = isCurrent ? 'block whitespace-nowrap lg:truncate' : 'inline-block whitespace-nowrap'

  const className = cn(
    base,
    size,
    color,
    display,
    !item.disabled && !isCurrent && interactive,
    item.disabled && disabled,
  )

  if (item.href && !isCurrent && !item.disabled) {
    return (
      <a className={className} href={item.href} onClick={item.onClick}>
        {item.label}
      </a>
    )
  }

  return (
    <span className={className} aria-current={isCurrent ? 'page' : undefined}>
      {item.label}
    </span>
  )
}

export default function Breadcrumbs({
  items,
  variant = 'body',
  separator = '›',
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-brand-black overflow-x-auto lg:overflow-hidden scrollbar-hide">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li
              key={`${item.label}-${index}`}
              className={cn(
                "inline-flex items-center gap-2",
                isLast ? "min-w-0 lg:flex-1" : "flex-shrink-0"
              )}
            >
              <CrumbLink item={item} isCurrent={isLast} variant={variant} />
              {!isLast && (
                <span className="text-gray-500 select-none">{separator}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}


