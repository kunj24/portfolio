'use client'

import { useEffect, useState } from 'react'
import TypingEffect from './TypingEffect'

interface DelayedTypingProps {
  text: string
  delay?: number
  typeSpeed?: number
  className?: string
}

export default function DelayedTyping({ text, delay = 0, typeSpeed = 30, className = '' }: DelayedTypingProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  // Respect user's reduced motion preference
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    return <span className={className}>{text}</span>
  }

  return mounted ? (
    <TypingEffect texts={[text]} typeSpeed={typeSpeed} loop={false} className={className} />
  ) : (
    <span className={className} aria-hidden="true">&nbsp;</span>
  )
}

