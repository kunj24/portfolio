// Custom Creative Arrow Component
'use client'

interface CreativeArrowProps {
  direction?: 'right' | 'left' | 'up' | 'down'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export default function CreativeArrow({ 
  direction = 'right', 
  size = 'md', 
  className = '',
  animated = true 
}: CreativeArrowProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  const rotationClasses = {
    right: 'rotate-0',
    down: 'rotate-90',
    left: 'rotate-180',
    up: 'rotate-270'
  }

  return (
    <div className={`${sizeClasses[size]} ${rotationClasses[direction]} ${className} relative`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`w-full h-full ${animated ? 'group-hover:translate-x-1 transition-transform duration-300' : ''}`}
      >
        {/* Creative arrow path with curves */}
        <path
          d="M5 12h14m-7-7l7 7-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80"
        />
        
        {/* Decorative trail */}
        <path
          d="M2 12h3m2 0h2"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className={`opacity-40 ${animated ? 'group-hover:opacity-60 transition-opacity duration-300' : ''}`}
        />
        
        {/* Arrow head enhancement */}
        <circle
          cx="19"
          cy="12"
          r="1.5"
          fill="currentColor"
          className={`opacity-60 ${animated ? 'group-hover:opacity-80 transition-opacity duration-300' : ''}`}
        />
      </svg>
      
      {/* Animated particles on hover */}
      {animated && (
        <>
          <div className="absolute -right-1 top-1/2 w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 delay-75" />
          <div className="absolute -right-2 top-1/2 w-0.5 h-0.5 bg-current rounded-full opacity-0 group-hover:opacity-60 group-hover:translate-x-3 transition-all duration-300 delay-150" />
        </>
      )}
    </div>
  )
}