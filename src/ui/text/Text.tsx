import React from 'react'
import { cn } from '@lib/cn'

export type TextVariant =
  | 'large-title-1'
  | 'large-title-2'
  | 'large-title-3'
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'subtitle-1'
  | 'body-1'
  | 'subtitle-2'
  | 'body-2'
  | 'caption-1'
  | 'caption-1-bold'
  | 'caption-2'

export type TextProps<T extends keyof JSX.IntrinsicElements = 'span'> = {
  as?: T
  variant?: TextVariant
  className?: string
  color?: 'default' | 'muted' | 'disabled'
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'color'>

const stylesByVariant: Record<TextVariant, string> = {
  'large-title-1': 'text-[48px] leading-[56px] font-bold',
  'large-title-2': 'text-[36px] leading-[44px] font-bold',
  'large-title-3': 'text-[28px] leading-[36px] font-bold',
  'title-1': 'text-[24px] leading-[32px] font-bold',
  'title-2': 'text-[20px] leading-[28px] font-bold',
  'title-3': 'text-[18px] leading-[26px] font-bold',
  'subtitle-1': 'text-[16px] leading-[24px] font-bold',
  'body-1': 'text-[16px] leading-[24px] font-normal',
  'subtitle-2': 'text-[14px] leading-[22px] font-bold',
  'body-2': 'text-[14px] leading-[22px] font-normal',
  'caption-1': 'text-[12px] leading-[20px] font-normal',
  'caption-1-bold': 'text-[12px] leading-[20px] font-bold',
  'caption-2': 'text-[10px] leading-[12px] font-normal',
}

const colorByTone = {
  default: 'text-brand-black',
  muted: 'text-gray-600',
  disabled: 'text-gray-500',
}

export default function Text<T extends keyof JSX.IntrinsicElements = 'span'>({
  as,
  variant = 'body-1',
  className,
  color = 'default',
  children,
  ...rest
}: TextProps<T>) {
  const Component = (as ?? 'span') as any
  return (
    <Component
      className={cn(stylesByVariant[variant], colorByTone[color], className)}
      {...rest}
    >
      {children}
    </Component>
  )
}


