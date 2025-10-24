'use client'

import { useState, useRef } from 'react'
import { Certificate } from '@/types'
import { useFadeInAnimation, useSlideInAnimation } from '@/hooks/useGSAP'
import CertificateCard from '@/components/ui/CertificateCard'
import WordReveal from '@/components/ui/WordReveal'
import { Filter, Award, BookOpen, Brain, Code, Trophy } from 'lucide-react'

// Sample certificate data - replace with your actual certificates
const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Machine Learning with Python',
    organization: 'Coursera',
    category: 'machine-learning',
    dateEarned: '2024',
    pdfUrl: '/certificates/Coursera Machine Learning with Python..pdf',
    description: 'Comprehensive course covering machine learning algorithms, data analysis, and Python programming for ML applications.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Scikit-learn', 'Pandas', 'NumPy'],
    credentialId: 'ML-PY-2024'
  },
  {
    id: '2',
    title: 'MERN Stack Development',
    organization: 'Coursera',
    category: 'web-development',
    dateEarned: '2024',
    pdfUrl: '/certificates/Coursera MERN Stack.pdf',
    description: 'Full-stack web development using MongoDB, Express.js, React, and Node.js technologies.',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'REST APIs'],
    credentialId: 'MERN-2024'
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms using Java',
    organization: 'Certification Authority',
    category: 'algorithms',
    dateEarned: '2023',
    pdfUrl: '/certificates/Data Structure and Algorithms using Java.pdf',
    description: 'Advanced course in data structures and algorithms implementation using Java programming language.',
    skills: ['Java', 'Data Structures', 'Algorithms', 'Problem Solving', 'Complexity Analysis'],
    credentialId: 'DSA-JAVA-2023'
  },
  {
    id: '4',
    title: 'Design and Analysis of Algorithms',
    organization: 'NPTEL',
    category: 'algorithms',
    dateEarned: '2023',
    pdfUrl: '/certificates/Design and analysis of algorithms NPTEL .pdf',
    description: 'In-depth study of algorithm design techniques and complexity analysis methodologies.',
    skills: ['Algorithm Design', 'Complexity Analysis', 'Dynamic Programming', 'Graph Algorithms'],
    credentialId: 'NPTEL-ALG-2023'
  },
  {
    id: '5',
    title: 'Nirma University Hackathon Winner',
    organization: 'Nirma University',
    category: 'competition',
    dateEarned: '2024',
    pdfUrl: '/certificates/Nirma (NU) Hackathon.pdf',
    description: 'First place winner in the annual hackathon competition at Nirma University.',
    skills: ['Problem Solving', 'Team Collaboration', 'Innovation', 'Full-stack Development'],
    credentialId: 'NIRMA-HACK-2024'
  }
]

const categoryFilters = [
  { id: 'all', label: 'All Certificates', icon: Award },
  { id: 'programming', label: 'Programming', icon: Code },
  { id: 'algorithms', label: 'Algorithms', icon: BookOpen },
  { id: 'machine-learning', label: 'Machine Learning', icon: Brain },
  { id: 'web-development', label: 'Web Development', icon: Code },
  { id: 'competition', label: 'Competitions', icon: Trophy }
]

export default function CertificatesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  
  const [activeFilter, setActiveFilter] = useState('all')
  
  useFadeInAnimation(sectionRef)
  useSlideInAnimation(titleRef, 'up', { delay: 0.2 })
  useSlideInAnimation(filterRef, 'up', { delay: 0.4 })
  useSlideInAnimation(gridRef, 'up', { delay: 0.6 })

  const filteredCertificates = activeFilter === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === activeFilter)

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-background overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Certifications & Achievements
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <WordReveal 
              text="Professional Certifications"
              className="gradient-text"
            />
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Continuous learning and professional development through industry-recognized certifications 
            and competitive programming achievements.
          </p>
        </div>

        {/* Category filters */}
        <div ref={filterRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {categoryFilters.map((filter) => {
            const Icon = filter.icon
            const isActive = activeFilter === filter.id
            const count = filter.id === 'all' 
              ? certificates.length 
              : certificates.filter(cert => cert.category === filter.id).length
            
            if (count === 0 && filter.id !== 'all') return null
            
            return (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground hover-scale'
                }`}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                  isActive ? 'bg-primary-foreground/20' : 'bg-muted'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Certificates grid */}
        <div ref={gridRef}>
          {filteredCertificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No certificates found</h3>
              <p className="text-muted-foreground">
                No certificates match the selected category. Try a different filter.
              </p>
            </div>
          )}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Certificates Earned', value: certificates.length },
            { label: 'Learning Hours', value: '200+' },
            { label: 'Skills Acquired', value: '25+' },
            { label: 'Competitions Won', value: certificates.filter(c => c.category === 'competition').length }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}