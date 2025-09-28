'use client'

import { useRef, Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'
import CreativeArrow from '@/components/ui/CreativeArrow'

// Dynamic import for 3D component to avoid SSR issues
const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
})

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Animated title switching
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const titles = ['Full Stack Dev', 'CP Enthusiast']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000) // Switch every 3 seconds

    return () => clearInterval(interval)
  }, [titles.length])

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.3 })
  useSlideInAnimation(subtitleRef, 'up', { delay: 0.5 })
  useSlideInAnimation(ctaRef, 'up', { delay: 0.7 })
  useSlideInAnimation(scrollRef, 'up', { delay: 1.0 })

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/10 to-background parallax"
    >
      {/* 3D Background with parallax */}
      <div className="absolute inset-0 w-full h-full parallax-layer parallax-back">
        <Suspense fallback={<div className="w-full h-full bg-muted/20" />}>
          <Hero3D className="w-full h-full" />
        </Suspense>
      </div>

      {/* Parallax floating elements */}
      <div className="absolute inset-0 parallax-layer" style={{ transform: 'translateZ(-0.5px) scale(1.5)' }}>
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/40 rounded-full animate-float blur-sm" />
        <div className="absolute top-3/4 right-10 w-6 h-6 bg-accent/40 rounded-full animate-float delay-1000 blur-sm" />
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-secondary/40 rounded-full animate-float delay-2000 blur-sm" />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 parallax-layer parallax-base" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div ref={titleRef}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary font-medium mb-4">
                Hello, I&apos;m
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-2">
                Kunj Mungalpara
              </h1>
              <div className="relative h-20 sm:h-24 lg:h-28 xl:h-32 overflow-hidden">
                <h2 
                  className="absolute inset-0 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text transition-all duration-1000 ease-in-out transform"
                  style={{
                    transform: currentTitleIndex === 0 ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: currentTitleIndex === 0 ? 1 : 0
                  }}
                >
                  Full Stack Dev
                </h2>
                <h2 
                  className="absolute inset-0 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text transition-all duration-1000 ease-in-out transform"
                  style={{
                    transform: currentTitleIndex === 1 ? 'translateY(0)' : 'translateY(100%)',
                    opacity: currentTitleIndex === 1 ? 1 : 0
                  }}
                >
                  CP Enthusiast
                </h2>
              </div>
            </div>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-xl"
            >
              I am a passionate web developer, dedicated to crafting interactive and efficient web applications.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full font-semibold transition-all duration-300 hover-scale text-lg"
              >
                Hire Me
              </button>
              
              <a
                href="/resume.pdf"
                download
                className="px-8 py-4 border border-white/30 hover:border-white/50 text-white rounded-full font-semibold transition-all duration-300 hover-scale text-lg hover:bg-white/10"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gradient-to-r from-primary to-accent p-1 hover-scale">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <Image
                    src="/images/kunj-profile.jpg"
                    alt="Kunj Mungalpara - Full Stack Developer"
                    fill
                    className="object-cover object-center hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 1024px) 320px, 384px"
                    priority
                  />
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/30 rounded-full blur-xl animate-float delay-1000" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300"
            aria-label="Scroll to about section"
          >
            <span className="text-sm mb-2 font-medium">Scroll to explore</span>
            <CreativeArrow direction="down" size="lg" className="text-white/70 group-hover:text-white animate-bounce" animated />
          </button>
        </div>
      </div>


    </section>
  )
}