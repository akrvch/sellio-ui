import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client/react'
import BasePage from '@components/base-page'
import { useAuth } from '@contexts'
import { Button, Text, Input, Select, Radio } from '@ui'
import { CheckoutQuery } from '@graphql/queries'
import { CreateOrderMutation } from '@graphql/mutations'
import ContactInfoSection from './ContactInfoSection'
import DeliverySection from './DeliverySection'
import PaymentSection from './PaymentSection'

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

type CheckoutData = {
  checkout: {
    cart: {
      id: number
      totalAmount: string
      items: Array<{
        productId: number
        name: string
        price: string
        quantity: number
        product: {
          id: number
          name: string
          description: string | null
          discountedPrice: string
        } | null
      }>
      company: {
        id: number
        name: string
        email: string
        phone: string
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
  }
}

type CreateOrderResponse = {
  createOrder: {
    success: boolean
    message: string
    orderId: number | null
  }
}

export default function CheckoutPage() {
  const { cartId } = useParams<{ cartId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // Fetch checkout data
  const { loading, error, data } = useQuery<CheckoutData>(CheckoutQuery, {
    variables: { cartId: parseInt(cartId || '0') },
    skip: !cartId,
  })

  // Create order mutation
  const [createOrder, { loading: creatingOrder }] = useMutation<CreateOrderResponse>(CreateOrderMutation)

  // Form state - pre-fill from user
  const [phone, setPhone] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  
  // Delivery state
  const [deliveryStep, setDeliveryStep] = useState(1) // 1 = contact info, 2 = delivery, 3 = payment
  const [selectedCity, setSelectedCity] = useState('Київ')
  const [selectedCityTab, setSelectedCityTab] = useState('Київ')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedPostbox, setSelectedPostbox] = useState('')
  const [courierAddress, setCourierAddress] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('department') // department, postbox, courier
  const [selectedDeliveryOptionId, setSelectedDeliveryOptionId] = useState<number | null>(null)
  
  // Mock cities
  const cities = ['Київ', 'Харків', 'Львів', 'Одеса', 'Дніпро']

  // Payment state
  const [selectedPaymentOptionId, setSelectedPaymentOptionId] = useState<number | null>(null)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  
  // Mock saved cards
  const savedCards = [
    { id: '1', type: 'mastercard', bank: 'monobank', last4: '1234' },
    { id: '2', type: 'visa', bank: 'privatbank', last4: '4588' }
  ]

  // Validation state
  const [showContactErrors, setShowContactErrors] = useState(false)
  const [showDeliveryErrors, setShowDeliveryErrors] = useState(false)
  const [showPaymentErrors, setShowPaymentErrors] = useState(false)

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setPhone(user.phone || '')
      setFirstName(user.firstName || '')
      setLastName(user.lastName || '')
      setMiddleName(user.secondName || '')
      setEmail(user.email || '')
    }
  }, [user])

  // Pre-select first payment and delivery options
  useEffect(() => {
    if (data?.checkout?.cart?.company) {
      const { paymentOptions, deliveryOptions } = data.checkout.cart.company
      if (paymentOptions.length > 0 && !selectedPaymentOptionId) {
        setSelectedPaymentOptionId(paymentOptions[0].id)
      }
      if (deliveryOptions.length > 0 && !selectedDeliveryOptionId) {
        setSelectedDeliveryOptionId(deliveryOptions[0].id)
      }
    }
  }, [data, selectedPaymentOptionId, selectedDeliveryOptionId])
  
  // Validation
  const isContactInfoValid = !!(phone && lastName && firstName)
  
  // Get selected delivery option type
  const selectedDeliveryOption = data?.checkout?.cart?.company?.deliveryOptions.find(
    o => o.id === selectedDeliveryOptionId
  )
  const isPickup = selectedDeliveryOption?.type === 'pickup'
  
  // Delivery validation - pickup doesn't need city/department, others do
  const isDeliveryValid = !!selectedDeliveryOptionId && (
    isPickup || 
    (deliveryMethod === 'department' && selectedCity && selectedDepartment) ||
    (deliveryMethod === 'postbox' && selectedCity && selectedPostbox) ||
    (deliveryMethod === 'courier' && selectedCity && courierAddress)
  )
  
  // Build full delivery address for order
  const fullDeliveryAddress = isPickup 
    ? 'Самовивіз' 
    : deliveryMethod === 'courier'
      ? `${selectedCity}, ${courierAddress}`
      : deliveryMethod === 'department' 
        ? `${selectedCity}, ${selectedDepartment}`
        : `${selectedCity}, ${selectedPostbox}`
  
  // Build warehouse field
  const warehouse = isPickup
    ? 'Самовивіз'
    : deliveryMethod === 'courier'
      ? 'Кур\'єрська доставка'
      : deliveryMethod === 'department'
        ? selectedDepartment
        : selectedPostbox
  
  const isPaymentValid = !!selectedPaymentOptionId
  
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
      setDeliveryStep(4)
    } else {
      setShowPaymentErrors(true)
    }
  }

  const handleSubmitOrder = async () => {
    // Check if all sections are valid
    if (!isContactInfoValid || !isDeliveryValid || !isPaymentValid) {
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
      return
    }

    if (!data?.checkout?.cart || !selectedPaymentOptionId || !selectedDeliveryOptionId) {
      alert('Помилка: відсутні необхідні дані')
      return
    }

    try {
      const result = await createOrder({
        variables: {
          cartId: data.checkout.cart.id,
          paymentOptionId: selectedPaymentOptionId,
          deliveryOptionId: selectedDeliveryOptionId,
          fromFirstName: firstName,
          fromSecondName: middleName,
          fromLastName: lastName,
          fromPhone: phone,
          fromEmail: email,
          comment: comment || undefined,
          city: selectedCity || undefined,
          warehouse: warehouse || undefined,
          fullDeliveryAddress: fullDeliveryAddress || undefined,
        },
      })

      if (result.data?.createOrder?.success && result.data.createOrder.orderId) {
        // Navigate to thank you page
        navigate(`/typ/${result.data.createOrder.orderId}`)
      } else {
        alert(result.data?.createOrder?.message || 'Помилка створення замовлення')
      }
    } catch (err: any) {
      console.error('Error creating order:', err)
      alert('Сталася помилка при створенні замовлення')
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

  if (error || !data?.checkout?.cart) {
    return (
      <BasePage>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Text variant="title-2" color="muted">
            {error ? 'Помилка завантаження' : 'Кошик не знайдено'}
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

  const cart = data.checkout.cart
  const company = cart.company
  const cartTotal = parseFloat(cart.totalAmount)
  const deliveryCost = 0
  const totalCost = cartTotal + deliveryCost

  // Отримуємо ініціали компанії
  const getCompanyInitials = (name: string): string => {
    const words = name.trim().split(/\s+/)
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return name.length >= 2 ? name.substring(0, 2).toUpperCase() : name[0]?.toUpperCase() || '?'
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
              receiveOtherPerson={false}
              setReceiveOtherPerson={() => {}}
              showErrors={showContactErrors}
              isValid={isContactInfoValid}
              onContinue={handleContinueContact}
              onEdit={() => setDeliveryStep(1)}
            />

            {/* 2. Доставка */}
            <div className={`bg-white rounded-lg p-6 ${deliveryStep === 2 ? 'border-2 border-indigo-600' : 'border border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <Text variant="title-2" className="font-bold">
                  2. Доставка
                </Text>
                {deliveryStep > 2 && (
                  <button
                    onClick={() => setDeliveryStep(2)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Змінити
                  </button>
                )}
              </div>

              {deliveryStep === 2 ? (
                <div className="space-y-4">
                  {/* City selector */}
                  <Select
                    value={selectedCity}
                    onChange={(value) => {
                      setSelectedCity(value)
                      setSelectedCityTab(value)
                    }}
                    options={cities.map(city => ({ value: city, label: city }))}
                    placeholder="Оберіть місто"
                  />

                  {/* City tabs as links */}
                  <div className="flex gap-6 overflow-x-auto pb-2">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCityTab(city)
                          setSelectedCity(city)
                        }}
                        className={`whitespace-nowrap transition-colors underline-offset-4 ${
                          selectedCityTab === city
                            ? 'text-indigo-600 underline font-medium'
                            : 'text-indigo-600 hover:underline'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>

                  {/* Delivery options without borders */}
                  <div className="space-y-4">
                    {company.deliveryOptions.map((option) => {
                      const iconSrc = DELIVERY_ICON_MAP[option.type] || '/icons/payment_delivery/nova-poshta.svg'
                      const isSelected = selectedDeliveryOptionId === option.id
                      const isPickupOption = option.type === 'pickup'
                      
                      // Determine delivery date/price text based on type
                      const deliveryInfo = isPickupOption 
                        ? 'Забрати сьогодні'
                        : option.type === 'nova_poshta' 
                          ? '20 грудня, 90 ₴'
                          : '21 грудня, 60 ₴'
                      
                      return (
                        <div key={option.id}>
                          {/* Radio option */}
                          <Radio
                            name="deliveryOption"
                            checked={isSelected}
                            onChange={() => setSelectedDeliveryOptionId(option.id)}
                            label={
                              <div className="flex items-center gap-3">
                                <img 
                                  src={iconSrc} 
                                  alt={option.name} 
                                  className="w-6 h-6 object-contain"
                                />
                                <Text variant="body-1" className="font-medium">
                                  {option.name}
                                </Text>
                              </div>
                            }
                          />

                          {/* Expanded content for non-pickup */}
                          {isSelected && !isPickupOption && (
                            <div className="ml-10 mt-4 space-y-3">
                              {/* Department option */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Radio
                                    name={`deliveryMethod-${option.id}`}
                                    checked={deliveryMethod === 'department'}
                                    onChange={() => setDeliveryMethod('department')}
                                  />
                                  <Text variant="body-2">До відділення</Text>
                                  <div className="flex items-center gap-2 flex-1 ml-2">
                                    <div className="h-[1px] flex-1 bg-gray-300 hidden md:block"></div>
                                    <Text variant="body-2" className="text-indigo-600 whitespace-nowrap md:ml-0 ml-auto">
                                      {deliveryInfo}
                                    </Text>
                                  </div>
                                </div>
                                
                                {deliveryMethod === 'department' && (
                                  <>
                                    <Text variant="body-2" className="mb-2">
                                      Оберіть відділення {option.name}
                                    </Text>
                                    
                                    <Select
                                      value={selectedDepartment}
                                      onChange={(value) => setSelectedDepartment(value)}
                                      options={[
                                        { value: '', label: 'Оберіть відділення' },
                                        { value: '№1296: вул. Олени Пчілки, 2', label: '№1296: вул. Олени Пчілки, 2' },
                                        { value: '№15: вул. Хрещатик, 1', label: '№15: вул. Хрещатик, 1' },
                                        { value: '№42: просп. Перемоги, 50', label: '№42: просп. Перемоги, 50' }
                                      ]}
                                      placeholder="Оберіть відділення"
                                    />
                                  </>
                                )}
                              </div>

                              {/* Postbox option */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Radio
                                    name={`deliveryMethod-${option.id}`}
                                    checked={deliveryMethod === 'postbox'}
                                    onChange={() => setDeliveryMethod('postbox')}
                                  />
                                  <Text variant="body-2">У поштомат</Text>
                                  <div className="flex items-center gap-2 flex-1 ml-2">
                                    <div className="h-[1px] flex-1 bg-gray-300 hidden md:block"></div>
                                    <Text variant="body-2" className="text-indigo-600 whitespace-nowrap md:ml-0 ml-auto">
                                      {deliveryInfo}
                                    </Text>
                                  </div>
                                </div>
                                
                                {deliveryMethod === 'postbox' && (
                                  <>
                                    <Text variant="body-2" className="mb-2">
                                      Оберіть поштомат {option.name}
                                    </Text>
                                    
                                    <Select
                                      value={selectedPostbox}
                                      onChange={(value) => setSelectedPostbox(value)}
                                      options={[
                                        { value: '', label: 'Оберіть поштомат' },
                                        { value: 'Поштомат №101: вул. Саксаганського, 10', label: 'Поштомат №101: вул. Саксаганського, 10' },
                                        { value: 'Поштомат №205: вул. Велика Васильківська, 15', label: 'Поштомат №205: вул. Велика Васильківська, 15' },
                                        { value: 'Поштомат №350: просп. Перемоги, 25', label: 'Поштомат №350: просп. Перемоги, 25' }
                                      ]}
                                      placeholder="Оберіть поштомат"
                                    />
                                  </>
                                )}
                              </div>

                              {/* Courier option */}
                              <div>
                                <div className="flex items-center gap-2 mb-3">
                                  <Radio
                                    name={`deliveryMethod-${option.id}`}
                                    checked={deliveryMethod === 'courier'}
                                    onChange={() => setDeliveryMethod('courier')}
                                  />
                                  <Text variant="body-2">Кур'єр {option.name}</Text>
                                  <div className="flex items-center gap-2 flex-1 ml-2">
                                    <div className="h-[1px] flex-1 bg-gray-300 hidden md:block"></div>
                                    <Text variant="body-2" className="text-indigo-600 whitespace-nowrap md:ml-0 ml-auto">
                                      {deliveryInfo}
                                    </Text>
                                  </div>
                                </div>
                                
                                {deliveryMethod === 'courier' && (
                                  <>
                                    <Text variant="body-2" className="mb-2">
                                      Введіть адресу доставки
                                    </Text>
                                    
                                    <Input
                                      value={courierAddress}
                                      onChange={(e) => setCourierAddress(e.target.value)}
                                      placeholder="вул. Хрещатик, буд. 1, кв. 10"
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {showDeliveryErrors && !isDeliveryValid && (
                    <div className="mt-2">
                      <Text variant="caption-1" className="text-red-500">
                        {!selectedDeliveryOptionId 
                          ? 'Оберіть спосіб доставки' 
                          : 'Оберіть відділення'}
                      </Text>
                    </div>
                  )}

                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleContinueDelivery}
                  >
                    Продовжити оформлення
                  </Button>
                </div>
              ) : deliveryStep > 2 ? (
                <div className="flex items-center gap-3 text-gray-600">
                  {(() => {
                    const option = company.deliveryOptions.find(o => o.id === selectedDeliveryOptionId)
                    if (!option) return null
                    const iconSrc = DELIVERY_ICON_MAP[option.type] || '/icons/payment_delivery/nova-poshta.svg'
                    return (
                      <>
                        <img 
                          src={iconSrc} 
                          alt={option.name} 
                          className="w-6 h-6 object-contain"
                        />
                        <div>
                          <Text variant="body-2">{option.name}</Text>
                          {selectedCity && (
                            <Text variant="caption-1" className="text-gray-500">
                              {selectedCity}{selectedDepartment && `, ${selectedDepartment}`}
                            </Text>
                          )}
                        </div>
                      </>
                    )
                  })()}
                </div>
              ) : null}
            </div>

            {/* 3. Спосіб оплати */}
            <div className={`bg-white rounded-lg p-6 ${deliveryStep === 3 ? 'border-2 border-indigo-600' : 'border border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <Text variant="title-2" className="font-bold">
                  3. Спосіб оплати
                </Text>
                {deliveryStep > 3 && (
                  <button
                    onClick={() => setDeliveryStep(3)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Змінити
                  </button>
                )}
              </div>

              {deliveryStep === 3 ? (
                <div className="space-y-4">
                  {company.paymentOptions.map((option) => {
                    const iconSrc = PAYMENT_ICON_MAP[option.type] || '/icons/payment_delivery/online-payment.svg'
                    const isOnlinePayment = option.type === 'online'
                    const isSelected = selectedPaymentOptionId === option.id
                    
                    return (
                      <div key={option.id}>
                        <div className="flex items-center gap-3">
                          <Radio
                            name="paymentOption"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedPaymentOptionId(option.id)
                              if (isOnlinePayment && savedCards.length > 0) {
                                setSelectedCardId(savedCards[0].id)
                              }
                            }}
                            label={
                              <div className="flex items-center gap-3">
                                <img 
                                  src={iconSrc} 
                                  alt={option.name} 
                                  className="w-6 h-6 object-contain"
                                />
                                <Text variant="body-1" className="font-medium">{option.name}</Text>
                              </div>
                            }
                          />
                        </div>
                        
                        {/* Show saved cards for online payment */}
                        {isSelected && isOnlinePayment && (
                          <div className="ml-10 mt-4 space-y-3">
                            {/* Saved cards */}
                            {savedCards.map((card) => (
                              <div key={card.id} className="flex items-center justify-between">
                                <Radio
                                  name="paymentCard"
                                  checked={selectedCardId === card.id}
                                  onChange={() => setSelectedCardId(card.id)}
                                  label={
                                    <div className="flex items-center gap-3">
                                      <img 
                                        src={card.type === 'mastercard' 
                                          ? '/icons/payment_delivery/mastercard.svg' 
                                          : '/icons/payment_delivery/visa.svg'
                                        } 
                                        alt={card.type} 
                                        className="w-8 h-6 object-contain"
                                      />
                                      <Text variant="body-2">{card.bank}</Text>
                                    </div>
                                  }
                                />
                                <Text variant="body-2" className="text-gray-600">
                                  •••• {card.last4}
                                </Text>
                              </div>
                            ))}
                            
                            {/* Add new card option */}
                            <Radio
                              name="paymentCard"
                              checked={selectedCardId === 'new'}
                              onChange={() => setSelectedCardId('new')}
                              label={<Text variant="body-2">Додати картку</Text>}
                            />
                            
                            {/* Google Pay option */}
                            <div className="flex items-center gap-3">
                              <Radio
                                name="paymentCard"
                                checked={selectedCardId === 'gpay'}
                                onChange={() => setSelectedCardId('gpay')}
                                label={<Text variant="body-2">Купити з</Text>}
                              />
                              <div className="border border-gray-300 rounded px-3 py-1">
                                <img 
                                  src="/icons/payment_delivery/google-pay.svg" 
                                  alt="Google Pay" 
                                  className="h-5"
                                />
                              </div>
                            </div>
                            
                            {/* Apple Pay option */}
                            <div className="flex items-center gap-3">
                              <Radio
                                name="paymentCard"
                                checked={selectedCardId === 'apay'}
                                onChange={() => setSelectedCardId('apay')}
                                label={<Text variant="body-2">Купити з</Text>}
                              />
                              <div className="border border-gray-300 rounded px-3 py-1">
                                <img 
                                  src="/icons/payment_delivery/apple-pay.svg" 
                                  alt="Apple Pay" 
                                  className="h-5"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {showPaymentErrors && !isPaymentValid && (
                    <Text variant="caption-1" className="text-red-500">
                      Оберіть спосіб оплати
                    </Text>
                  )}

                  <Button
                    variant="contained"
                    size="medium"
                    onClick={handleContinuePayment}
                  >
                    Продовжити
                  </Button>
                </div>
              ) : deliveryStep > 3 ? (
                <div className="flex items-center gap-3 text-gray-600">
                  {(() => {
                    const option = company.paymentOptions.find(o => o.id === selectedPaymentOptionId)
                    if (!option) return null
                    const iconSrc = PAYMENT_ICON_MAP[option.type] || '/icons/payment_delivery/online-payment.svg'
                    return (
                      <>
                        <img 
                          src={iconSrc} 
                          alt={option.name} 
                          className="w-6 h-6 object-contain"
                        />
                        <Text variant="body-2">{option.name}</Text>
                      </>
                    )
                  })()}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-4 h-fit">
            <div className={`bg-white rounded-lg p-6 ${deliveryStep === 4 ? 'border-2 border-indigo-600' : 'border border-gray-200'}`}>
              {/* Company Header */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {/* Avatar with initials */}
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Text variant="title-3" className="text-indigo-600 font-bold">
                      {getCompanyInitials(company.name)}
              </Text>
                  </div>
                  
                  {/* Company name */}
                  <div className="flex-1 min-w-0">
                    <Text variant="body-1" className="font-semibold truncate">
                      {company.name}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div className="mb-6">
                <Text variant="body-1" className="font-semibold mb-6">
                  Товари ({cart.items.length})
                </Text>
                <div className="space-y-4">
                  {cart.items.map((item) => {
                    const price = parseFloat(item.product?.discountedPrice || item.price)
                    
                    return (
                      <div key={item.productId} className="flex items-start gap-3">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                          <img
                            src="/product-images/product1.jpeg"
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Text variant="body-2" className="line-clamp-2">
                            {item.name}
                          </Text>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="h-[1px] w-8 bg-gray-300 hidden md:block"></div>
                          <Text variant="body-2" className="text-gray-600 whitespace-nowrap">
                            {item.quantity} шт. × {price.toFixed(2)} ₴
                          </Text>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Comment */}
              <div className="mb-6">
                <Text variant="body-1" className="font-semibold mb-4">
                  Коментар:
                </Text>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Залиште коментар до замовлення"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Totals */}
              <div className="mb-6">
                <Text variant="body-1" className="font-semibold mb-4">
                  Деталі оплати
                </Text>
                <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Text variant="body-1" className="text-gray-600">
                    Вартість товарів:
                  </Text>
                  <Text variant="body-1" className="font-semibold">
                      {cartTotal.toFixed(2)} ₴
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
                      {totalCost.toFixed(2)} ₴
                    </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                variant="contained" 
                size="medium" 
                className="w-full"
                onClick={handleSubmitOrder}
                disabled={creatingOrder}
              >
                {creatingOrder ? 'Оформлення...' : 'Оформити замовлення'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  )
}
