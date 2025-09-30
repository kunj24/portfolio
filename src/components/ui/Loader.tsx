'use client'

import { useEffect, useState } from 'react'

const loadingSteps = [
  'Initializing...',
  'Loading assets...',
  'Preparing 3D scenes...',
  'Setting up animations...',
  'Finalizing...',
  'Ready!'
]

export default function Loader() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const hideLoader = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      sessionStorage.setItem('portfolio-loader-shown', 'true')
    }, 600)
  }

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
    setIsAnimating(true)
    
    // Keyboard shortcut to skip (Escape or Space)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault()
        hideLoader()
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    
    // Emergency exit after 10 seconds
    const emergencyExit = setTimeout(() => {
      console.log('Loader emergency exit triggered')
      hideLoader()
    }, 10000)
    
    // Simulate loading progress with steps
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2.5 // Faster progress
        
        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1))
        
        if (newProgress >= 100) {
          clearInterval(interval)
          clearTimeout(emergencyExit)
          document.removeEventListener('keydown', handleKeyPress)
          // Start exit animation
          setTimeout(() => {
            hideLoader()
          }, 500) // Shorter completion display
          return 100
        }
        return newProgress
      })
    }, 50) // Faster interval

    return () => {
      clearInterval(interval)
      clearTimeout(emergencyExit)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-[10000] backdrop-blur-sm bg-gradient-to-br from-background/95 via-card/90 to-background/95 flex items-center justify-center transition-all duration-800 ${
        isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
      }`}
      style={{ 
        pointerEvents: isAnimating ? 'auto' : 'none',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Interactive background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => {
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

          const size = Math.floor(r() * 3) + 1
          const left = `${Math.floor(r() * 100)}%`
          const top = `${Math.floor(r() * 100)}%`
          const animationDelay = `${(r() * 4).toFixed(6)}s`
          const animationDuration = `${(4 + r() * 3).toFixed(6)}s`
          const opacity = (0.1 + r() * 0.4).toFixed(2)

          return (
            <div
              key={i}
              className={`absolute bg-gradient-to-br from-primary/40 to-accent/40 rounded-full animate-float hover:scale-150 transition-transform cursor-pointer`}
              style={{
                width: `${size * 2}px`,
                height: `${size * 2}px`,
                left,
                top,
                animationDelay,
                animationDuration,
                opacity
              }}
              onClick={() => {
                // Interactive particle effect on click
                const el = document.createElement('div')
                el.className = 'fixed w-4 h-4 bg-primary/60 rounded-full pointer-events-none animate-ping'
                el.style.left = left
                el.style.top = top
                el.style.zIndex = '10001'
                document.body.appendChild(el)
                setTimeout(() => document.body.removeChild(el), 1000)
              }}
            />
          )
        })}
      </div>

      {/* Main loader content */}
      <div className={`relative z-10 text-center transition-all duration-500 ${isAnimating ? 'translate-y-0' : '-translate-y-8 opacity-0'}`}>
        {/* Interactive logo/name with hover effects */}
        <div className="mb-8 group">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 select-none leading-tight py-2">
            {['K', 'u', 'n', 'j', '•', 'M', 'u', 'n', 'g', 'a', 'l', 'p', 'a', 'r', 'a'].map((letter, index) => (
              <span 
                key={index}
                className={`inline-block animate-bounce hover:scale-125 hover:rotate-12 transition-transform cursor-pointer ${
                  index >= 4 ? 'gradient-text' : ''
                } ${index === 4 ? 'mx-3' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1.5s',
                  lineHeight: '1.2'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3) rotate(15deg)'
                  e.currentTarget.style.textShadow = '0 0 20px currentColor'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.textShadow = ''
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-muted-foreground animate-pulse group-hover:text-primary transition-colors duration-300">
            {loadingSteps[currentStep]}
          </p>
        </div>

        {/* Enhanced progress bar with glow effect */}
        <div className="w-80 mx-auto mb-6">
          <div className="relative">
            <div className="h-2 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div 
              className="absolute top-0 h-2 w-4 bg-white/50 rounded-full transition-all duration-300 ease-out"
              style={{ left: `calc(${progress}% - 8px)` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
            <p className="text-sm gradient-text font-medium">Loading Experience</p>
          </div>
        </div>
      </div>
    </div>
  )
}