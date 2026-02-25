'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FloatingShape {
  element: HTMLDivElement
  baseX: number
  baseY: number
  speed: number
  size: number
  rotation: number
}

export default function AnimatedMesh() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<FloatingShape[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const isMobile = window.innerWidth < 768
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Far fewer shapes on mobile; none if user prefers reduced motion
    const shapeCount = reduceMotion ? 0 : isMobile ? 3 : 8

    const container = containerRef.current
    const shapes: FloatingShape[] = []

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div')
      // Smaller shapes on mobile to reduce paint area
      const size = isMobile
        ? Math.random() * 60 + 30
        : Math.random() * 100 + 50
      const isCircle = Math.random() > 0.5

      // Skip blur on mobile – CSS blur triggers expensive repaints
      shape.className = `absolute opacity-10 ${
        !isMobile ? 'blur-sm' : ''
      } ${isCircle ? 'rounded-full' : 'rotate-45'}`

      shape.style.width = `${size}px`
      shape.style.height = `${size}px`
      shape.style.willChange = 'transform'
      shape.style.background = `conic-gradient(from ${Math.random() * 360}deg, 
        hsl(${180 + Math.random() * 60}, 70%, 50%), 
        hsl(${300 + Math.random() * 60}, 70%, 50%), 
        hsl(${180 + Math.random() * 60}, 70%, 50%))`

      const baseX = Math.random() * window.innerWidth
      const baseY = Math.random() * window.innerHeight

      shape.style.left = `${baseX}px`
      shape.style.top = `${baseY}px`

      container.appendChild(shape)

      shapes.push({ element: shape, baseX, baseY, speed: Math.random() * 0.5 + 0.2, size, rotation: 0 })

      // Slower / simpler motion on mobile to save CPU
      const moveDuration = isMobile
        ? Math.random() * 30 + 20
        : Math.random() * 20 + 10
      const scaleDuration = isMobile
        ? Math.random() * 14 + 8
        : Math.random() * 8 + 4
      const moveRange = isMobile ? 80 : 200

      gsap.to(shape, {
        x: `+=${Math.random() * moveRange - moveRange / 2}`,
        y: `+=${Math.random() * moveRange - moveRange / 2}`,
        rotation: 360,
        duration: moveDuration,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      })

      gsap.to(shape, {
        scale: Math.random() * 0.5 + 0.8,
        duration: scaleDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    }

    shapesRef.current = shapes

    // Pause all tweens when tab is hidden, resume when visible
    const handleVisibility = () => {
      if (document.hidden) gsap.globalTimeline.pause()
      else gsap.globalTimeline.resume()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      shapes.forEach(shape => {
        if (shape.element.parentNode) shape.element.parentNode.removeChild(shape.element)
      })
      gsap.killTweensOf(shapes.map(s => s.element))
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  )
}