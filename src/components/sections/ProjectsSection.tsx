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
    description: "Travel planning and discovery platform with interactive maps, itinerary builder, and community features.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/kunj24/wanderlust",
    category: "Web App",
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
      className="project-card group relative bg-gradient-to-br from-black/80 to-gray-900/90 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-700 md:hover:transform md:hover:scale-105 md:hover:rotate-1 md:hover:shadow-2xl md:hover:shadow-primary/20 animate-card-glow md:animate-morph w-full min-h-[400px] sm:min-h-[450px]"
      style={{ 
        animationDelay: `${index * 0.15}s`,
        transform: (!isTouch && isHovered) 
          ? `perspective(1000px) rotateY(${(mousePosition.x - 50) * 0.1}deg) rotateX(${(mousePosition.y - 50) * -0.1}deg) scale(1.05)` 
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
      }}
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseMove={(e) => !isTouch && handleMouseMove(e)}
      onMouseLeave={() => !isTouch && handleMouseLeave()}
      role="region"
      aria-label={`Project ${project.title}`}
    >
      {/* Animated Gradient Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-purple/20 transition-all duration-700 ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--primary-rgb), 0.3), rgba(var(--accent-rgb), 0.2), transparent 70%)`
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
      
      <div className="relative z-10 p-5 sm:p-6 md:p-6 lg:p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
          <div className="flex-1 pr-4">
            <span className="inline-block px-3 py-1.5 text-xs sm:text-sm font-medium bg-primary/20 text-primary rounded-full mb-3">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">{project.title}</h3>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-5 sm:mb-5 md:mb-6 flex-grow leading-relaxed text-sm sm:text-base md:text-base line-clamp-4 sm:line-clamp-3">
          {project.description}
        </p>

        {/* Technologies with stagger animation */}
        <div className="mb-5 sm:mb-5 md:mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={tech}
                className={`px-3 py-1.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium bg-white/15 text-white rounded-full border border-white/25 transition-all duration-500 md:hover:bg-white/25 md:hover:scale-110 md:hover:shadow-lg min-h-[32px] flex items-center ${(!isTouch && isHovered) ? 'animate-pulse' : ''}`}
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-auto pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 bg-gradient-to-r from-primary to-accent text-white px-6 sm:px-6 py-4 sm:py-3.5 rounded-lg font-medium text-center transition-all duration-500 group relative overflow-hidden min-h-[52px] sm:min-h-[48px] flex items-center justify-center touch-manipulation ${
              (!isTouch && isHovered) ? 'shadow-2xl shadow-primary/40 transform scale-105' : 'shadow-lg shadow-primary/25'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="hidden sm:inline">View on GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </span>
            <div className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transition-transform duration-500 ${(!isTouch && isHovered) ? 'translate-x-0' : 'translate-x-full'}`} />
          </a>
          <button className={`min-w-[52px] min-h-[52px] sm:min-w-[48px] sm:min-h-[48px] px-4 py-4 sm:py-3.5 border border-white/25 text-white rounded-lg transition-all duration-500 md:hover:bg-white/15 relative overflow-hidden group touch-manipulation ${
            (!isTouch && isHovered) ? 'rotate-12 scale-110' : ''
          }`}>
            <svg className="w-5 h-5 transition-transform duration-500 md:group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
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
      className="min-h-screen py-16 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-[400px] md:w-[600px] h-40 sm:h-[400px] md:h-[600px] bg-gradient-to-r from-primary/10 via-accent/10 to-purple-500/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient-x" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
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
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
          {/* All projects in responsive grid */}
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="group">
            <a
              href="https://github.com/kunj24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium transition-all duration-300 md:hover:shadow-lg md:hover:shadow-primary/25 md:hover:drop-shadow-[0_0_12px_rgba(var(--primary-rgb),0.7)] md:hover:transform md:hover:scale-105 relative overflow-hidden min-h-[44px] touch-manipulation"
            >
              {/* Colored overlay effect like education section */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 transition-transform duration-300 md:group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm sm:text-base">
                  <span className="hidden sm:inline">View All Projects on GitHub</span>
                  <span className="sm:hidden">All Projects</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}