'use client'

import { useRef, useState } from 'react'
import { useFadeInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'

const projects = [
  {
    id: 1,
    title: "Electrotrack",
    description: "Advanced electronics tracking and inventory management system with real-time monitoring capabilities.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/kunj24/Electrotrack",
    category: "Full Stack",
    featured: true,
    colors: {
      primary: "59, 130, 246", // blue
      secondary: "147, 51, 234", // purple
      accent: "16, 185, 129" // emerald
    }
  },
  {
    id: 2,
    title: "FaceBeats",
    description: "AI-powered facial recognition music recommendation system that analyzes emotions to suggest personalized playlists.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "ML"],
    githubUrl: "https://github.com/kunj24/facebeats",
    category: "AI/ML",
    featured: true,
    colors: {
      primary: "236, 72, 153", // pink
      secondary: "168, 85, 247", // violet
      accent: "34, 197, 94" // green
    }
  },
  {
    id: 3,
    title: "Wanderlust",
    description: "Travel planning and discovery platform with interactive maps, itinerary builder, and community features.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/kunj24/wanderlust",
    category: "Web App",
    featured: true,
    colors: {
      primary: "34, 197, 94", // green
      secondary: "14, 165, 233", // sky
      accent: "251, 191, 36" // amber
    }
  },
  {
    id: 4,
    title: "Thinkly",
    description: "Intelligent note-taking and knowledge management system with AI-powered insights and smart organization.",
    technologies: ["React", "TypeScript", "Supabase", "OpenAI API"],
    githubUrl: "https://github.com/kunj24/Thinkly",
    category: "Productivity",
    featured: true,
    colors: {
      primary: "251, 146, 60", // orange
      secondary: "239, 68, 68", // red
      accent: "168, 85, 247" // violet
    }
  },
  {
    id: 5,
    title: "HACK-MASTER",
    description: "Comprehensive cybersecurity toolkit for penetration testing and security analysis with advanced features.",
    technologies: ["Python", "Bash", "Kali Linux", "Metasploit"],
    githubUrl: "https://github.com/kunj24/HACK-MASTER",
    category: "Cybersecurity",
    featured: true,
    colors: {
      primary: "239, 68, 68", // red
      secondary: "15, 23, 42", // slate
      accent: "156, 163, 175" // gray
    }
  }
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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

  const handleArrowClick = () => {
    // Smooth scroll to top of page or next section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      ref={cardRef}
      className="group relative backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 hover:transform hover:scale-[1.02] hover:rotate-1"
      style={{ 
        animationDelay: `${index * 0.15}s`,
        background: `linear-gradient(135deg, 
          rgba(${project.colors.primary}, 0.1) 0%,
          rgba(${project.colors.secondary}, 0.08) 50%,
          rgba(${project.colors.accent}, 0.05) 100%)`,
        transform: isHovered 
          ? `perspective(1200px) rotateY(${(mousePosition.x - 50) * 0.08}deg) rotateX(${(mousePosition.y - 50) * -0.08}deg) scale(1.02)` 
          : 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)',
        boxShadow: isHovered 
          ? `0 25px 50px -12px rgba(${project.colors.primary}, 0.25), 0 0 0 1px rgba(${project.colors.primary}, 0.1)`
          : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Color Overlay */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(${project.colors.primary}, 0.25) 0%,
                rgba(${project.colors.secondary}, 0.15) 40%,
                rgba(${project.colors.accent}, 0.1) 80%,
                transparent 100%)`
            : undefined
        }}
      />
      
      {/* Animated Glow Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${isHovered ? 'opacity-60' : 'opacity-0'}`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(${project.colors.primary}, 0.4) 0%,
            rgba(${project.colors.secondary}, 0.2) 50%,
            transparent 70%)`,
          filter: 'blur(40px)',
          transform: isHovered ? 'scale(1.5)' : 'scale(1)'
        }}
      />

      {/* Rotating Border Animation */}
      <div 
        className={`absolute inset-0 rounded-3xl transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: `conic-gradient(from ${index * 72 + (isHovered ? 180 : 0)}deg, 
            rgba(${project.colors.primary}, 0.6) 0deg,
            rgba(${project.colors.secondary}, 0.4) 120deg,
            rgba(${project.colors.accent}, 0.6) 240deg,
            rgba(${project.colors.primary}, 0.6) 360deg)`,
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          animation: isHovered ? 'spin 8s linear infinite' : undefined
        }}
      />

      {/* Shimmer Effect */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%,
            rgba(${project.colors.primary}, 0.1) 25%,
            rgba(${project.colors.accent}, 0.2) 50%,
            rgba(${project.colors.primary}, 0.1) 75%,
            transparent 100%)`,
          transform: `translateX(${isHovered ? '100%' : '-100%'})`
        }}
      />
      
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span 
              className="inline-block px-4 py-2 text-xs font-semibold rounded-full mb-3 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.2), rgba(${project.colors.secondary}, 0.1))`,
                color: `rgb(${project.colors.primary})`,
                border: `1px solid rgba(${project.colors.primary}, 0.3)`,
                boxShadow: isHovered ? `0 0 20px rgba(${project.colors.primary}, 0.3)` : undefined
              }}
            >
              {project.category}
            </span>
            <h3 className="text-2xl font-bold text-white mb-2 transition-all duration-300 hover:scale-105">
              {project.title}
            </h3>
          </div>
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12"
            style={{
              background: `linear-gradient(135deg, rgba(${project.colors.primary}, 0.9), rgba(${project.colors.secondary}, 0.7))`,
              boxShadow: isHovered 
                ? `0 0 30px rgba(${project.colors.primary}, 0.5), 0 0 60px rgba(${project.colors.secondary}, 0.3)`
                : `0 5px 15px rgba(${project.colors.primary}, 0.3)`
            }}
          >
            <svg className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>

        {/* Enhanced Technologies with stagger animation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={tech}
                className="px-3 py-2 text-xs font-semibold rounded-full border transition-all duration-500 hover:scale-110 hover:rotate-3 cursor-default"
                style={{
                  background: `linear-gradient(135deg, rgba(${project.colors.accent}, 0.15), rgba(${project.colors.primary}, 0.1))`,
                  color: `rgb(${project.colors.accent})`,
                  borderColor: `rgba(${project.colors.accent}, 0.3)`,
                  animationDelay: `${techIndex * 0.1}s`,
                  transform: isHovered ? `translateY(-${techIndex * 2}px) scale(1.05)` : 'translateY(0px) scale(1)',
                  boxShadow: isHovered ? `0 5px 15px rgba(${project.colors.accent}, 0.2)` : undefined
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex items-center gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium text-center transition-all duration-500 group relative overflow-hidden ${
              isHovered ? 'shadow-2xl shadow-primary/40 transform scale-105' : 'shadow-lg shadow-primary/25'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </span>
            <div className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transition-transform duration-500 ${isHovered ? 'translate-x-0' : 'translate-x-full'}`} />
          </a>
          <button 
            onClick={handleArrowClick}
            className={`px-4 py-3 border border-white/20 text-white rounded-lg transition-all duration-500 hover:bg-white/10 relative overflow-hidden group ${
              isHovered ? 'rotate-12 scale-110' : ''
            }`}>
            <svg className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Featured</span> Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work spanning full-stack development, AI/ML, and modern web applications.
          </p>
        </div>

        {/* Projects Grid - Enhanced Layout for 5 Projects */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* First row: 3 projects on desktop, 2 on tablet, 1 on mobile */}
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          
          {/* Second row: 2 projects centered */}
          <div className="md:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {projects.slice(3, 5).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + 3} />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/kunj24"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}