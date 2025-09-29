'use client'

import { useRef } from 'react'
import { useFadeInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'

const skills = [
  { name: "Python", icon: "🐍", color: "from-yellow-400 to-blue-500", bgColor: "bg-yellow-500/10" },
  { name: "JavaScript", icon: "⚡", color: "from-yellow-400 to-orange-500", bgColor: "bg-yellow-500/10" },
  { name: "TypeScript", icon: "📘", color: "from-blue-400 to-blue-600", bgColor: "bg-blue-500/10" },
  { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500", bgColor: "bg-cyan-500/10" },
  { name: "Next.js", icon: "▲", color: "from-gray-400 to-gray-600", bgColor: "bg-gray-500/10" },
  { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-600", bgColor: "bg-green-500/10" },
  { name: "TensorFlow", icon: "🧠", color: "from-orange-400 to-red-500", bgColor: "bg-orange-500/10" },
  { name: "PyTorch", icon: "🔥", color: "from-red-400 to-orange-500", bgColor: "bg-red-500/10" },
  { name: "MongoDB", icon: "🍃", color: "from-green-400 to-teal-500", bgColor: "bg-green-500/10" },
  { name: "PostgreSQL", icon: "🐘", color: "from-blue-400 to-indigo-500", bgColor: "bg-blue-500/10" },
  { name: "Git", icon: "📝", color: "from-orange-400 to-red-500", bgColor: "bg-orange-500/10" },
  { name: "Docker", icon: "🐳", color: "from-blue-400 to-cyan-500", bgColor: "bg-blue-500/10" },
  { name: "AWS", icon: "☁️", color: "from-orange-400 to-yellow-500", bgColor: "bg-orange-500/10" },
  { name: "Linux", icon: "🐧", color: "from-gray-400 to-black", bgColor: "bg-gray-500/10" },
  { name: "Pandas", icon: "🐼", color: "from-purple-400 to-pink-500", bgColor: "bg-purple-500/10" },
  { name: "Jupyter", icon: "📓", color: "from-orange-400 to-red-500", bgColor: "bg-orange-500/10" }
]

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

        {/* Skills Icon Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative flex flex-col items-center p-6 rounded-2xl glass hover:bg-primary/5 transition-all duration-500 hover:scale-110 hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon Container with Glow Effect */}
              <div className={`relative w-16 h-16 rounded-2xl ${skill.bgColor} flex items-center justify-center mb-4 group-hover:shadow-2xl transition-all duration-500`}>
                {/* Animated Glow Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 animate-pulse`} />
                
                {/* Icon */}
                <span className="text-3xl relative z-10 group-hover:scale-125 transition-transform duration-300">
                  {skill.icon}
                </span>
                
                {/* Border Glow */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${skill.color} bg-clip-border opacity-0 group-hover:opacity-40 transition-all duration-500`} 
                     style={{ padding: '2px' }} />
              </div>
              
              {/* Skill Name */}
              <span className="text-sm font-medium text-center group-hover:text-primary transition-colors duration-300">
                {skill.name}
              </span>
              
              {/* Floating Light Effect */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-500" />
            </div>
          ))}
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