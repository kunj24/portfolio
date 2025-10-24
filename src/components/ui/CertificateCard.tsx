'use client'

import { useRef } from 'react'
import { Certificate } from '@/types'
import { useSlideInAnimation } from '@/hooks/useGSAP'
import MagneticButton from '@/components/ui/MagneticButton'
import { Download, ExternalLink, Calendar, Award } from 'lucide-react'

interface CertificateCardProps {
  certificate: Certificate
  index?: number
}

export default function CertificateCard({ certificate, index = 0 }: CertificateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useSlideInAnimation(cardRef, 'up', { delay: index * 0.1 })

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = encodeURI(certificate.pdfUrl)
    link.download = `${certificate.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-')}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = () => {
    window.open(encodeURI(certificate.pdfUrl), '_blank')
  }

  const getCategoryColor = (category: Certificate['category']) => {
    switch (category) {
      case 'programming':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'algorithms':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'machine-learning':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'web-development':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      case 'competition':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div
      ref={cardRef}
      className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover-scale overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Certificate icon/thumbnail */}
      <div className="relative mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-3">
          <Award className="w-8 h-8 text-primary" />
        </div>
        
        {/* Category badge */}
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(certificate.category)}`}>
          {certificate.category.replace('-', ' ')}
        </span>
      </div>

      {/* Certificate details */}
      <div className="relative space-y-3">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {certificate.title}
        </h3>
        
        <p className="text-sm text-muted-foreground font-medium">
          {certificate.organization}
        </p>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {certificate.description}
        </p>

        {/* Date and credential ID */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{certificate.dateEarned}</span>
          </div>
          {certificate.credentialId && (
            <div className="flex items-center gap-1">
              <span>ID: {certificate.credentialId}</span>
            </div>
          )}
        </div>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-1">
          {certificate.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-muted/50 text-xs rounded-md text-muted-foreground"
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className="px-2 py-1 bg-muted/50 text-xs rounded-md text-muted-foreground">
              +{certificate.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <MagneticButton intensity={0.1} className="flex-1">
            <button
              onClick={handleView}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View
            </button>
          </MagneticButton>
          
          <MagneticButton intensity={0.1} className="flex-1">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent text-sm rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </MagneticButton>
        </div>

        {/* Verification link */}
        {certificate.verificationUrl && (
          <a
            href={certificate.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Verify Certificate
          </a>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 border border-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}