'use client'

import { useRef } from 'react'
import { useFadeInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "HTML5 / CSS3", level: 98 },
    ]
  },
  {
    title: "3D & Animation",
    skills: [
      { name: "Three.js", level: 88 },
      { name: "React Three Fiber", level: 85 },
      { name: "GSAP", level: 90 },
      { name: "Blender", level: 80 },
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Figma", level: 85 },
      { name: "VS Code", level: 98 },
      { name: "Node.js", level: 80 },
    ]
  },
  {
    title: "Creative Software",
    skills: [
      { name: "After Effects", level: 85 },
      { name: "Photoshop", level: 80 },
      { name: "Cinema 4D", level: 75 },
      { name: "Substance Painter", level: 70 },
    ]
  }
]

const certifications = [
  "React Developer Certification",
  "Three.js Fundamentals",
  "Advanced GSAP Animations",
  "WebGL & Shaders Mastery"
]

interface SkillBarProps {
  name: string
  level: number
  delay?: number
}

function SkillBar({ name, level }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null)

  return (
    <div className="stagger-item mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-secondary/20 rounded-full h-2">
        <div
          ref={barRef}
          className="h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)

  useFadeInAnimation(sectionRef)
  useStaggerAnimation(gridRef, '.skill-category', { delay: 0.3 })
  useFadeInAnimation(certificationsRef, { delay: 0.8 })

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Skills</span> & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for creating immersive digital experiences 
            and cutting-edge web applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category glass p-6 rounded-xl hover:bg-primary/5 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-6 text-center gradient-text">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}

                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div ref={certificationsRef} className="text-center">
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Certifications & Achievements
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="px-6 py-3 glass rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                <span className="text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "5+", label: "Years Experience" },
            { number: "20+", label: "Happy Clients" },
            { number: "100%", label: "Passion Driven" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}