import React, { useState } from 'react'
import BasePage from '@components/base-page'
import DeliveryOptions from '@components/delivery-options'
import PaymentOptions from '@components/payment-options'
import AccessoriesSection from '@components/accessories-section'
import SimilarProductsSection from '@components/similar-products-section'
import { type Product } from '@components/product-card'
import { Breadcrumbs, Tabs, Button, Text } from '@ui'

// Mock data - в майбутньому тут буде GraphQL запит
const PRODUCT_DATA = {
  id: '14567439',
  name: 'Навушники вкладиші бездротові Apple AirPods with Charging Case (MV7N2RU/A/MV7N2TY/A)',
  article: '14567439',
  price: 4999,
  inStock: true,
  seller: {
    name: 'Family Bags',
    location: 'м.Чернігів',
    link: '#'
  },
  rating: 5,
  reviewsCount: 43,
  images: [
    'https://via.placeholder.com/600x600',
    'https://via.placeholder.com/600x600',
    'https://via.placeholder.com/600x600',
    'https://via.placeholder.com/600x600',
  ],
  delivery: {
    novaPoshta: [
      { type: 'До відділення', date: '17 Жовтня', price: 0 },
      { type: 'У поштомат', date: '17 Жовтня', price: 0 },
      { type: 'Кур\'єр Нова пошта', date: '17 Жовтня', price: 130 },
    ],
    ukrposhta: [
      { type: 'До відділення Укрпошта', date: '22 Жовтня', price: 1 },
    ]
  },
  payment: {
    online: ['Visa', 'MasterCard', 'ApplePay', 'GooglePay'],
    postpay: 'У відділенні при отриманні товару'
  }
}

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('about')

  // Prepare delivery providers data
  const deliveryProviders = [
    {
      icon: '/icons/payment_delivery/nova-poshta.svg',
      title: 'Нова Пошта',
      options: PRODUCT_DATA.delivery.novaPoshta,
    },
    {
      icon: '/icons/payment_delivery/ukrposhta.svg',
      title: 'Укрпошта',
      options: PRODUCT_DATA.delivery.ukrposhta,
    },
  ]

  // Prepare payment methods data
  const paymentMethods = [
    {
      icon: '/icons/payment_delivery/online-payment.svg',
      title: 'Онлайн оплата',
      description: PRODUCT_DATA.payment.online.join(', '),
    },
    {
      icon: '/icons/payment_delivery/cash-on-delivery.svg',
      title: 'Післяплата',
      description: PRODUCT_DATA.payment.postpay,
    },
  ]

  // Mock accessories data
  const accessories: Product[] = [
    { id: '1', name: 'Чохол Armorstandart Голубий', image: 'https://via.placeholder.com/200', price: 189, inStock: true },
    { id: '2', name: 'Чохол Armorstandart Зелений', image: 'https://via.placeholder.com/200', price: 189, inStock: true },
    { id: '3', name: 'Чохол Armorstandart Сірий', image: 'https://via.placeholder.com/200', price: 189, inStock: true },
    { id: '4', name: 'Чохол Armorstandart Салатовий', image: 'https://via.placeholder.com/200', price: 189, inStock: true },
    { id: '5', name: 'Чохол Armorstandart Жовтий', image: 'https://via.placeholder.com/200', price: 189, inStock: true },
    { id: '6', name: 'Чохол Armorstandart Синій', image: 'https://via.placeholder.com/200', price: 189, inStock: true },
  ]

  // Mock similar products data
  const similarProducts: Product[] = [
    { id: '7', name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні', image: 'https://via.placeholder.com/200', price: 444, inStock: true },
    { id: '8', name: 'Бездротові навушники Bluetooth Headset M26', image: 'https://via.placeholder.com/200', price: 300, oldPrice: 600, discount: 50, inStock: true },
    { id: '9', name: 'Бездротові сенсорні навушники із цифровим зарядним кейсом', image: 'https://via.placeholder.com/200', price: 549, inStock: true, isFavorite: true },
    { id: '10', name: 'Навушники вкладиші бездротові Apple AirPods', image: 'https://via.placeholder.com/200', price: 4999, inStock: true },
    { id: '11', name: 'Навушники бездротові Realme Buds T300 Black', image: 'https://via.placeholder.com/200', price: 600, oldPrice: 1200, discount: 50, inStock: true },
    { id: '12', name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні', image: 'https://via.placeholder.com/200', price: 300, oldPrice: 600, inStock: false },
  ]

  const breadcrumbItems = [
    { label: 'Головна', href: '/' },
    { label: 'Для вас', href: '/for-you' },
    { label: 'Техніка та електроніка', href: '/category/tech' },
    { label: 'Аудіо та аксесуари', href: '/category/audio' },
    { label: 'Навушники та гарнітури', href: '/category/headphones' },
    { label: PRODUCT_DATA.name, href: '#', current: true },
  ]

  const tabs = [
    { value: 'about', label: 'Про товар' },
    { value: 'specs', label: 'Характеристики' },
    { value: 'reviews', label: 'Відгуки' },
  ]

  return (
    <BasePage>
      {/* Breadcrumbs */}
      <div className="py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Tabs */}
      <div className="-mx-4 px-4 overflow-hidden">
        <Tabs
          items={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        />
      </div>

      {/* Main Content */}
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[44fr_56fr] gap-10">
          {/* Left Column - Images */}
          <div className="order-1 lg:order-1">
            <div className="flex flex-col gap-3">
              {/* Main Image */}
              <div className="relative bg-white rounded-lg aspect-square flex items-center justify-center border border-gray-200">
                <button 
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors z-10"
                  aria-label="Додати в обране"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </button>
                <img 
                  src={PRODUCT_DATA.images[selectedImage]} 
                  alt={PRODUCT_DATA.name}
                  className="max-w-full max-h-full object-contain p-4"
                />
              </div>

              {/* Thumbnails - Horizontal (hidden on mobile) */}
              <div className="hidden lg:grid grid-cols-4 gap-2">
                {PRODUCT_DATA.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-indigo-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${PRODUCT_DATA.name} ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                    {index === 3 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <Text variant="body-2" className="text-white font-semibold text-xs">
                          Та ще 2
                        </Text>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Pagination Dots (visible on mobile) */}
              <div className="flex justify-center gap-2 lg:hidden">
                {PRODUCT_DATA.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImage === index 
                        ? 'bg-brand-indigo-600' 
                        : 'bg-gray-300'
                    }`}
                    aria-label={`Перейти до зображення ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6 order-2 lg:order-2 min-w-0">
            {/* Title */}
            <Text as="h1" variant="large-title-3" className="break-words">
              {PRODUCT_DATA.name}
            </Text>

            {/* Article & Stock - в один рядок */}
            <div className="flex items-center justify-between">
              <Text variant="body-1">
                Артикул: {PRODUCT_DATA.article}
              </Text>
              <Text variant="body-1" className="text-green-400">В наявності</Text>
            </div>

            {/* Rating - окремо на мобілці, в рядку з продавцем на десктопі */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              {/* Stars & Reviews */}
              <div className="flex items-center justify-between lg:order-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-yellow-400">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <button className="flex items-center gap-1 text-brand-gray-600 hover:text-brand-indigo-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M10 14v-4m0-4h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <Text as="span" variant="body-1">{PRODUCT_DATA.reviewsCount} відгуки</Text>
                  </button>
                </div>
              </div>
              
              {/* Seller */}
              <Text variant="body-1" className="lg:order-1">
                <Text as="span" color="muted">Продавець: </Text>
                <a href={PRODUCT_DATA.seller.link} className="text-brand-indigo-600 hover:underline">
                  {PRODUCT_DATA.seller.name}
                </a>
                <Text as="span" color="muted"> {PRODUCT_DATA.seller.location}</Text>
              </Text>
            </div>

            {/* Price & Buy Button */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Price & Favorite */}
              <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                <Text as="span" variant="large-title-2">
                  {PRODUCT_DATA.price} ₴
                </Text>
                <button 
                  className="lg:hidden p-2 hover:bg-gray-50 rounded-full transition"
                  aria-label="Додати в обране"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-indigo-600">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </button>
              </div>
              
              {/* Buy Button */}
              <Button size="medium" className="w-full lg:flex-1">
                <img src="/icons/cart-white.svg" alt="" className="w-5 h-5 mr-2" />
                Купити
              </Button>
            </div>

            <DeliveryOptions providers={deliveryProviders} />

            <PaymentOptions methods={paymentMethods} />
          </div>
        </div>

        {/* Recommendations Sections */}
        <div className="mt-12 space-y-12">
          <AccessoriesSection products={accessories} />
          <SimilarProductsSection products={similarProducts} />
        </div>
      </div>
    </BasePage>
  )
}

export default ProductPage

