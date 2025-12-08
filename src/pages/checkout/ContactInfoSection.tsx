import React from 'react'
import { Button, Text, Input } from '@ui'

interface ContactInfoSectionProps {
  isOpen: boolean
  phone: string
  setPhone: (value: string) => void
  lastName: string
  setLastName: (value: string) => void
  firstName: string
  setFirstName: (value: string) => void
  middleName: string
  setMiddleName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  receiveOtherPerson: boolean
  setReceiveOtherPerson: (value: boolean) => void
  showErrors: boolean
  isValid: boolean
  onContinue: () => void
  onEdit: () => void
}

export default function ContactInfoSection({
  isOpen,
  phone,
  setPhone,
  lastName,
  setLastName,
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  email,
  setEmail,
  receiveOtherPerson,
  setReceiveOtherPerson,
  showErrors,
  isValid,
  onContinue,
  onEdit,
}: ContactInfoSectionProps) {
  return (
    <div className={`rounded-lg bg-white ${isOpen ? 'border-2 border-indigo-600 p-6' : 'p-6'}`}>
      <div className={`flex items-center justify-between ${isOpen ? 'mb-6' : ''}`}>
        <Text variant="subtitle-1" className="font-bold">
          1. Контактна інформація
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
        <div className="space-y-4">
          {/* Phone, Last Name, First Name, Middle Name in grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Номер телефону
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 63 111 00 22"
                inputClassName={showErrors && !phone ? 'border-red-500' : ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Прізвище
              </label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Антонов"
                inputClassName={showErrors && !lastName ? 'border-red-500' : ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ім'я
              </label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Антон"
                inputClassName={showErrors && !firstName ? 'border-red-500' : ''}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                По батькові
              </label>
              <Input
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Антонович"
              />
              {showErrors && !isValid && (
                <Text variant="caption-1" className="text-red-500 mt-2">
                  Заповніть обов'язкові поля
                </Text>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="antonio777@gmail.com"
                inputClassName={showErrors && !email ? 'border-red-500' : ''}
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="receiveOtherPerson"
              checked={receiveOtherPerson}
              onChange={(e) => setReceiveOtherPerson(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="receiveOtherPerson" className="text-sm text-gray-700">
              Отримувати буде інша людина
            </label>
          </div>

          <Button variant="contained" size="medium" onClick={onContinue}>
            Продовжити оформлення
          </Button>
        </div>
      ) : isValid ? (
        <div className="mt-[10px]">
          <Text variant="body-1" className="mb-1">
            {lastName} {firstName} {middleName}
          </Text>
          <Text variant="body-1">
            {phone}
          </Text>
        </div>
      ) : null}
    </div>
  )
}

