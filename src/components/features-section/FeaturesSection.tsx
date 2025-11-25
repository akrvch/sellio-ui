import React from 'react'
import { Text } from '@ui'

interface Feature {
  id: string
  number: string
  icon: string
  title: string
}

// Mock data - в майбутньому тут буде GraphQL запит або конфіг
const FEATURES: Feature[] = [
  {
    id: '1',
    number: '01',
    icon: '/icons/secure-payments.svg',
    title: 'Безпечні способи оплати',
  },
  {
    id: '2',
    number: '02',
    icon: '/icons/free-delivery.svg',
    title: 'Безкоштовна доставка від 499 ₴',
  },
  {
    id: '3',
    number: '03',
    icon: '/icons/support.svg',
    title: 'Підтримка 24/7',
  },
]

export default function FeaturesSection() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-white py-12 sm:py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div key={feature.id} className="flex items-center justify-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <img src={feature.icon} alt="" className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>

              {/* Title */}
              <Text variant="title-3">{feature.title}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

