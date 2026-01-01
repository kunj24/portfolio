'use client'

import { useRef, useState, useEffect } from 'react'
import { useFadeInAnimation, useStaggerAnimation } from '@/hooks/useGSAP'
import { Award, ExternalLink, CheckCircle, Calendar } from 'lucide-react'
import VariableProximity from '@/components/ui/VariableProximity'
import Image from 'next/image'

interface Certification {
  id: number
  title: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
  skills: string[]
  description: string
  logo?: string
  badge?: string
  color: string
}

// Add your certifications here
const certifications: Certification[] = [
  {
    id: 1,
    title: "Machine Learning with Python",
    issuer: "IBM via Coursera",
    date: "Aug 2025",
    credentialId: "DB6VLXWFS2JH",
    credentialUrl: "https://coursera.org/verify/DB6VLXWFS2JH",
    skills: ["Machine Learning", "Python", "Data Science", "AI"],
    description: "Successfully completed IBM's comprehensive Machine Learning course covering supervised and unsupervised learning, classification, regression, and clustering algorithms.",
    color: "#0F62FE"
  },
  {
    id: 2,
    title: "MERN Stack Front To Back: Full Stack React, Redux & Node.js",
    issuer: "Coursera & Packt",
    date: "Aug 2025",
    credentialId: "GRA7DGBY4QX3",
    credentialUrl: "https://drive.google.com/file/d/1oIJWfez3S1eFwb9EbKf3RRNRPzL8SXYj/view?usp=drive_link",
    skills: ["MERN Stack", "React", "Redux", "Node.js", "MongoDB", "Express"],
    description: "Successfully completed 3-course specialization covering full-stack MERN development: Backend Development & API Creation, Frontend Development with React, and Advanced Frontend Development & Deployment.",
    color: "#FF6B35"
  },
  {
    id: 3,
    title: "Design and Analysis of Algorithms",
    issuer: "NPTEL - IIT Madras",
    date: "Jan-Mar 2025",
    credentialId: "NPTEL25CS23S24600000",
    credentialUrl: "https://drive.google.com/file/d/1PYJxqtoGP4dFAysU9WA_Xwm6J_wkmN-z/view?usp=drive_link",
    skills: ["Algorithm Design", "Algorithm Analysis", "Complexity", "Optimization"],
    description: "Successfully completed 8-week NPTEL course on advanced algorithm design and analysis techniques. Score: 50%",
    color: "#9B59B6"
  },
  {
    id: 4,
    title: "Data Structure and Algorithms using Java",
    issuer: "NPTEL - IIT Kharagpur",
    date: "Jul-Oct 2024",
    credentialId: "NPTEL24CS96S463000507",
    credentialUrl: "https://drive.google.com/file/d/11YTbxIzj6wIhfJ_q2smC3oum0D0ZIX-c/view?usp=drive_link",
    skills: ["Data Structures", "Algorithms", "Java", "Problem Solving"],
    description: "Successfully completed 12-week NPTEL course covering comprehensive data structures and algorithms implementation using Java. Score: 53%",
    color: "#3776AB"
  },
  {
    id: 5,
    title: "Getting Started with AI on Jetson Nano",
    issuer: "NVIDIA",
    date: "Jan 2025",
    credentialId: "Su6kW0VLSo-GsU4vAAsCOw",
    credentialUrl: "https://drive.google.com/file/d/1p9QpkPZhn-B_UtKZfEjXOzVIn_c4UrdZ/view?usp=drive_link",
    skills: ["AI", "Jetson Nano", "Deep Learning", "Edge Computing", "NVIDIA"],
    description: "Certificate of Competency awarded by NVIDIA for demonstrating competence in AI deployment on Jetson Nano edge devices.",
    color: "#76B900"
  },
  {
    id: 6,
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "Mar 2025",
    credentialId: "6451c65f8647",
    credentialUrl: "https://drive.google.com/file/d/1qkhJ79G7ZxN0BC87UuvvNIausw26J7Gw/view?usp=drive_link",
    skills: ["Problem Solving", "Algorithms", "Data Structures", "Programming"],
    description: "Certificate of Accomplishment for passing the HackerRank Problem Solving (Basic) skill certification test.",
    color: "#00EA64"
  }
]

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [backgroundParticles, setBackgroundParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([])

  // Generate particles only on client side to avoid hydration errors
  useEffect(() => {
    setMounted(true)
    setBackgroundParticles(
      Array.from({ length: 10 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${8 + Math.random() * 12}s`
      }))
    )
  }, [])

  // Animations removed to prevent blinking on scroll

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 px-5 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Effects - Subtle and calm */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        {/* Animated gradient blobs - more subtle */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        {/* Floating particles - fewer and more subtle */}
        <div className="absolute inset-0">
          {mounted && backgroundParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 px-2"
          >
            <VariableProximity
              label="Certifications & Achievements"
              fromFontVariationSettings="'wght' 400, 'wdth' 100"
              toFontVariationSettings="'wght' 700, 'wdth' 90"
              containerRef={titleRef as React.MutableRefObject<HTMLElement | null>}
              radius={220}
              gradientWords={[0]}
              className=""
            />
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Professional certifications and continuous learning
          </p>
        </div>

        {/* Certifications Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
        >
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="cert-card group relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(cert.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-full bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border border-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-5 md:p-6 transition-all duration-500 active:scale-[1.02] md:hover:scale-[1.08] md:hover:-translate-y-3 md:hover:shadow-[0_20px_80px_rgba(var(--primary-rgb),0.5)] hover:border-primary/50 overflow-hidden transform-gpu">
                {/* Animated gradient overlay - only on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${cert.color}30, ${cert.color}15 50%, transparent 70%)`
                  }}
                />
                
                {/* Neon glow border */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 15px ${cert.color}60, 0 0 20px ${cert.color}40`
                  }}
                />

                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-3xl pointer-events-none group-hover:animate-pulse-slow"
                  style={{
                    background: `radial-gradient(circle at center, ${cert.color}, ${cert.color}80 40%, transparent 70%)`
                  }}
                />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </div>

                {/* Particle effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {[...Array(8)].map((_, i) => {
                    // Use deterministic positions based on index to avoid hydration errors
                    const positions = [
                      { left: '10%', top: '20%', size: 4 },
                      { left: '80%', top: '15%', size: 6 },
                      { left: '25%', top: '70%', size: 5 },
                      { left: '65%', top: '60%', size: 3 },
                      { left: '45%', top: '30%', size: 7 },
                      { left: '15%', top: '85%', size: 4 },
                      { left: '90%', top: '75%', size: 5 },
                      { left: '35%', top: '50%', size: 6 }
                    ]
                    const pos = positions[i]
                    return (
                      <div
                        key={i}
                        className="absolute rounded-full animate-float"
                        style={{
                          left: pos.left,
                          top: pos.top,
                          width: `${pos.size}px`,
                          height: `${pos.size}px`,
                          backgroundColor: cert.color,
                          boxShadow: `0 0 ${10 + pos.size * 2}px ${cert.color}`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${3 + (i % 3)}s`
                        }}
                      />
                    )
                  })}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="relative">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10"
                        style={{
                          background: `linear-gradient(135deg, ${cert.color}40, ${cert.color}20)`,
                          border: `2px solid ${cert.color}60`,
                          boxShadow: `0 0 20px ${cert.color}40`
                        }}
                      >
                        <Award
                          className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-500 group-hover:scale-110"
                          style={{ color: cert.color }}
                        />
                      </div>
                      {/* Pulsing ring */}
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                        style={{
                          border: `2px solid ${cert.color}`,
                          animationDuration: '1.5s'
                        }}
                      />
                      {/* Rotating glow ring */}
                      <div
                        className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 animate-spin-slow"
                        style={{
                          background: `conic-gradient(from 0deg, ${cert.color}, transparent, ${cert.color})`,
                          filter: 'blur(8px)'
                        }}
                      />
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-125 hover:rotate-12"
                        aria-label="View Certificate"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-primary drop-shadow-lg" />
                      </a>
                    )}
                  </div>

                  {/* Title and Issuer */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 sm:mb-3 transition-all duration-300 leading-snug">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <CheckCircle className="w-4 h-4 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <p className="text-sm sm:text-sm font-semibold text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 text-sm sm:text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Issued {cert.date}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 sm:gap-2 mb-4 sm:mb-4">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 sm:px-2.5 py-1 sm:py-1 text-xs sm:text-xs font-medium rounded-full border transition-all duration-300 md:group-hover:scale-110 md:group-hover:shadow-lg md:hover:brightness-125 active:scale-95"
                        style={{
                          backgroundColor: `${cert.color}20`,
                          borderColor: `${cert.color}50`,
                          color: cert.color,
                          boxShadow: hoveredId === cert.id ? `0 0 10px ${cert.color}40` : 'none',
                          animationDelay: `${idx * 0.05}s`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="text-xs sm:text-xs text-muted-foreground/70 font-mono mb-2 sm:mb-3 truncate">
                      ID: {cert.credentialId}
                    </div>
                  )}

                  {/* View Certificate Button */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 sm:mt-4 inline-flex items-center gap-2 px-4 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-sm font-medium rounded-lg transition-all duration-300 opacity-100 translate-y-0 active:scale-95 md:hover:scale-105 relative overflow-hidden group/btn"
                      style={{
                        backgroundColor: `${cert.color}25`,
                        color: cert.color,
                        border: `1px solid ${cert.color}50`,
                        boxShadow: `0 0 15px ${cert.color}30`
                      }}
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <span className="relative z-10">View Certificate</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 group-hover/btn:rotate-12 transition-transform duration-300" />
                    </a>
                  )}
                </div>

                {/* Corner Decoration */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-10 transition-opacity duration-500 group-hover:opacity-20"
                  style={{
                    background: `radial-gradient(circle at top right, ${cert.color}, transparent 70%)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mt-10 sm:mt-12 md:mt-16 max-w-4xl mx-auto px-2">
          {[
            { number: "6+", label: "Certifications", icon: "🏆" },
            { number: "5+", label: "Platforms", icon: "🌐" },
            { number: "500+", label: "Hours Learning", icon: "⏱️" },
            { number: "100%", label: "Completion Rate", icon: "✨" }
          ].map((stat, idx) => (
            <div key={idx} className="group text-center p-4 sm:p-4 md:p-5 rounded-xl bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500 active:scale-105 md:hover:scale-110 md:hover:shadow-[0_10px_40px_rgba(var(--primary-rgb),0.4)] md:hover:-translate-y-1 relative overflow-hidden transform-gpu">
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, var(--primary), var(--accent), var(--primary))',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite',
                  padding: '1px',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMaskComposite: 'xor'
                }}
              />
              
              <div className="relative z-10">
                <div className="text-3xl sm:text-3xl md:text-4xl mb-2 sm:mb-2 md:group-hover:scale-125 md:group-hover:rotate-12 transition-all duration-500 inline-block">{stat.icon}</div>
                <div className="text-2xl sm:text-2xl md:text-3xl font-bold gradient-text mb-1 sm:mb-1 md:group-hover:scale-110 transition-transform duration-500">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
