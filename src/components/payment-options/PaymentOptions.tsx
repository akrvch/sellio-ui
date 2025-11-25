import React from 'react'
import { Text } from '@ui'
import PaymentOption from '@components/payment-option'

interface PaymentMethod {
  icon: string
  title: string
  description: string
}

interface PaymentOptionsProps {
  methods: PaymentMethod[]
}

export default function PaymentOptions({ methods }: PaymentOptionsProps) {
  return (
    <div className="space-y-4">
      <Text as="h3" variant="title-2">Оплата:</Text>
      
      <div className="space-y-3">
        {methods.map((method, index) => (
          <PaymentOption
            key={index}
            icon={method.icon}
            title={method.title}
            description={method.description}
          />
        ))}
      </div>
    </div>
  )
}

