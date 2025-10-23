'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface RippleEffectProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export default function RippleEffect({ 
  children, 
  className = '',
  color = 'rgba(46, 230, 193, 0.6)' 
}: RippleEffectProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const createRipple = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ripple = document.createElement('div')
      ripple.className = 'absolute rounded-full pointer-events-none'
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.width = '0px'
      ripple.style.height = '0px'
      ripple.style.backgroundColor = color
      ripple.style.transform = 'translate(-50%, -50%)'
      ripple.style.zIndex = '1'

      element.appendChild(ripple)

      // Animate ripple
      gsap.to(ripple, {
        width: '300px',
        height: '300px',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple)
          }
        }
      })
    }

    element.addEventListener('click', createRipple)

    return () => {
      element.removeEventListener('click', createRipple)
    }
  }, [color])

  return (
    <div 
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}