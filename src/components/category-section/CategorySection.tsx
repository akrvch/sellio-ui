import React from 'react'
import CategoryCard, { type Category } from '@components/category-card'
import { Text } from '@ui'

interface CategoryGroup {
  title: string
  categories: Category[]
}

// Mock data - в майбутньому тут буде GraphQL запит
const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    title: 'Техніка та електроніка',
    categories: [
      { id: '1', name: 'Смартфони', image: '/product-images/product1.jpeg', link: '#' },
      { id: '2', name: 'Навушники', image: '/product-images/product1.jpeg', link: '#' },
      { id: '3', name: 'Годинники', image: '/product-images/product1.jpeg', link: '#' },
      { id: '4', name: 'Планшети', image: '/product-images/product1.jpeg', link: '#' },
      { id: '5', name: 'Телевізори', image: '/product-images/product1.jpeg', link: '#' },
    ],
  },
  {
    title: 'Спорт і відпочинок',
    categories: [
      { id: '6', name: 'Тренажери', image: '/product-images/product1.jpeg', link: '#' },
      { id: '7', name: 'Велосипеди', image: '/product-images/product1.jpeg', link: '#' },
      { id: '8', name: "М'ячі", image: '/product-images/product1.jpeg', link: '#' },
      { id: '9', name: 'Гантелі', image: '/product-images/product1.jpeg', link: '#' },
      { id: '10', name: 'Гаджети', image: '/product-images/product1.jpeg', link: '#' },
    ],
  },
  {
    title: 'Краса та здоровʼя',
    categories: [
      { id: '11', name: 'Парфумерія', image: '/product-images/product1.jpeg', link: '#' },
      { id: '12', name: 'Гігієна', image: '/product-images/product1.jpeg', link: '#' },
      { id: '13', name: 'Для чоловіків', image: '/product-images/product1.jpeg', link: '#' },
      { id: '14', name: 'Косметика', image: '/product-images/product1.jpeg', link: '#' },
      { id: '15', name: 'Для манікюру', image: '/product-images/product1.jpeg', link: '#' },
    ],
  },
]

export default function CategorySection() {
  // TODO: В майбутньому тут буде useQuery для GraphQL
  // const { data, loading, error } = useCategoryGroupsQuery()
  return (
    <div className="w-full space-y-8">
      <h2 className="text-2xl font-bold text-brand-black">Популярні категорії</h2>

      {CATEGORY_GROUPS.map((group) => (
        <div key={group.title} className="space-y-4">
          {/* Group Title */}
          <h3 className="text-xl font-semibold text-brand-black">{group.title}</h3>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {group.categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
            
            {/* "Всі категорії" Card */}
            <a
              href="#"
              className="flex flex-col items-center justify-center bg-indigo-50 rounded border border-indigo-200 p-6 hover:bg-indigo-100 transition-colors"
            >
              <Text variant="subtitle-1">
                Всі категорії
              </Text>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

