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

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY }
      setMousePosition(newPos)

      // Add trail for particle and liquid variants
      if (variant === 'particle' || variant === 'liquid') {
        const newTrailPoint = { x: newPos.x, y: newPos.y, id: Date.now() + Math.random() }
        setTrail(prev => [...prev.slice(-8), newTrailPoint])
        setTrailId(prev => prev + 1)
      }

      // Add particles for particle variant
      if (variant === 'particle' && Math.random() < 0.3) {
        const newParticle = { 
          x: newPos.x + (Math.random() - 0.5) * 30, 
          y: newPos.y + (Math.random() - 0.5) * 30, 
          id: Date.now() + Math.random() * 1000, 
          opacity: 1 
        }
        setParticles(prev => [...prev, newParticle])
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           !!target.closest('a') || 
                           !!target.closest('button') ||
                           target.style.cursor === 'pointer' ||
                           target.classList.contains('cursor-pointer')
      
      setIsHovering(isInteractive)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Hide default cursor only for custom variants
    if (variant !== 'none') {
      document.body.style.cursor = 'none'
    } else {
      document.body.style.cursor = 'auto'
    }

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'auto'
    }
  }, [variant, trailId])

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 1000))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const renderCursor = () => {
    // Don't render anything for 'none' variant
    if (variant === 'none') {
      return null
    }

    switch (variant) {
      case 'neon':
        return (
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
        )

      case 'particle':
        return (
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
                key={point.id}
                className="cursor-trail-point"
                style={{
                  left: `${point.x}px`,
                  top: `${point.y}px`,
                  opacity: (index + 1) / trail.length * 0.5
                }}
              />
            ))}
          </>
        )

      case 'magnetic':
        return (
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
        )

      case 'morphing':
        return (
          <div className="cursor-morph" style={{ 
            left: `${mousePosition.x}px`, 
            top: `${mousePosition.y}px`,
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
            borderRadius: isHovering ? '0%' : '50%',
            width: isHovering ? '40px' : '20px',
            height: isHovering ? '40px' : '20px'
          }} />
        )

      case 'geometric':
        return (
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
        )

      case 'liquid':
        return (
          <>
            <div className="cursor-liquid-main" style={{ 
              left: `${mousePosition.x}px`, 
              top: `${mousePosition.y}px`,
              transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
            }} />
            {trail.map((point, index) => (
              <div
                key={point.id}
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
        )

      default: // 'default'
        return (
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
        )
    }
  }

  return <>{renderCursor()}</>
}