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

// Maximum live particles – lower on desktop to guard performance
const MAX_PARTICLES = 60

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, pressed: false })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Touch / mobile detection – no mouse events exist, skip entirely
    const mobile =
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setIsMobile(mobile)
    if (mobile) return   // ← bail out: no canvas, no RAF, no CPU waste

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (x: number, y: number, force: number = 1): Particle => {
      const angle = Math.random() * Math.PI * 2
      const speed = (Math.random() * 2 + 1) * force
      return {
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 60 + 30,
        size: Math.random() * 3 + 1,
        hue: Math.random() * 60 + 180,
      }
    }

    const updateParticles = () => {
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05
        p.vx *= 0.99
        p.vy *= 0.99
        p.life--
        if (p.life <= 0) particles.splice(i, 1)
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      for (const p of particles) {
        const alpha = p.life / p.maxLife
        const size = p.size * alpha

        // Radial gradient gives glow without expensive shadowBlur
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2)
        gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${alpha * 0.8})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    const animate = () => {
      if (!document.hidden) {
        updateParticles()
        drawParticles()
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      // Throttle particle creation + respect cap
      if (Math.random() < 0.3 && particlesRef.current.length < MAX_PARTICLES) {
        particlesRef.current.push(
          createParticle(mouseRef.current.x, mouseRef.current.y, 0.5)
        )
      }
    }

    const handleMouseDown = () => {
      mouseRef.current.pressed = true
      const burst = Math.min(15, MAX_PARTICLES - particlesRef.current.length)
      for (let i = 0; i < burst; i++) {
        particlesRef.current.push(
          createParticle(mouseRef.current.x, mouseRef.current.y, 2)
        )
      }
    }

    const handleMouseUp = () => { mouseRef.current.pressed = false }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas, { passive: true })
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  if (!mounted || isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}