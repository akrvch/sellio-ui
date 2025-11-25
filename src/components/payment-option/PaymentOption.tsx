import React from 'react'
import { Text } from '@ui'

interface PaymentOptionProps {
  icon: string
  title: string
  description: string
}

export default function PaymentOption({ icon, title, description }: PaymentOptionProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4 min-w-0">
      <div className="flex items-center gap-2 flex-shrink-0">
        <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />
        <Text variant="subtitle-1" className="lg:whitespace-nowrap">{title}</Text>
      </div>
      <div className="hidden lg:block flex-1 border-b border-gray-200"></div>
      <Text variant="body-2" className="ml-8 lg:ml-0 break-words lg:whitespace-nowrap">
        {description}
      </Text>
    </div>
  )
}

