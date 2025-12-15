import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import BasePage from '@components/base-page'
import { Button, Text } from '@ui'
import { ThankYouPageQuery } from '@graphql/queries'

// Delivery type to icon mapping
const DELIVERY_ICON_MAP: Record<string, string> = {
  nova_poshta: '/icons/payment_delivery/nova-poshta.svg',
  ukrposhta: '/icons/payment_delivery/ukrposhta.svg',
  meest: '/icons/payment_delivery/meest.png',
  pickup: '/icons/payment_delivery/pickup.svg',
}

// Payment type to icon mapping
const PAYMENT_ICON_MAP: Record<string, string> = {
  card: '/icons/payment_delivery/online-payment.svg',
  online: '/icons/payment_delivery/online-payment.svg',
  bank_account: '/icons/bank-account.svg',
  cash: '/icons/payment_delivery/cash-on-delivery.svg',
  cash_on_delivery: '/icons/payment_delivery/cash-on-delivery.svg',
}

interface RowProps {
  label: string
  value: string
  valueVariant?: 'body-1' | 'subtitle-1'
  valueColor?: string
}

function Row({ label, value, valueVariant = 'body-1', valueColor }: RowProps) {
  return (
    <div className="flex items-center gap-4">
      <Text variant="body-1" className="text-gray-600 whitespace-nowrap">
        {label}
      </Text>
      <div className="flex-1 border-t border-gray-200"></div>
      <Text variant={valueVariant} className={`font-medium ${valueColor || ''}`}>
        {value}
      </Text>
    </div>
  )
}

