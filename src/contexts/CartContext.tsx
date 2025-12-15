import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client/react'
import { useAuth } from './AuthContext'
import { UserCartsQuery } from '@graphql/queries'
import {
  AddItemToCartMutation,
  UpdateCartItemQuantityMutation,
  RemoveItemFromCartMutation,
} from '@graphql/mutations'

// GraphQL типи для товару в кошику
export interface CartItemProduct {
  id: number
  name: string
  description: string | null
  discountedPrice: string
}

export interface CartItem {
  productId: number
  name: string
  price: string
  quantity: number
  product: CartItemProduct | null
}

export interface Company {
  id: number
  name: string
  email: string
  phone: string
}

export interface Cart {
  id: number
  companyId: number
  userId: number | null
  cookie: string | null
  status: number
  createdAt: string
  company: Company | null
  items: CartItem[]
  totalAmount: string
}

// GraphQL Response Types
interface UserCartsResponse {
  userCarts: Cart[]
}

interface CartMutationResponse {
  success: boolean
  message: string
  cart: Cart | null
}

interface AddItemToCartResponse {
  addItemToCart: CartMutationResponse
}

interface UpdateCartItemQuantityResponse {
  updateCartItemQuantity: CartMutationResponse
}

interface RemoveItemFromCartResponse {
  removeItemFromCart: CartMutationResponse
}

// Типи для контексту
interface CartContextType {
  carts: Cart[]
  items: CartItem[]
  itemsCount: number
  totalPrice: number
  loading: boolean
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (productId: number) => Promise<boolean>
  removeItem: (productId: number) => Promise<boolean>
  updateQuantity: (productId: number, quantity: number) => Promise<boolean>
  clearCart: () => void
  isInCart: (productId: number) => boolean
  getItemQuantity: (productId: number) => number
  refetchCart: () => Promise<void>
}

// Створюємо контекст
const CartContext = createContext<CartContextType | undefined>(undefined)

// Провайдер контексту
export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [carts, setCarts] = useState<Cart[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Lazy query для отримання кошика
  const [fetchCarts, { data: cartsData, loading: cartsLoading, refetch: refetchCarts }] = useLazyQuery<UserCartsResponse>(UserCartsQuery, {
    fetchPolicy: 'cache-and-network', // Спочатку показуємо з кешу, потім оновлюємо
  })

  // Мутації з автоматичним refetch
  const [addItemMutation] = useMutation<AddItemToCartResponse>(AddItemToCartMutation, {
    refetchQueries: [{ query: UserCartsQuery }],
  })
  const [updateQuantityMutation] = useMutation<UpdateCartItemQuantityResponse>(UpdateCartItemQuantityMutation, {
    refetchQueries: [{ query: UserCartsQuery }],
  })
  const [removeItemMutation] = useMutation<RemoveItemFromCartResponse>(RemoveItemFromCartMutation, {
    refetchQueries: [{ query: UserCartsQuery }],
  })

  // Завантажити кошик при логіні користувача
  useEffect(() => {
    if (user) {
      fetchCarts()
    } else {
      // Очищаємо кошик при логауті
      setCarts([])
    }
  }, [user, fetchCarts])

  // Оновлюємо стан кошика при отриманні даних
  useEffect(() => {
    if (cartsData?.userCarts) {
      // Фільтруємо активні кошики (status = 1) з компанією
      const activeCarts = cartsData.userCarts.filter((c) => c.status === 1 && c.company)
      setCarts(activeCarts)
    }
  }, [cartsData])

  // Рефетч кошика
  const refetchCart = async () => {
    if (user && refetchCarts) {
      await refetchCarts()
    }
  }

  // Управління sidebar'ом
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  // Додати товар до кошика
  const addItem = async (productId: number): Promise<boolean> => {
    if (!user) {
      alert('Будь ласка, увійдіть в систему для додавання товарів в кошик')
      return false
    }

    try {
      const { data } = await addItemMutation({
        variables: {
          productId,
        },
      })

      if (data?.addItemToCart?.success) {
        // refetchQueries автоматично оновить кошик
        openCart() // Відкриваємо кошик після успішного додавання
        return true
      } else {
        console.error('Помилка додавання товару:', data?.addItemToCart?.message)
        alert(data?.addItemToCart?.message || 'Не вдалося додати товар')
        return false
      }
    } catch (error) {
      console.error('Помилка при додаванні товару:', error)
      alert('Сталася помилка при додаванні товару')
      return false
    }
  }

  // Видалити товар з кошика
  const removeItem = async (productId: number): Promise<boolean> => {
    // Оптимістично оновлюємо UI - видаляємо товар локально
    const previousCarts = carts
    setCarts((prevCarts) =>
      prevCarts.map((cart) => ({
        ...cart,
        items: cart.items.filter((item) => item.productId !== productId),
      }))
    )

    try {
      const { data } = await removeItemMutation({
        variables: {
          productId,
        },
      })

      if (data?.removeItemFromCart?.success) {
        // refetchQueries автоматично оновить кошик з бекенду
        return true
      } else {
        console.error('Помилка видалення товару:', data?.removeItemFromCart?.message)
        // Відновлюємо попередній стан у випадку помилки
        setCarts(previousCarts)
        return false
      }
    } catch (error) {
      console.error('Помилка при видаленні товару:', error)
      // Відновлюємо попередній стан у випадку помилки
      setCarts(previousCarts)
      return false
    }
  }

  // Оновити кількість товару
  const updateQuantity = async (productId: number, quantity: number): Promise<boolean> => {
    // Якщо кількість 0 або менше, видаляємо товар
    if (quantity <= 0) {
      return await removeItem(productId)
    }

    // Оптимістично оновлюємо UI - змінюємо кількість локально
    const previousCarts = carts
    setCarts((prevCarts) =>
      prevCarts.map((cart) => ({
        ...cart,
        items: cart.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      }))
    )

    try {
      const { data } = await updateQuantityMutation({
        variables: {
          productId,
          quantity,
        },
      })

      if (data?.updateCartItemQuantity?.success) {
        // refetchQueries автоматично оновить кошик з бекенду
        return true
      } else {
        console.error('Помилка оновлення кількості:', data?.updateCartItemQuantity?.message)
        // Відновлюємо попередній стан у випадку помилки
        setCarts(previousCarts)
        return false
      }
    } catch (error) {
      console.error('Помилка при оновленні кількості:', error)
      // Відновлюємо попередній стан у випадку помилки
      setCarts(previousCarts)
      return false
    }
  }

  // Очистити кошик (локально)
  const clearCart = () => {
    setCarts([])
  }

  // Перевірити, чи товар є в кошику
  const isInCart = (productId: number): boolean => {
    return carts.some((cart) =>
      cart.items.some((item) => item.productId === productId)
    )
  }

  // Отримати кількість конкретного товару в кошику
  const getItemQuantity = (productId: number): number => {
    let totalQuantity = 0
    carts.forEach((cart) => {
      const item = cart.items.find((i) => i.productId === productId)
      if (item) {
        totalQuantity += item.quantity
      }
    })
    return totalQuantity
  }

  // Обчислюємо загальну кількість товарів
  const items: CartItem[] = carts.flatMap((cart) => cart.items)
  const itemsCount = items.reduce((total, item) => total + item.quantity, 0)

  // Обчислюємо загальну вартість
  const totalPrice = carts.reduce((total, cart) => {
    return total + parseFloat(cart.totalAmount)
  }, 0)

  const value: CartContextType = {
    carts,
    items,
    itemsCount,
    totalPrice,
    loading: cartsLoading, // Використовуємо лише loading від query, не від мутацій
    isCartOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    refetchCart,
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
