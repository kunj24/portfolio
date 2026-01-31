'use client'

import { useRef, useState, useEffect } from 'react'
import { useFadeInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'
import VariableProximity from '@/components/ui/VariableProximity'

const projects = [
  {
    id: 1,
    title: "Electrotrack",
    description: "Advanced electronics tracking and inventory management system with real-time monitoring capabilities.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/kunj24/Electrotrack",
    category: "Full Stack",
    featured: true
  },
  {
    id: 2,
    title: "FaceBeats",
    description: "AI-powered facial recognition music recommendation system that analyzes emotions to suggest personalized playlists.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "ML"],
    githubUrl: "https://github.com/kunj24/facebeats",
    category: "AI/ML",
    featured: true
  },
  {
    id: 3,
    title: "Wanderlust",
    description: "Full-stack hotel listing platform with user authentication, review system, and MongoDB Atlas cloud database. Features secure CRUD operations, star ratings, and responsive design.",
    technologies: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap", "Passport.js"],
    githubUrl: "https://github.com/kunj24/wanderlust",
    liveUrl: "https://wanderlust-sylk.onrender.com",
    category: "Full Stack",
    featured: true
  },
  {
    id: 4,
    title: "Thinkly",
    description: "Learning platform built with the MERN stack, featuring courses, user progress tracking, and instructor dashboards.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "TypeScript"],
    githubUrl: "https://github.com/kunj24/Thinkly",
  category: "MERN Stack",
    featured: true
  },
  {
    id: 5,
    title: "HACK-MASTER",
  description: "Crop-prediction system that lets farmers input local parameters (rainfall, soil type, temperature, available area) and returns recommended crops and planting strategies using ML models.",
  technologies: ["Python", "scikit-learn", "TensorFlow", "Pandas", "Flask"],
    githubUrl: "https://github.com/kunj24/HACK-MASTER",
    category: "AI/ML",
    featured: true
  }
  ,
  {
    id: 6,
    title: "Portfolio",
    description: "Personal portfolio built with Next.js, showcasing projects, 3D scenes, and interactive UI components.",
    technologies: ["Next.js", "React", "Three.js", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/kunj24/portfolio",
    liveUrl: "https://portfolio-ruby-iota-47.vercel.app/",
    category: "Personal",
    featured: true
  }
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
}
  
function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const touch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
    setIsTouch(Boolean(touch))
  }, [])
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      className="project-card group relative bg-gradient-to-br from-black/80 to-gray-900/90 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-700 md:hover:transform md:hover:scale-110 md:hover:rotate-2 md:hover:shadow-2xl md:hover:shadow-primary/30 animate-card-glow md:animate-morph w-full min-h-[450px]"
      style={{ 
        animationDelay: `${index * 0.15}s`,
        transform: (!isTouch && isHovered) 
          ? `perspective(1000px) rotateY(${(mousePosition.x - 50) * 0.15}deg) rotateX(${(mousePosition.y - 50) * -0.15}deg) scale(1.08)` 
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
      }}
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseMove={(e) => !isTouch && handleMouseMove(e)}
      onMouseLeave={() => !isTouch && handleMouseLeave()}
      role="region"
      aria-label={`Project ${project.title}`}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            style={{
              left: `${15 + i * 14}%`,
              top: `${10 + (i % 3) * 30}%`,
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 10px currentColor'
            }}
          />
        ))}
      </div>
      
      {/* Animated rotating border */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl animate-spin-slow" style={{ animationDuration: '8s' }}>
          <div className="absolute inset-[-2px] rounded-2xl" style={{
            background: 'linear-gradient(90deg, #2ee6c1, #ff4da6, #2ee6c1)',
            backgroundSize: '200% 100%',
            animation: 'gradient-rotate 3s linear infinite',
            filter: 'blur(8px)',
            opacity: 0.4
          }} />
        </div>
      </div>
      
      {/* Animated Gradient Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-purple/20 transition-all duration-700 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--primary-rgb), 0.4), rgba(var(--accent-rgb), 0.3), transparent 70%)`
            : undefined
        }}
      />
      
      {/* Dynamic Glow Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${isHovered ? 'opacity-80' : 'opacity-0'}`}
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--primary-rgb), 0.4), rgba(var(--accent-rgb), 0.3), transparent 60%)`
            : undefined,
          filter: 'blur(20px)',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)'
        }}
      />

      {/* Animated Border */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: `conic-gradient(from ${index * 72}deg, rgba(var(--primary-rgb), 0.5), rgba(var(--accent-rgb), 0.5), rgba(var(--primary-rgb), 0.5))`,
          padding: '2px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor'
        }}
      />
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 rounded-2xl" />
      
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 pr-4">
            <span className="inline-block px-3 py-1.5 text-sm font-medium bg-primary/20 text-primary rounded-full mb-3">
              {project.category}
            </span>
            <h3 className="text-3xl font-bold text-white mb-3 leading-tight transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent group-hover:to-primary group-hover:drop-shadow-[0_0_15px_rgba(46,230,193,0.6)]">{project.title}</h3>
          </div>
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
            {/* Animated rotating ring */}
            <div className="absolute inset-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ animationDuration: '4s' }}>
                <div className="absolute inset-0 rounded-full border-2 border-[#2ee6c1]/80 shadow-[0_0_15px_rgba(46,230,193,0.6)]" style={{ borderStyle: 'dashed' }} />
              </div>
            </div>
            {/* Pulsing glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping" style={{ 
              background: 'radial-gradient(circle, rgba(46, 230, 193, 0.3), transparent)',
              animationDuration: '2s'
            }} />
            <svg className="w-6 h-6 text-white group-hover:scale-125 group-hover:rotate-[360deg] transition-all duration-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed text-base">
          {project.description}
        </p>

        {/* Technologies with stagger animation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={tech}
                className={`px-3 py-1.5 text-sm font-medium bg-white/15 text-white rounded-full border border-white/25 transition-all duration-500 md:hover:bg-white/25 md:hover:scale-110 md:hover:shadow-lg flex items-center ${(!isTouch && isHovered) ? 'animate-pulse' : ''}`}
                style={{
                  animationDelay: `${techIndex * 0.1}s`,
                  transform: (!isTouch && isHovered) ? `translateY(-${techIndex * 2}px)` : 'translateY(0px)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex flex-row items-center gap-4 mt-auto pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 bg-gradient-to-r from-primary to-accent text-white px-6 py-3.5 rounded-lg font-medium text-center transition-all duration-500 group relative overflow-hidden flex items-center justify-center touch-manipulation border border-primary/30 hover:border-primary ${
              (!isTouch && isHovered) ? 'shadow-[0_0_25px_rgba(var(--primary-rgb),0.4)] transform scale-105 border-primary' : 'shadow-md shadow-primary/15'
            }`}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
            
            {/* Pulse ring effect */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100">
              <div className="absolute inset-0 rounded-lg animate-ping bg-primary/30" style={{ animationDuration: '2s' }} />
            </div>
            
            <span className="relative z-10 flex items-center justify-center gap-2 text-base">
              <svg className="w-4 h-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="group-hover:tracking-widest transition-all duration-500">GitHub</span>
            </span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-3.5 bg-white/10 hover:bg-gradient-to-r hover:from-accent/40 hover:to-primary/40 border border-white/40 hover:border-accent text-white rounded-lg font-medium transition-all duration-500 group relative overflow-hidden flex items-center justify-center gap-2 touch-manipulation ${
                (!isTouch && isHovered) ? 'transform scale-110 shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] border-accent' : ''
              }`}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
              
              {/* Shine sweep */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-lg animate-pulse bg-accent/20" />
              </div>
              
              <svg className="w-4 h-4 relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm font-semibold relative z-10 group-hover:tracking-widest transition-all duration-500">Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useFadeInAnimation(sectionRef)
  useStaggerAnimation(gridRef, '.group', { delay: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Animated Background Effects - reduced on mobile */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-primary/10 via-accent/10 to-purple-500/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient-x" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4"
          >
            <VariableProximity
              label="Featured Projects"
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
            A collection of my recent work spanning full-stack development, AI/ML, and modern web applications.
          </p>
        </div>

        {/* Projects Grid - Mobile-optimized Layout */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* All projects in responsive grid */}
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action - Crazy Animated Button */}
        <div className="text-center mt-12 sm:mt-16 px-4">
          <div className="group relative inline-block">
            {/* Animated rotating rings - outer */}
            <div className="absolute inset-0 -m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-2xl animate-spin-slow" style={{ animationDuration: '4s' }}>
                <div className="absolute inset-0 rounded-2xl border-2 border-[#2ee6c1]/80 shadow-[0_0_15px_rgba(46,230,193,0.6)]" style={{ 
                  borderStyle: 'dashed',
                }} />
              </div>
            </div>
            <div className="absolute inset-0 -m-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-2xl" style={{ animation: 'spin 6s linear infinite reverse' }}>
                <div className="absolute inset-0 rounded-2xl border-2 border-[#ff4da6]/70 shadow-[0_0_15px_rgba(255,77,166,0.5)]" style={{ 
                  borderStyle: 'dotted',
                }} />
              </div>
            </div>
            
            <a
              href="https://github.com/kunj24"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-neutral-900/60 backdrop-blur-md text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-500 overflow-hidden touch-manipulation border border-neutral-800/50 hover:border-[#2ee6c1]/40 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(46,230,193,0.3),0_0_60px_rgba(255,77,166,0.2)]"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-[-2px] rounded-xl" style={{
                  background: 'linear-gradient(90deg, #2ee6c1, #06b6d4, #ff4da6, #2ee6c1)',
                  backgroundSize: '300% 100%',
                  animation: 'gradient-rotate 3s linear infinite',
                  filter: 'blur(10px)',
                  opacity: 0.5
                }} />
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              
              {/* Particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${10 + i * 11}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      animationDelay: `${i * 0.12}s`,
                      animationDuration: '1.2s'
                    }}
                  />
                ))}
              </div>
              
              {/* Strong glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                boxShadow: '0 0 30px rgba(46, 230, 193, 0.25), 0 0 50px rgba(255, 77, 166, 0.15)'
              }} />
              
              <div className="relative z-10 flex items-center gap-2.5">
                <svg className="w-5 h-5 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="bg-gradient-to-r from-[#2ee6c1] to-[#ff4da6] bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">View All Projects on GitHub</span>
                <svg className="w-4 h-4 transition-all duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}