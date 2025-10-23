'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, pressed: false })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (x: number, y: number, force: number = 1): Particle => {
      const angle = Math.random() * Math.PI * 2
      const speed = (Math.random() * 2 + 1) * force
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 60 + 30,
        size: Math.random() * 3 + 1,
        hue: Math.random() * 60 + 180 // Cyan to blue range
      }
    }

    const updateParticles = () => {
      const particles = particlesRef.current
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Apply gravity and friction
        particle.vy += 0.05
        particle.vx *= 0.99
        particle.vy *= 0.99
        
        // Update life
        particle.life--
        
        // Remove dead particles
        if (particle.life <= 0) {
          particles.splice(i, 1)
        }
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const particles = particlesRef.current
      
      particles.forEach(particle => {
        const alpha = particle.life / particle.maxLife
        const size = particle.size * alpha
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2
        )
        
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${alpha * 0.8})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add glow effect
        ctx.shadowBlur = size * 2
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      
      // Create particles on mouse movement
      if (Math.random() < 0.3) {
        particlesRef.current.push(
          createParticle(mouseRef.current.x, mouseRef.current.y, 0.5)
        )
      }
    }

    const handleMouseDown = () => {
      mouseRef.current.pressed = true
      // Burst effect on click
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push(
          createParticle(mouseRef.current.x, mouseRef.current.y, 2)
        )
      }
    }

    const handleMouseUp = () => {
      mouseRef.current.pressed = false
    }

    // Initialize
    resizeCanvas()
    animate()

    // Event listeners
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}