import React from 'react'
import ProductGrid from '@components/product-grid'
import { type Product } from '@components/product-card'

// Mock data - в майбутньому тут буде GraphQL запит
const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні',
    url: '/p/1-bluetooth-a6s-black',
    image: '/product-images/product1.jpeg',
    price: 444,
    inStock: true,
  },
  {
    id: '2',
    name: 'Бездротові навушники Bluetooth Headset M26',
    url: '/p/2-bluetooth-headset-m26',
    image: '/product-images/product1.jpeg',
    price: 300,
    oldPrice: 600,
    discount: 50,
    inStock: true,
  },
  {
    id: '3',
    name: 'Бездротові сенсорні навушники із цифровим зарядним...',
    url: '/p/3-wireless-headphones-case',
    image: '/product-images/product1.jpeg',
    price: 549,
    inStock: true,
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Навушники вкладиші бездротові Apple AirPods',
    url: '/p/4-apple-airpods',
    image: '/product-images/product1.jpeg',
    price: 4999,
    inStock: true,
  },
  {
    id: '5',
    name: 'Навушники бездротові Realme Buds T300 Black',
    url: '/p/5-realme-buds-t300',
    image: '/product-images/product1.jpeg',
    price: 600,
    oldPrice: 1200,
    discount: 50,
    inStock: true,
  },
  {
    id: '6',
    name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні',
    url: '/p/6-bluetooth-a6s-black-2',
    image: '/product-images/product1.jpeg',
    price: 300,
    oldPrice: 600,
    discount: 50,
    inStock: false,
  },
  {
    id: '7',
    name: 'Портативна колонка JBL Charge 5',
    url: '/p/7-jbl-charge-5',
    image: '/product-images/product1.jpeg',
    price: 3999,
    inStock: true,
  },
  {
    id: '8',
    name: 'Смарт-годинник Samsung Galaxy Watch 6',
    url: '/p/8-samsung-galaxy-watch-6',
    image: '/product-images/product1.jpeg',
    price: 7999,
    oldPrice: 9999,
    discount: 20,
    inStock: true,
  },
  {
    id: '9',
    name: 'Бездротова зарядка Baseus 15W',
    url: '/p/9-baseus-wireless-charger',
    image: '/product-images/product1.jpeg',
    price: 599,
    inStock: true,
  },
  {
    id: '10',
    name: 'Павербанк Xiaomi 20000mAh',
    url: '/p/10-xiaomi-powerbank',
    image: '/product-images/product1.jpeg',
    price: 899,
    oldPrice: 1299,
    discount: 30,
    inStock: true,
  },
  {
    id: '11',
    name: 'Кабель USB-C 2м Anker',
    url: '/p/11-anker-usbc-cable',
    image: '/product-images/product1.jpeg',
    price: 299,
    inStock: true,
  },
  {
    id: '12',
    name: 'Чохол для iPhone 15 Pro',
    url: '/p/12-iphone-15-pro-case',
    image: '/product-images/product1.jpeg',
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

