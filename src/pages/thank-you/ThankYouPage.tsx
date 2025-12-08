import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BasePage from '@components/base-page'
import { Button, Text } from '@ui'

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

function ThankYouPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()

  // Mock data - в реальному застосунку це буде приходити з API
  const orderData = {
    orderNumber: orderId || '123456',
    orderId: '12d34h56-78j98-8447',
    orderDate: '16.01.2024, 16:41',
    orderStatus: 'В обробці',
    delivery: 'Нова пошта',
    name: 'Антонов Антон',
    phone: '+380 63 111 00 22',
    email: 'antonio777@gmail.com',
    paymentNumber: '12345678988447',
    paymentDate: '16.01.2024, 16:42',
    paymentMethod: '•••• •••• 4588',
    paymentStatus: 'Сплачено',
    amount: '4999 ₴',
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
              <span className="text-indigo-600">№ {orderData.orderNumber}</span>{' '}
              успішно оформлене
            </Text>
          </div>
          {/* Order Details Card */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <Text variant="subtitle-1" className="font-bold">
              Деталі замовлення
            </Text>
            <div className="space-y-4 mt-4">
              <Row label="Дата замовлення:" value={orderData.orderDate} />
              <Row label="ID замовлення:" value={orderData.orderId} />
              <Row 
                label="Статус замовлення:" 
                value={orderData.orderStatus} 
                valueColor="text-indigo-600"
              />
              <Row label="Доставка:" value={orderData.delivery} />
              <Row label="Ім'я, прізвище:" value={orderData.name} />
              <Row label="Телефон:" value={orderData.phone} />
              <Row label="Email:" value={orderData.email} />
            </div>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <Text variant="subtitle-1" className="font-bold">
              Деталі оплати
            </Text>
            <div className="space-y-4 mt-4">
              <Row label="Номер оплати:" value={orderData.paymentNumber} />
              <Row label="Дата оплати:" value={orderData.paymentDate} />
              <Row label="Спосіб оплати:" value={orderData.paymentMethod} />
              <Row label="Статус:" value={orderData.paymentStatus} valueColor="text-green-400"/>
              <Row 
                label="Сума:" 
                value={orderData.amount} 
                valueVariant="subtitle-1"
              />
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
            <button
              onClick={() => {
                // Download receipt logic
                console.log('Download receipt')
              }}
              className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors w-full"
            >
              <img src="/icons/receipt.svg" alt="receipt" className="h-5 w-5" />
              <Text variant="body-1" className="font-medium">
                Завантажити квитанцію
              </Text>
            </button>
          </div>
        </div>
      </div>
    </BasePage>
  )
}

ThankYouPage.Row = Row

export default ThankYouPage

