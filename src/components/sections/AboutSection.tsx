'use client'

import { useRef } from 'react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'
import VariableProximity from '@/components/ui/VariableProximity'


export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // removed imageRef as photo is being removed
  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.2 })
  useSlideInAnimation(contentRef, 'left', { delay: 0.4 })

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
            <VariableProximity
              label="About Me"
              fromFontVariationSettings="'wght' 400, 'wdth' 100"
              toFontVariationSettings="'wght' 700, 'wdth' 90"
              containerRef={titleRef as React.MutableRefObject<HTMLElement | null>}
              radius={220}
              className="gradient-text"
            />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

  <div className="grid lg:grid-cols-1 gap-8 lg:gap-12 items-start mb-20">
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

          {/* Image removed - single-column content only */}
        </div>
      </div>
    </section>
  )
}