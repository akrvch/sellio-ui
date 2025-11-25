import React, { useState, useEffect } from 'react'
import ProductGrid from '@components/product-grid'

export interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  inStock: boolean
  discount?: number
}

// Mock data - буде замінено на GraphQL запит
const RECENTLY_VIEWED_PRODUCTS: Product[] = [
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
    name: 'Навушники бездротові Realme Buds T300 Black',
    price: 600,
    oldPrice: 1200,
    image: '/products/realme-buds.jpg',
    inStock: true,
    discount: 50,
  },
  {
    id: '6',
    name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні',
    price: 300,
    oldPrice: 600,
    image: '/products/headphones-4.jpg',
    inStock: false,
    discount: 50,
  },
]

export default function RecentlyViewedSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Імітація завантаження даних
    const fetchProducts = async () => {
      setLoading(true)
      // Тут буде GraphQL запит
      await new Promise((resolve) => setTimeout(resolve, 300))
      setProducts(RECENTLY_VIEWED_PRODUCTS)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="py-[50px]">
      <ProductGrid title="Ви переглядали" products={products} />
    </div>
  )
}

