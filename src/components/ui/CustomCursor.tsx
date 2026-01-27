'use client'

import { useEffect, useState } from 'react'

interface CustomCursorProps {
  variant?: 'none' | 'default' | 'neon' | 'particle' | 'magnetic' | 'morphing' | 'geometric' | 'liquid'
}

export default function CustomCursor({ variant = 'none' }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])  
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number; opacity: number }>>([])  
  const [trailId, setTrailId] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [tapRipples, setTapRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [particleIdCounter, setParticleIdCounter] = useState(0)

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      return ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || false
    }
    setIsTouchDevice(Boolean(checkTouchDevice()))
  }, [])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY }
      setMousePosition(newPos)

      // Add trail for particle and liquid variants
      if (variant === 'particle' || variant === 'liquid') {
        setTrailId(prev => {
          const newId = prev + 1
          const newTrailPoint = { x: newPos.x, y: newPos.y, id: newId }
          setTrail(prevTrail => [...prevTrail.slice(-8), newTrailPoint])
          return newId
        })
      }

      // Add particles for particle variant
      if (variant === 'particle' && Math.random() < 0.3) {
        setParticleIdCounter(prev => {
          const newId = prev + 1
          const newParticle = { 
            x: newPos.x + (Math.random() - 0.5) * 30, 
            y: newPos.y + (Math.random() - 0.5) * 30, 
            id: Date.now() + Math.random(), 
            opacity: 1 
          }
          setParticles(prevParticles => [...prevParticles, newParticle])
          return newId
        })
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           !!target.closest('a') || 
                           !!target.closest('button') ||
                           target.style.cursor === 'pointer' ||
                           target.classList.contains('cursor-pointer') ||
                           target.hasAttribute('href') ||
                           target.getAttribute('role') === 'button'
      
      setIsHovering(isInteractive)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Touch support: create ripple and approximate pointer
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      setMousePosition({ x: touch.clientX, y: touch.clientY })
      setParticleIdCounter(prev => {
        const newId = prev + 1
        setTapRipples(prevRipples => [...prevRipples, { x: touch.clientX, y: touch.clientY, id: newId }])
        return newId
      })
      setIsClicking(true)
    }
    const handleTouchEnd = () => setIsClicking(false)

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd)

    // Hide default cursor only for custom variants and non-touch devices
    if (variant !== 'none' && !isTouchDevice) {
      document.body.style.cursor = 'none'
      document.body.classList.add('custom-cursor-active')
    } else {
      document.body.style.cursor = ''
      document.body.classList.remove('custom-cursor-active')
    }

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.body.style.cursor = ''
      document.body.classList.remove('custom-cursor-active')
    }
  }, [variant, trailId, isTouchDevice])

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 1000))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Clean up old tap ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setTapRipples(prev => prev.filter(r => Date.now() - r.id < 600))
    }, 120)
    return () => clearInterval(interval)
  }, [])

  const renderCursor = () => {
    // Don't render anything for 'none' variant
    if (variant === 'none') {
      return null
    }
    // Touch devices: show only ripple feedback & minimal indicator
    if (isTouchDevice) {
      return (
        <>
          {tapRipples.map(r => (
            <div
              key={r.id}
              className="fixed pointer-events-none z-[9996] rounded-full"
              style={{
                left: r.x - 40,
                top: r.y - 40,
                width: 80,
                height: 80,
                background: 'radial-gradient(circle, rgba(var(--primary-rgb),0.35) 0%, rgba(var(--primary-rgb),0) 70%)',
                animation: 'cursor-glow 0.8s ease-out',
              }}
            />
          ))}
        </>
      )
    }

    switch (variant) {
      case 'neon':
        return (
          <>
            {isHovering ? (
              <div className="cursor-neon-pointer" style={{ 
                left: `${mousePosition.x}px`, 
                top: `${mousePosition.y}px`,
                transform: `translate(-20%, -10%) scale(${isClicking ? 0.8 : 1})`
              }} />
            ) : (
              <>
                <div className="cursor-neon-outer" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} />
                <div className="cursor-neon-inner" style={{ 
                  left: `${mousePosition.x}px`, 
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`
                }} />
                <div className="cursor-neon-glow" style={{ 
                  left: `${mousePosition.x}px`, 
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`
                }} />
              </>
            )}
          </>
        )

      case 'particle':
        return (
          <>
            {isHovering ? (
              <div className="custom-cursor-pointer" style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: `translate(-20%, -10%) scale(${isClicking ? 0.8 : 1})`,
              }} />
            ) : (
              <>
                <div className="cursor-particle-center" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} />
                {particles.map(particle => (
                  <div
                    key={particle.id}
                    className="cursor-particle"
                    style={{
                      left: `${particle.x}px`,
                      top: `${particle.y}px`,
                      opacity: Math.max(0, 1 - (Date.now() - particle.id) / 1000)
                    }}
                  />
                ))}
                {trail.map((point, index) => (
                  <div
                    key={`trail-point-${index}-${point.id}`}
                    className="cursor-trail-point"
                    style={{
                      left: `${point.x}px`,
                      top: `${point.y}px`,
                      opacity: (index + 1) / trail.length * 0.5
                    }}
                  />
                ))}
              </>
            )}
          </>
        )

      case 'magnetic':
        return (
          <>
            {isHovering ? (
              <div className="custom-cursor-pointer" style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: `translate(-20%, -10%) scale(${isClicking ? 0.8 : 1})`,
              }} />
            ) : (
              <>
                <div className="cursor-magnetic-outer" style={{ 
                  left: `${mousePosition.x}px`, 
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1}) rotate(${Date.now() / 50}deg)`
                }} />
                <div className="cursor-magnetic-inner" style={{ 
                  left: `${mousePosition.x}px`, 
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) scale(${isClicking ? 0.3 : 1})`
                }} />
              </>
            )}
          </>
        )

      case 'morphing':
        return (
          <>
            {isHovering ? (
              <div className="custom-cursor-pointer" style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: `translate(-20%, -10%) scale(${isClicking ? 0.8 : 1})`,
              }} />
            ) : (
              <div className="cursor-morph" style={{ 
                left: `${mousePosition.x}px`, 
                top: `${mousePosition.y}px`,
                transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
                borderRadius: isHovering ? '0%' : '50%',
                width: isHovering ? '40px' : '20px',
                height: isHovering ? '40px' : '20px'
              }} />
            )}
          </>
        )

      case 'geometric':
        return (
          <>
            {isHovering ? (
              <div className="custom-cursor-pointer" style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: `translate(-20%, -10%) scale(${isClicking ? 0.8 : 1})`,
              }} />
            ) : (
              <>
                <div className="cursor-geo-triangle" style={{ 
                  left: `${mousePosition.x}px`, 
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) rotate(${Date.now() / 20}deg) scale(${isHovering ? 1.5 : 1})`
                }} />
                <div className="cursor-geo-square" style={{ 
                  left: `${mousePosition.x}px`, 
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) rotate(${-Date.now() / 30}deg) scale(${isClicking ? 0.5 : 1})`
                }} />
              </>
            )}
          </>
        )

      case 'liquid':
        return (
          <>
            {isHovering ? (
              <div className="custom-cursor-pointer" style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: `translate(-20%, -10%) scale(${isClicking ? 0.8 : 1})`,
              }} />
            ) : (
              <>
                <div className="cursor-liquid-main" style={{ 
                  left: `${mousePosition.x}px`, 
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
                }} />
                {trail.map((point, index) => (
                  <div
                    key={`trail-${index}-${point.id}`}
                    className="cursor-liquid-blob"
                    style={{
                      left: `${point.x}px`,
                      top: `${point.y}px`,
                      transform: `translate(-50%, -50%) scale(${(index + 1) / trail.length})`,
                      opacity: (index + 1) / trail.length * 0.6
                    }}
                  />
                ))}
              </>
            )}
          </>
        )

      default: // 'default'
        return (
          <>
            {isHovering ? (
              // Pointer cursor for interactive elements
              <div className="custom-cursor-pointer" style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: `translate(-20%, -10%) scale(${isClicking ? 0.8 : 1})`,
              }} />
            ) : (
              // Normal cursor
              <>
                <div className="custom-cursor-dot" style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
                }} />
                <div className="custom-cursor-ring" style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                  transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
                }} />
                <div className="custom-cursor-trail" style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y}px`,
                }} />
              </>
            )}
          </>
        )
    }
  }

  return <>{renderCursor()}</>
}