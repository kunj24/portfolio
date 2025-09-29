'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'


export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.2 })
  useSlideInAnimation(contentRef, 'left', { delay: 0.4 })
  useSlideInAnimation(imageRef, 'right', { delay: 0.4 })

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
                I am a highly motivated <span className="text-primary font-semibold">B.Tech Computer Science and Engineering</span> student at
                Charotar University of Science and Technology with a strong passion for <span className="text-primary font-semibold">Machine Learning</span> and
                <span className="text-primary font-semibold"> Web Development</span>.
              </p>
              <p>
                I&apos;m seeking opportunities to leverage my technical skills in Python, ML frameworks,
                and full-stack development to contribute to innovative projects and real-world solutions.
              </p>
              <p>
                I enjoy building intuitive web applications, experimenting with ML models, and continuously
                learning new technologies to bridge the gap between research and practical, user-facing
                applications.
              </p>
            </div>

            {/* Skills tags removed per request */}
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
                      <p className="text-sm opacity-90">Developer</p>
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
      </div>
    </section>
  )
}