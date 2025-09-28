'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check if loader has already been shown in this session
    const hasShownLoader = sessionStorage.getItem('portfolio-loader-shown')
    
    if (hasShownLoader) {
      // Don't show loader if already shown in this session
      setIsVisible(false)
      return
    }

    // Show loader for first time in session
    setIsVisible(true)
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            // Mark loader as shown for this session
            sessionStorage.setItem('portfolio-loader-shown', 'true')
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-card to-background flex items-center justify-center">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Use a small seeded PRNG so server and client render the same values */}
        {[...Array(20)].map((_, i) => {
          // deterministic PRNG (mulberry32) so values match between server & client
          const mulberry32 = (seed: number) => {
            return () => {
              let t = (seed += 0x6d2b79f5)
              t = Math.imul(t ^ (t >>> 15), t | 1)
              t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
              return ((t ^ (t >>> 14)) >>> 0) / 4294967296
            }
          }

          const seedBase = 1337
          const r = mulberry32(seedBase + i)

          const left = `${Math.floor(r() * 100)}%`
          const top = `${Math.floor(r() * 100)}%`
          const animationDelay = `${(r() * 3).toFixed(6)}s`
          const animationDuration = `${(3 + r() * 2).toFixed(6)}s`

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
              style={{
                left,
                top,
                animationDelay,
                animationDuration
              }}
            />
          )
        })}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center">
        {/* Animated logo/name */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>K</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>u</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>n</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>j</span>
            <span className="inline-block mx-3 animate-bounce" style={{ animationDelay: '0.4s' }}>•</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '0.5s' }}>M</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '0.6s' }}>u</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '0.7s' }}>n</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '0.8s' }}>g</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '0.9s' }}>a</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '1.0s' }}>l</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '1.1s' }}>p</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '1.2s' }}>a</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '1.3s' }}>r</span>
            <span className="inline-block animate-bounce gradient-text" style={{ animationDelay: '1.4s' }}>a</span>
          </h1>
          <p className="text-muted-foreground animate-pulse">Crafting Digital Experiences</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto mb-4">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
        </div>

        {/* Spinning loader */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-2 border-transparent border-b-accent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
      </div>
    </div>
  )
}