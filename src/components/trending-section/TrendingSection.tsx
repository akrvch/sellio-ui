import React, { useState } from 'react'
import ProductCard, { type Product } from '@components/product-card'

interface TrendingCategory {
  id: string
  label: string
  products: Product[]
}

// Mock data - в майбутньому тут буде GraphQL запит
const TRENDING_CATEGORIES: TrendingCategory[] = [
  {
    id: 'tech',
    label: 'Техніка та електроніка',
    products: [
      { id: 't1', name: 'Смартфон Apple iPhone 16 Pro 1Tb Desert Titanium', url: '/p/t1-iphone-16-pro', image: 'https://via.placeholder.com/250', price: 84999, inStock: true },
      { id: 't2', name: 'Зарядна станція універсальна EcoFlow DELTA 2 MAX', url: '/p/t2-ecoflow-delta-2-max', image: 'https://via.placeholder.com/250', price: 100999, inStock: true },
      { id: 't3', name: 'Зарядна станція універсальна Bluetti PowerOak AC200P', url: '/p/t3-bluetti-ac200p', image: 'https://via.placeholder.com/250', price: 54999, inStock: true },
      { id: 't4', name: 'Смартфон APPLE iPhone 16 128GB Ultramarine', url: '/p/t4-iphone-16-ultramarine', image: 'https://via.placeholder.com/250', price: 47499, inStock: true },
      { id: 't5', name: 'Портативна сонячна панель EcoFlow 400W (1ECO1000-07)', url: '/p/t5-ecoflow-solar-panel', image: 'https://via.placeholder.com/250', price: 33999, inStock: true },
      { id: 't6', name: 'Зарядна станція універсальна EcoFlow DELTA 2 MAX', url: '/p/t6-ecoflow-delta-2-max-2', image: 'https://via.placeholder.com/250', price: 99999, inStock: true },
    ] as Product[],
  },
  {
    id: 'clothes',
    label: 'Одяг та взуття',
    products: [
      { id: 'c1', name: 'Куртка зимова чоловіча', url: '/p/c1-kurtka-zymova', image: 'https://via.placeholder.com/250', price: 2999, inStock: true },
      { id: 'c2', name: 'Кросівки Nike Air Max', url: '/p/c2-nike-air-max', image: 'https://via.placeholder.com/250', price: 3499, oldPrice: 4999, inStock: true },
    ] as Product[],
  },
  {
    id: 'home',
    label: 'Дім та сад',
    products: [
      { id: 'h1', name: 'Пилосос Dyson V15', url: '/p/h1-dyson-v15', image: 'https://via.placeholder.com/250', price: 19999, inStock: true },
      { id: 'h2', name: 'Мультиварка Tefal', url: '/p/h2-tefal-multicooker', image: 'https://via.placeholder.com/250', price: 2499, inStock: true },
    ] as Product[],
  },
  {
    id: 'tools',
    label: 'Інструменти',
    products: [
      { id: 'to1', name: 'Дриль акумуляторний Bosch', url: '/p/to1-bosch-drill', image: 'https://via.placeholder.com/250', price: 3999, inStock: true },
    ] as Product[],
  },
  {
    id: 'auto',
    label: 'Авто деталі',
    products: [
      { id: 'a1', name: 'Автомобільний компресор', url: '/p/a1-car-compressor', image: 'https://via.placeholder.com/250', price: 1299, inStock: true },
    ] as Product[],
  },
  {
    id: 'accessories',
    label: 'Прикраси та аксесуари',
    products: [
      { id: 'ac1', name: 'Годинник чоловічий Casio', url: '/p/ac1-casio-watch', image: 'https://via.placeholder.com/250', price: 2999, inStock: true },
    ] as Product[],
  },
  {
    id: 'pets',
    label: 'Зоотовари',
    products: [
      { id: 'p1', name: 'Корм для собак Royal Canin', url: '/p/p1-royal-canin', image: 'https://via.placeholder.com/250', price: 899, inStock: true },
    ] as Product[],
  },
  {
    id: 'sport',
    label: 'Спорт',
    products: [
      { id: 's1', name: 'Бігова доріжка', url: '/p/s1-treadmill', image: 'https://via.placeholder.com/250', price: 12999, inStock: true },
    ] as Product[],
  },
]

export default function TrendingSection() {
  // TODO: В майбутньому тут буде useQuery для GraphQL
  // const { data, loading, error } = useTrendingCategoriesQuery()

  const [activeCategory, setActiveCategory] = useState(TRENDING_CATEGORIES[0]?.id || '')

  const currentProducts = TRENDING_CATEGORIES.find(cat => cat.id === activeCategory)?.products || []

  return (
    <div className="w-full py-[50px]">
      <h2 className="text-2xl font-bold text-brand-black mb-6">Зараз шукають</h2>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {TRENDING_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-indigo-100 text-brand-black'
                : 'bg-white border border-gray-200 text-brand-black hover:bg-gray-50'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Horizontal Scroll Products */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-4 w-max">
          {currentProducts.map((product) => (
            <div key={product.id} className="w-[250px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

