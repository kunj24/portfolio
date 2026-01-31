'use client'

import { useCallback, useEffect, useState } from 'react'

const loadingSteps = [
  'System boot sequence...',
  'Loading core modules...',
  'Initializing interface...',
  'Connecting services...',
  'Ready to launch...',
  'Complete.'
]

// Generate random floating particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.3
  }))
}

// Generate matrix rain columns
const generateMatrixColumns = (count: number) => {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i / count) * 100,
    chars: Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]),
    speed: Math.random() * 3 + 2,
    delay: Math.random() * 5
  }))
}

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
    opacity: number
  }>>([])
  const [matrixColumns, setMatrixColumns] = useState<Array<{
    id: number
    x: number
    chars: string[]
    speed: number
    delay: number
  }>>([])
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on client-side
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate particles on client-side only to avoid hydration mismatch
  useEffect(() => {
    setParticles(generateParticles(isMobile ? 8 : 15))
    setMatrixColumns(generateMatrixColumns(isMobile ? 5 : 10))
  }, [isMobile])

  const hideLoader = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 700)
  }, [])

  // Lock scroll while loader is visible
  useEffect(() => {
    if (!isVisible) return

    const previousOverflow = document.body.style.overflow
    const previousPosition = document.body.style.position
    const previousWidth = document.body.style.width
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = '0'

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.position = previousPosition
      document.body.style.width = previousWidth
      document.body.style.top = ''
    }
  }, [isVisible])

  useEffect(() => {
    // Keyboard shortcut to skip (Escape or Space)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault()
        hideLoader()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    // Emergency exit in case something hangs
    const emergencyExit = setTimeout(() => {
      hideLoader()
    }, 12000)

    // Simulated loading progress with smooth easing
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = prev < 70 ? 2.8 : prev < 90 ? 1.2 : 0.5
        const next = Math.min(prev + increment, 100)

        const stepIndex = Math.floor((next / 100) * loadingSteps.length)
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1))

        if (next >= 100) {
          clearInterval(interval)
          clearTimeout(emergencyExit)
          setTimeout(() => {
            hideLoader()
          }, 500)
        }

        return next
      })
    }, 60)

    return () => {
      clearInterval(interval)
      clearTimeout(emergencyExit)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [hideLoader])

  if (!isVisible) return null

  return (
    <>
      <div
        className={`fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Darker background with theme colors for loading state */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#050a14] to-[#0a0e1a]">
          {/* Stronger focused glows for loading emphasis */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#2ee6c1]/25 blur-[80px] md:blur-[120px] animate-pulse-shift" />
            <div className="absolute bottom-[30%] right-[25%] w-[450px] h-[450px] rounded-full bg-[#ff4da6]/20 blur-[70px] md:blur-[110px] animate-pulse-shift" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2ee6c1]/15 blur-[90px] md:blur-[140px] animate-pulse-shift" style={{ animationDelay: '1s' }} />
          </div>

          {/* Animated scan lines */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(46, 230, 193, 0.03) 2px, rgba(46, 230, 193, 0.03) 4px)',
            animation: 'scan-lines 8s linear infinite'
          }} />

          {/* Hexagonal grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%232ee6c1' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Glitch effect particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 6 : 12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-glitch-float"
              style={{
                left: `${(i * 4) % 100}%`,
                top: `${(i * 6.5) % 100}%`,
                animationDelay: `${(i * 0.4) % 6}s`,
                animationDuration: `${12 + (i % 6)}s`,
              }}
            >
              <div 
                className="w-1 h-1 bg-[#2ee6c1]/70 rounded-full"
                style={{
                  boxShadow: '0 0 6px rgba(46, 230, 193, 0.8), 0 0 12px rgba(46, 230, 193, 0.4)'
                }}
              />
            </div>
          ))}
        </div>
        
        {/* DNA Helix effect */}
        <div className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
          <div className="relative h-64 w-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute w-full" style={{ top: `${i * 12.5}%` }}>
                <div 
                  className="w-3 h-3 rounded-full bg-[#2ee6c1] absolute"
                  style={{ 
                    left: '0%',
                    animation: `dna-helix-left 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: '0 0 10px rgba(46, 230, 193, 0.8)'
                  }}
                />
                <div 
                  className="w-3 h-3 rounded-full bg-[#ff4da6] absolute"
                  style={{ 
                    right: '0%',
                    animation: `dna-helix-right 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: '0 0 10px rgba(255, 77, 166, 0.8)'
                  }}
                />
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-[#2ee6c1] to-[#ff4da6]"
                  style={{ 
                    width: '100%',
                    animation: `dna-connector 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0.5
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* DNA Helix right side */}
        <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none">
          <div className="relative h-64 w-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute w-full" style={{ top: `${i * 12.5}%` }}>
                <div 
                  className="w-3 h-3 rounded-full bg-[#ff4da6] absolute"
                  style={{ 
                    left: '0%',
                    animation: `dna-helix-right 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: '0 0 10px rgba(255, 77, 166, 0.8)'
                  }}
                />
                <div 
                  className="w-3 h-3 rounded-full bg-[#2ee6c1] absolute"
                  style={{ 
                    right: '0%',
                    animation: `dna-helix-left 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: '0 0 10px rgba(46, 230, 193, 0.8)'
                  }}
                />
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-[#ff4da6] to-[#2ee6c1]"
                  style={{ 
                    width: '100%',
                    animation: `dna-connector 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0.5
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Floating animated particles system */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle, rgba(46, 230, 193, ${particle.opacity}) 0%, rgba(46, 230, 193, 0) 70%)`,
                animation: `float-particle ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 ${particle.size * 2}px rgba(46, 230, 193, ${particle.opacity * 0.8})`,
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            />
          ))}
        </div>

        {/* Matrix rain effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {matrixColumns.map((column) => (
            <div
              key={column.id}
              className="absolute top-0 flex flex-col text-[10px] font-mono leading-tight"
              style={{
                left: `${column.x}%`,
                animation: `matrix-fall ${column.speed}s linear infinite`,
                animationDelay: `${column.delay}s`,
                color: '#2ee6c1',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            >
              {column.chars.map((char, idx) => (
                <span
                  key={idx}
                  style={{
                    opacity: 1 - (idx * 0.12),
                    textShadow: `0 0 5px rgba(46, 230, 193, ${1 - (idx * 0.1)})`
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Connection lines between particles - desktop only */}
        {!isMobile && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
          {particles.map((particle, i) => {
            // Connect to only 1 nearest particle for performance
            const targetParticle = particles[i + 1]
            if (!targetParticle) return null
            
            const distance = Math.sqrt(
              Math.pow(particle.x - targetParticle.x, 2) + Math.pow(particle.y - targetParticle.y, 2)
            )
            // Only draw lines if particles are close enough
            if (distance < 30) {
              return (
                <line
                  key={`${particle.id}-${targetParticle.id}`}
                  x1={`${particle.x}%`}
                  y1={`${particle.y}%`}
                  x2={`${targetParticle.x}%`}
                  y2={`${targetParticle.y}%`}
                  stroke="#2ee6c1"
                  strokeWidth="0.5"
                  strokeOpacity={0.4 - (distance / 100)}
                />
              )
            }
            return null
          })}
        </svg>
        )}

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 max-w-3xl mx-auto min-h-screen">
          
          {/* Hexagonal logo container */}
          <div className="relative mb-6 sm:mb-12 md:mb-16">
            {/* Outer hexagon frame */}
            <div className="absolute inset-0 -m-12 sm:-m-16 opacity-40">
              <svg className="w-36 sm:w-48 h-36 sm:h-48 animate-rotate-slow" viewBox="0 0 100 100">
                <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="url(#hex-gradient-1)" strokeWidth="0.5" strokeDasharray="4 3" />
                <defs>
                  <linearGradient id="hex-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2ee6c1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff4da6" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Middle hexagon */}
            <div className="absolute inset-0 -m-8 sm:-m-10">
              <svg className="w-28 sm:w-36 h-28 sm:h-36 animate-rotate-reverse-slow" viewBox="0 0 100 100">
                <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#2ee6c1" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
              </svg>
            </div>

            {/* Core container */}
            <div className="relative group" style={{ perspective: '1000px' }}>
              {/* Enhanced glowing background with multiple layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2ee6c1]/30 to-[#ff4da6]/30 blur-3xl rounded-full scale-150 animate-pulse-glow-tech" />
              <div className="absolute inset-0 bg-gradient-to-tl from-[#ff4da6]/20 to-[#2ee6c1]/20 blur-2xl rounded-full scale-125 animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              {/* Main hexagonal shape with enhanced 3D rotation */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center animate-pulse-slow" style={{ animation: 'rotate-3d 10s ease-in-out infinite, float 3s ease-in-out infinite' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="hex-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2ee6c1" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#2ee6c1" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#ff4da6" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="url(#hex-fill)" stroke="url(#hex-gradient-1)" strokeWidth="2" />
                </svg>
                
                {/* Logo text with enhanced animation */}
                <span className="relative z-10 text-2xl sm:text-3xl font-black tracking-[0.2em] bg-gradient-to-br from-[#2ee6c1] via-white to-[#ff4da6] bg-clip-text text-transparent animate-pulse-slow" style={{ 
                  filter: 'drop-shadow(0 0 20px rgba(46,230,193,0.7)) drop-shadow(0 0 40px rgba(255,77,166,0.4))',
                  animation: 'text-glow 2s ease-in-out infinite'
                }}>
                  KM
                </span>

                {/* Corner indicators */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-1 h-3 bg-gradient-to-b from-[#2ee6c1] to-transparent animate-pulse-tech" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-1 h-3 bg-gradient-to-t from-[#ff4da6] to-transparent animate-pulse-tech" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Orbital rings with enhanced animation */}
            <div className="absolute inset-0 -m-6 sm:-m-8 animate-orbit">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#2ee6c1] shadow-[0_0_15px_rgba(46,230,193,1),0_0_25px_rgba(46,230,193,0.6)] animate-pulse-slow" />
            </div>
            <div className="absolute inset-0 -m-6 sm:-m-8 animate-orbit-reverse" style={{ animationDelay: '1s' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ff4da6] shadow-[0_0_15px_rgba(255,77,166,1),0_0_25px_rgba(255,77,166,0.6)] animate-pulse-slow" />
            </div>
            {/* Additional spinning rings */}
            <div className="absolute inset-0 -m-10 sm:-m-12 opacity-30">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2ee6c1" strokeWidth="0.5" strokeDasharray="10 5" opacity="0.5" />
              </svg>
            </div>
            <div className="absolute inset-0 -m-14 sm:-m-16 opacity-20">
              <svg className="w-full h-full" style={{ animation: 'spin 15s linear infinite reverse' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="#ff4da6" strokeWidth="0.5" strokeDasharray="5 10" opacity="0.4" />
              </svg>
            </div>
            
            {/* New: Electric arc rings */}
            <div className="absolute inset-0 -m-6 sm:-m-8 opacity-60">
              <svg className="w-full h-full" style={{ animation: 'spin 3s linear infinite' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="url(#electric-gradient)" strokeWidth="2" strokeDasharray="3 8 15 8" opacity="0.8" />
                <defs>
                  <linearGradient id="electric-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2ee6c1" stopOpacity="1" />
                    <stop offset="50%" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff4da6" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 -m-4 sm:-m-5 opacity-50">
              <svg className="w-full h-full" style={{ animation: 'spin 2s linear infinite reverse' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#2ee6c1" strokeWidth="1.5" strokeDasharray="2 5 10 5" opacity="0.9" />
              </svg>
            </div>
            
            {/* New: Pulsing energy waves */}
            <div className="absolute inset-0 -m-2 sm:-m-3">
              <div className="absolute inset-0 rounded-full border-2 border-[#2ee6c1]/40 animate-ping" style={{ animationDuration: '2s' }} />
            </div>
            <div className="absolute inset-0 -m-4 sm:-m-5">
              <div className="absolute inset-0 rounded-full border border-[#ff4da6]/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
            </div>
            <div className="absolute inset-0 -m-6 sm:-m-7">
              <div className="absolute inset-0 rounded-full border border-[#2ee6c1]/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            </div>

            {/* Sound wave visualization */}
            <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 flex items-end gap-0.5 sm:gap-1 h-6 sm:h-8">
              {[...Array(isMobile ? 7 : 11)].map((_, i) => {
                const centerIndex = isMobile ? 3 : 5
                const isCenter = i === centerIndex
                const distanceFromCenter = Math.abs(i - centerIndex)
                const baseHeight = isCenter ? 100 : 70 - (distanceFromCenter * 10)
                const delay = i * 0.1
                
                return (
                  <div
                    key={i}
                    className="w-1 rounded-full transition-all duration-300"
                    style={{
                      height: `${(baseHeight * progress) / 100}%`,
                      background: `linear-gradient(to top, #2ee6c1, #ff4da6)`,
                      animation: `sound-wave 0.6s ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                      boxShadow: `0 0 8px rgba(46, 230, 193, 0.6), 0 0 4px rgba(255, 77, 166, 0.4)`,
                      opacity: 0.7 + (progress / 200)
                    }}
                  />
                )
              })}
            </div>
          </div>

          {/* Title section with tech brackets */}
          <div className="relative text-center mb-6 sm:mb-10 md:mb-12">
            {/* Decorative tech brackets */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden sm:block">
              <div className="flex flex-col gap-1 text-[#2ee6c1]/50">
                <div className="text-xl font-mono">[</div>
                <div className="text-xl font-mono">[</div>
              </div>
            </div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden sm:block">
              <div className="flex flex-col gap-1 text-[#2ee6c1]/50">
                <div className="text-xl font-mono">]</div>
                <div className="text-xl font-mono">]</div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight">
                <span className="inline-block bg-gradient-to-r from-[#2ee6c1] via-white to-[#ff4da6] bg-clip-text text-transparent animate-text-glow bg-[length:200%_auto] filter drop-shadow-[0_0_20px_rgba(46,230,193,0.3)]">
                  KUNJ MUNGALPARA
                </span>
              </h1>
              
              <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#2ee6c1]/70 font-mono">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#2ee6c1]/50" />
                <span className="animate-pulse-slow-tech">PORTFOLIO SYSTEM</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#2ee6c1]/50" />
              </div>
            </div>
          </div>

          {/* Progress section */}
          <div className="w-full max-w-xl">
            {/* Status header */}
            <div className="flex items-center justify-between mb-5 text-[11px] sm:text-xs text-[#2ee6c1]/60 font-mono uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#2ee6c1] animate-ping absolute" />
                  <div className="w-2 h-2 rounded-full bg-[#2ee6c1] relative" />
                </div>
                <span className="text-[#2ee6c1]/80">{loadingSteps[currentStep]}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Tech progress bar container */}
            <div className="relative">
              {/* Outer frame */}
              <div className="absolute -inset-2 border border-[#2ee6c1]/20 rounded bg-[#2ee6c1]/5 backdrop-blur-sm" />
              
              {/* Progress bar */}
              <div className="relative h-4 sm:h-5 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 rounded border border-[#2ee6c1]/30 overflow-hidden">
                {/* Background segments */}
                <div className="absolute inset-0 flex">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex-1 border-r border-[#2ee6c1]/20" />
                  ))}
                </div>

                {/* Glow trail */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[#2ee6c1]/10 via-[#2ee6c1]/20 to-[#ff4da6]/10 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />

                {/* Main progress fill */}
                <div 
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="h-full bg-gradient-to-r from-[#2ee6c1] via-[#2ee6c1] to-[#ff4da6]">
                    {/* Top shine */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                    {/* Animated scan */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-scan-tech" />
                  </div>
                </div>

                {/* Leading edge particles */}
                <div 
                  className="absolute inset-y-0 w-20 transition-all duration-500"
                  style={{ 
                    left: `${Math.max(0, progress - 10)}%`,
                    background: 'linear-gradient(90deg, transparent, rgba(46, 230, 193, 0.4), rgba(255, 77, 166, 0.6))',
                    filter: 'blur(10px)'
                  }}
                />

                {/* Percentage readout */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
                  style={{ left: `${progress}%` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#2ee6c1] blur-lg opacity-70 rounded" />
                    <div className="relative px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#2ee6c1] to-[#ff4da6] rounded border border-[#2ee6c1]/50 shadow-lg">
                      <span className="text-[10px] sm:text-xs font-bold text-white font-mono tracking-wider">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#2ee6c1]/60 animate-pulse-tech" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#2ee6c1]/60 animate-pulse-tech" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#ff4da6]/60 animate-pulse-tech" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#ff4da6]/60 animate-pulse-tech" style={{ animationDelay: '1.5s' }} />
            </div>

            {/* Stage indicators */}
            <div className="mt-5 sm:mt-8 flex justify-between items-center gap-1 sm:gap-0">
              {loadingSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 sm:gap-2">
                  <div 
                    className={`relative transition-all duration-500 ${
                      idx <= currentStep ? 'scale-100' : 'scale-75'
                    }`}
                  >
                    {idx <= currentStep && (
                      <div className="absolute inset-0 bg-[#2ee6c1] blur-sm sm:blur-md animate-pulse" />
                    )}
                    <div 
                      className={`relative w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-sm rotate-45 transition-all duration-500 ${
                        idx <= currentStep 
                          ? 'bg-gradient-to-br from-[#2ee6c1] to-[#ff4da6] shadow-[0_0_8px_rgba(46,230,193,0.8)]' 
                          : 'bg-slate-700/40 border border-slate-600/30'
                      }`}
                    />
                  </div>
                  {idx < loadingSteps.length - 1 && (
                    <div className={`h-px w-4 sm:w-8 md:w-12 transition-all duration-500 ${
                      idx < currentStep ? 'bg-gradient-to-r from-[#2ee6c1]/80 to-[#ff4da6]/60' : 'bg-slate-700/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom info */}
          <div className="mt-6 sm:mt-10 md:mt-14 flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] md:text-xs text-[#2ee6c1]/40 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono flex-wrap justify-center">
            <span className="hidden sm:inline">System loading</span>
            <div className="h-px w-6 sm:w-8 bg-[#2ee6c1]/30" />
            <span>Press <span className="text-[#2ee6c1] font-semibold">ESC</span> to skip</span>
            <div className="h-px w-6 sm:w-8 bg-[#2ee6c1]/30" />
            <span className="hidden sm:inline">v1.0</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-shift {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes scan-lines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        @keyframes glitch-float {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          25% { transform: translate(15px, -30px); opacity: 0.8; }
          50% { transform: translate(-10px, -60px); opacity: 1; }
          75% { transform: translate(-20px, -30px); opacity: 0.8; }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-glow-tech {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-tech {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes pulse-slow-tech {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes text-glow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scan-tech {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-pulse-shift {
          animation: pulse-shift 6s ease-in-out infinite;
        }
        .animate-glitch-float {
          animation: glitch-float 18s ease-in-out infinite;
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        .animate-rotate-reverse-slow {
          animation: rotate-reverse-slow 15s linear infinite;
        }
        .animate-pulse-glow-tech {
          animation: pulse-glow-tech 4s ease-in-out infinite;
        }
        .animate-pulse-tech {
          animation: pulse-tech 2s ease-in-out infinite;
        }
        .animate-pulse-slow-tech {
          animation: pulse-slow-tech 3s ease-in-out infinite;
        }
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 6s linear infinite;
        }
        .animate-text-glow {
          animation: text-glow 5s ease-in-out infinite;
        }
        .animate-scan-tech {
          animation: scan-tech 2.5s ease-in-out infinite;
        }

        @keyframes float-particle {
          0%, 100% { 
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }
          25% { 
            transform: translate3d(10px, -15px, 0);
            opacity: 0.8;
          }
          50% { 
            transform: translate3d(-8px, -25px, 0);
            opacity: 0.5;
          }
          75% { 
            transform: translate3d(-15px, -10px, 0);
            opacity: 0.7;
          }
        }

        @keyframes rotate-3d {
          0%, 100% { 
            transform: rotateY(0deg) rotateX(0deg) translateZ(0);
          }
          25% { 
            transform: rotateY(15deg) rotateX(-5deg) translateZ(0);
          }
          50% { 
            transform: rotateY(0deg) rotateX(10deg) translateZ(0);
          }
          75% { 
            transform: rotateY(-15deg) rotateX(-5deg) translateZ(0);
          }
        }

        @keyframes text-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 20px rgba(46,230,193,0.7)) drop-shadow(0 0 40px rgba(255,77,166,0.4));
          }
          50% { 
            filter: drop-shadow(0 0 30px rgba(46,230,193,1)) drop-shadow(0 0 50px rgba(255,77,166,0.6));
          }
        }

        @keyframes sound-wave {
          0%, 100% { 
            transform: scaleY(0.6);
          }
          50% { 
            transform: scaleY(1);
          }
        }

        @keyframes matrix-fall {
          0% { 
            transform: translateY(-100%);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes pulse-line {
          0%, 100% { 
            stroke-opacity: 0.2;
          }
          50% { 
            stroke-opacity: 0.5;
          }
        }

        @keyframes pulse-shift {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }

        @keyframes scan-lines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @keyframes glitch-float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-10px, -20px); }
          66% { transform: translate(10px, -10px); }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotate-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes pulse-glow-tech {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes pulse-tech {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes pulse-slow-tech {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes text-glow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes scan-tech {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes dna-helix-left {
          0%, 100% { transform: translateX(0) scale(1); }
          50% { transform: translateX(20px) scale(0.6); }
        }
        
        @keyframes dna-helix-right {
          0%, 100% { transform: translateX(0) scale(0.6); }
          50% { transform: translateX(-20px) scale(1); }
        }
        
        @keyframes dna-connector {
          0%, 100% { transform: translateX(-50%) translateY(-50%) scaleX(0.3); opacity: 0.3; }
          50% { transform: translateX(-50%) translateY(-50%) scaleX(1); opacity: 0.8; }
        }
      `}</style>
    </>
  )
}
