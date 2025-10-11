'use client'

import { useEffect, useRef } from 'react'

interface WordRevealProps {
  text: string
  className?: string
  delay?: number
}

export default function WordReveal({ text, className = '', delay = 0 }: WordRevealProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    // nothing else — the hook will attach ScrollTrigger to the containerRef
  }, [])

  // Respect reduced motion preference
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    return <span className={className}>{text}</span>
  }

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={`word-reveal ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block mr-1 opacity-0 transform" style={{ display: 'inline-block' }}>
          {word}
        </span>
      ))}
      {/* Attach stagger animation after render */}
      <WordRevealInitializer containerRef={containerRef} delay={delay} />
    </span>
  )
}

function WordRevealInitializer({ containerRef, delay = 0 }: { containerRef: React.RefObject<HTMLSpanElement | null>, delay?: number }) {
  const initRef = useRef(false)
  useEffect(() => {
  if (initRef.current) return
  initRef.current = true
  const container = containerRef.current
  if (!container) return
    // The children are inline span words; we'll select them and animate using useStaggerAnimation's logic directly with gsap
    const children = container.querySelectorAll('span')

    // Use gsap directly to avoid waiting for hook options rewire (this project already has gsap installed)
    import('gsap').then(({ gsap }) => {
      gsap.fromTo(
        children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.04, delay: delay / 1000 }
      )
    })
  }, [containerRef, delay])

  return null
}

