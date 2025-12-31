'use client'

import { useRef, useState } from 'react'
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
    color: "#D35400"
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

  // Animations removed to prevent blinking on scroll

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
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
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Professional certifications and continuous learning
          </p>
        </div>

        {/* Certifications Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="cert-card group relative"
              onMouseEnter={() => setHoveredId(cert.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-full bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30 overflow-hidden">
                {/* Animated gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${cert.color}15, transparent 70%)`
                  }}
                />

                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${cert.color}, transparent 60%)`
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                      style={{
                        background: `linear-gradient(135deg, ${cert.color}33, ${cert.color}11)`,
                        border: `2px solid ${cert.color}44`
                      }}
                    >
                      <Award
                        className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-500"
                        style={{ color: cert.color }}
                      />
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                        aria-label="View Certificate"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </a>
                    )}
                  </div>

                  {/* Title and Issuer */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Issued {cert.date}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full border transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${cert.color}15`,
                          borderColor: `${cert.color}40`,
                          color: cert.color
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="text-[10px] sm:text-xs text-muted-foreground/70 font-mono mb-2 truncate">
                      ID: {cert.credentialId}
                    </div>
                  )}

                  {/* View Certificate Button */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0"
                      style={{
                        backgroundColor: `${cert.color}20`,
                        color: cert.color,
                        border: `1px solid ${cert.color}40`
                      }}
                    >
                      View Certificate
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto">
          {[
            { number: certifications.length, label: "Certifications", icon: "🏆" },
            { number: "6+", label: "Platforms", icon: "🌐" },
            { number: "1000+", label: "Hours Learning", icon: "⏱️" },
            { number: "100%", label: "Completion Rate", icon: "✨" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-3 sm:p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-0.5 sm:mb-1">
                {stat.number}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
