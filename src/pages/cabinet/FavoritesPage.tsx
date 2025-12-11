import React from 'react'
import { Text } from '@ui'

export default function FavoritesPage() {
  return (
    <div>
      <Text variant="large-title-3" className="mb-6">
        Обране
      </Text>
      
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <img src="/icons/heart.svg" alt="Favorites" className="w-16 h-16 mx-auto mb-4 opacity-30" />
        <Text variant="title-2" color="muted">
          У вас поки немає обраних товарів
        </Text>
        <Text variant="body-2" color="muted" className="mt-2">
          Додайте товари в обране натиснувши на ♡
        </Text>
      </div>
    </div>
  )
}

