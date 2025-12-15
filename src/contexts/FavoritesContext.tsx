import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'

const FAVORITES_COOKIE_KEY = 'favorites'
const FAVORITES_COOKIE_EXPIRY = 365 // days

// Типи
interface FavoritesContextType {
  favorites: string[] // Array of product IDs
  isFavorite: (productId: string) => boolean
  toggleFavorite: (productId: string) => void
  addFavorite: (productId: string) => void
  removeFavorite: (productId: string) => void
  clearFavorites: () => void
  favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from cookies on mount
  useEffect(() => {
    const savedFavorites = Cookies.get(FAVORITES_COOKIE_KEY)
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        if (Array.isArray(parsed)) {
          setFavorites(parsed)
        }
      } catch (error) {
        console.error('Failed to parse favorites from cookies:', error)
        // Clear invalid cookie
        Cookies.remove(FAVORITES_COOKIE_KEY)
      }
    }
  }, [])

  // Save favorites to cookies whenever they change
  useEffect(() => {
    if (favorites.length > 0) {
      Cookies.set(FAVORITES_COOKIE_KEY, JSON.stringify(favorites), {
        expires: FAVORITES_COOKIE_EXPIRY,
        sameSite: 'Lax',
      })
    } else {
      Cookies.remove(FAVORITES_COOKIE_KEY)
    }
  }, [favorites])

  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId)
  }

  const addFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev
      }
      return [...prev, productId]
    })
  }

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== productId))
  }

  const toggleFavorite = (productId: string) => {
    if (isFavorite(productId)) {
      removeFavorite(productId)
    } else {
      addFavorite(productId)
    }
  }

  const clearFavorites = () => {
    setFavorites([])
    Cookies.remove(FAVORITES_COOKIE_KEY)
  }

  const value: FavoritesContextType = {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

