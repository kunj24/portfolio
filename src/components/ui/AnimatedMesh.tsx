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

    const container = containerRef.current
    const shapes: FloatingShape[] = []

    // Create floating geometric shapes
    for (let i = 0; i < 8; i++) {
      const shape = document.createElement('div')
      const size = Math.random() * 100 + 50
      const isCircle = Math.random() > 0.5
      
      shape.className = `absolute opacity-10 blur-sm ${
        isCircle ? 'rounded-full' : 'rotate-45'
      }`
      
      shape.style.width = `${size}px`
      shape.style.height = `${size}px`
      shape.style.background = `conic-gradient(from ${Math.random() * 360}deg, 
        hsl(${180 + Math.random() * 60}, 70%, 50%), 
        hsl(${300 + Math.random() * 60}, 70%, 50%), 
        hsl(${180 + Math.random() * 60}, 70%, 50%))`
      
      const baseX = Math.random() * window.innerWidth
      const baseY = Math.random() * window.innerHeight
      
      shape.style.left = `${baseX}px`
      shape.style.top = `${baseY}px`
      
      container.appendChild(shape)
      
      const floatingShape: FloatingShape = {
        element: shape,
        baseX,
        baseY,
        speed: Math.random() * 0.5 + 0.2,
        size,
        rotation: 0
      }
      
      shapes.push(floatingShape)
      
      // Animate the shape
      gsap.to(shape, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        rotation: 360,
        duration: Math.random() * 20 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      })
      
      // Scale animation
      gsap.to(shape, {
        scale: Math.random() * 0.5 + 0.8,
        duration: Math.random() * 8 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }

    shapesRef.current = shapes

    return () => {
      shapes.forEach(shape => {
        if (shape.element.parentNode) {
          shape.element.parentNode.removeChild(shape.element)
        }
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