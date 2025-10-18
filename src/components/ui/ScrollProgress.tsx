'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progressRef.current) return

    const progress = progressRef.current

    gsap.set(progress, { scaleX: 0, transformOrigin: 'left' })

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-muted/30 z-50">
      <div 
        ref={progressRef}
        className="h-full bg-gradient-to-r from-primary via-accent to-purple-500 shadow-lg"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.5))'
        }}
      />
    </div>
  )
}