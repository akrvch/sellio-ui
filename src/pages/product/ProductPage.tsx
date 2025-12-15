import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import BasePage from '@components/base-page'
import DeliveryOptions from '@components/delivery-options'
import PaymentOptions from '@components/payment-options'
import AccessoriesSection from '@components/accessories-section'
import SimilarProductsSection from '@components/similar-products-section'
import { type Product } from '@components/product-card'
import { Breadcrumbs, Tabs, Button, Text } from '@ui'
import { useCart } from '@contexts'
import ProductViewQuery from '@graphql/queries/ProductViewQuery.graphql'

// Payment type to icon mapping
const PAYMENT_ICON_MAP: Record<string, string> = {
  card: '/icons/payment_delivery/online-payment.svg',
  bank_account: '/icons/bank-account.svg',
  cash_on_delivery: '/icons/payment_delivery/cash-on-delivery.svg',
}

// Delivery type to icon mapping
const DELIVERY_ICON_MAP: Record<string, string> = {
  nova_poshta: '/icons/payment_delivery/nova-poshta.svg',
  ukrposhta: '/icons/payment_delivery/ukrposhta.svg',
  meest: '/icons/payment_delivery/meest.png',
  pickup: '/icons/payment_delivery/pickup.svg',
}

// Product gallery images
const PRODUCT_IMAGES = [
  '/product-images/product1.jpeg',
  '/product-images/product2.jpeg',
  '/product-images/product3.jpeg',
  '/product-images/product4.jpeg',
]

