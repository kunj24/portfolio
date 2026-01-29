'use client'

import { useRef } from 'react'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'
import VariableProximity from '@/components/ui/VariableProximity'
import WordReveal from '@/components/ui/WordReveal'
import { Code2, Sparkles, Rocket, Brain } from 'lucide-react'


export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.2 })
  useSlideInAnimation(contentRef, 'left', { delay: 0.4 })

  const stats = [
    { label: 'Industry Experience', value: '2+ Mo', icon: Rocket, color: 'from-blue-500 to-cyan-500' },
    { label: 'Projects Built', value: '5+', icon: Code2, color: 'from-purple-500 to-pink-500' },
    { label: 'Technologies', value: '18+', icon: Sparkles, color: 'from-orange-500 to-yellow-500' },
    { label: 'ML Models', value: '3+', icon: Brain, color: 'from-green-500 to-emerald-500' },
  ]

  const highlights = [
    { 
      title: 'Full-Stack Developer', 
      description: 'Building scalable web applications with modern frameworks',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
    },
    { 
      title: 'ML Enthusiast', 
      description: 'Exploring deep learning and computer vision solutions',
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30',
      glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
    },
    { 
      title: 'Problem Solver', 
      description: 'Passionate about creating efficient and elegant solutions',
      gradient: 'from-orange-500/20 to-yellow-500/20',
      border: 'border-orange-500/30',
      glow: 'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]'
    },
  ]
  
  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
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
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4 sm:mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Passionate Computer Science student specializing in machine learning and modern web development.
          </p>
        </div>

        {/* About Text Card - First */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-neutral-800/50 relative overflow-hidden group transition-all duration-500 hover:border-[#2ee6c1]/40">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-[-2px] rounded-2xl" style={{
                background: 'linear-gradient(90deg, #2ee6c1, #06b6d4, #3b82f6, #a855f7, #ff4da6, #2ee6c1)',
                backgroundSize: '300% 100%',
                animation: 'gradient-rotate 5s linear infinite',
                filter: 'blur(10px)',
                opacity: 0.4
              }} />
            </div>
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Decorative corner glows */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#2ee6c1]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#ff4da6]/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
            
            <div className="relative z-10 space-y-4 text-base sm:text-lg leading-relaxed text-neutral-300">
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

        {/* Stats Grid - Second */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-16 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group relative bg-neutral-900/60 backdrop-blur-md rounded-xl p-5 border border-neutral-800/50 transition-all duration-500 overflow-visible hover:scale-105 hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-[-2px] rounded-xl" style={{
                    background: `linear-gradient(135deg, ${stat.color.replace('from-', '').replace('to-', ', ').replace(' ', '')})`,
                    backgroundSize: '200% 200%',
                    animation: 'gradient-rotate 3s ease-in-out infinite',
                    filter: 'blur(8px)',
                    opacity: 0.5
                  }} />
                </div>
                
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 25px ${stat.color.includes('blue') ? 'rgba(59, 130, 246, 0.2)' : stat.color.includes('purple') ? 'rgba(168, 85, 247, 0.2)' : stat.color.includes('orange') ? 'rgba(249, 115, 22, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
                  }}
                />
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-2.5">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors font-medium">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Highlights Grid - Third */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`group relative bg-neutral-900/60 backdrop-blur-md rounded-2xl p-6 border ${highlight.border} transition-all duration-500 overflow-visible hover:scale-105 hover:-translate-y-2`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-[-2px] rounded-2xl" style={{
                  background: `linear-gradient(135deg, ${
                    highlight.gradient.includes('blue') ? '#3b82f6, #06b6d4' : 
                    highlight.gradient.includes('purple') ? '#a855f7, #ec4899' : 
                    '#f97316, #fbbf24'
                  })`,
                  backgroundSize: '200% 200%',
                  animation: 'gradient-rotate 3s ease-in-out infinite',
                  filter: 'blur(8px)',
                  opacity: 0.5
                }} />
              </div>
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#2ee6c1] transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  <div className="w-2 h-2 rounded-full bg-[#2ee6c1] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </div>
                <p className="text-neutral-400 group-hover:text-neutral-300 text-sm leading-relaxed transition-colors">
                  {highlight.description}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#2ee6c1]/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}