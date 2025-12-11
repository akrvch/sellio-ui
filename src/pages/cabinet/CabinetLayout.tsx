import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import BasePage from '@components/base-page'
import UserProfileCard from '@components/user-profile-card'
import { Text } from '@ui'
import { useAuth } from '@contexts'

interface MenuItem {
  id: string
  label: string
  icon: string
  path: string
}

const menuItems: MenuItem[] = [
  {
    id: 'orders',
    label: 'Мої замовлення',
    icon: '/icons/orders.svg',
    path: '/cabinet/orders',
  },
  {
    id: 'favorites',
    label: 'Обране',
    icon: '/icons/heart.svg',
    path: '/cabinet/favorites',
  },
  {
    id: 'settings',
    label: 'Налаштування профілю',
    icon: '/icons/settings.svg',
    path: '/cabinet/settings',
  },
]

export default function CabinetLayout() {
  const { user, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  // Redirect if not authenticated (but wait for loading to finish)
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, loading, navigate])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <BasePage>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Text variant="title-2" color="muted">Завантаження...</Text>
        </div>
      </BasePage>
    )
  }

  // Don't render if not authenticated
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <BasePage>
      <div className="py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left Sidebar Menu */}
          <aside className="space-y-2">
            {/* User Info */}
            <div className="mb-6">
              <UserProfileCard user={user} />
            </div>

            {/* Menu Items */}
            <nav className="bg-white rounded-lg border border-gray-200 p-2">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-brand-indigo-600'
                          : 'hover:bg-gray-50 text-brand-black'
                      }`
                    }
                  >
                    <img src={item.icon} alt={item.label} className="h-6 w-6" />
                    <Text variant="body-1" className="font-medium">
                      {item.label}
                    </Text>
                  </NavLink>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </BasePage>
  )
}

