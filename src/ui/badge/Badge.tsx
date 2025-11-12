import React from 'react'
import { cn } from '@lib/cn'

type Sentiment = 'neutral' | 'positive' | 'negative' | 'attentive' | 'informative'

export type BadgeProps = {
  sentiment?: Sentiment
  showText?: boolean
  children?: React.ReactNode
  className?: string
}

const bgBySentiment: Record<Sentiment, string> = {
  neutral: 'bg-brand-black',
  positive: 'bg-green-400',
  negative: 'bg-red-600',
  attentive: 'bg-yellow-400',
  informative: 'bg-indigo-600',
}

const textBySentiment: Record<Sentiment, string> = {
  neutral: 'text-white',
  positive: 'text-white',
  negative: 'text-white',
  attentive: 'text-brand-black',
  informative: 'text-white',
}

export default function Badge({
  sentiment = 'informative',
  showText = true,
  children,
  className,
}: BadgeProps) {
  const text =
    typeof children === 'string' || typeof children === 'number'
      ? String(children)
      : undefined
  const isSingleChar = !!text && text.length === 1

  if (!showText) {
    return (
      <span
        className={cn(
          'inline-block h-2.5 w-2.5 rounded-full',
          bgBySentiment[sentiment],
          className,
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full text-[14px] font-semibold leading-none',
        isSingleChar ? 'h-7 w-7' : 'h-7 py-0.5 px-1',
        bgBySentiment[sentiment],
        textBySentiment[sentiment],
        className,
      )}
    >
      {children}
    </span>
  )
}