type ThankYouPageData = {
  thankYouPage: {
    order: {
      id: number
      fromFirstName: string
      fromSecondName: string
      fromLastName: string
      fromEmail: string
      fromPhone: string
      status: {
        key: string
        title: string
      }
      comment: string | null
      dateCreated: string
      cart: {
        id: number
        totalAmount: string
        items: Array<{
          name: string
          price: string
          quantity: number
        }>
      }
      company: {
        name: string
        phone: string
      }
      paymentOption: {
        name: string
        type: string
      }
      deliveryOption: {
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

function ThankYouPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()

  const { loading, error, data } = useQuery<ThankYouPageData>(ThankYouPageQuery, {
    variables: { orderId: parseInt(orderId || '0') },
    skip: !orderId,
  })

  if (loading) {
    return (
      <BasePage>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Text variant="title-2" color="muted">Завантаження...</Text>
        </div>
      </BasePage>
    )
  }

  if (error || !data?.thankYouPage?.order) {
    return (
      <BasePage>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Text variant="title-2" color="muted">
            {error ? 'Помилка завантаження' : 'Замовлення не знайдено'}
          </Text>
          {error && (
            <Text variant="body-1" color="muted">
              {error.message}
            </Text>
          )}
          <Button variant="outlined" onClick={() => navigate('/')}>
            На головну
          </Button>
        </div>
      </BasePage>
    )
  }

  const order = data.thankYouPage.order
  const fullName = `${order.fromLastName} ${order.fromFirstName} ${order.fromSecondName}`.trim()
  const totalAmount = parseFloat(order.cart.totalAmount)

  // Визначаємо колір статусу
  const getStatusColor = (key: string) => {
    switch (key) {
      case 'new':
        return 'text-indigo-600'
      case 'in_progress':
        return 'text-blue-600'
      case 'completed':
        return 'text-green-600'
      case 'cancelled':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <BasePage>
      <div className="py-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <img src="/icons/check.svg" alt="Success" className="w-20 h-20" />
        </div>

        <div className="max-w-lg mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <Text variant="large-title-2" className="font-bold mb-2">
              Замовлення{' '}
              <span className="text-indigo-600">№ {order.id}</span>{' '}
              успішно оформлене
            </Text>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <Text variant="subtitle-1" className="font-bold mb-4">
              Деталі замовлення
            </Text>
            <div className="space-y-4">
              <Row label="Дата замовлення:" value={order.dateCreated} />
              <Row 
                label="Статус замовлення:" 
                value={order.status.title} 
                valueColor={getStatusColor(order.status.key)}
              />
              <Row label="Компанія:" value={order.company.name} />
              <Row label="Телефон компанії:" value={order.company.phone} />
              
              {/* Delivery with icon */}
              <div className="flex items-center gap-4">
                <Text variant="body-1" className="text-gray-600 whitespace-nowrap">
                  Доставка:
                </Text>
                <div className="flex-1 border-t border-gray-200"></div>
                <div className="flex items-center gap-2">
                  <img 
                    src={DELIVERY_ICON_MAP[order.deliveryOption.type] || '/icons/payment_delivery/nova-poshta.svg'} 
                    alt={order.deliveryOption.name}
                    className="w-6 h-6 object-contain"
                  />
                  <Text variant="body-1" className="font-medium">
                    {order.deliveryOption.name}
                  </Text>
                </div>
              </div>
              {order.deliveryInfo?.city && (
                <Row label="Місто:" value={order.deliveryInfo.city} />
              )}
              {order.deliveryInfo?.warehouse && (
                <Row label="Відділення:" value={order.deliveryInfo.warehouse} />
              )}
              {order.deliveryInfo?.declarationId && (
                <Row label="ТТН:" value={order.deliveryInfo.declarationId} />
              )}
              {order.deliveryInfo?.status && (
                <Row 
                  label="Статус доставки:" 
                  value={order.deliveryInfo.status.title}
                  valueColor="text-blue-600"
                />
              )}
              <Row label="Ім'я, прізвище:" value={fullName} />
              <Row label="Телефон:" value={order.fromPhone} />
              {order.fromEmail && (<Row label="Email:" value={order.fromEmail} />)}
              {order.comment && (
                <div className="pt-2">
                  <Text variant="body-1" className="text-gray-600 mb-2">
                    Коментар:
                  </Text>
                  <Text variant="body-2" className="text-gray-800">
                    {order.comment}
                  </Text>
                </div>
              )}
            </div>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <Text variant="subtitle-1" className="font-bold mb-4">
              Деталі оплати
            </Text>
            <div className="space-y-4">
              {/* Payment with icon */}
              <div className="flex items-center gap-4">
                <Text variant="body-1" className="text-gray-600 whitespace-nowrap">
                  Спосіб оплати:
                </Text>
                <div className="flex-1 border-t border-gray-200"></div>
                <div className="flex items-center gap-2">
                  <img 
                    src={PAYMENT_ICON_MAP[order.paymentOption.type] || '/icons/payment_delivery/online-payment.svg'} 
                    alt={order.paymentOption.name}
                    className="w-6 h-6 object-contain"
                  />
                  <Text variant="body-1" className="font-medium">
                    {order.paymentOption.name}
                  </Text>
                </div>
              </div>
              
              <Row 
                label="Сума:" 
                value={`${totalAmount.toFixed(2)} ₴`}
                valueVariant="subtitle-1"
              />
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <Text variant="subtitle-1" className="font-bold mb-4">
              Товари ({order.cart.items.length})
            </Text>
            <div className="space-y-3">
              {order.cart.items.map((item, index) => {
                const itemTotal = parseFloat(item.price) * item.quantity
                return (<Row label={item.name} value={`${item.quantity} шт. × ${parseFloat(item.price).toFixed(2)} ₴`} />)
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              variant="contained"
              size="medium"
              className="w-full"
              onClick={() => navigate('/')}
            >
              Продовжити покупки
            </Button>
            <Button
              variant="outlined"
              size="medium"
              className="w-full"
              onClick={() => navigate('/cabinet/orders')}
            >
              Мої замовлення
            </Button>
          </div>
        </div>
      </div>
    </BasePage>
  )
}

export default ThankYouPage
