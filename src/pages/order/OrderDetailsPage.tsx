import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { Text, Button } from '@ui'
import { ThankYouPageQuery } from '../../graphql/queries'

interface ThankYouPageData {
  thankYouPage: {
    order: {
      id: number
      fromFirstName: string
      fromSecondName: string | null
      fromLastName: string
      fromEmail: string
      fromPhone: string
      comment: string | null
      dateCreated: string
      status: {
        key: string
        title: string
      }
      cart: {
        totalAmount: string
        items: {
          productId: number
          name: string
          price: string
          quantity: number
          product: {
            id: number
            url: string
          }
        }[]
      }
      company: {
        id: number
        name: string
        email: string
        phone: string
      }
      paymentOption: {
        id: number
        name: string
        type: string
      }
      deliveryOption: {
        id: number
        name: string
        type: string
      }
      deliveryInfo: {
        id: number
        status: {
          key: string
          title: string
        }
        declarationId: string | null
        city: string | null
        warehouse: string | null
        fullDeliveryAddress: string | null
      } | null
    }
  }
}

// Icon maps
const PAYMENT_ICON_MAP: Record<string, string> = {
  online: '/icons/payment_delivery/online-payment.svg',
  card: '/icons/payment_delivery/online-payment.svg',
  bank_account: '/icons/bank-account.svg',
  cash: '/icons/payment_delivery/cash-on-delivery.svg',
  cash_on_delivery: '/icons/payment_delivery/cash-on-delivery.svg',
  postpay: '/icons/payment_delivery/cash-on-delivery.svg',
}

const DELIVERY_ICON_MAP: Record<string, string> = {
  nova_poshta: '/icons/payment_delivery/nova-poshta.svg',
  ukrposhta: '/icons/payment_delivery/ukrposhta.svg',
  meest: '/icons/payment_delivery/meest.png',
  pickup: '/icons/payment_delivery/pickup.svg',
}

