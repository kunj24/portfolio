'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // Lightweight resize / orientation handler to keep triggers aligned on mobile
  let resizeTimeout: number | null = null
  const handleRefresh = () => {
    if (resizeTimeout) window.clearTimeout(resizeTimeout)
    // Debounce rapid resize/orientation events
    resizeTimeout = window.setTimeout(() => {
      try { ScrollTrigger.refresh() } catch {}
    }, 120)
  }
  window.addEventListener('orientationchange', handleRefresh)
  window.addEventListener('resize', handleRefresh)
}

export function useGSAPScrollTrigger() {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    try { ScrollTrigger.refresh() } catch {}
    
    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}

export function useFadeInAnimation(triggerRef: React.RefObject<HTMLElement | null>, options?: gsap.TweenVars) {
  useEffect(() => {
    const element = triggerRef.current
    if (!element) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    })

    tl.fromTo(element, 
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        ...options
      }
    )

    return () => {
      tl.kill()
    }
  }, [triggerRef, options])
}

export function useSlideInAnimation(
  triggerRef: React.RefObject<HTMLElement | null>, 
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  options?: gsap.TweenVars
) {
  useEffect(() => {
    const element = triggerRef.current
    if (!element) return

    const getInitialPosition = () => {
      switch (direction) {
        case 'left': return { x: -100, y: 0 }
        case 'right': return { x: 100, y: 0 }
        case 'up': return { x: 0, y: 50 }
        case 'down': return { x: 0, y: -50 }
        default: return { x: 0, y: 50 }
      }
    }

    const initialPos = getInitialPosition()

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      }
    })

    tl.fromTo(element,
      {
        opacity: 0,
        ...initialPos,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        ...options
      }
    )

    return () => {
      tl.kill()
    }
  }, [triggerRef, direction, options])
}

export function useStaggerAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  childSelector: string = '.stagger-item',
  options?: gsap.TweenVars
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll(childSelector)
    if (children.length === 0) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    })

    tl.fromTo(children,
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        ...options
      }
    )

    return () => {
      tl.kill()
    }
  }, [containerRef, childSelector, options])
}

export function useParallaxEffect(
  elementRef: React.RefObject<HTMLElement | null>,
  speed: number = 0.5
) {
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    gsap.to(element, {
      y: () => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [elementRef, speed])
}