type ProductViewData = {
  productView: {
    id: number
    name: string
    price: number
    description: string
    discountPercent: number | null
    discountedPrice: number | null
    url: string
    category: {
      id: number
      name: string
      url: string
      path: Array<{
        id: number
        name: string
        url: string
      }>
    }
    company: {
      id: number
      name: string
    }
    paymentOptions: Array<{
      id: number
      name: string
      type: string
    }>
    deliveryOptions: Array<{
      id: number
      name: string
      type: string
    }>
  }
}

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const { addItem, loading: cartLoading, isInCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('about')
  const [isAdding, setIsAdding] = useState(false)

  // Extract product ID from URL (format: "2-navushniki-sony-1000xm5")
  const numericProductId = productId ? parseInt(productId.split('-')[0]) : 0
  const productInCart = isInCart(numericProductId)

  const { loading, error, data } = useQuery<ProductViewData>(ProductViewQuery, {
    variables: { productId: numericProductId },
    skip: !numericProductId,
  })

  const handleAddToCart = async () => {
    if (!numericProductId) return
    
    setIsAdding(true)
    try {
      await addItem(numericProductId)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  if (loading) {
    return (
      <BasePage>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Text variant="title-2" color="muted">Завантаження...</Text>
        </div>
      </BasePage>
    )
  }

  if (error || !data?.productView) {
    return (
      <BasePage>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Text variant="title-2" color="muted">
            {error ? 'Помилка завантаження товару' : 'Товар не знайдено'}
          </Text>
          {error && (
            <Text variant="body-1" color="muted">
              {error.message}
            </Text>
          )}
        </div>
      </BasePage>
    )
  }

  const product = data.productView

  // Prepare delivery providers data from GraphQL
  const deliveryProviders = product.deliveryOptions.map((option: any) => {
    const price = option.type === 'nova_poshta' ? 89 : 60
    const date = option.type === 'nova_poshta' ? '20 грудня' : '21 грудня'
    return {
      icon: DELIVERY_ICON_MAP[option.type] || '/icons/payment_delivery/nova-poshta.svg',
      title: option.name,
      options: [
        { type: 'До відділення', date, price },
      ],
    }
  })

  // Prepare payment methods data from GraphQL
  const paymentMethods = product.paymentOptions.map((option: any) => ({
    icon: PAYMENT_ICON_MAP[option.type] || '/icons/payment_delivery/online-payment.svg',
    title: option.name,
    description: option.type === 'cash_on_delivery' ? 'У відділенні при отриманні товару' : 'Онлайн оплата',
  }))

  // Mock accessories data
  const accessories: Product[] = [
    { id: '1', name: 'Чохол Armorstandart Голубий', url: '/p/1-chohol-armorstandart-golubyj', image: '/product-images/product1.jpeg', price: 189, inStock: true },
    { id: '2', name: 'Чохол Armorstandart Зелений', url: '/p/2-chohol-armorstandart-zelenyj', image: '/product-images/product1.jpeg', price: 189, inStock: true },
    { id: '3', name: 'Чохол Armorstandart Сірий', url: '/p/3-chohol-armorstandart-siryj', image: '/product-images/product1.jpeg', price: 189, inStock: true },
    { id: '4', name: 'Чохол Armorstandart Салатовий', url: '/p/4-chohol-armorstandart-salatowyj', image: '/product-images/product1.jpeg', price: 189, inStock: true },
    { id: '5', name: 'Чохол Armorstandart Жовтий', url: '/p/5-chohol-armorstandart-zhovtyj', image: '/product-images/product1.jpeg', price: 189, inStock: true },
    { id: '6', name: 'Чохол Armorstandart Синій', url: '/p/6-chohol-armorstandart-synij', image: '/product-images/product1.jpeg', price: 189, inStock: true },
  ]

  // Mock similar products data
  const similarProducts: Product[] = [
    { id: '7', name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні', url: '/p/7-bezdrotovi-sensorni-navushnyky', image: '/product-images/product1.jpeg', price: 444, inStock: true },
    { id: '8', name: 'Бездротові навушники Bluetooth Headset M26', url: '/p/8-bezdrotovi-navushnyky-m26', image: '/product-images/product1.jpeg', price: 300, oldPrice: 600, discount: 50, inStock: true },
    { id: '9', name: 'Бездротові сенсорні навушники із цифровим зарядним кейсом', url: '/p/9-bezdrotovi-navushnyky-z-kejsom', image: '/product-images/product1.jpeg', price: 549, inStock: true, isFavorite: true },
    { id: '10', name: 'Навушники вкладиші бездротові Apple AirPods', url: '/p/10-apple-airpods', image: '/product-images/product1.jpeg', price: 4999, inStock: true },
    { id: '11', name: 'Навушники бездротові Realme Buds T300 Black', url: '/p/11-realme-buds-t300', image: '/product-images/product1.jpeg', price: 600, oldPrice: 1200, discount: 50, inStock: true },
    { id: '12', name: 'Бездротові сенсорні навушники Bluetooth A6S Чорні', url: '/p/12-bluetooth-a6s-chorni', image: '/product-images/product1.jpeg', price: 300, oldPrice: 600, inStock: false },
  ]

  // Build breadcrumbs from category path
  const breadcrumbItems = [
    { label: 'Головна', href: '/' },
    ...product.category.path.slice(1).map((cat: any) => ({
      label: cat.name,
      href: cat.url.replace('http://localhost:5173', ''),
    })),
    { label: product.name, href: '#', current: true },
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
                  src={PRODUCT_IMAGES[selectedImage]} 
                  alt={product.name}
                  className="max-w-full max-h-full object-contain p-4"
                />
              </div>

              {/* Thumbnails - Horizontal (hidden on mobile) */}
              <div className="hidden lg:grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index - 1)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index - 1
                        ? 'border-indigo-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={PRODUCT_IMAGES[index - 1]} 
                      alt={`${product.name} ${index}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
              
              {/* Pagination Dots (visible on mobile) */}
              <div className="flex justify-center gap-2 lg:hidden">
                {[1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index - 1)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImage === index - 1
                        ? 'bg-brand-indigo-600' 
                        : 'bg-gray-300'
                    }`}
                    aria-label={`Перейти до зображення ${index}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6 order-2 lg:order-2 min-w-0">
            {/* Title */}
            <Text as="h1" variant="large-title-3" className="break-words">
              {product.name}
            </Text>

            {/* Article & Stock - в один рядок */}
            <div className="flex items-center justify-between">
              <Text variant="body-1">
                Артикул: {product.id}
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
                    <Text as="span" variant="body-1">0 відгуки</Text>
                  </button>
                </div>
              </div>
              
              {/* Seller */}
              <Text variant="body-1" className="lg:order-1">
                <Text as="span" color="muted">Продавець: </Text>
                <span className="text-brand-indigo-600">
                  {product.company.name}
                </span>
              </Text>
            </div>

            {/* Price & Buy Button */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Price & Favorite */}
              <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                <div className="flex flex-col">
                  <Text as="span" variant="large-title-2">
                    {product.discountedPrice || product.price} ₴
                  </Text>
                  {product.discountedPrice && (
                    <div className="flex items-center gap-2">
                      <Text as="span" variant="body-1" className="line-through text-brand-gray-400">
                        {product.price} ₴
                      </Text>
                      <span className="bg-brand-red-100 text-brand-red-600 px-2 py-0.5 rounded text-xs font-semibold">
                        -{product.discountPercent}%
                      </span>
                    </div>
                  )}
                </div>
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
              <Button 
                variant={productInCart ? "outlined" : "contained"}
                size="medium" 
                className="w-full lg:flex-1"
                onClick={handleAddToCart}
                disabled={isAdding || cartLoading}
              >
                {productInCart ? (
                  <>
                    <img src="/icons/cart.svg" alt="" className="w-5 h-5 mr-2" />
                    Вже в кошику
                  </>
                ) : (
                  <>
                    <img src="/icons/cart-white.svg" alt="" className="w-5 h-5 mr-2" />
                    {isAdding || cartLoading ? 'Додавання...' : 'Купити'}
                  </>
                )}
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

