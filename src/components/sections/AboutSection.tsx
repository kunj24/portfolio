'use client'

import { useRef } from 'react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'
import VariableProximity from '@/components/ui/VariableProximity'
import WordReveal from '@/components/ui/WordReveal'


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
              gradientWords={[0]}
              className=""
            />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate Computer Science student specializing in machine learning and modern web development.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              <p>
                <WordReveal text={"I am a highly motivated B.Tech Computer Science and Engineering student at Charotar University of Science and Technology with a strong passion for Machine Learning and Web Development."} delay={200} />
              </p>
              <p>
                <WordReveal text={"I'm seeking opportunities to leverage my technical skills in Python, ML frameworks, and full-stack development to contribute to innovative projects and real-world solutions."} delay={900} />
              </p>
              <p>
                <WordReveal text={"I enjoy building intuitive web applications, experimenting with ML models, and continuously learning new technologies to bridge the gap between research and practical, user-facing applications."} delay={1600} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}