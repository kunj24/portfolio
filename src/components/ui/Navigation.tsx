'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Home, User, Briefcase, Code, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleSectionChange = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleSectionChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleSectionChange)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Dynamic Island Navigation with Logo */}
      <nav
        className={cn(
          'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out',
          'hidden md:block'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            'flex items-center justify-between',
            'bg-black/60 backdrop-blur-xl',
            'border border-white/20',
            'transition-all duration-500 ease-out',
            'shadow-2xl shadow-primary/10',
            'rounded-full',
            isScrolled || isHovered
              ? 'px-8 py-4 gap-8'
              : 'px-6 py-3 gap-6'
          )}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#home')
            }}
            className={cn(
              'font-bold gradient-text hover:scale-105 transition-all duration-300 whitespace-nowrap',
              isScrolled || isHovered
                ? 'text-lg'
                : 'text-base'
            )}
          >
            Kunj Mungalpara
          </a>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.substring(1)
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={cn(
                    'group relative flex items-center justify-center',
                    'transition-all duration-300 ease-out',
                    'rounded-full cursor-pointer',
                    isActive
                      ? 'bg-primary/20 text-primary scale-110'
                      : 'hover:bg-white/10 hover:scale-105 text-white/70 hover:text-white',
                    isScrolled || isHovered
                      ? 'w-11 h-11'
                      : 'w-9 h-9'
                  )}
                  title={item.name}
                >
                  <Icon 
                    className={cn(
                      'transition-all duration-300',
                      isScrolled || isHovered ? 'w-5 h-5' : 'w-4 h-4'
                    )}
                  />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                      {item.name}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Logo */}
        <div className="fixed top-6 left-6 z-40">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#home')
            }}
            className="text-lg font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            Kunj Mungalpara
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            'fixed top-6 right-6 z-50',
            'w-12 h-12 rounded-full',
            'bg-black/60 backdrop-blur-xl',
            'border border-white/20',
            'flex items-center justify-center',
            'transition-all duration-300 hover:scale-105',
            'shadow-lg shadow-primary/10'
          )}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            'fixed top-20 left-1/2 -translate-x-1/2 z-40',
            'transition-all duration-500 ease-out origin-top',
            isMobileMenuOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          )}
        >
          <div className="bg-black/70 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl shadow-primary/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.href.substring(1)
                
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-xl',
                      'transition-all duration-300',
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </>
  )
}