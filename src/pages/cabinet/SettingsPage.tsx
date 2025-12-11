import React, { useState, useEffect } from 'react'
import { Text, Input, Button } from '@ui'
import { useAuth } from '@contexts'

export default function SettingsPage() {
  const { user, updateProfile, refetchUser } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Error states
  const [firstNameError, setFirstNameError] = useState('')
  const [secondNameError, setSecondNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '')
      setSecondName(user.secondName || '')
      setLastName(user.lastName || '')
      setEmail(user.email || '')
      setPhone(user.phone || '')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setFirstNameError('')
    setSecondNameError('')
    setLastNameError('')
    setEmailError('')
    setLoading(true)
    setSuccess(false)

    try {
      const result = await updateProfile({
        firstName: firstName.trim(),
        secondName: secondName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      })
      
      if (result.status === 'SUCCESS') {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else if (result.status === 'ERROR' && result.missingFields) {
        // Handle missing fields errors
        result.missingFields.forEach((field: string) => {
          switch (field) {
            case 'firstName':
              setFirstNameError('Поле не може бути пустим')
              break
            case 'secondName':
              setSecondNameError('Поле не може бути пустим')
              break
            case 'lastName':
              setLastNameError('Поле не може бути пустим')
              break
            case 'email':
              setEmailError('Поле не може бути пустим')
              break
          }
        })
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error)
      // Set general error if needed
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <Text as="h1" variant="large-title-3" className="mb-8">
        Налаштування профілю
      </Text>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Account Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Text as="h2" variant="title-2" className="mb-6">
            Ваш обліковий запис
          </Text>

          {/* Phone (read-only) */}
          <div className="mb-5">
            <Text variant="body-2" className="mb-2 font-medium">
              Номер телефону (логін)
            </Text>
            <Input
              type="tel"
              value={phone}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Text variant="body-2" className="mb-2 font-medium">
                Прізвище
              </Text>
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
            </div>
            <div>
              <Text variant="body-2" className="mb-2 font-medium">
                Ім'я
              </Text>
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
            </div>
            <div>
              <Text variant="body-2" className="mb-2 font-medium">
                По батькові
              </Text>
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
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Text as="h2" variant="title-2" className="mb-6">
            Контактні дані
          </Text>

          <div className="flex items-center gap-3">
            <div className="flex-1">
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
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.25 5L7.5 13.75L3.75 10" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            variant="contained"
            size="medium"
            disabled={loading}
          >
            {loading ? 'Збереження...' : 'Зберегти зміни'}
          </Button>

          {success && (
            <Text variant="body-2" className="text-green-600">
              ✓ Зміни збережено
            </Text>
          )}
        </div>
      </form>
    </div>
  )
}

