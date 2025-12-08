import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasePage from '@components/base-page'
import { useCart } from '@contexts'
import { Button, Text, Input } from '@ui'
import ContactInfoSection from './ContactInfoSection'
import DeliverySection from './DeliverySection'
import PaymentSection from './PaymentSection'

export default function CheckoutPage() {
  const { items, itemsCount, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [email, setEmail] = useState('')
  const [receiveOtherPerson, setReceiveOtherPerson] = useState(false)
  const [comment, setComment] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [noCallConfirm, setNoCallConfirm] = useState(false)
  
  // Delivery state
  const [deliveryStep, setDeliveryStep] = useState(1) // 1 = contact info, 2 = delivery, 3 = payment
  const [selectedCity, setSelectedCity] = useState('Київ')
  const [selectedCityTab, setSelectedCityTab] = useState('Київ')
  const [deliveryService, setDeliveryService] = useState('') // novaposhta or ukrposhta
  const [deliveryMethod, setDeliveryMethod] = useState('') // department, postbox, courier
  const [selectedDepartment, setSelectedDepartment] = useState('')

  // Payment state
  const [paymentType, setPaymentType] = useState('') // online or postpay
  const [paymentMethod, setPaymentMethod] = useState('') // monobank, privatbank, card, gpay, applepay

  // Validation state
  const [showContactErrors, setShowContactErrors] = useState(false)
  const [showDeliveryErrors, setShowDeliveryErrors] = useState(false)
  const [showPaymentErrors, setShowPaymentErrors] = useState(false)

  const cities = ['Київ', 'Харків', 'Львів', 'Одеса', 'Дніпро']
  
  // Validation
  const isContactInfoValid = !!(phone && lastName && firstName)
  const isDeliveryValid = !!(deliveryService && (deliveryService === 'ukrposhta' || deliveryMethod) && 
    (deliveryMethod !== 'department' || selectedDepartment))
  const isPaymentValid = !!(paymentType && (paymentType === 'postpay' || paymentMethod))
  
  const handleContinueContact = () => {
    if (isContactInfoValid) {
      setShowContactErrors(false)
      setDeliveryStep(2)
    } else {
      setShowContactErrors(true)
    }
  }
  
  const handleContinueDelivery = () => {
    if (isDeliveryValid) {
      setShowDeliveryErrors(false)
      setDeliveryStep(3)
    } else {
      setShowDeliveryErrors(true)
    }
  }
  
  const handleContinuePayment = () => {
    if (isPaymentValid) {
      setShowPaymentErrors(false)
      setDeliveryStep(4) // Close payment section
      // Submit order
      console.log('Order submitted')
    } else {
      setShowPaymentErrors(true)
    }
  }

  const deliveryCost = 0 // Безкоштовно
  const totalCost = totalPrice + deliveryCost

  const handleSubmitOrder = () => {
    // Check if all sections are valid
    if (isContactInfoValid && isDeliveryValid && isPaymentValid) {
      // Generate order ID (in real app, this would come from API)
      const orderId = Math.floor(Math.random() * 1000000).toString()
      
      // Clear cart
      clearCart()
      
      // Navigate to thank you page
      navigate(`/typ/${orderId}`)
    } else {
      // Show errors for incomplete sections
      if (!isContactInfoValid) {
        setShowContactErrors(true)
        setDeliveryStep(1)
      } else if (!isDeliveryValid) {
        setShowDeliveryErrors(true)
        setDeliveryStep(2)
      } else if (!isPaymentValid) {
        setShowPaymentErrors(true)
        setDeliveryStep(3)
      }
    }
  }

  return (
    <BasePage>
      <div className="py-8">
        <Text variant="title-1" className="font-bold mb-12">
          Оформлення замовлення
        </Text>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* 1. Контактна інформація */}
            <ContactInfoSection
              isOpen={deliveryStep === 1}
              phone={phone}
              setPhone={setPhone}
              lastName={lastName}
              setLastName={setLastName}
              firstName={firstName}
              setFirstName={setFirstName}
              middleName={middleName}
              setMiddleName={setMiddleName}
              email={email}
              setEmail={setEmail}
              receiveOtherPerson={receiveOtherPerson}
              setReceiveOtherPerson={setReceiveOtherPerson}
              showErrors={showContactErrors}
              isValid={isContactInfoValid}
              onContinue={handleContinueContact}
              onEdit={() => setDeliveryStep(1)}
            />

            {/* 2. Доставка */}
            <DeliverySection
              isOpen={deliveryStep === 2}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedCityTab={selectedCityTab}
              setSelectedCityTab={setSelectedCityTab}
              deliveryService={deliveryService}
              setDeliveryService={setDeliveryService}
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              showErrors={showDeliveryErrors}
              isValid={isDeliveryValid}
              onContinue={handleContinueDelivery}
              onEdit={() => setDeliveryStep(2)}
            />

            {/* 3. Спосіб оплати */}
            <PaymentSection
              isOpen={deliveryStep === 3}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              showErrors={showPaymentErrors}
              isValid={isPaymentValid}
              onContinue={handleContinuePayment}
              onEdit={() => setDeliveryStep(3)}
            />


            {/* Checkbox - No call confirmation */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="noCallConfirm"
                checked={noCallConfirm}
                onChange={(e) => setNoCallConfirm(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="noCallConfirm" className="text-sm text-gray-700">
                Не дзвонити для підтвердження замовлення
              </label>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className={`bg-white rounded-lg p-6 ${deliveryStep === 4 ? 'border-2 border-indigo-600' : 'border border-gray-200'}`}>
              <Text variant="title-2" className="font-bold mb-6">
                Разом:
              </Text>

              {/* Products List */}
              <div className="mb-6">
                <Text variant="body-1" className="font-semibold mb-4">
                  Товари:
                </Text>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Text variant="body-2" className="line-clamp-2 mb-1">
                          {item.name}
                        </Text>
                        <Text variant="caption-1" className="text-gray-500">
                          Артикул: {item.id}
                        </Text>
                        <div className="flex items-center justify-between mt-2">
                          <Text variant="caption-1" className="text-gray-500">
                            {item.quantity} шт.
                          </Text>
                          <Text variant="body-2" className="font-bold">
                            {item.price * item.quantity} ₴
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Коментар до замовлення"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Промо код"
                  inputClassName="flex-1"
                />
                <Button 
                  variant={promoCode.trim() ? "contained" : "outlined"}
                  size="medium"
                  disabled={!promoCode.trim()}
                >
                  Застосувати
                </Button>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <Text variant="body-1" className="text-gray-600">
                    Вартість товарів:
                  </Text>
                  <Text variant="body-1" className="font-semibold">
                    {totalPrice} ₴
                  </Text>
                </div>
                <div className="flex items-center justify-between">
                  <Text variant="body-1" className="text-gray-600">
                    Вартість доставки:
                  </Text>
                  <Text variant="body-1" className="font-semibold text-green-400">
                    Безкоштовно
                  </Text>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <Text variant="title-2" className="font-bold">
                      До сплати:
                    </Text>
                    <Text variant="title-1" className="font-bold">
                      {totalCost} ₴
                    </Text>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                variant="contained" 
                size="medium" 
                className="w-full"
                onClick={handleSubmitOrder}
              >
                Оформити замовлення
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  )
}

