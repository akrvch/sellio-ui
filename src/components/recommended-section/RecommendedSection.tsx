import React from 'react'
import ProductGrid from '@components/product-grid'
import { type Product } from '@components/product-card'

// Mock data - в майбутньому тут буде GraphQL запит
const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні',
    image: 'https://via.placeholder.com/200',
    price: 444,
    inStock: true,
  },
  {
    id: '2',
    name: 'Бездротові навушники Bluetooth Headset M26',
    image: 'https://via.placeholder.com/200',
    price: 300,
    oldPrice: 600,
    discount: 50,
    inStock: true,
  },
  {
    id: '3',
    name: 'Бездротові сенсорні навушники із цифровим зарядним...',
    image: 'https://via.placeholder.com/200',
    price: 549,
    inStock: true,
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Навушники вкладиші бездротові Apple AirPods',
    image: 'https://via.placeholder.com/200',
    price: 4999,
    inStock: true,
  },
  {
    id: '5',
    name: 'Навушники бездротові Realme Buds T300 Black',
    image: 'https://via.placeholder.com/200',
    price: 600,
    oldPrice: 1200,
    discount: 50,
    inStock: true,
  },
  {
    id: '6',
    name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні',
    image: 'https://via.placeholder.com/200',
    price: 300,
    oldPrice: 600,
    discount: 50,
    inStock: false,
  },
  {
    id: '7',
    name: 'Портативна колонка JBL Charge 5',
    image: 'https://via.placeholder.com/200',
    price: 3999,
    inStock: true,
  },
  {
    id: '8',
    name: 'Смарт-годинник Samsung Galaxy Watch 6',
    image: 'https://via.placeholder.com/200',
    price: 7999,
    oldPrice: 9999,
    discount: 20,
    inStock: true,
  },
  {
    id: '9',
    name: 'Бездротова зарядка Baseus 15W',
    image: 'https://via.placeholder.com/200',
    price: 599,
    inStock: true,
  },
  {
    id: '10',
    name: 'Павербанк Xiaomi 20000mAh',
    image: 'https://via.placeholder.com/200',
    price: 899,
    oldPrice: 1299,
    discount: 30,
    inStock: true,
  },
  {
    id: '11',
    name: 'Кабель USB-C 2м Anker',
    image: 'https://via.placeholder.com/200',
    price: 299,
    inStock: true,
  },
  {
    id: '12',
    name: 'Чохол для iPhone 15 Pro',
    image: 'https://via.placeholder.com/200',
    price: 499,
    inStock: true,
    isFavorite: true,
  },
]

export default function RecommendedSection() {
  // TODO: В майбутньому тут буде useQuery для GraphQL
  // const { data, loading, error } = useRecommendedProductsQuery()

  return (
    <ProductGrid
      title="Для вас"
      products={RECOMMENDED_PRODUCTS}
      initialCount={6}
      loadMoreCount={6}
    />
  )
}

