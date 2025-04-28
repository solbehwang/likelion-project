"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Restaurant = {
  id: number
  name: string
  rating: number
  reviews: number
  distance: string
  category: string
  isOpen: boolean
  likes: number
  description: string
  image: string
}

interface FavoritesContextType {
  favorites: Restaurant[]
  addFavorite: (restaurant: Restaurant) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Restaurant[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e)
      }
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (restaurant: Restaurant) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === restaurant.id)) {
        return prev
      }
      return [...prev, restaurant]
    })
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((restaurant) => restaurant.id !== id))
  }

  const isFavorite = (id: number) => {
    return favorites.some((restaurant) => restaurant.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

