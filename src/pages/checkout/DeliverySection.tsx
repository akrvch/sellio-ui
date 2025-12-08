import React from 'react'
import { Button, Text, Radio, Select, SelectOption } from '@ui'

interface DeliverySectionProps {
  isOpen: boolean
  selectedCity: string
  setSelectedCity: (value: string) => void
  selectedCityTab: string
  setSelectedCityTab: (value: string) => void
  deliveryService: string
  setDeliveryService: (value: string) => void
  deliveryMethod: string
  setDeliveryMethod: (value: string) => void
  selectedDepartment: string
  setSelectedDepartment: (value: string) => void
  showErrors: boolean
  isValid: boolean
  onContinue: () => void
  onEdit: () => void
}

const cities = ['Київ', 'Харків', 'Львів', 'Одеса', 'Дніпро']

const cityOptions: SelectOption[] = cities.map(city => ({
  value: city,
  label: city
}))

const departmentOptions: SelectOption[] = [
  { value: '', label: 'Оберіть відділення' },
  { value: '1296', label: '№1296: вул. Олени Пчілки, 2' },
  { value: '1', label: '№1: вул. Хрещатик, 10' },
  { value: '25', label: '№25: пр. Перемоги, 45' },
]

export default function DeliverySection({
  isOpen,
  selectedCity,
  setSelectedCity,
  selectedCityTab,
  setSelectedCityTab,
  deliveryService,
  setDeliveryService,
  deliveryMethod,
  setDeliveryMethod,
  selectedDepartment,
  setSelectedDepartment,
  showErrors,
  isValid,
  onContinue,
  onEdit,
}: DeliverySectionProps) {
  return (
    <div className={`rounded-lg bg-white ${isOpen ? 'border-2 border-indigo-600 p-6' : 'p-6'}`}>
      <div className={`flex items-center justify-between ${isOpen ? 'mb-6' : ''}`}>
        <Text variant="subtitle-1" className="font-bold">
          2. Доставка
        </Text>
        {!isOpen && isValid && (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <img src="/icons/edit.svg" alt="edit" className="h-4 w-4" />
            <Text variant="subtitle-1" className="font-medium">
              Редагувати
            </Text>
          </button>
        )}
      </div>

      {isOpen ? (
        <div className="space-y-6">
          {/* City Selector */}
          <Select
            value={selectedCity}
            onChange={(value) => {
              setSelectedCity(value)
              setSelectedCityTab(value)
            }}
            options={cityOptions}
          />

          {/* City Tabs */}
          <div className="flex gap-6">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCityTab(city)}
                className={`text-base font-medium text-indigo-600 transition-colors relative pb-1 ${
                  selectedCityTab === city ? '' : ''
                }`}
              >
                {city}
                {selectedCityTab === city && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600" />
                )}
              </button>
            ))}
          </div>

          {/* Delivery Services */}
          <div className="space-y-4">
            {/* Nova Poshta */}
            <div className="space-y-3">
              <Radio
                name="deliveryService"
                value="novaposhta"
                checked={deliveryService === 'novaposhta'}
                onChange={(e) => setDeliveryService(e.target.value)}
                label={
                  <div className="flex items-center gap-2">
                    <img src="/icons/payment_delivery/nova-poshta.svg" alt="Нова Пошта" className="h-6" />
                    <Text variant="body-1" className="font-semibold">
                      Нова Пошта
                    </Text>
                  </div>
                }
              />

              {deliveryService === 'novaposhta' && (
                <div className="ml-8 space-y-3">
                  {/* До відділення */}
                  <div>
                    <Radio
                      name="deliveryMethod"
                      value="department"
                      checked={deliveryMethod === 'department'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      label={
                        <div className="flex items-center justify-between flex-1 min-w-0">
                          <Text variant="body-2">До відділення</Text>
                          <Text variant="body-2" className="text-indigo-600 font-semibold ml-4">
                            17 Жовтня, 0 ₴
                          </Text>
                        </div>
                      }
                      className="w-full"
                    />

                    
                      {deliveryMethod === 'department' && (
                        <div className="mt-3 ml-8">
                          <Text variant="caption-1" className="text-gray-600 mb-2">
                            Оберіть відділення Нової Пошти
                          </Text>
                          <Select
                            value={selectedDepartment}
                            onChange={(value) => setSelectedDepartment(value)}
                            options={departmentOptions}
                            placeholder="Оберіть відділення"
                          />
                        </div>
                      )}
                  </div>

                  {/* У поштомат */}
                  <Radio
                    name="deliveryMethod"
                    value="postbox"
                    checked={deliveryMethod === 'postbox'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    label={
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <Text variant="body-2">У поштомат</Text>
                        <Text variant="body-2" className="text-indigo-600 font-semibold ml-4">
                          17 Жовтня, 0 ₴
                        </Text>
                      </div>
                    }
                    className="w-full"
                  />

                  {/* Кур'єр */}
                  <Radio
                    name="deliveryMethod"
                    value="courier"
                    checked={deliveryMethod === 'courier'}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    label={
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <Text variant="body-2">Кур'єр Нова пошта</Text>
                        <Text variant="body-2" className="text-indigo-600 font-semibold ml-4">
                          17 Жовтня, 0 ₴
                        </Text>
                      </div>
                    }
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Ukrposhta */}
            <div>
              <Radio
                name="deliveryService"
                value="ukrposhta"
                checked={deliveryService === 'ukrposhta'}
                onChange={(e) => setDeliveryService(e.target.value)}
                label={
                  <div className="flex items-center gap-2">
                    <img src="/icons/payment_delivery/ukrposhta.svg" alt="Укрпошта" className="h-6" />
                    <Text variant="body-1" className="font-semibold">
                      Укрпошта
                    </Text>
                  </div>
                }
              />
            </div>
          </div>

          <Button variant="contained" size="medium" onClick={onContinue}>
            Продовжити оформлення
          </Button>

          {showErrors && !isValid && (
            <Text variant="caption-1" className="text-red-500 mt-2">
              Оберіть спосіб доставки та заповніть всі необхідні поля
            </Text>
          )}
        </div>
      ) : isValid ? (
        <div className="mt-[10px]">
          <div className="flex items-center gap-2 mb-2">
            <img 
              src={deliveryService === 'novaposhta' 
                ? '/icons/payment_delivery/nova-poshta.svg' 
                : '/icons/payment_delivery/ukrposhta.svg'
              } 
              alt={deliveryService === 'novaposhta' ? 'Нова Пошта' : 'Укрпошта'} 
              className="h-5"
            />
            <Text variant="body-1" className="font-semibold">
              {deliveryService === 'novaposhta' ? 'Нова Пошта' : 'Укрпошта'}
            </Text>
            <Text variant="body-1" className="text-indigo-600 font-semibold ml-auto">
              17 Жовтня, 0 ₴
            </Text>
          </div>
          {deliveryService === 'novaposhta' && deliveryMethod === 'department' && selectedDepartment && (
            <Text variant="body-1">
              {selectedCity}, Відділення №{selectedDepartment}: {
                departmentOptions.find(opt => opt.value === selectedDepartment)?.label.split(': ')[1] || ''
              }
            </Text>
          )}
        </div>
      ) : null}
    </div>
  )
}

