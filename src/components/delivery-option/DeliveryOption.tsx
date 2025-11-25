import React from 'react'
import { Text } from '@ui'

interface DeliveryOptionItem {
  type: string
  date: string
  price: number
}

interface DeliveryOptionProps {
  icon: string
  title: string
  options: DeliveryOptionItem[]
}

export default function DeliveryOption({ icon, title, options }: DeliveryOptionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <img src={icon} alt="" className="w-6 h-6" />
        <Text variant="subtitle-1">{title}</Text>
      </div>
      <div className="space-y-2 ml-8">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2 lg:gap-4 min-w-0">
            <Text variant="body-2" className="flex-shrink-0">{option.type}</Text>
            <div className="flex-1 border-b border-gray-200 min-w-0"></div>
            <div className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
              <Text variant="body-2" className="text-indigo-600">{option.date},</Text>
              <Text variant="subtitle-2">
                {option.price === 0 ? '0 ₴' : `${option.price} ₴`}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