const getStatusColor = (statusKey: string): string => {
  return statusKey === 'cancelled' ? 'text-red-600' : 'text-green-400'
}

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const numericOrderId = parseInt(orderId || '0', 10)

  const { data, loading, error } = useQuery<ThankYouPageData>(ThankYouPageQuery, {
    variables: { orderId: numericOrderId },
    skip: !numericOrderId,
  })

  if (loading) {
    return (
      <div>
        <Text variant="body-1">Завантаження...</Text>
      </div>
    )
  }

  if (error || !data?.thankYouPage?.order) {
    return (
      <div>
        <Text variant="body-1" className="text-red-600">
          Помилка завантаження замовлення
        </Text>
        <Button variant="outlined" onClick={() => navigate('/cabinet/orders')} className="mt-4">
          Повернутися до списку
        </Button>
      </div>
    )
  }

  const { order } = data.thankYouPage
  const totalAmount = parseFloat(order.cart.totalAmount)
  const statusColor = getStatusColor(order.status.key)
  const paymentIcon = PAYMENT_ICON_MAP[order.paymentOption?.type] || '/icons/payment_delivery/online-payment.svg'
  const deliveryIcon = DELIVERY_ICON_MAP[order.deliveryOption?.type] || '/icons/payment_delivery/nova-poshta.svg'

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
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/cabinet/orders')}
          className="p-2 hover:bg-white rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <Text variant="large-title-3" className="font-bold">
          Замовлення № {order.id}
        </Text>
        <button
          className="p-2 hover:bg-white rounded-lg transition-colors"
          onClick={() => navigator.clipboard.writeText(order.id.toString())}
        >
          <img src="/icons/copy.svg" alt="Copy" className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Status and Total */}
            <div className="bg-white rounded-lg p-6">
              {/* Products */}
              <div className="space-y-4 mb-6">
                {order.cart.items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                      <img
                        src="/product-images/product1.jpeg"
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text variant="body-2" className="mb-1">
                        {item.name}
                      </Text>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Text variant="body-2" className="font-bold">
                        {item.quantity} шт. × {parseFloat(item.price).toFixed(2)} ₴
                      </Text>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="text-right">
                  <Text as="div" variant="caption-1" className="text-gray-600 mb-2">
                    До оплати без доставки:
                  </Text>
                  <Text as="div" variant="title-3" className="font-bold">
                    {totalAmount.toFixed(2)} ₴
                  </Text>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-lg p-6">
              <Text as="div" variant="title-2" className="font-bold mb-6">
                Доставка
              </Text>
              <div className="flex gap-3">
                <img src={deliveryIcon} alt={order.deliveryOption.name} className="w-6 h-6 object-contain flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Text variant="body-2" className="font-medium">
                      {order.deliveryOption.name}
                    </Text>
                    <div className="flex-1 h-[1px] bg-gray-300 mx-2 hidden md:block"></div>
                    {order.deliveryInfo && (
                      <Text variant="body-2" className="text-gray-600 whitespace-nowrap">
                        від 70 ₴
                      </Text>
                    )}
                  </div>
                  {order.deliveryInfo?.fullDeliveryAddress && (
                    <div className="flex items-center gap-2">
                      <Text variant="body-2" className="text-gray-600 whitespace-nowrap">
                        Адреса доставки:
                      </Text>
                      <div className="flex-1 h-[1px] bg-gray-300 mx-2 hidden md:block"></div>
                      <Text variant="body-2" className="font-medium text-right">
                        {order.deliveryInfo.fullDeliveryAddress}
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg p-6">
              <Text as="div" variant="title-2" className="font-bold mb-6">
                Оплата
              </Text>
              <div className="flex items-center gap-3">
                <img src={paymentIcon} alt={order.paymentOption.name} className="w-6 h-6 object-contain" />
                <Text variant="body-1">
                  {order.paymentOption.name}
                </Text>
              </div>
              {order.paymentOption.type === 'online' && (
                <div className="mt-3">
                  <Text variant="body-2" className="text-gray-600">
                    • Без переплат
                  </Text>
                  <Text variant="body-2" className="text-gray-600">
                    Prom гарантує безпеку
                  </Text>
                  <Text variant="body-2" className="text-gray-600">
                    Повернемо гроші при відмові від посилки
                  </Text>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg p-6">
              <Text as="div" variant="title-2" className="font-bold mb-6">
                Статус замовлення
              </Text>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0"></div>
                <Text variant="body-2" className={statusColor}>
                  {order.status.title}
                </Text>
                <div className="flex-1 h-[1px] bg-gray-300 mx-2"></div>
                <Text variant="body-2" className="text-gray-600 whitespace-nowrap">
                  {formatDate(order.dateCreated)}
                </Text>
              </div>
            </div>

            {/* Seller */}
            <div className="bg-white rounded-lg p-6">
              <Text as="div" variant="title-2" className="font-bold mb-6">
                Продавець
              </Text>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Text variant="body-2" className="text-indigo-600 font-bold">
                    {order.company.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </Text>
                </div>
                <div>
                  <Text variant="body-1" className="font-semibold">
                    {order.company.name}
                  </Text>
                </div>
              </div>
            </div>

            {/* Buyer Contacts */}
            <div className="bg-white rounded-lg p-6">
              <Text as="div" variant="title-2" className="font-bold mb-6">
                Контакти покупця
              </Text>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Text variant="body-2" className="text-gray-600 whitespace-nowrap">
                    Ім'я:
                  </Text>
                  <div className="flex-1 h-[1px] bg-gray-300"></div>
                  <Text variant="body-2">
                    {order.fromLastName} {order.fromFirstName}
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Text variant="body-2" className="text-gray-600 whitespace-nowrap">
                    Телефон:
                  </Text>
                  <div className="flex-1 h-[1px] bg-gray-300"></div>
                  <Text variant="body-2">
                    {order.fromPhone}
                  </Text>
                </div>
                {order.fromEmail && (
                  <div className="flex items-center gap-2">
                    <Text variant="body-2" className="text-gray-600 whitespace-nowrap">
                      Email:
                    </Text>
                    <div className="flex-1 h-[1px] bg-gray-300"></div>
                    <Text variant="body-2">
                      {order.fromEmail}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

