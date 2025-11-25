import React from 'react'
import { Text } from '@ui'

export interface Category {
  id: string
  name: string
  image: string
  link: string
}

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <a
      href={category.link}
      className="flex flex-col items-center justify-center bg-white rounded border border-gray-200 p-4 hover:shadow-md transition-shadow group"
    >
      {/* Category Image */}
      <div className="mb-2 w-full aspect-square flex items-center justify-center">
        <img
          src={category.image}
          alt={category.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Category Name */}
      <div className="flex items-center gap-2">
        <Text variant="subtitle-1">{category.name}</Text>
        <img
          src="/icons/arrow-right.svg"
          alt=""
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </div>
    </a>
  )
}

