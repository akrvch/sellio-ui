import React from 'react'
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
    image: 'https://via.placeholder.com/200',
    price: 189,
    inStock: true,
  },
  {
    id: 'rec2',
    name: 'Чохол Armorstandart Зелений',
    url: '/p/rec2-chohol-armorstandart-zelenyj',
    image: 'https://via.placeholder.com/200',
    price: 189,
    inStock: true,
  },
  {
    id: 'rec3',
    name: 'Чохол Armorstandart Сірий',
    url: '/p/rec3-chohol-armorstandart-siryj',
    image: 'https://via.placeholder.com/200',
    price: 189,
    inStock: true,
  },
  {
    id: 'rec4',
    name: 'Бездротова зарядка Baseus 15W',
    url: '/p/rec4-baseus-wireless-charger',
    image: 'https://via.placeholder.com/200',
    price: 599,
    inStock: true,
  },
  {
    id: 'rec5',
    name: 'Павербанк Xiaomi 20000mAh',
    url: '/p/rec5-xiaomi-powerbank',
    image: 'https://via.placeholder.com/200',
    price: 899,
    oldPrice: 1299,
    discount: 30,
    inStock: true,
  },
  {
    id: 'rec6',
    name: 'Кабель USB-C 2м Anker',
    url: '/p/rec6-anker-usbc-cable',
    image: 'https://via.placeholder.com/200',
    price: 299,
    inStock: true,
  },
]

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, itemsCount, totalPrice, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()

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
            Товар додано до кошика
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
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <img src="/icons/cart.svg" alt="Empty cart" className="h-16 w-16 mb-4 opacity-30" />
              <Text variant="body-1" className="text-gray-500">
                Ваш кошик порожній
              </Text>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
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
                        Артикул: {item.id}
                      </Text>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-brand-primary transition-colors"
                            aria-label="Зменшити кількість"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-brand-primary transition-colors"
                            aria-label="Збільшити кількість"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <Text variant="title-2" className="font-bold">
                          {item.price * item.quantity} ₴
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

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

        {/* Footer with Actions */}
        {items.length > 0 && (
          <div className="p-6 space-y-4 bg-white">
            {/* Total */}
            <div className="flex items-center justify-between">
              <Text variant="body-1" className="text-gray-600">
                Всього товарів: {itemsCount}
              </Text>
              <Text variant="title-1" className="font-bold">
                {totalPrice} ₴
              </Text>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="contained"
                size="medium"
                className="w-full"
                onClick={() => {
                  navigate('/checkout')
                  onClose()
                }}
              >
                Оформити замовлення
              </Button>
              <Button
                variant="outlined"
                size="medium"
                className="w-full"
                onClick={onClose}
              >
                Продовжити покупки
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

