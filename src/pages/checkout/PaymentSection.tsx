import React from 'react'
import { Button, Text, Radio } from '@ui'

interface PaymentSectionProps {
  isOpen: boolean
  paymentType: string
  setPaymentType: (value: string) => void
  paymentMethod: string
  setPaymentMethod: (value: string) => void
  showErrors: boolean
  isValid: boolean
  onContinue: () => void
  onEdit: () => void
}

export default function PaymentSection({
  isOpen,
  paymentType,
  setPaymentType,
  paymentMethod,
  setPaymentMethod,
  showErrors,
  isValid,
  onContinue,
  onEdit,
}: PaymentSectionProps) {
  return (
    <div className={`rounded-lg bg-white ${isOpen ? 'border-2 border-indigo-600 p-6' : 'p-6'}`}>
      <div className={`flex items-center justify-between ${isOpen ? 'mb-6' : ''}`}>
        <Text variant="subtitle-1" className="font-bold">
          3. Спосіб оплати
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
          {/* Онлайн оплата */}
          <div className="space-y-4">
            <Radio
              name="paymentType"
              value="online"
              checked={paymentType === 'online'}
              onChange={(e) => setPaymentType(e.target.value)}
              label={
                <div className="flex items-center gap-2">
                  <img src="/icons/payment_delivery/online-payment.svg" alt="Онлайн оплата" className="h-6" />
                  <Text variant="body-1" className="font-semibold">
                    Онлайн оплата
                  </Text>
                </div>
              }
            />

            {paymentType === 'online' && (
              <div className="ml-8 space-y-3">
                {/* monobank */}
                <Radio
                  name="paymentMethod"
                  value="monobank"
                  checked={paymentMethod === 'monobank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label={
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <img src="/icons/payment_delivery/mastercard.svg" alt="Mastercard" className="h-6" />
                        <Text variant="body-2">monobank</Text>
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full">
                        <Text variant="body-2" className="text-gray-700">
                          •••• 1234
                        </Text>
                      </div>
                    </div>
                  }
                  className="w-full"
                />

                {/* privatbank */}
                <Radio
                  name="paymentMethod"
                  value="privatbank"
                  checked={paymentMethod === 'privatbank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label={
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <img src="/icons/payment_delivery/visa.svg" alt="Visa" className="h-6" />
                        <Text variant="body-2">privatbank</Text>
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full">
                        <Text variant="body-2" className="text-gray-700">
                          •••• 4588
                        </Text>
                      </div>
                    </div>
                  }
                  className="w-full"
                />

                {/* Додати картку */}
                <Radio
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label={<Text variant="body-2">Додати картку</Text>}
                  className="w-full"
                />

                {/* Google Pay */}
                <Radio
                  name="paymentMethod"
                  value="gpay"
                  checked={paymentMethod === 'gpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label={
                    <div className="flex items-center gap-2">
                      <Text variant="body-2">Купити з</Text>
                      <img src="/icons/payment_delivery/gpay.svg" alt="Google Pay" className="h-6" />
                    </div>
                  }
                  className="w-full"
                />

                {/* Apple Pay */}
                <Radio
                  name="paymentMethod"
                  value="applepay"
                  checked={paymentMethod === 'applepay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label={
                    <div className="flex items-center gap-2">
                      <Text variant="body-2">Купити з</Text>
                      <img src="/icons/payment_delivery/applepay.svg" alt="Apple Pay" className="h-6" />
                    </div>
                  }
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Післяплата */}
          <div>
            <Radio
              name="paymentType"
              value="postpay"
              checked={paymentType === 'postpay'}
              onChange={(e) => setPaymentType(e.target.value)}
              label={
                <div className="flex items-center gap-2">
                  <img src="/icons/payment_delivery/cash-on-delivery.svg" alt="Післяплата" className="h-6" />
                  <Text variant="body-1" className="font-semibold">
                    Післяплата
                  </Text>
                </div>
              }
            />
          </div>

          <Button variant="contained" size="medium" onClick={onContinue}>
            Продовжити оформлення
          </Button>

          {showErrors && !isValid && (
            <Text variant="caption-1" className="text-red-500 mt-2">
              Оберіть спосіб оплати
            </Text>
          )}
        </div>
      ) : isValid ? (
        <div className="mt-[10px]">
          {paymentType === 'online' && paymentMethod ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {paymentMethod === 'monobank' && (
                  <>
                    <img src="/icons/payment_delivery/mastercard.svg" alt="Mastercard" className="h-6" />
                    <Text variant="body-1">monobank</Text>
                  </>
                )}
                {paymentMethod === 'privatbank' && (
                  <>
                    <img src="/icons/payment_delivery/visa.svg" alt="Visa" className="h-6" />
                    <Text variant="body-1">privatbank</Text>
                  </>
                )}
                {paymentMethod === 'card' && (
                  <Text variant="body-1">Додати картку</Text>
                )}
                {paymentMethod === 'gpay' && (
                  <div className="flex items-center gap-2">
                    <Text variant="body-1">Купити з</Text>
                    <img src="/icons/payment_delivery/gpay.svg" alt="Google Pay" className="h-6" />
                  </div>
                )}
                {paymentMethod === 'applepay' && (
                  <div className="flex items-center gap-2">
                    <Text variant="body-1">Купити з</Text>
                    <img src="/icons/payment_delivery/applepay.svg" alt="Apple Pay" className="h-6" />
                  </div>
                )}
              </div>
              {(paymentMethod === 'monobank' || paymentMethod === 'privatbank') && (
                <Text variant="body-1">
                  {paymentMethod === 'monobank' ? '•••• 1234' : '•••• 4588'}
                </Text>
              )}
            </div>
          ) : (
            <Text variant="body-1">Післяплата</Text>
          )}
        </div>
      ) : null}
    </div>
  )
}

