"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useFavorites } from "../context/favorites-context"
import "../restaurant-card.css"

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Business Name",
    rating: 4.0,
    reviews: 292,
    distance: "2.4km",
    category: "Category",
    isOpen: true,
    likes: 500,
    description: "Description about the restaurant",
    image: "/dish-image.png",
  },
  {
    id: 2,
    name: "Pasta Palace",
    rating: 4.5,
    reviews: 348,
    distance: "1.8km",
    category: "Italian",
    isOpen: true,
    likes: 723,
    description: "Authentic Italian pasta and pizza",
    //image: "/burger-dish.png",
  },
  {
    id: 3,
    name: "Sushi Sensation",
    rating: 4.7,
    reviews: 512,
    distance: "3.2km",
    category: "Japanese",
    isOpen: true,
    likes: 892,
    description: "Fresh sushi and Japanese cuisine",
    //image: "/salad-dish.png",
  },
]

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? restaurants.length - 1 : current - 1))
  }

  const goToNext = () => {
    setActiveIndex((current) => (current === restaurants.length - 1 ? 0 : current + 1))
  }

  const toggleFavorite = (restaurant: (typeof restaurants)[0]) => {
    if (isFavorite(restaurant.id)) {
      removeFavorite(restaurant.id)
    } else {
      addFavorite(restaurant)
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="container header-container">
          <Link href="/home" className="logo-container">
            <Image src="/bapago-logo.png" alt="BAPAGO Logo" width={24} height={24} />
            <Image src="/BAPAGO-text.png" alt="BAPAGO Text" width={120} height={24} />
          </Link>

          <nav className="main-nav">
            <Link href="/favorites" className="nav-link">
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
              <Image className="facebook-icon" src="/facebook-icon.png" alt="Facebook" width={20} height={20} />
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
      <main className="main-content">
        <div className="carousel-container">
          {/* Carousel Container */}
          <div className="carousel-wrapper">
            {/* Previous Card (Just a thin slice) */}
            {restaurants.length > 1 && (
              <div className="prev-card-slice">
                <div className="prev-card-edge"></div>
              </div>
            )}

            {/* Active Card */}
            <div className="active-card">
              <div className="card">
                <div className="card-content">
                  {/* Left Content */}
                  <div className="card-left">
                    <div>
                      <div className="like-button-container">
                        <button className="like-button">
                          <Image src="/Heart.png" alt="Heart" width={20} height={20} />
                          <span>{restaurants[activeIndex].likes}</span>
                        </button>
                      </div>

                      <h1 className="business-name">{restaurants[activeIndex].name}</h1>

                      <div className="rating-container">
                        <div className="rating">
                          <span className="rating-value">{restaurants[activeIndex].rating}</span>
                          <div className="stars">
                            {/* Using CSS stars instead of images */}
                            <span className="star-icon filled">★</span>
                            <span className="star-icon filled">★</span>
                            <span className="star-icon filled">★</span>
                            <span className="star-icon filled">★</span>
                            <span className="star-icon empty">☆</span>
                          </div>
                          <span className="reviews-count">({restaurants[activeIndex].reviews})</span>
                        </div>
                        <span className="distance">{restaurants[activeIndex].distance}</span>
                      </div>

                      <div className="category">{restaurants[activeIndex].category}</div>

                      <div className="status">{restaurants[activeIndex].isOpen ? "Open" : "Closed"}</div>
                      <div className="order-online">Order Online</div>

                      <div className="tags">
                        <span className="tag">Offers Delivery</span>
                        <span className="tag">Takes Reservations</span>
                      </div>

                      <p className="description">{restaurants[activeIndex].description}</p>
                    </div>

                    <button className="view-more-button">
                      View More...
                      <span className="circle-arrow">⟶</span>
                    </button>
                  </div>

                  {/* Right Content - Image */}
                  <div className="card-right">
                    <img
                      src={restaurants[activeIndex].image || "/dish-image.png"}
                      alt="Food dish"
                      className="food-image"
                    />
                    <button className="favorite-button" onClick={() => toggleFavorite(restaurants[activeIndex])}>
                      <Image
                        src={isFavorite(restaurants[activeIndex].id) ? "/Heart.png" : "/gray-heart.png"}
                        alt={isFavorite(restaurants[activeIndex].id) ? "Remove from favorites" : "Add to favorites"}
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Card (Just a thin slice) */}
            {restaurants.length > 1 && (
              <div className="next-card-slice">
                <div className="next-card-edge"></div>
              </div>
            )}
          </div>

          {/* Left Arrow */}
          <button onClick={goToPrevious} className="nav-arrow nav-arrow-left">
            <span className="chevron">❮</span>
          </button>

          {/* Right Arrow */}
          <button onClick={goToNext} className="nav-arrow nav-arrow-right">
            <span className="chevron">❯</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
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

