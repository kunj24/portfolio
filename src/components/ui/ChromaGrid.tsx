"use client"

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export interface ChromaItem {
  image?: string
  icon?: React.ReactNode
  title: string
  subtitle?: string
  handle?: string
  location?: string
  borderColor?: string
  gradient?: string
  url?: string
}

export interface ChromaGridProps {
  items?: ChromaItem[]
  className?: string
  radius?: number
  damping?: number
  fadeOut?: number
  ease?: string
}

type SetterFn = (v: number | string) => void

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const setX = useRef<SetterFn | null>(null)
  const setY = useRef<SetterFn | null>(null)
  const pos = useRef({ x: 0, y: 0 })

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg,#10B981,#000)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg,#EF4444,#000)',
      url: 'https://kaggle.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',
      url: 'https://aws.amazon.com/'
    }
  ]

  const data = items?.length ? items : demo

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn
    const { width, height } = el.getBoundingClientRect()
    pos.current = { x: width / 2, y: height / 2 }
    setX.current(pos.current.x)
    setY.current(pos.current.y)
  }, [])

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x)
        setY.current?.(pos.current.y)
      },
      overwrite: true
    })
  }

  const handleMove = (e: React.PointerEvent) => {
    const rect = rootRef.current!.getBoundingClientRect()
    moveTo(e.clientX - rect.left, e.clientY - rect.top)
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    })
  }

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement
    const rect = c.getBoundingClientRect()
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-2 ${className}`}
      style={{
        '--r': `${radius}px`,
        '--x': '50%',
        '--y': '50%'
      } as React.CSSProperties}
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          role={c.url ? 'link' : 'button'}
          aria-label={c.title}
          className="group relative flex flex-col w-[120px] sm:w-[140px] md:w-[160px] rounded-[10px] overflow-hidden transition-transform duration-200 ease-out cursor-pointer hover:-translate-y-1"
          style={{
            '--card-border': c.borderColor || 'transparent',
            // glass-like subtle background so gradients remain elegant
            background: c.gradient || 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            // soft shadow with a faint colored glow using the provided borderColor
            boxShadow: `0 6px 18px rgba(2,6,23,0.55), 0 0 18px ${c.borderColor ? `${c.borderColor}33` : 'transparent'}`
          } as React.CSSProperties}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              // stronger local spotlight on hover (brighter and tighter)
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.28), transparent 60%)'
            }}
          />
          <div className="relative z-10 flex-1 p-2 box-border flex items-center justify-center">
            {c.icon ? (
              <div
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/6"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: `inset 0 0 18px ${c.borderColor ? `${c.borderColor}22` : 'transparent'}`
                }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl text-white" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))' }}>{c.icon}</div>
              </div>
            ) : (
              <div className="w-full h-full rounded-[6px] overflow-hidden">
                <Image
                  src={c.image!}
                  alt={c.title}
                  width={160}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <footer className="relative z-10 p-2 text-white font-sans text-center">
            <h3 className="m-0 text-[0.82rem] font-medium tracking-wide">{c.title}</h3>
          </footer>
        </article>
      ))}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          // Increase overall spotlight brightness and reduce grayscale so colors pop
          backdropFilter: 'grayscale(0) brightness(1.15) saturate(1.05)',
          WebkitBackdropFilter: 'grayscale(0) brightness(1.15) saturate(1.05)',
          background: 'rgba(0,0,0,0.001)',
          // enlarge bright core and make the falloff gentler to create a stronger circular spotlight
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 30%, rgba(255,255,255,0.95)45%, rgba(255,255,255,0.85)60%, rgba(255,255,255,0.60)75%, rgba(255,255,255,0.30)88%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 30%, rgba(255,255,255,0.95)45%, rgba(255,255,255,0.85)60%, rgba(255,255,255,0.60)75%, rgba(255,255,255,0.30)88%, transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  )
}

export default ChromaGrid
