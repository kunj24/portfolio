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

  // If the incoming text contains no spaces (e.g., pasted without spaces),
  // attempt to split into readable tokens using transitions (uppercase letters, digits, punctuation).
  let words: string[] = []
  if (text.includes(' ')) {
    words = text.split(' ')
  } else {
    // Insert splits before capital letters and around punctuation/digits
    // e.g. "IamahighlymotivatedB.Tech" -> ["I am a highly motivated B.", "Tech"] approx
    // We'll use a regex to split on boundaries where a lowercase is followed by uppercase, or before digits/punctuation
    const tokens = text
      // split before uppercase (but not at the start)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // split between letters and digits
      .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
      // replace punctuation with space + punctuation to keep them visible
      .replace(/([.,/#!$%^&*;:{}=\-_`~()\[\]])/g, ' $1 ')
    words = tokens.split(/\s+/).filter(Boolean)
  }

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
    let isAnimating = false

    const runAnimation = () => {
      // prevent double-start
      if (isAnimating) return
      isAnimating = true
      import('gsap').then(({ gsap }) => {
        if (anim && typeof anim.kill === 'function') anim.kill()
        anim = gsap.fromTo(
          children,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.04, delay: delay / 1000, onComplete: () => { isAnimating = false } }
        )
      })
    }
    const resetWords = () => {
      // kill running animation and reset inline styles so it can replay
      if (anim && typeof anim.kill === 'function') {
        try { anim.kill() } catch {}
        anim = null
      }
      isAnimating = false
      children.forEach((c) => {
        const el = c as HTMLElement
        el.style.opacity = '0'
        el.style.transform = 'translateY(12px)'
      })
    }
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            runAnimation()
          } else {
            // reset so it can animate again next time it becomes visible
            resetWords()
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

