import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BasePage from '@components/base-page'
import CategoryCard, { type Category } from '@components/category-card'
import Listing from '@components/listing'
import RecentlyViewedSection from '@components/recently-viewed-section'
import { Text, Breadcrumbs } from '@ui'
import { type Product } from '@components/product-card'
import TrendingSection from '@components/trending-section'

// Mock data - буде замінено на GraphQL запит
const MOCK_CATEGORIES: Record<
  string,
  { name: string; subcategories?: Category[]; hasProducts?: boolean }
> = {
  'Tehnika-ta-elektronika': {
    name: 'Техніка та електроніка',
    hasProducts: false,
    subcategories: [
      {
        id: '1',
        name: 'Навушники та гарнітури',
        image: '/categories/headphones.jpg',
        link: '/c/Navushnyky-ta-garnitury',
      },
      {
        id: '2',
        name: 'Кабелі для електроніки',
        image: '/categories/cables.jpg',
        link: '/c/Kabeli-dlya-elektroniky',
      },
      {
        id: '3',
        name: 'Портативні колонки',
        image: '/categories/speakers.jpg',
        link: '/c/Portatyvni-kolonky',
      },
      {
        id: '4',
        name: 'Акустичні системи',
        image: '/categories/audio-systems.jpg',
        link: '/c/Akustychni-systemy',
      },
      {
        id: '5',
        name: 'Плеєри MP3, MP4',
        image: '/categories/players.jpg',
        link: '/c/Pleyery-MP3-MP4',
      },
      {
        id: '6',
        name: 'Мікрофони',
        image: '/categories/microphones.jpg',
        link: '/c/Mikrofony',
      },
      {
        id: '7',
        name: 'Радіоприймачі',
        image: '/categories/radios.jpg',
        link: '/c/Radiopryjmachi',
      },
      {
        id: '8',
        name: 'Медіаплеєри',
        image: '/categories/media-players.jpg',
        link: '/c/Mediapleyery',
      },
    ],
  },
  'Navushnyky-ta-garnitury': {
    name: 'Навушники та гарнітури',
    hasProducts: true,
  },
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні',
    price: 444,
    image: '/products/headphones-1.jpg',
    inStock: true,
  },
  {
    id: '2',
    name: 'Бездротові навушники Bluetooth Headset M26',
    price: 300,
    oldPrice: 600,
    image: '/products/headphones-2.jpg',
    inStock: true,
    discount: 50,
  },
  {
    id: '3',
    name: 'Бездротові сенсорні навушники із цифровим зарядним кейсом',
    price: 549,
    image: '/products/headphones-3.jpg',
    inStock: true,
  },
  {
    id: '4',
    name: 'Навушники вкладиші бездротові Apple AirPods',
    price: 4999,
    image: '/products/airpods.jpg',
    inStock: true,
  },
  {
    id: '5',
    name: 'Навушники вкладиші бездротові Apple AirPods',
    price: 4999,
    image: '/products/airpods.jpg',
    inStock: true,
  },
  {
    id: '6',
    name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні',
    price: 444,
    image: '/products/headphones-1.jpg',
    inStock: true,
  },
  {
    id: '7',
    name: 'Навушники бездротові Realme Buds T300 Black',
    price: 600,
    oldPrice: 1200,
    image: '/products/realme-buds.jpg',
    inStock: true,
    discount: 50,
  },
  {
    id: '8',
    name: 'Бездротові навушники Bluetooth Headset M26',
    price: 300,
    oldPrice: 600,
    image: '/products/headphones-2.jpg',
    inStock: true,
    discount: 50,
  },
]

export default function CategoryPage() {
  const { categoryAlias } = useParams<{ categoryAlias: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Імітація завантаження даних
    const fetchData = async () => {
      setLoading(true)
      // Тут буде GraphQL запит
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      const categoryData = categoryAlias ? MOCK_CATEGORIES[categoryAlias] : null
      if (categoryData?.hasProducts) {
        setProducts(MOCK_PRODUCTS)
      }
      
      setLoading(false)
    }

    fetchData()
  }, [categoryAlias])

  const categoryData = categoryAlias ? MOCK_CATEGORIES[categoryAlias] : null

  if (!categoryData) {
    return (
      <BasePage>
        <div className="py-8">
          <Text variant="title-1">Категорію не знайдено</Text>
        </div>
      </BasePage>
    )
  }

  const breadcrumbItems = [
    { label: 'Головна', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    ...(categoryData.hasProducts
      ? [
          { label: 'Техніка та електроніка', href: '/c/Tehnika-ta-elektronika' },
          { label: 'Аудіо техніка та аксесуари', href: '/c/Audio-tehnika-ta-aksesuary' },
        ]
      : []),
    { label: categoryData.name },
  ]

  if (loading) {
    return (
      <BasePage>
        <div className="py-6 sm:py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-96 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
            {categoryData.hasProducts ? (
              <div className="flex gap-8">
                <div className="w-80 space-y-4">
                  <div className="h-40 bg-gray-200 rounded"></div>
                  <div className="h-40 bg-gray-200 rounded"></div>
                </div>
                <div className="flex-1 grid grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded"></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </BasePage>
    )
  }

  return (
    <BasePage>
      <div className="py-6 sm:py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Page Title */}
        <div className="mb-8 sm:mb-10">
          <Text variant="title-1">{categoryData.name}</Text>
        </div>

        {/* Subcategories Grid or Product Listing */}
        {categoryData.hasProducts ? (
          <>
            {/* Listing with Filters */}
            <Listing products={products} totalCount={products.length} />
          </>
        ) : (
          <>
            {/* Subcategories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-[50px]">
              {categoryData.subcategories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </>
        )}
        {categoryData.hasProducts ? (<TrendingSection />) : null}
        {/* Recently Viewed Section */}
        <RecentlyViewedSection />
      </div>
    </BasePage>
  )
}

