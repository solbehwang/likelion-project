"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useFavorites } from "../context/favorites-context"
import "../favorites.css"

// Sample restaurant data (in case there are no favorites)


export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const [displayRestaurants, setDisplayRestaurants] = useState<any[]>([])
  const [removingId, setRemovingId] = useState<number | null>(null)

  // Initialize display restaurants
  useEffect(() => {
    setDisplayRestaurants(favorites)
  }, [favorites])

  // Function to handle unfavoriting a restaurant
  const handleUnfavorite = (restaurant: any) => {
    // Set the removing ID to trigger animation
    setRemovingId(restaurant.id)

    // Wait for animation to complete before removing from state
    setTimeout(() => {
      // Remove from context
      removeFavorite(restaurant.id)

      // Remove from local state
      setDisplayRestaurants((prev) => prev.filter((r) => r.id !== restaurant.id))
      setRemovingId(null)
    }, 300)
  }

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star-filled">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star-half">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star-empty">
          ☆
        </span>,
      )
    }

    return stars
  }

  return (
    <div className="favorites-page">
      {/* Header */}
      <header className="favorites-header">
        <div className="header-container">
          <Link href="/home" className="logo-container">
            <Image src="/bapago-logo.png" alt="BAPAGO Logo" width={24} height={24} />
                        <Image src="/BAPAGO-text.png" alt="BAPAGO Text" width={120} height={24} />
          </Link>

          <nav className="main-nav">
            <Link href="/favorites" className="nav-link active">
              Favorites
            </Link>
            <Link href="#" className="nav-link">
              Customize
            </Link>
            <Link href="#" className="nav-link">
              Change view
            </Link>
            <Link href="#" className="nav-link">
              Profile
            </Link>
          </nav>

          <div className="social-icons">
            <Link href="#" aria-label="Facebook">
              <Image src="/facebook-icon.png" alt="Facebook" width={10} height={20} />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Image src="/twitter-icon.png" alt="Twitter" width={20} height={20} />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Image src="/instagram-icon.png" alt="Instagram" width={20} height={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="favorites-content">
        <div className="restaurant-list">
          {displayRestaurants.map((restaurant) => (
            <div key={restaurant.id} className={`restaurant-item ${removingId === restaurant.id ? "removing" : ""}`}>
              <div className="restaurant-image">
                <img src={restaurant.image || "/dish-image"} alt={restaurant.name} />
              </div>

              <div className="restaurant-info">
                <h2 className="restaurant-name">{restaurant.name}</h2>

                <div className="restaurant-rating">
                  <span className="rating-value">{restaurant.rating.toFixed(1)}</span>
                  <span className="rating-stars">{renderStars(restaurant.rating)}</span>
                  <span className="review-count">({restaurant.reviews})</span>
                  <span className="distance">{restaurant.distance}</span>
                </div>

                <div className="restaurant-category">{restaurant.category}</div>

                <div className="restaurant-status">
                  <div>Open</div>
                  <div>Order Online</div>
                </div>

                <div className="restaurant-tags">
                  <span className="tag">Offers Delivery</span>
                  <span className="tag">Takes Reservations</span>
                </div>
              </div>

              {/* View More link */}
              <Link href={`/restaurant/${restaurant.id}`} className="view-more-link">
                VIEW MORE <span className="arrow">→</span>
              </Link>

              {/* Favorite button - always filled since these are favorites */}
              <button
                className="favorite-button"
                onClick={() => handleUnfavorite(restaurant)}
                aria-label="Remove from favorites"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000" stroke="#000000" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          ))}

          {displayRestaurants.length === 0 && (
            <div className="empty-favorites">
              <h2>No favorites yet</h2>
              <p>Your favorite restaurants will appear here</p>
              <Link href="/home" className="browse-link">
                Browse Restaurants
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="favorites-footer">
        <div className="footer-links">
          <Link href="#">Help Center</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Cookie Policy</Link>
        </div>
      </footer>
    </div>
  )
}


