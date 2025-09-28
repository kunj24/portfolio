'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'
import { Code, Palette, Zap, Globe } from 'lucide-react'

const highlights = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Frontend Development",
    description: "Expert in React, Next.js, TypeScript, and modern web technologies"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "3D Animation",
    description: "Creating immersive experiences with Three.js, React Three Fiber, and WebGL"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance",
    description: "Optimization-focused development for smooth, responsive user experiences"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Interactive Design",
    description: "Bridging the gap between design and development with creative solutions"
  }
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.2 })
  useSlideInAnimation(contentRef, 'left', { delay: 0.4 })
  useSlideInAnimation(imageRef, 'right', { delay: 0.4 })
  useSlideInAnimation(highlightsRef, 'up', { delay: 0.6 })

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/20 to-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">About</span> Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a passionate <span className="text-primary font-semibold">3D animator</span> and 
                <span className="text-primary font-semibold"> frontend developer</span> with over 5 years 
                of experience creating immersive digital experiences that captivate and inspire.
              </p>
              <p>
                My journey began with traditional animation, but I quickly fell in love with the 
                possibilities of web-based 3D graphics. Today, I specialize in creating interactive 
                portfolios, product visualizations, and creative web applications that push the 
                boundaries of what&apos;s possible in the browser.
              </p>
              <p>
                When I&apos;m not coding or animating, you&apos;ll find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the creative community.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                React Three Fiber
              </span>
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                GSAP
              </span>
              <span className="px-4 py-2 bg-secondary/10 text-secondary-foreground rounded-full text-sm font-medium">
                Three.js
              </span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                WebGL
              </span>
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                Blender
              </span>
            </div>
          </div>

          {/* Photo Section */}
          <div ref={imageRef} className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto hover-lift">
              {/* Photo frame with gradient border */}
              <div className="photo-frame w-full h-full hover-zoom">
                {/* Profile Photo */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src="/images/kunj-profile.jpg" 
                    alt="Kunj Mungalpara"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  {/* Overlay with name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-1">Kunj Mungalpara</h3>
                      <p className="text-sm opacity-90">3D Animator & Developer</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float delay-1000" />
              <div className="absolute top-1/2 -left-8 w-3 h-3 bg-accent rounded-full animate-pulse" />
              <div className="absolute bottom-1/4 -right-6 w-2 h-2 bg-primary rounded-full animate-pulse delay-500" />
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div ref={highlightsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="stagger-item group p-6 glass rounded-xl hover:bg-primary/5 transition-all duration-300 hover-scale hover-lift"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}