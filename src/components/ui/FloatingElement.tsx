'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FloatingElementProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal'
  intensity?: number
  duration?: number
  delay?: number
  className?: string
}

export default function FloatingElement({
  children,
  direction = 'up',
  intensity = 20,
  duration = 3,
  delay = 0,
  className = ''
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    
    const getAnimationProps = () => {
      switch (direction) {
        case 'up':
          return { y: -intensity }
        case 'down':
          return { y: intensity }
        case 'left':
          return { x: -intensity }
        case 'right':
          return { x: intensity }
        case 'diagonal':
          return { x: -intensity * 0.5, y: -intensity }
        default:
          return { y: -intensity }
      }
    }

    // Create floating animation
    gsap.to(element, {
      ...getAnimationProps(),
      duration,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay
    })

    return () => {
      gsap.killTweensOf(element)
    }
  }, [direction, intensity, duration, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}