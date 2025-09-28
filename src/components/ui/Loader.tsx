'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsVisible(false), 500)
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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
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