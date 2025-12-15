import React from 'react'
import { useQuery } from '@apollo/client/react'
import { Text, Button } from '@ui'
import { OrderListQuery } from '../../graphql/queries'
import { useNavigate } from 'react-router-dom'

interface Status {
  key: string
  title: string
}

interface Product {
  id: number
  url: string
}

interface CartItem {
  productId: number
  name: string
  price: string
  quantity: number
  product: Product
}

interface Cart {
  id: number
  totalAmount: string
  createdAt: string
  items: CartItem[]
}

interface Company {
  id: number
  name: string
  email: string
  phone: string
}

interface PaymentOption {
  id: number
  name: string
  type: string
}

interface DeliveryOption {
  id: number
  name: string
  type: string
}

interface DeliveryInfo {
  id: number
  status: Status
  declarationId: string | null
  city: string | null
  warehouse: string | null
  fullDeliveryAddress: string | null
}

interface Order {
  id: number
  fromFirstName: string
  fromSecondName: string | null
  fromLastName: string
  fromEmail: string
  fromPhone: string
  comment: string | null
  dateCreated: string
  status: Status
  cart: Cart
  company: Company
  paymentOption: PaymentOption
  deliveryOption: DeliveryOption
  deliveryInfo: DeliveryInfo | null
}

interface OrderListData {
  orderList: Order[]
}

// Icon map for payment types
const PAYMENT_ICON_MAP: Record<string, string> = {
  online: '/icons/payment_delivery/online-payment.svg',
  card: '/icons/payment_delivery/online-payment.svg',
  bank_account: '/icons/bank-account.svg',
  cash: '/icons/payment_delivery/cash-on-delivery.svg',
  cash_on_delivery: '/icons/payment_delivery/cash-on-delivery.svg',
  postpay: '/icons/payment_delivery/cash-on-delivery.svg',
}

// Status color mapping - all green except cancelled (using UI kit colors)
const getStatusColor = (statusKey: string): string => {
  return statusKey === 'cancelled' ? 'text-red-600' : 'text-green-400'
}

export default function OrdersPage() {
  const navigate = useNavigate()
  const { data, loading, error } = useQuery<OrderListData>(OrderListQuery, {
    variables: { limit: 10, offset: 0 }
  })

  if (loading) {
    return (
      <div>
        <Text as="h1" variant="large-title-3" className="mb-8">
          Мої замовлення
        </Text>
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Text variant="body-1" color="muted">
            Завантаження...
          </Text>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Text as="h1" variant="large-title-3" className="mb-8">
          Мої замовлення
        </Text>
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Text variant="body-1" className="text-red-600">
            Помилка завантаження замовлень
          </Text>
        </div>
      </div>
    )
  }

  const orders = data?.orderList || []

  if (orders.length === 0) {
    return (
      <div>
        <Text as="h1" variant="large-title-3" className="mb-8">
          Мої замовлення
        </Text>
        
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <img src="/icons/orders.svg" alt="Orders" className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <Text variant="title-2" color="muted">
            У вас поки немає замовлень
          </Text>
          <Text variant="body-2" color="muted" className="mt-2">
            Перейдіть до каталогу та оберіть товари
          </Text>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div>
      <Text as="h1" variant="large-title-3" className="mb-8">
        Мої замовлення
      </Text>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusColor = getStatusColor(order.status.key)
          // Get payment icon, fallback based on name if type is not in map
          let paymentIcon = PAYMENT_ICON_MAP[order.paymentOption?.type]
          if (!paymentIcon) {
            // Fallback: check if payment name contains certain keywords
            const paymentName = order.paymentOption?.name?.toLowerCase() || ''
            if (paymentName.includes('післяплат') || paymentName.includes('готівк') || paymentName.includes('cash')) {
              paymentIcon = '/icons/payment_delivery/cash-on-delivery.svg'
            } else {
              paymentIcon = '/icons/payment_delivery/online-payment.svg'
            }
          }
          const totalAmount = parseFloat(order.cart.totalAmount)
          const firstItem = order.cart.items[0]

          return (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-indigo-300 transition-colors cursor-pointer"
              onClick={() => navigate(`/cabinet/orders/${order.id}`)}
            >
              {/* Header - Status and Payment */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Text variant="body-1" className={`font-bold ${statusColor}`}>
                    {order.status.title}
                  </Text>
                  <Text variant="body-2" className="text-gray-600">
                    {order.paymentOption.name}
                  </Text>
                  <img 
                    src={paymentIcon} 
                    alt={order.paymentOption.name} 
                    className="h-5 object-contain"
                  />
                </div>

                <Text variant="body-2" className="text-gray-600">
                  № {order.id}
                </Text>
              </div>

              {/* Order items - first item in bordered box */}
              {firstItem && (
                <div className="mb-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                        <img
                          src="/product-images/product1.jpeg"
                          alt={firstItem.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Text variant="body-2" className="line-clamp-2 mb-1">
                          {firstItem.name}
                        </Text>
                        <Text variant="caption-1" className="text-gray-500">
                          {firstItem.quantity} шт.
                        </Text>
                      </div>
                      <div className="text-right">
                        <Text variant="body-2" className="font-bold">
                          {(parseFloat(firstItem.price) * firstItem.quantity).toFixed(2)} ₴/шт.
                        </Text>
                      </div>
                    </div>
                  </div>
                  {/* Show remaining products count */}
                  {order.cart.items.length > 1 && (
                    <Text variant="body-2" className="text-indigo-600 mt-2 ml-4">
                      ще {order.cart.items.length - 1}
                    </Text>
                  )}
                </div>
              )}

              {/* Date and Total */}
              <div className="flex items-center justify-between mb-4">
                <Text variant="body-2" className="text-gray-600">
                  {formatDate(order.dateCreated)}
                </Text>
                <div className="text-right space-y-2">
                  <div>
                    <Text variant="caption-1" className="text-gray-600">
                      До оплати без доставки:
                    </Text>
                  </div>
                  <div>
                    <Text variant="title-3" className="font-bold">
                      {totalAmount.toFixed(2)} ₴
                    </Text>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Text variant="body-2" className="text-indigo-600 font-bold">
                    {order.company.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </Text>
                </div>
                <Text variant="body-1" className="font-semibold">
                  {order.company.name}
                </Text>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
