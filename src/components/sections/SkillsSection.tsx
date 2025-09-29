'use client'

import { useRef, useState, MouseEvent } from 'react'
import { useFadeInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'

const skills = [
  { name: "HTML", icon: "HTML", bgGradient: "from-orange-500 to-red-500", glowColor: "#E34F26" },
  { name: "CSS", icon: "CSS", bgGradient: "from-blue-500 to-blue-600", glowColor: "#1572B6" },
  { name: "Tailwind CSS", icon: "Tailwind CSS", bgGradient: "from-cyan-400 to-teal-500", glowColor: "#06B6D4" },
  { name: "JavaScript", icon: "JS", bgGradient: "from-yellow-400 to-orange-500", glowColor: "#F7DF1E" },
  { name: "TypeScript", icon: "TS", bgGradient: "from-blue-500 to-blue-700", glowColor: "#3178C6" },
  { name: "React", icon: "⚛", bgGradient: "from-cyan-400 to-blue-500", glowColor: "#61DAFB" },
  { name: "Next.js", icon: "N", bgGradient: "from-gray-600 to-gray-800", glowColor: "#FFFFFF" },
  { name: "Node.js", icon: "🟢", bgGradient: "from-green-500 to-green-600", glowColor: "#339933" },
  { name: "Express.js", icon: "ex", bgGradient: "from-gray-700 to-gray-900", glowColor: "#68A063" },
  { name: ".NET", icon: ".NET", bgGradient: "from-purple-600 to-blue-600", glowColor: "#512BD4" },
  { name: "MongoDB", icon: "M", bgGradient: "from-green-600 to-green-700", glowColor: "#47A248" },
  { name: "C", icon: "C", bgGradient: "from-blue-600 to-indigo-700", glowColor: "#A8B9CC" },
  { name: "C++", icon: "C++", bgGradient: "from-blue-500 to-purple-600", glowColor: "#00599C" },
  { name: "Java", icon: "Java", bgGradient: "from-orange-600 to-red-600", glowColor: "#F89820" },
  { name: "C#", icon: "C#", bgGradient: "from-purple-600 to-indigo-700", glowColor: "#68217A" },
  { name: "Git", icon: "Git", bgGradient: "from-orange-500 to-red-500", glowColor: "#F05032" },
  { name: "GitHub", icon: "GitHub", bgGradient: "from-gray-700 to-gray-900", glowColor: "#FFFFFF" },
  { name: "Postman", icon: "Postman", bgGradient: "from-orange-500 to-orange-600", glowColor: "#FF6C37" }
]

// StarField component for background particles
function StarField() {
  return (
    <div className="star-field">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  )
}

// Interactive Skill Card with cursor tracking
interface SkillCardProps {
  skill: typeof skills[0]
  index: number
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className="skill-card-wrapper group"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        '--skill-color': skill.glowColor
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main card with glassmorphism */}
      <div className="skill-card">
        {/* Cursor tracking radial gradient overlay */}
        <div
          className="cursor-radial-gradient"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${skill.glowColor}20, ${skill.glowColor}08 25%, transparent 50%)`
          }}
        />
        
        {/* Border gradient that follows cursor */}
        <div
          className="border-gradient"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${skill.glowColor}60, transparent 40%)`
          }}
        />
        
        {/* Card content */}
        <div className="skill-card-content">
          <div className="skill-icon" style={{ color: skill.glowColor }}>
            {skill.icon}
          </div>
          <div className="skill-name">
            {skill.name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useFadeInAnimation(sectionRef)
  useStaggerAnimation(gridRef, '.group', { delay: 0.3 })

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
            <span className="gradient-text">Technical</span> Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to build innovative ML solutions and modern web applications.
          </p>
        </div>

        {/* Interactive Technologies Grid with Cursor Tracking */}
        <div className="relative">
          <StarField />
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto relative z-10">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
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