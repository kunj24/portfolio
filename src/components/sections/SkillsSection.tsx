"use client"

import { useRef, useState, useEffect } from 'react'
import { useFadeInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'
import { SiHtml5, SiCss3, SiTailwindcss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiFlutter, SiNodedotjs, SiExpress, SiEjs, SiMongodb, SiC, SiCplusplus, SiPython, SiGit, SiGithub } from 'react-icons/si'
import VariableProximity from '@/components/ui/VariableProximity'
import ChromaGrid, { ChromaItem } from '@/components/ui/ChromaGrid'

const skills = [
  { name: "HTML", icon: <SiHtml5 />, bgGradient: "from-orange-500 to-red-500", glowColor: "#E34F26" },
  { name: "CSS", icon: <SiCss3 />, bgGradient: "from-blue-500 to-blue-600", glowColor: "#1572B6" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, bgGradient: "from-cyan-400 to-teal-500", glowColor: "#06B6D4" },
  { name: "JavaScript", icon: <SiJavascript />, bgGradient: "from-yellow-400 to-orange-500", glowColor: "#F7DF1E" },
  { name: "TypeScript", icon: <SiTypescript />, bgGradient: "from-blue-500 to-blue-700", glowColor: "#3178C6" },
  { name: "React", icon: <SiReact />, bgGradient: "from-cyan-400 to-blue-500", glowColor: "#61DAFB" },
  { name: "Flutter", icon: <SiFlutter />, bgGradient: "from-blue-400 to-blue-700", glowColor: "#02569B" },
  { name: "Next.js", icon: <SiNextdotjs />, bgGradient: "from-gray-600 to-gray-800", glowColor: "#FFFFFF" },
  { name: "Node.js", icon: <SiNodedotjs />, bgGradient: "from-green-500 to-green-600", glowColor: "#339933" },
  { name: "Express.js", icon: <SiExpress />, bgGradient: "from-gray-700 to-gray-900", glowColor: "#68A063" },
  { name: "EJS", icon: <SiEjs />, bgGradient: "from-red-400 to-red-600", glowColor: "#A91E50" },
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
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            <VariableProximity
              label="Technical Skills"
              fromFontVariationSettings="'wght' 400, 'wdth' 100"
              toFontVariationSettings="'wght' 700, 'wdth' 90"
              containerRef={titleRef as React.MutableRefObject<HTMLElement | null>}
              radius={220}
              gradientWords={[0]}
              className=""
            />
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Technologies I work with
          </p>
        </div>

        {/* ChromaGrid Skills - mobile optimized */}
        <div className="relative">
          <StarField />
          <div ref={gridRef} className="relative z-10">
            <ChromaGrid
              radius={200}
              className="justify-center max-w-full"
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

        {/* Stats - Crazy Animated without boxes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-5xl mx-auto px-4">
          {[
            { number: "18+", label: "Technologies", icon: "🔧", color: "#2ee6c1" },
            { number: "4+", label: "Projects", icon: "🚀", color: "#ff4da6" },
            { number: "2+", label: "Months Exp", icon: "⏱️", color: "#06b6d4" },
            { number: "4", label: "Categories", icon: "📁", color: "#a855f7" }
          ].map((stat, index) => (
            <div key={stat.label} className="group text-center relative">
              {/* Animated circles behind icon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="relative w-16 h-16 sm:w-18 sm:h-18">
                  <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{ 
                    borderColor: stat.color,
                    opacity: 0.3,
                    animationDuration: '2s'
                  }} />
                  <div className="absolute inset-2 rounded-full border animate-spin-slow" style={{ 
                    borderColor: stat.color,
                    borderStyle: 'dashed',
                    opacity: 0.5,
                    animationDuration: '3s'
                  }} />
                  <div className="absolute inset-0 rounded-full" style={{
                    background: `radial-gradient(circle, ${stat.color}20, transparent)`,
                    animation: 'pulse 2s ease-in-out infinite'
                  }} />
                </div>
              </div>
              
              {/* Icon with crazy animations */}
              <div className="relative inline-block text-3xl sm:text-4xl mb-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" style={{
                filter: `drop-shadow(0 0 15px ${stat.color}80)`,
              }}>
                {stat.icon}
                {/* Orbiting particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full animate-orbit" style={{ 
                    backgroundColor: stat.color,
                    boxShadow: `0 0 8px ${stat.color}`,
                    animationDuration: '2s'
                  }} />
                  <div className="absolute top-1/2 left-0 w-1 h-1 rounded-full" style={{ 
                    backgroundColor: stat.color,
                    boxShadow: `0 0 6px ${stat.color}`,
                    animation: 'orbit 2.5s linear infinite',
                    animationDelay: '0.5s'
                  }} />
                </div>
              </div>
              
              {/* Number with gradient and glow */}
              <div className="relative">
                <div className="text-2xl sm:text-3xl font-black mb-1 transition-all duration-500 group-hover:scale-105 animate-pulse-slow" style={{
                  background: `linear-gradient(135deg, ${stat.color}, white)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 12px ${stat.color}60)`,
                  animationDelay: `${index * 0.15}s`
                }}>
                  {stat.number}
                </div>
                {/* Animated underline */}
                <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 mx-auto rounded-full" style={{
                  backgroundColor: stat.color,
                  boxShadow: `0 0 8px ${stat.color}`
                }} />
              </div>
              
              {/* Label with shimmer effect */}
              <div className="relative overflow-hidden">
                <div className="text-xs sm:text-sm font-medium transition-all duration-300 group-hover:text-white" style={{
                  color: `${stat.color}cc`
                }}>
                  {stat.label}
                </div>
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}