import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Text, Input } from '@ui'
import UserProfileCard from '@components/user-profile-card'
import { cn } from '@lib/cn'
import { useAuth } from '@contexts'

interface ProfileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuItem {
  id: string
  label: string
  icon: string
  onClick?: string
}

const menuItems: MenuItem[] = [
  {
    id: 'orders',
    label: 'Мої замовлення',
    icon: '/icons/orders.svg',
    onClick: '/cabinet/orders',
  },
  {
    id: 'favorites',
    label: 'Обране',
    icon: '/icons/heart.svg',
    onClick: '/cabinet/favorites',
  },
  {
    id: 'settings',
    label: 'Налаштування',
    icon: '/icons/settings.svg',
    onClick: '/cabinet/settings',
  },
]

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const { user, isAuthenticated, requestAuthCode, verifyAuthCode, completeProfile, logout } = useAuth()
  const navigate = useNavigate()
  
  const [showLoginInput, setShowLoginInput] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [showCompleteProfile, setShowCompleteProfile] = useState(false)
  const [phone, setPhone] = useState('+380')
  const [phoneError, setPhoneError] = useState('')
  const [code, setCode] = useState(['', '', '', ''])
  const [codeError, setCodeError] = useState('')
  const [timer, setTimer] = useState(60) // 1 хвилина в секундах
  const [canResend, setCanResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Profile completion fields
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [secondNameError, setSecondNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')

  const formatPhoneNumber = (value: string) => {
    // Видаляємо все, крім цифр та +
    let cleaned = value.replace(/[^\d+]/g, '')
    
    // Якщо немає +380 на початку, додаємо
    if (!cleaned.startsWith('+380')) {
      cleaned = '+380' + cleaned.replace(/^\+?380?/, '')
    }
    
    // Обмежуємо до +380 + 9 цифр
    const digits = cleaned.replace(/^\+380/, '')
    if (digits.length > 9) {
      cleaned = '+380' + digits.slice(0, 9)
    }
    
    // Форматуємо: +380 XX XXX XX XX
    const digitsOnly = cleaned.replace(/^\+380/, '')
    if (digitsOnly.length === 0) {
      return '+380'
    }
    
    let formatted = '+380'
    if (digitsOnly.length > 0) {
      formatted += ' ' + digitsOnly.slice(0, 2)
    }
    if (digitsOnly.length > 2) {
      formatted += ' ' + digitsOnly.slice(2, 5)
    }
    if (digitsOnly.length > 5) {
      formatted += ' ' + digitsOnly.slice(5, 7)
    }
    if (digitsOnly.length > 7) {
      formatted += ' ' + digitsOnly.slice(7, 9)
    }
    
    return formatted
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
    // Скидаємо помилку при зміні телефону
    if (phoneError) {
      setPhoneError('')
    }
  }

  // Таймер зворотного відліку
  useEffect(() => {
    if (showCodeInput && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [showCodeInput, timer])

  // Скидаємо стан при закритті сайдбара
  useEffect(() => {
    if (!isOpen) {
      setShowLoginInput(false)
      setShowCodeInput(false)
      setShowCompleteProfile(false)
      setPhone('+380')
      setPhoneError('')
      setCode(['', '', '', ''])
      setCodeError('')
      setTimer(60)
      setCanResend(false)
      setError('')
      setFirstName('')
      setSecondName('')
      setLastName('')
      setEmail('')
      setFirstNameError('')
      setSecondNameError('')
      setLastNameError('')
      setEmailError('')
    }
  }, [isOpen])

  const validatePhone = (): boolean => {
    // Перевіряємо, чи введено більше ніж просто "+380"
    const digitsOnly = phone.replace(/[^\d]/g, '').replace(/^380/, '')
    if (digitsOnly.length < 9) {
      setPhoneError('Введіть номер телефону')
      return false
    }
    setPhoneError('')
    return true
  }

  const handleCodeChange = (index: number, value: string) => {
    // Дозволяємо тільки цифри
    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    // Скидаємо помилку при зміні коду
    if (codeError) {
      setCodeError('')
    }

    // Автоматично переходимо до наступного інпута
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-input-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace - переходимо до попереднього інпута
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleResendCode = async () => {
    setTimer(60)
    setCanResend(false)
    setCode(['', '', '', ''])
    setError('')
    setCodeError('')
    
    try {
      setLoading(true)
      const cleanPhone = phone.replace(/\s/g, '')
      await requestAuthCode(cleanPhone)
    } catch (err: any) {
      setError(err.message || 'Помилка відправки коду')
    } finally {
      setLoading(false)
    }
  }

  const handleSendCode = async () => {
    if (!validatePhone()) return
    
    setError('')
    try {
      setLoading(true)
      const cleanPhone = phone.replace(/\s/g, '')
      await requestAuthCode(cleanPhone)
      setShowCodeInput(true)
      setTimer(60)
      setCanResend(false)
    } catch (err: any) {
      setError(err.message || 'Помилка відправки коду')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!code.every((digit) => digit !== '')) {
      setCodeError('Введіть код повністю')
      return
    }
    
    setError('')
    setCodeError('')
    try {
      setLoading(true)
      const cleanPhone = phone.replace(/\s/g, '')
      const fullCode = code.join('')
      
      const result = await verifyAuthCode(cleanPhone, fullCode)
      
      if (result.status === 'PROFILE_INFO_REQUIRED') {
        setShowCompleteProfile(true)
        setShowCodeInput(false)
      } else if (result.status === 'SUCCESS') {
        // Successfully logged in
        onClose()
      } else if (result.status === 'INVALID_CODE') {
        setCodeError('Невірний код')
      }
    } catch (err: any) {
      setCodeError(err.message || 'Помилка перевірки коду')
    } finally {
      setLoading(false)
    }
  }

  const validateProfileForm = (): boolean => {
    let isValid = true
    
    if (!firstName.trim()) {
      setFirstNameError('Введіть ім\'я')
      isValid = false
    } else {
      setFirstNameError('')
    }
    
    if (!secondName.trim()) {
      setSecondNameError('Введіть по батькові')
      isValid = false
    } else {
      setSecondNameError('')
    }
    
    if (!lastName.trim()) {
      setLastNameError('Введіть прізвище')
      isValid = false
    } else {
      setLastNameError('')
    }
    
    if (!email.trim()) {
      setEmailError('Введіть email')
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Введіть коректний email')
      isValid = false
    } else {
      setEmailError('')
    }
    
    return isValid
  }

  const handleCompleteProfile = async () => {
    if (!validateProfileForm()) {
      return
    }
    
    setError('')
    try {
      setLoading(true)
      await completeProfile({
        firstName,
        secondName,
        lastName,
        email,
      })
      // Successfully completed profile
      onClose()
    } catch (err: any) {
      setError(err.message || 'Помилка завершення реєстрації')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()
    } catch (err: any) {
      setError(err.message || 'Помилка виходу')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Text variant="title-2" className="font-bold">
            {isAuthenticated ? 'Особистий кабінет' : 'Ви не авторизовані'}
          </Text>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Закрити"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isAuthenticated && user && (
            <div className="mb-6">
              <UserProfileCard user={user} />
            </div>
          )}

          {/* Menu Items */}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.onClick) {
                    navigate(item.onClick)
                    onClose()
                  }
                }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <img src={item.icon} alt={item.label} className="h-6 w-6" />
                <Text variant="body-1" className="font-medium">
                  {item.label}
                </Text>
              </button>
            ))}
          </div>
        </div>

        {/* Footer with Login Button */}
        <div className="p-6 border-t border-gray-200">
          {!isAuthenticated ? (
            <>
              {/* Error Message (for non-input specific errors) */}
              {error && !showCodeInput && !showCompleteProfile && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <Text variant="body-2" className="text-red-600">
                    {error}
                  </Text>
                </div>
              )}

              {/* Phone Input Stage */}
              <div
                className={cn(
                  'mb-4 transition-all duration-300 ease-out overflow-hidden',
                  showLoginInput && !showCodeInput && !showCompleteProfile
                    ? 'max-h-96 opacity-100 translate-y-0 pb-1'
                    : 'max-h-0 opacity-0 -translate-y-2'
                )}
              >
                <Text variant="title-1" className="font-medium mb-3">
                  Увійти або зареєструватись
                </Text>
                <div className="mb-3 space-y-1">
                  <Text variant="body-2" className="font-medium">
                    Ви зможете слідкувати за своїми замовленнями та отримувати унікальні пропозиції
                  </Text>
                </div>
                <Input
                  type="tel"
                  placeholder="Номер телефону"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  disabled={loading}
                />
              </div>

              {/* Code Input Stage */}
              <div
                className={cn(
                  'mb-4 transition-all duration-300 ease-out overflow-hidden',
                  showCodeInput
                    ? 'max-h-96 opacity-100 translate-y-0 pb-1'
                    : 'max-h-0 opacity-0 -translate-y-2'
                )}
              >
                <Text as="div" variant="title-1" className="font-medium mb-2">
                  Введіть код з SMS
                </Text>
                <Text as="div" variant="body-2" className="font-medium mb-4">
                  Код надіслано на номер <span className="text-indigo-600">{phone}</span>
                </Text>
                
                {/* 4 Code Inputs */}
                <div className="mb-1">
                  <div className="flex gap-2 justify-center">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        disabled={loading}
                        className={cn(
                          "w-12 h-12 text-center text-lg font-bold border rounded focus:outline-none transition-colors disabled:opacity-50",
                          codeError
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-500 focus:border-indigo-600"
                        )}
                      />
                    ))}
                  </div>
                  
                  {/* Error message under inputs */}
                  {codeError && (
                    <Text variant="caption-1" className="text-red-500 mt-2 text-center block">
                      {codeError}
                    </Text>
                  )}
                </div>

                {/* Timer and Resend */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {!canResend ? (
                    <Text variant="body-2">
                      Повторно відправити код через {formatTime(timer)}
                    </Text>
                  ) : (
                    <button
                      onClick={handleResendCode}
                      disabled={loading}
                      className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors disabled:opacity-50"
                    >
                      <Text variant="body-2" className="text-indigo-600">
                        Відправити код повторно
                      </Text>
                    </button>
                  )}
                </div>
              </div>

              {/* Complete Profile Stage */}
              <div
                className={cn(
                  'mb-4 transition-all duration-300 ease-out overflow-hidden',
                  showCompleteProfile
                    ? 'max-h-[600px] opacity-100 translate-y-0 pb-1'
                    : 'max-h-0 opacity-0 -translate-y-2'
                )}
              >
                <Text as="div" variant="title-1" className="font-medium mb-2">
                  Завершіть реєстрацію
                </Text>
                <Text as="div" variant="body-2" className="mb-4">
                  Заповніть ваші дані для завершення реєстрації
                </Text>
                
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Ім'я"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      if (firstNameError) setFirstNameError('')
                    }}
                    error={firstNameError}
                    disabled={loading}
                  />
                  <Input
                    type="text"
                    placeholder="По батькові"
                    value={secondName}
                    onChange={(e) => {
                      setSecondName(e.target.value)
                      if (secondNameError) setSecondNameError('')
                    }}
                    error={secondNameError}
                    disabled={loading}
                  />
                  <Input
                    type="text"
                    placeholder="Прізвище"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                      if (lastNameError) setLastNameError('')
                    }}
                    error={lastNameError}
                    disabled={loading}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError('')
                    }}
                    error={emailError}
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                variant="contained"
                size="medium"
                className="w-full"
                disabled={loading}
                onClick={() => {
                  if (showCompleteProfile) {
                    handleCompleteProfile()
                  } else if (!showLoginInput) {
                    setShowLoginInput(true)
                  } else if (!showCodeInput) {
                    handleSendCode()
                  } else {
                    handleVerifyCode()
                  }
                }}
              >
                {loading
                  ? 'Завантаження...'
                  : showCompleteProfile
                  ? 'Завершити реєстрацію'
                  : showCodeInput
                  ? 'Підтвердити'
                  : showLoginInput
                  ? 'Далі'
                  : 'Увійти або зареєструватись'}
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              size="medium"
              className="w-full"
              disabled={loading}
              onClick={handleLogout}
            >
              {loading ? 'Завантаження...' : 'Вийти'}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

