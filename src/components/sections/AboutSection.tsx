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
                I&apos;m a driven <span className="text-primary font-semibold">B.Tech Computer Science & Engineering</span> student at 
                Charotar University of Science and Technology with a strong focus on <span className="text-primary font-semibold">machine learning</span> and 
                <span className="text-primary font-semibold"> web development</span>. I design and build end-to-end web applications and prototype ML models that address practical problems.
              </p>
              <p>
                I&apos;m seeking opportunities to apply my skills in <span className="text-primary font-semibold">Python, ML frameworks</span>, and 
                <span className="text-primary font-semibold"> full-stack development</span> to create impactful, production-ready solutions. I enjoy turning research ideas into user-facing products and continuously expanding my toolset to follow modern engineering practices.
              </p>
              <p>
                I love collaborating across teams, shipping clean, maintainable code, and exploring new architectures and ML techniques that bridge research and real-world applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}