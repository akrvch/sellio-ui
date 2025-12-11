import React from 'react'
import { Text } from '@ui'

export default function OrdersPage() {
  return (
    <div>
      <Text variant="large-title-3" className="mb-6">
        Мої замовлення
      </Text>
      
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <img src="/icons/orders.svg" alt="Orders" className="w-16 h-16 mx-auto mb-4 opacity-30" />
        <Text variant="title-2" color="muted">
          У вас поки немає замовлень
        </Text>
        <Text variant="body-2" color="muted" className="mt-2">
          Перейдіть до каталогу та оберіть товари
        </Text>
      </div>
    </div>
  )
}

