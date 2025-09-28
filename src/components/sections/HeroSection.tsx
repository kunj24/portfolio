'use client'

import { useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ChevronDown, Download, Mail } from 'lucide-react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/10 to-background"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Suspense fallback={<div className="w-full h-full bg-muted/20" />}>
          <Hero3D className="w-full h-full" />
        </Suspense>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div
          ref={titleRef}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight">
            <span className="block text-white mb-2">hello i am</span>
            <span className="block gradient-text animate-gradient">
              kunj mungalpara
            </span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting immersive digital experiences through cutting-edge 
          <span className="text-primary font-semibold"> 3D animation</span> and 
          <span className="text-accent font-semibold"> interactive design</span>
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={() => {
              const projectsSection = document.getElementById('projects')
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            View My Work
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
          
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group px-8 py-4 glass hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 border border-white/20"
          >
            <Mail className="w-5 h-5 inline mr-2" />
            Get In Touch
          </button>

          <a
            href="/resume.pdf"
            download
            className="group px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
          >
            <Download className="w-5 h-5 inline mr-2" />
            Resume
          </a>
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
            <ChevronDown className="w-6 h-6 animate-bounce group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/60 rounded-full animate-float blur-sm" />
      <div className="absolute top-3/4 right-10 w-6 h-6 bg-accent/60 rounded-full animate-float delay-1000 blur-sm" />
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-secondary/60 rounded-full animate-float delay-2000 blur-sm" />
    </section>
  )
}