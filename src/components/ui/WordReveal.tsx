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
        <span
          key={`${word}-${i}`}
          className="inline-block mr-1"
          style={{ display: 'inline-block', opacity: 0, transform: 'translateY(12px)' }}
        >
          {word}
        </span>
      ))}
      {/* Attach stagger animation after render */}
      <WordRevealInitializer containerRef={containerRef} delay={delay} />
    </span>
  )
}

function WordRevealInitializer({ containerRef, delay = 0 }: { containerRef: React.RefObject<HTMLSpanElement | null>, delay?: number }) {
  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === 'undefined') return

    const children = container.querySelectorAll('span')

    // Respect reduced motion
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      children.forEach((c) => {
        const el = c as HTMLElement
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

  let io: IntersectionObserver | null = null
  type AnimHandle = { kill?: () => void } | null
  let anim: AnimHandle = null

    const runAnimation = () => {
      import('gsap').then(({ gsap }) => {
        anim = gsap.fromTo(
          children,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.04, delay: delay / 1000 }
        )
      })
    }

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runAnimation()
            observer.disconnect()
            break
          }
        }
      }, { threshold: 0.05 })

      io.observe(container)
    } else {
      // Fallback: run immediately
      runAnimation()
    }

    return () => {
      if (io) io.disconnect()
      if (anim && typeof anim.kill === 'function') anim.kill()
    }
  }, [containerRef, delay])

  return null
}

