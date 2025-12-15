import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@contexts'
import { Button, Text } from '@ui'
import { cn } from '@lib/cn'
import HorizontalProductScroll from '@components/horizontal-product-scroll'
import { type Product } from '@components/product-card'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

// Mock recommended products
const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: 'rec1',
    name: 'Чохол Armorstandart Голубий',
    url: '/p/rec1-chohol-armorstandart-golubyj',
    image: '/product-images/product1.jpeg',
    price: 189,
    inStock: true,
  },
  {
    id: 'rec2',
    name: 'Чохол Armorstandart Зелений',
    url: '/p/rec2-chohol-armorstandart-zelenyj',
    image: '/product-images/product1.jpeg',
    price: 189,
    inStock: true,
  },
  {
    id: 'rec3',
    name: 'Чохол Armorstandart Сірий',
    url: '/p/rec3-chohol-armorstandart-siryj',
    image: '/product-images/product1.jpeg',
    price: 189,
    inStock: true,
  },
  {
    id: 'rec4',
    name: 'Бездротова зарядка Baseus 15W',
    url: '/p/rec4-baseus-wireless-charger',
    image: '/product-images/product1.jpeg',
    price: 599,
    inStock: true,
  },
  {
    id: 'rec5',
    name: 'Павербанк Xiaomi 20000mAh',
    url: '/p/rec5-xiaomi-powerbank',
    image: '/product-images/product1.jpeg',
    price: 899,
    oldPrice: 1299,
    discount: 30,
    inStock: true,
  },
  {
    id: 'rec6',
    name: 'Кабель USB-C 2м Anker',
    url: '/p/rec6-anker-usbc-cable',
    image: '/product-images/product1.jpeg',
    price: 299,
    inStock: true,
  },
]

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { carts, items, itemsCount, totalPrice, updateQuantity, removeItem, loading, closeCart } = useCart()
  const navigate = useNavigate()
  const [processingItems, setProcessingItems] = useState<Set<number>>(new Set())

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    setProcessingItems(prev => new Set(prev).add(productId))
    try {
      await updateQuantity(productId, newQuantity)
    } finally {
      setProcessingItems(prev => {
        const next = new Set(prev)
        next.delete(productId)
        return next
      })
    }
  }

  const handleRemoveItem = async (productId: number) => {
    setProcessingItems(prev => new Set(prev).add(productId))
    try {
      await removeItem(productId)
    } finally {
      setProcessingItems(prev => {
        const next = new Set(prev)
        next.delete(productId)
        return next
      })
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Text variant="title-1" className="font-bold">
            {items.length > 0 ? `Кошик (${itemsCount})` : 'Кошик'}
          </Text>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Закрити"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Text variant="body-1" className="text-gray-500">
                Завантаження...
              </Text>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <img src="/icons/cart.svg" alt="Empty cart" className="h-16 w-16 mb-4 opacity-30" />
              <Text variant="body-1" className="text-gray-500">
                Ваш кошик порожній
              </Text>
            </div>
          ) : (
            <div className="space-y-8">
              {carts.map((cart) => {
                if (!cart.company) return null
                
                const company = cart.company
                const cartItemsCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)
                const cartTotal = parseFloat(cart.totalAmount)
                
                // Отримуємо ініціали компанії (перші дві літери або перша літера кожного слова)
                const getCompanyInitials = (name: string): string => {
                  const words = name.trim().split(/\s+/)
                  if (words.length >= 2) {
                    return (words[0][0] + words[1][0]).toUpperCase()
                  }
                  return name.length >= 2 ? name.substring(0, 2).toUpperCase() : name[0]?.toUpperCase() || '?'
                }
                
                return (
                  <div key={company.id} className="bg-gray-50 rounded-lg p-4 space-y-4">
                    {/* Company Header */}
                    <div className="pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        {/* Avatar with initials */}
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <Text variant="title-3" className="text-indigo-600 font-bold">
                            {getCompanyInitials(company.name)}
                          </Text>
                        </div>
                        
                        {/* Company name and info */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          <Text variant="body-1" className="font-semibold truncate">
                            {company.name}
                          </Text>
                          <Text variant="caption-1" className="text-gray-500">
                            {cartItemsCount} {cartItemsCount === 1 ? 'товар' : 'товарів'} • {cartTotal.toFixed(2)} ₴
                          </Text>
                        </div>
                      </div>
                    </div>

                    {/* Company Items */}
                    <div className="space-y-4">
                      {cart.items.map((item) => {
                        const imageUrl = '/product-images/product1.jpeg'
                        const displayPrice = parseFloat(item.product?.discountedPrice || item.price)
                        const isProcessing = processingItems.has(item.productId)
                        
                        return (
                          <div key={`${company.id}-${item.productId}`} className="bg-white rounded-lg p-4">
                            <div className="flex gap-4">
                              {/* Product Image */}
                              <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                                <img
                                  src={imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <Text variant="body-2" className="font-medium mb-1 line-clamp-2">
                                  {item.name}
                                </Text>
                                <Text variant="caption-1" className="text-gray-500 mb-2">
                                  Артикул: {item.productId}
                                </Text>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                                    <button
                                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                                      disabled={isProcessing}
                                      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-brand-primary transition-colors disabled:opacity-50"
                                      aria-label="Зменшити кількість"
                                    >
                                      −
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button
                                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                                      disabled={isProcessing}
                                      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-brand-primary transition-colors disabled:opacity-50"
                                      aria-label="Збільшити кількість"
                                    >
                                      +
                                    </button>
                                  </div>

                                  {/* Price */}
                                  <Text variant="title-2" className="font-bold">
                                    {(displayPrice * item.quantity).toFixed(2)} ₴
                                  </Text>
                                </div>

                                {/* Remove Button */}
                                <button
                                  onClick={() => handleRemoveItem(item.productId)}
                                  disabled={isProcessing}
                                  className="mt-2 text-sm text-red-500 hover:text-red-600 disabled:opacity-50"
                                >
                                  {isProcessing ? 'Видалення...' : 'Видалити'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Company Checkout Button */}
                    <Button
                      variant="contained"
                      size="medium"
                      className="w-full"
                      onClick={() => {
                        navigate(`/checkout/${cart.id}`)
                        closeCart()
                      }}
                    >
                      Оформити замовлення
                    </Button>
                  </div>
                )
              })}

              {/* Recommendations Section */}
              {items.length > 0 && (
                <div className="mt-8">
                  <HorizontalProductScroll
                    title="Вам може знадобитися"
                    products={RECOMMENDED_PRODUCTS}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Text variant="body-1" className="text-gray-600">
                Всього товарів: {itemsCount}
              </Text>
              <Text variant="title-1" className="font-bold">
                {totalPrice.toFixed(2)} ₴
              </Text>
            </div>
            <Button
              variant="outlined"
              size="medium"
              className="w-full"
              onClick={closeCart}
            >
              Продовжити покупки
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
