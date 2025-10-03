"use client"

import { useRef, useState, useEffect } from 'react'
import { useFadeInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'
import { SiHtml5, SiCss3, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiC, SiCplusplus, SiPython, SiGit, SiGithub } from 'react-icons/si'
import ChromaGrid, { ChromaItem } from '@/components/ui/ChromaGrid'

const skills = [
  { name: "HTML", icon: <SiHtml5 />, bgGradient: "from-orange-500 to-red-500", glowColor: "#E34F26" },
  { name: "CSS", icon: <SiCss3 />, bgGradient: "from-blue-500 to-blue-600", glowColor: "#1572B6" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, bgGradient: "from-cyan-400 to-teal-500", glowColor: "#06B6D4" },
  { name: "JavaScript", icon: <SiJavascript />, bgGradient: "from-yellow-400 to-orange-500", glowColor: "#F7DF1E" },
  { name: "TypeScript", icon: <SiTypescript />, bgGradient: "from-blue-500 to-blue-700", glowColor: "#3178C6" },
  { name: "React", icon: <SiReact />, bgGradient: "from-cyan-400 to-blue-500", glowColor: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, bgGradient: "from-gray-600 to-gray-800", glowColor: "#FFFFFF" },
  { name: "Node.js", icon: <SiNodedotjs />, bgGradient: "from-green-500 to-green-600", glowColor: "#339933" },
  { name: "Express.js", icon: <SiExpress />, bgGradient: "from-gray-700 to-gray-900", glowColor: "#68A063" },
  { name: "MongoDB", icon: <SiMongodb />, bgGradient: "from-green-600 to-green-700", glowColor: "#47A248" },
  { name: "C", icon: <SiC />, bgGradient: "from-blue-600 to-indigo-700", glowColor: "#A8B9CC" },
  { name: "C++", icon: <SiCplusplus />, bgGradient: "from-blue-500 to-purple-600", glowColor: "#00599C" },
  { name: "Java", icon: "Java", bgGradient: "from-orange-600 to-red-600", glowColor: "#F89820" },
  { name: "Python", icon: <SiPython />, bgGradient: "from-yellow-300 to-blue-500", glowColor: "#3776AB" },
  { name: "Git", icon: <SiGit />, bgGradient: "from-orange-500 to-red-500", glowColor: "#F05032" },
  { name: "GitHub", icon: <SiGithub />, bgGradient: "from-gray-700 to-gray-900", glowColor: "#FFFFFF" }
]
// StarField component for background particles
function StarField() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render on server to avoid hydration mismatch
  if (!mounted) {
    return <div className="star-field" />
  }

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
            Technologies I work with
          </p>
        </div>

        {/* ChromaGrid Skills */}
        <div className="relative">
          <StarField />
          <div ref={gridRef} className="relative z-10">
            <ChromaGrid
              radius={320}
              className="justify-center"
              items={skills.map((s) => {
                const bg = `linear-gradient(135deg, ${s.glowColor}33, #0b1220)`
                return {
                  icon: s.icon,
                  title: s.name,
                  borderColor: s.glowColor,
                  gradient: bg
                } as ChromaItem
              })}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-16 max-w-md mx-auto">
          {[
            { number: "4+", label: "Projects Completed" },
            { number: "2+", label: "Months Experience" }
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