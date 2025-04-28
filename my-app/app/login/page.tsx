"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import "../login.css"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showSignup, setShowSignup] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // This would normally authenticate the user
    // For now, we'll just log the credentials
    console.log("Login attempt with:", email, password)
  }

  const handleContinueAsGuest = () => {
    router.push("/home")
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Show success message
    setSignupSuccess(true)

    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setSignupSuccess(false)
      setShowSignup(false)
      setSignupData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      })
    }, 3000)
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-logo-container">
          <Image className="login-logo" src="/bapago-logo.png" alt="BAPAGO Logo" width={24} height={24} />
          <Image src="/BAPAGO-text.png" alt="BAPAGO Logo" width={120} height={100} />
        </div>

        <div className="login-header">
          <h1>Log in</h1>
          <p>To access your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <label htmlFor="email">Email or mobile phone number</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="login-input-group">
            <div className="password-label-container">
              <label htmlFor="password">Password</label>
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Hide"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <Link href="/forgot-password">I forgot my password</Link>
          </div>

          <button type="submit" className="login-button">
            Log in
          </button>
        </form>

        <div className="account-options">
          <p>Don't have an account?</p>
          <button onClick={() => setShowSignup(true)} className="create-account-button">
            Create an account
          </button>
          <button onClick={handleContinueAsGuest} className="guest-button">
            Continue as guest
          </button>
        </div>
      </div>

      <div className="login-image-container">
        <Image src="/login-image.png" alt="Restaurant interior" fill style={{ objectFit: "cover" }} priority />
      </div>

      {/* Floating Signup Modal */}
      {showSignup && (
        <div className="signup-overlay">
          <div className="signup-modal">
            <button className="close-button" onClick={() => setShowSignup(false)}>
              ×
            </button>

            {signupSuccess ? (
              <div className="signup-success">
                <div className="success-icon">✓</div>
                <h2>Account Created Successfully!</h2>
                <p>You can now log in with your new account.</p>
              </div>
            ) : (
              <>
                <div className="signup-header">
                  <h2>Create an Account</h2>
                  <p>Join BAPAGO to discover great restaurants</p>
                </div>

                <form onSubmit={handleSignupSubmit} className="signup-form">
                  <div className="signup-input-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={signupData.fullName}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="signup-input-group">
                    <label htmlFor="signupEmail">Email</label>
                    <input
                      type="email"
                      id="signupEmail"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="signup-input-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={signupData.phone}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="signup-input-group">
                    <label htmlFor="signupPassword">Password</label>
                    <input
                      type="password"
                      id="signupPassword"
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="signup-input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <button type="submit" className="signup-button">
                    Finish
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


