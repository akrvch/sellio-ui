import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Типи для товару в кошику
export interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  inStock: boolean
}

// Типи для контексту
interface CartContextType {
  items: CartItem[]
  itemsCount: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
  getItemQuantity: (id: string) => number
}

// Створюємо контекст
const CartContext = createContext<CartContextType | undefined>(undefined)

// Ключ для localStorage
const CART_STORAGE_KEY = 'sellio-cart'

// Тестові товари для демонстрації
const TEST_CART_ITEMS: CartItem[] = [
  {
    id: '14567439',
    name: 'Навушники вкладиші бездротові Apple AirPods with Charging Case (MV7N2RU/A/MV7N2TY/A)',
    image: 'https://via.placeholder.com/200',
    price: 4999,
    quantity: 1,
    inStock: true,
  },
  {
    id: '2',
    name: 'Чохол Armorstandart Зелений',
    image: 'https://via.placeholder.com/200',
    price: 189,
    quantity: 2,
    inStock: true,
  },
]

// Провайдер контексту
export function CartProvider({ children }: { children: ReactNode }) {
  // Ініціалізуємо з тестовими товарами одразу
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        // Якщо кошик порожній, повертаємо тестові товари
        return parsedCart.length === 0 ? TEST_CART_ITEMS : parsedCart
      }
      // Якщо немає збереженого кошика, повертаємо тестові товари
      return TEST_CART_ITEMS
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
      return TEST_CART_ITEMS
    }
  })

  // Зберігаємо кошик в localStorage при кожній зміні
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [items])

  // Додати товар до кошика
  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      
      if (existingItem) {
        // Якщо товар вже є, збільшуємо кількість
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      } else {
        // Якщо товару немає, додаємо новий
        return [...prevItems, { ...item, quantity }]
      }
    })
  }

  // Видалити товар з кошика
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Оновити кількість товару
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Очистити кошик
  const clearCart = () => {
    setItems([])
  }

  // Перевірити, чи товар є в кошику
  const isInCart = (id: string): boolean => {
    return items.some((item) => item.id === id)
  }

  // Отримати кількість конкретного товару в кошику
  const getItemQuantity = (id: string): number => {
    const item = items.find((i) => i.id === id)
    return item ? item.quantity : 0
  }

  // Обчислюємо загальну кількість товарів
  const itemsCount = items.reduce((total, item) => total + item.quantity, 0)

  // Обчислюємо загальну вартість
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const value: CartContextType = {
    items,
    itemsCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Кастомний хук для використання контексту
export function useCart() {
  const context = useContext(CartContext)
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  
  return context
}

