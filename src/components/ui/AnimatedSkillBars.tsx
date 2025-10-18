'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Skill {
  name: string
  level: number
  color: string
  icon?: React.ReactNode
}

interface AnimatedSkillBarsProps {
  skills: Skill[]
}

export default function AnimatedSkillBars({ skills }: AnimatedSkillBarsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const skillBars = container.querySelectorAll('.skill-bar-fill')
    const skillPercentages = container.querySelectorAll('.skill-percentage')

    // Set initial state
    gsap.set(skillBars, { width: '0%' })
    gsap.set(skillPercentages, { textContent: '0%' })

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    skills.forEach((skill, index) => {
      const skillBar = skillBars[index]
      const percentage = skillPercentages[index]
      const obj = { value: 0 }

      tl.to(skillBar, {
        width: `${skill.level}%`,
        duration: 1.2,
        ease: 'power2.out',
        delay: index * 0.1
      }, 0)
      .to(obj, {
        value: skill.level,
        duration: 1.2,
        ease: 'power2.out',
        delay: index * 0.1,
        onUpdate: () => {
          if (percentage) {
            percentage.textContent = `${Math.round(obj.value)}%`
          }
        }
      }, 0)
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [skills])

  return (
    <div ref={containerRef} className="space-y-6">
      {skills.map((skill) => (
        <div key={skill.name} className="group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {skill.icon}
              <span className="font-medium text-foreground">{skill.name}</span>
            </div>
            <span 
              className="skill-percentage font-bold text-sm"
              style={{ color: skill.color }}
            >
              0%
            </span>
          </div>
          
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            {/* Background glow effect */}
            <div 
              className="absolute inset-0 opacity-20 blur-sm"
              style={{ backgroundColor: skill.color }}
            />
            
            {/* Animated fill bar */}
            <div 
              className="skill-bar-fill h-full rounded-full relative overflow-hidden"
              style={{ backgroundColor: skill.color }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}