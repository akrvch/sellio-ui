import React from 'react'
import { Text } from '@ui'
import DeliveryOption from '@components/delivery-option'

interface DeliveryOptionItem {
  type: string
  date: string
  price: number
}

interface DeliveryProvider {
  icon: string
  title: string
  options: DeliveryOptionItem[]
}

interface DeliveryOptionsProps {
  providers: DeliveryProvider[]
}

export default function DeliveryOptions({ providers }: DeliveryOptionsProps) {
  return (
    <div className="space-y-4">
      <Text as="h3" variant="title-2">Доставка:</Text>
      
      {providers.map((provider, index) => (
        <DeliveryOption
          key={index}
          icon={provider.icon}
          title={provider.title}
          options={provider.options}
        />
      ))}
    </div>
  )
}

