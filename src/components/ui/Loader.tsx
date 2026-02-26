'use client'

import { useCallback, useEffect, useState, useRef, useMemo } from 'react'

/* ── constants ───────────────────────────────────────────────── */
const GLITCH = '!<>-_\\/[]{}—=+*^?#_アイウエオカキクケコサシスセソ'
const NAME = 'KUNJ MUNGALPARA'
const ROLE = 'FULL STACK DEVELOPER'

const PHASES = [
  { label: 'INITIALIZING CORE', icon: '⚡' },
  { label: 'LOADING MODULES', icon: '📦' },
  { label: 'COMPILING SHADERS', icon: '🎨' },
  { label: 'CONNECTING NODES', icon: '🔗' },
  { label: 'RENDERING WORLD', icon: '🌐' },
  { label: 'SYSTEM READY', icon: '🚀' },
]

/* ── component ───────────────────────────────────────────────── */
export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)
  const [nameText, setNameText] = useState('')
  const [roleText, setRoleText] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [glitch, setGlitch] = useState(false)
  const [entered, setEntered] = useState(false)       // stagger entrance
  const [wavePhase, setWavePhase] = useState(0)
  const [touchRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)

  /* ── mobile detect ── */
  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768)
    c(); window.addEventListener('resize', c)
    return () => window.removeEventListener('resize', c)
  }, [])

  /* ── stagger entrance ── */
  useEffect(() => { setTimeout(() => setEntered(true), 150) }, [])

  /* ── mouse / touch tracking (desktop only for mouse, simplified touch on mobile) ── */
  useEffect(() => {
    if (isMobile) return // Skip mouse/touch tracking on mobile to save CPU
    const m = (e: MouseEvent) => setMouse({ x: e.clientX / innerWidth, y: e.clientY / innerHeight })
    addEventListener('mousemove', m)
    return () => { removeEventListener('mousemove', m) }
  }, [isMobile])

  /* ── text decode effect ── */
  useEffect(() => {
    let f = 0
    // On mobile: faster decode (fewer frames), larger interval
    const interval = isMobile ? 80 : 55
    const totalFrames = isMobile ? 30 : 45
    const id = setInterval(() => {
      f++
      // Name decode
      const nr = Math.floor((f / totalFrames) * NAME.length)
      let n = ''
      for (let i = 0; i < NAME.length; i++) {
        if (i < nr) n += NAME[i]
        else if (NAME[i] === ' ') n += ' '
        else n += GLITCH[~~(Math.random() * GLITCH.length)]
      }
      setNameText(n)
      // Role decode (starts a bit later)
      const roleDelay = isMobile ? 5 : 10
      const roleFrames = isMobile ? 20 : 30
      if (f > roleDelay) {
        const rr = Math.floor(((f - roleDelay) / roleFrames) * ROLE.length)
        let r = ''
        for (let i = 0; i < ROLE.length; i++) {
          if (i < rr) r += ROLE[i]
          else if (ROLE[i] === ' ') r += ' '
          else r += GLITCH[~~(Math.random() * GLITCH.length)]
        }
        setRoleText(r)
      } else {
        setRoleText(ROLE.split('').map(c => c === ' ' ? ' ' : GLITCH[~~(Math.random() * GLITCH.length)]).join(''))
      }
      if (f >= totalFrames) { clearInterval(id); setNameText(NAME); setRoleText(ROLE) }
    }, interval)
    return () => clearInterval(id)
  }, [isMobile])

  /* ── glitch flicker (desktop only) ── */
  useEffect(() => {
    if (isMobile) return // Skip glitch on mobile
    const id = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 80 + Math.random() * 70)
    }, 1800 + Math.random() * 2500)
    return () => clearInterval(id)
  }, [isMobile])

  /* ── audio-style wave (slower on mobile) ── */
  useEffect(() => {
    const interval = isMobile ? 200 : 100
    const id = setInterval(() => setWavePhase(p => p + 1), interval)
    return () => clearInterval(id)
  }, [isMobile])

  /* ── canvas: interactive particle field (DESKTOP ONLY) ── */
  useEffect(() => {
    if (isMobile) return // Skip entire canvas on mobile for performance
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    let W = cv.width = innerWidth
    let H = cv.height = innerHeight
    const N = 200
    const mx = { x: W / 2, y: H / 2 }

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; pulse: number }
    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * 1.5, vy: (Math.random() - .5) * 1.5,
      r: Math.random() * 2.5 + .5,
      hue: Math.random() > .5 ? 165 : 330,
      pulse: Math.random() * Math.PI * 2,
    }))

    const onMove = (e: MouseEvent) => { mx.x = e.clientX; mx.y = e.clientY }
    addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const p of pts) {
        p.pulse += 0.03
        // Mouse attraction
        const dx = mx.x - p.x, dy = mx.y - p.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 250) {
          const force = (250 - d) / 250 * 0.015
          p.vx += dx * force
          p.vy += dy * force
        }
        p.vx *= 0.985; p.vy *= 0.985
        p.x += p.vx; p.y += p.vy

        // Wrap
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10

        const a = (Math.sin(p.pulse) * 0.3 + 0.5) * 0.7
        const glow = d < 250 ? 12 : 4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * (1 + Math.sin(p.pulse) * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},85%,65%,${a})`
        ctx.shadowColor = `hsla(${p.hue},85%,65%,${a})`
        ctx.shadowBlur = glow
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Connection lines
      const connDist = 130
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < connDist) {
            const a = (1 - d / connDist) * 0.12
            const hue = pts[i].hue === pts[j].hue ? pts[i].hue : 270
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `hsla(${hue},70%,60%,${a})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight }
    addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      removeEventListener('mousemove', onMove)
      removeEventListener('resize', onResize)
    }
  }, [isMobile])

  /* ── hide logic ── */
  const hide = useCallback(() => {
    setExiting(true)
    setTimeout(() => setVisible(false), isMobile ? 800 : 1400)
  }, [isMobile])

  /* ── scroll lock ── */
  useEffect(() => {
    if (!visible) return
    const s = { o: document.body.style.overflow, p: document.body.style.position, w: document.body.style.width }
    Object.assign(document.body.style, { overflow: 'hidden', position: 'fixed', width: '100%', top: '0' })
    return () => { Object.assign(document.body.style, { overflow: s.o, position: s.p, width: s.w, top: '' }) }
  }, [visible])

  /* ── progress (faster on mobile) ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') { e.preventDefault(); hide() }
    }
    addEventListener('keydown', handleKey)
    const maxTime = isMobile ? 6000 : 12000
    const em = setTimeout(hide, maxTime)
    const tickInterval = isMobile ? 40 : 50
    const id = setInterval(() => {
      setProgress(p => {
        // Faster progress on mobile
        const inc = isMobile
          ? (p < 50 ? 4.5 : p < 80 ? 3.0 : 1.2)
          : (p < 50 ? 2.8 : p < 80 ? 1.6 : 0.55)
        const n = Math.min(p + inc, 100)
        setPhase(Math.min(~~((n / 100) * PHASES.length), PHASES.length - 1))
        if (n >= 100) { clearInterval(id); clearTimeout(em); setTimeout(hide, isMobile ? 200 : 500) }
        return n
      })
    }, tickInterval)
    return () => { clearInterval(id); clearTimeout(em); removeEventListener('keydown', handleKey) }
  }, [hide, isMobile])

  /* ── wave bars (fewer on mobile) ── */
  const waveBars = useMemo(() => Array.from({ length: isMobile ? 16 : 40 }, (_, i) => i), [isMobile])

  if (!visible) return null

  const circ = 2 * Math.PI * 58
  const dashOff = circ - (progress / 100) * circ
  const pAngle = -90 + (progress / 100) * 360

  return (
    <>
      <div
        className={`fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden select-none
          ${exiting ? 'pointer-events-none' : ''}`}
        style={{
          transition: exiting ? `all ${isMobile ? '0.8s' : '1.4s'} cubic-bezier(.4,0,.2,1)` : 'none',
          opacity: exiting ? 0 : 1,
          transform: exiting ? (isMobile ? 'scale(1.1)' : 'scale(1.3) rotateX(15deg)') : 'scale(1) rotateX(0deg)',
          filter: exiting ? (isMobile ? 'blur(8px)' : 'blur(16px) brightness(2)') : 'blur(0) brightness(1)',
          perspective: isMobile ? undefined : '1200px',
        }}
      >
        {/* ─── BACKGROUND ─── */}
        <div className="absolute inset-0 bg-[#010810]">
          {/* Mouse-following spotlight (desktop only) */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{
              background: `radial-gradient(800px circle at ${mouse.x * 100}% ${mouse.y * 100}%, 
                rgba(46,230,193,0.07) 0%, rgba(255,77,166,0.03) 30%, transparent 60%)`,
            }} />
          )}

          {/* Aurora bands (simplified on mobile: reduced blur, no animation) */}
          <div className={`absolute inset-0 overflow-hidden ${isMobile ? 'opacity-25' : 'opacity-40'}`}>
            <div className={`absolute w-[200%] h-[60%] -top-[20%] -left-[50%] ${isMobile ? '' : 'animate-[aurora_12s_ease-in-out_infinite]'}`}
              style={{ background: 'linear-gradient(135deg, transparent 20%, rgba(46,230,193,0.08) 35%, rgba(138,43,226,0.06) 50%, rgba(255,77,166,0.08) 65%, transparent 80%)', filter: isMobile ? 'blur(30px)' : 'blur(60px)' }} />
            {!isMobile && (
              <div className="absolute w-[200%] h-[50%] -bottom-[10%] -right-[50%] animate-[aurora_15s_ease-in-out_infinite_reverse]"
                style={{ background: 'linear-gradient(225deg, transparent 25%, rgba(255,77,166,0.06) 40%, rgba(46,230,193,0.07) 55%, transparent 75%)', filter: 'blur(80px)' }} />
            )}
          </div>

          {/* Cyberpunk grid floor (desktop only) */}
          {!isMobile && (
            <div className="absolute bottom-0 left-0 right-0 h-[45%]" style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 35%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 35%)',
            }}>
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: 'linear-gradient(rgba(46,230,193,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(46,230,193,0.2) 1px, transparent 1px)',
                backgroundSize: '70px 50px',
                transform: 'perspective(400px) rotateX(65deg)',
                transformOrigin: 'bottom center',
                animation: 'gridFlow 3s linear infinite',
              }} />
            </div>
          )}

          {/* Floating horizontal laser lines (desktop only) */}
          {!isMobile && (
            <>
              <div className="absolute left-0 right-0 top-[25%] h-px overflow-hidden">
                <div className="h-full animate-[laserSweep_5s_ease-in-out_infinite]"
                  style={{ background: 'linear-gradient(90deg, transparent, #2ee6c1, transparent)', width: '30%' }} />
              </div>
              <div className="absolute left-0 right-0 top-[75%] h-px overflow-hidden">
                <div className="h-full animate-[laserSweepReverse_7s_ease-in-out_infinite]"
                  style={{ background: 'linear-gradient(90deg, transparent, #ff4da6, transparent)', width: '25%' }} />
              </div>
            </>
          )}

          {/* Vertical scan beam (desktop only) */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 bottom-0 w-[3px] animate-[scanBeam_6s_ease-in-out_infinite]"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(46,230,193,0.4), rgba(255,77,166,0.3), transparent)', boxShadow: '0 0 20px rgba(46,230,193,0.3)' }} />
            </div>
          )}
        </div>

        {/* ─── CANVAS PARTICLES (desktop only) ─── */}
        {!isMobile && <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />}

        {/* ─── TOUCH RIPPLES (removed on mobile for performance) ─── */}
        {!isMobile && touchRipples.map(r => (
          <div key={r.id} className="absolute z-[2] pointer-events-none animate-[rippleOut_1s_ease-out_forwards]"
            style={{ left: r.x, top: r.y, transform: 'translate(-50%,-50%)' }}>
            <div className="w-4 h-4 rounded-full border border-[#2ee6c1]/60" />
          </div>
        ))}

        {/* ─── GLITCH OVERLAY (desktop only) ─── */}
        {!isMobile && glitch && (
          <div className="absolute inset-0 z-[6] pointer-events-none">
            <div className="absolute inset-0 bg-[#2ee6c1]/[0.03]" />
            <div className="absolute h-[1px] left-0 right-0" style={{ top: `${20 + Math.random() * 60}%`, background: `linear-gradient(90deg, transparent, #2ee6c1, transparent)`, opacity: 0.7 }} />
            <div className="absolute h-[2px] left-0 right-0" style={{ top: `${30 + Math.random() * 40}%`, background: `linear-gradient(90deg, transparent, #ff4da6, transparent)`, opacity: 0.4 }} />
            <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(46,230,193,0.015) 2px, rgba(46,230,193,0.015) 4px)' }} />
          </div>
        )}

        {/* ─── MAIN CONTENT ─── */}
        <div className="relative z-10 flex flex-col items-center px-4 sm:px-8 max-w-4xl mx-auto">

          {/* ── CENTRAL ORB ── */}
          <div className={`relative mb-6 sm:mb-10 transition-all duration-1000 ${entered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
            style={{ transitionDelay: '0.2s' }}>

            {/* Outer rotating rings (desktop only - expensive SVG animations) */}
            {!isMobile && (
              <div className="absolute inset-0 -m-20 sm:-m-28">
                <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 300 300">
                  <defs>
                    <linearGradient id="ring1g" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2ee6c1" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#2ee6c1" stopOpacity="0" />
                      <stop offset="100%" stopColor="#ff4da6" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <circle cx="150" cy="150" r="140" fill="none" stroke="url(#ring1g)" strokeWidth="0.8" strokeDasharray="8 16 2 16" />
                  {/* orbiting dots */}
                  {[0, 90, 180, 270].map(a => {
                    const cx = Math.round((150 + 140 * Math.cos(a * Math.PI / 180)) * 100) / 100
                    const cy = Math.round((150 + 140 * Math.sin(a * Math.PI / 180)) * 100) / 100
                    return (
                      <circle key={a} cx={cx} cy={cy} r="2.5" fill="#2ee6c1" opacity="0.7">
                        <animate attributeName="r" values="1.5;3;1.5" dur={`${1.5 + a * 0.005}s`} repeatCount="indefinite" />
                      </circle>
                    )
                  })}
                </svg>
              </div>
            )}

            {/* Mobile: simple static ring instead */}
            {isMobile && (
              <div className="absolute inset-0 -m-12">
                <svg className="w-full h-full" viewBox="0 0 130 130">
                  <circle cx="65" cy="65" r="58" fill="none" stroke="rgba(46,230,193,0.15)" strokeWidth="1" strokeDasharray="4 8" />
                </svg>
              </div>
            )}

            {!isMobile && (
              <div className="absolute inset-0 -m-14 sm:-m-20">
                <svg className="w-full h-full animate-[spin_18s_linear_infinite_reverse]" viewBox="0 0 300 300">
                  <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255,77,166,0.12)" strokeWidth="0.6" strokeDasharray="3 20" />
                  <circle cx="150" cy="20" r="2" fill="#ff4da6" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            )}

            {/* 3D rotating wireframe cube (desktop only) */}
            {!isMobile && (
              <div className="absolute inset-0 -m-10 sm:-m-14 flex items-center justify-center" style={{ perspective: '400px' }}>
                <div className="w-full h-full animate-[spinCube_10s_linear_infinite]" style={{ transformStyle: 'preserve-3d' }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ opacity: 0.15 }}>
                    <rect x="15" y="15" width="70" height="70" fill="none" stroke="#2ee6c1" strokeWidth="0.5" rx="2" />
                  </svg>
                </div>
              </div>
            )}

            {/* Circular progress ring (main) */}
            <div className="absolute inset-0 -m-8 sm:-m-12">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
                {/* Track */}
                <circle cx="65" cy="65" r="58" fill="none" stroke="rgba(46,230,193,0.08)" strokeWidth="3" />
                {/* Tick marks (desktop only - 60 lines are expensive to render) */}
                {!isMobile && Array.from({ length: 60 }, (_, i) => {
                  const a = (i / 60) * 360
                  const rad = a * Math.PI / 180
                  const r1 = 54, r2 = 58
                  const cos = Math.round(Math.cos(rad) * 10000) / 10000
                  const sin = Math.round(Math.sin(rad) * 10000) / 10000
                  return (
                    <line key={i}
                      x1={65 + r1 * cos} y1={65 + r1 * sin}
                      x2={65 + r2 * cos} y2={65 + r2 * sin}
                      stroke={i % 5 === 0 ? 'rgba(46,230,193,0.2)' : 'rgba(46,230,193,0.06)'}
                      strokeWidth={i % 5 === 0 ? '1' : '0.5'}
                    />
                  )
                })}
                {/* Progress arc */}
                <circle cx="65" cy="65" r="58" fill="none"
                  stroke="url(#progGrad)" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={circ} strokeDashoffset={dashOff}
                  className="transition-[stroke-dashoffset] duration-200 ease-out"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(46,230,193,0.7))' }} />
                {/* Leading dot */}
                <circle
                  cx={Math.round((65 + 58 * Math.cos(pAngle * Math.PI / 180)) * 100) / 100}
                  cy={Math.round((65 + 58 * Math.sin(pAngle * Math.PI / 180)) * 100) / 100}
                  r="4" fill="#2ee6c1"
                  style={{ filter: isMobile ? undefined : 'drop-shadow(0 0 10px #2ee6c1)', transition: 'cx 0.2s, cy 0.2s' }}>
                  {!isMobile && <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />}
                </circle>
                <defs>
                  <linearGradient id="progGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2ee6c1" />
                    <stop offset="80%" stopColor="#2ee6c1" />
                    <stop offset="100%" stopColor="#ff4da6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* CORE: morphing blob + hexagon + text */}
            <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center group">
              {/* Morphing blob (desktop only - animate d is expensive) */}
              {!isMobile && (
                <svg className="absolute inset-0 w-full h-full animate-[blobRotate_20s_linear_infinite]" viewBox="0 0 200 200">
                  <defs>
                    <radialGradient id="blobG">
                      <stop offset="0%" stopColor="#2ee6c1" stopOpacity="0.15" />
                      <stop offset="60%" stopColor="#2ee6c1" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#ff4da6" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                  <path fill="url(#blobG)" stroke="#2ee6c1" strokeWidth="0.6" strokeOpacity="0.3">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
                      M100,25C145,25 175,55 175,100C175,145 145,175 100,175C55,175 25,145 25,100C25,55 55,25 100,25Z;
                      M105,20C155,35 180,65 170,115C160,155 130,180 85,175C40,170 15,140 25,95C35,50 55,5 105,20Z;
                      M95,22C150,30 185,70 168,120C152,165 115,182 70,170C30,158 12,120 28,75C44,30 40,14 95,22Z;
                      M100,25C145,25 175,55 175,100C175,145 145,175 100,175C55,175 25,145 25,100C25,55 55,25 100,25Z
                    " />
                  </path>
                </svg>
              )}

              {/* Mobile: simple static glow circle */}
              {isMobile && (
                <div className="absolute inset-2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(46,230,193,0.1) 0%, rgba(255,77,166,0.05) 60%, transparent 80%)' }} />
              )}

              {/* Spinning triangle (desktop only) */}
              {!isMobile && (
                <svg className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100" style={{ opacity: 0.12 }}>
                  <polygon points="50,5 95,85 5,85" fill="none" stroke="#ff4da6" strokeWidth="0.6" strokeDasharray="4 6" />
                </svg>
              )}

              {/* Spinning hexagon (desktop only) */}
              {!isMobile && (
                <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100" style={{ opacity: 0.18 }}>
                  <polygon points="50,5 91,27 91,73 50,95 9,73 9,27" fill="none" stroke="#2ee6c1" strokeWidth="0.5" strokeDasharray="2 8" />
                </svg>
              )}

              {/* Center percentage / KM */}
              <div className="relative z-10 flex flex-col items-center">
                {progress < 100 ? (
                  <>
                    <span className="text-4xl sm:text-5xl font-black font-mono tabular-nums bg-gradient-to-b from-white to-[#2ee6c1] bg-clip-text text-transparent"
                      style={{ filter: isMobile ? undefined : 'drop-shadow(0 0 25px rgba(46,230,193,0.9))', textShadow: isMobile ? undefined : '0 0 40px rgba(46,230,193,0.5)' }}>
                      {Math.round(progress)}
                    </span>
                    <span className="text-[9px] sm:text-[11px] font-mono text-[#2ee6c1]/50 tracking-[0.4em] mt-1 uppercase">percent</span>
                  </>
                ) : (
                  <div className={isMobile ? '' : 'animate-[pulseGlow_2s_ease-in-out_infinite]'}>
                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-[#2ee6c1] via-white to-[#ff4da6] bg-clip-text text-transparent"
                      style={{ filter: isMobile ? undefined : 'drop-shadow(0 0 30px rgba(46,230,193,1)) drop-shadow(0 0 60px rgba(255,77,166,0.5))' }}>
                      KM
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Floating code snippets (desktop) */}
            {!isMobile && (
              <>
                <div className="absolute -top-8 -right-20 text-[8px] font-mono text-[#2ee6c1]/30 animate-[floatUp_4s_ease-in-out_infinite] whitespace-nowrap">
                  const portfolio = <span className="text-[#ff4da6]/40">await</span> init()
                </div>
                <div className="absolute -bottom-6 -left-24 text-[8px] font-mono text-[#ff4da6]/30 animate-[floatUp_5s_ease-in-out_infinite_1s] whitespace-nowrap">
                  &lt;Loader <span className="text-[#2ee6c1]/40">progress=</span>{`{${Math.round(progress)}}`}/&gt;
                </div>
                <div className="absolute top-1/2 -right-32 text-[8px] font-mono text-[#2ee6c1]/25 animate-[floatUp_3.5s_ease-in-out_infinite_0.5s]">
                  0x{Math.round(progress).toString(16).toUpperCase().padStart(2, '0')}FF
                </div>
              </>
            )}
          </div>

          {/* ── AUDIO WAVE VISUALIZER ── */}
          <div className={`flex items-center justify-center gap-[2px] sm:gap-[3px] mb-5 sm:mb-8 h-8 sm:h-12 transition-all duration-700 ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.5s' }}>
            {waveBars.map(i => {
              const h = Math.abs(Math.sin((wavePhase * 0.15) + i * 0.3)) * (progress / 100)
              const hue = 165 + (i / waveBars.length) * 165
              return (
                <div key={i} className="rounded-full transition-all duration-150" style={{
                  width: isMobile ? '2px' : '3px',
                  height: `${4 + h * (isMobile ? 24 : 40)}px`,
                  background: `hsl(${hue}, 80%, 60%)`,
                  opacity: 0.4 + h * 0.6,
                  boxShadow: h > 0.5 ? `0 0 6px hsla(${hue},80%,60%,0.4)` : 'none',
                }} />
              )
            })}
          </div>

          {/* ── NAME + ROLE ── */}
          <div className={`relative mb-2 sm:mb-4 transition-all duration-700 ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.7s' }}>
            {/* Glitch copies (desktop only) */}
            {!isMobile && glitch && (
              <>
                <div className="absolute inset-0 text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[0.06em] text-[#ff4da6]/25 font-mono"
                  style={{ transform: 'translate(4px,-2px)', clipPath: 'inset(15% 0 50% 0)' }}>{nameText}</div>
                <div className="absolute inset-0 text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[0.06em] text-[#2ee6c1]/25 font-mono"
                  style={{ transform: 'translate(-4px,3px)', clipPath: 'inset(55% 0 5% 0)' }}>{nameText}</div>
              </>
            )}
            <h1 className={`text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[0.06em] font-mono bg-gradient-to-r from-[#2ee6c1] via-white to-[#ff4da6] bg-[length:200%_auto] bg-clip-text text-transparent ${isMobile ? '' : 'animate-[shimmer_5s_ease-in-out_infinite]'} text-center`}
              style={{ filter: isMobile ? undefined : 'drop-shadow(0 0 35px rgba(46,230,193,0.3))' }}>
              {nameText}
            </h1>
          </div>

          {/* Role subtitle */}
          <div className={`transition-all duration-700 ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '0.9s' }}>
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10 justify-center">
              <div className="h-px w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#2ee6c1]/30" />
              <span className="text-[10px] sm:text-sm font-mono tracking-[0.3em] sm:tracking-[0.4em] text-[#2ee6c1]/40">
                {roleText}
              </span>
              <div className="h-px w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#ff4da6]/30" />
            </div>
          </div>

          {/* ── PROGRESS BAR ── */}
          <div className={`w-full max-w-sm sm:max-w-lg transition-all duration-700 ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '1.1s' }}>

            {/* Status */}
            <div className="flex items-center justify-between mb-3 text-[10px] sm:text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2ee6c1] animate-ping absolute opacity-50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2ee6c1] relative" style={{ boxShadow: '0 0 10px #2ee6c1' }} />
                </div>
                <span className="text-[#2ee6c1]/60 tracking-wider">
                  {PHASES[phase]?.icon} {PHASES[phase]?.label}
                </span>
              </div>
              <span className="text-white/70 font-bold tabular-nums text-xs sm:text-sm tracking-wider">
                {Math.round(progress)}<span className="text-[#2ee6c1]/40">%</span>
              </span>
            </div>

            {/* Bar */}
            <div className="relative">
              {!isMobile && <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-r from-[#2ee6c1]/10 via-purple-500/5 to-[#ff4da6]/10 blur-md" />}
              <div className="relative h-2.5 sm:h-3 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.08] backdrop-blur-sm">
                {/* Segments (desktop only) */}
                {!isMobile && (
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: 25 }, (_, i) => <div key={i} className="flex-1 border-r border-white/[0.04]" />)}
                  </div>
                )}
                {/* Fill */}
                <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-200 ease-out" style={{ width: `${progress}%` }}>
                  <div className="h-full rounded-full bg-gradient-to-r from-[#2ee6c1] via-[#2ee6c1] to-[#ff4da6] relative overflow-hidden">
                    {!isMobile && <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent" style={{ height: '45%' }} />}
                    {!isMobile && (
                      <div className="absolute inset-0 animate-[barScan_1.2s_ease-in-out_infinite]"
                        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)', width: '40%' }} />
                    )}
                  </div>
                </div>
                {/* Leading glow (desktop only) */}
                {!isMobile && (
                  <div className="absolute inset-y-0 w-12 transition-all duration-200" style={{
                    left: `calc(${progress}% - 24px)`,
                    background: 'radial-gradient(ellipse at center, rgba(46,230,193,0.5), transparent)',
                    filter: 'blur(6px)',
                  }} />
                )}
              </div>

              {/* Corner brackets */}
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#2ee6c1]/40 rounded-tl-sm" />
              <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-[#2ee6c1]/40 rounded-tr-sm" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-[#ff4da6]/40 rounded-bl-sm" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#ff4da6]/40 rounded-br-sm" />
            </div>

            {/* Phase indicators */}
            <div className="flex justify-between mt-4 sm:mt-5 px-0.5">
              {PHASES.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-500 ${
                      i <= phase ? 'scale-100' : 'scale-50 opacity-30'
                    }`} style={{
                      background: i <= phase ? `linear-gradient(135deg, #2ee6c1, #ff4da6)` : 'rgba(255,255,255,0.1)',
                      boxShadow: (!isMobile && i <= phase) ? '0 0 10px rgba(46,230,193,0.6)' : 'none',
                    }} />
                    {i < PHASES.length - 1 && (
                      <div className={`h-px w-4 sm:w-8 md:w-12 transition-all duration-500 ${
                        i < phase ? 'bg-gradient-to-r from-[#2ee6c1]/50 to-[#ff4da6]/30' : 'bg-white/5'
                      }`} />
                    )}
                  </div>
                  <span className={`text-[7px] sm:text-[8px] font-mono tracking-wider transition-all duration-300 ${
                    i <= phase ? 'text-[#2ee6c1]/50' : 'text-white/10'
                  } hidden sm:block`}>{p.icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM ── */}
          <div className={`mt-6 sm:mt-10 transition-all duration-700 ${entered ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1.4s' }}>
            <button
              onClick={hide}
              className="flex items-center gap-3 text-[9px] sm:text-[10px] text-white/20 font-mono tracking-wider justify-center mx-auto touch-manipulation min-h-[44px] px-4"
            >
              <span className="animate-pulse">●</span>
              <span>{isMobile ? 'TAP TO SKIP' : <>PRESS <span className="text-[#2ee6c1]/40 font-semibold">ESC</span> TO SKIP</>}</span>
              <span className="animate-pulse">●</span>
            </button>
          </div>

          {/* Corner HUD */}
          <div className="fixed top-3 left-3 sm:top-5 sm:left-5 text-[7px] sm:text-[9px] font-mono text-[#2ee6c1]/15 leading-5 hidden sm:block">
            <div className="flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 bg-[#2ee6c1]/30 rounded-full animate-pulse" /> SYS.BOOT</div>
            <div>MEM: {Math.round(progress * 10.24)}KB / 1024KB</div>
            <div>CPU: {Math.min(99, Math.round(progress * 0.8 + 12))}%</div>
          </div>
          <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 text-[7px] sm:text-[9px] font-mono text-[#2ee6c1]/15 leading-5 text-right hidden sm:block">
            <div>PORTFOLIO.EXE</div>
            <div>BUILD: 2026.02.18</div>
            <div>FPS: {Math.min(62, 58 + Math.round(progress * 0.04))}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes aurora {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          33% { transform: translateX(5%) translateY(-3%) rotate(2deg); }
          66% { transform: translateX(-3%) translateY(2%) rotate(-1deg); }
        }
        @keyframes gridFlow {
          0% { transform: perspective(400px) rotateX(65deg) translateY(0px); }
          100% { transform: perspective(400px) rotateX(65deg) translateY(50px); }
        }
        @keyframes laserSweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(400%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes laserSweepReverse {
          0% { transform: translateX(400%); }
          50% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes scanBeam {
          0% { left: -3px; }
          100% { left: 100%; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-6px) translateX(2px); opacity: 0.5; }
          75% { transform: translateY(4px) translateX(-2px); opacity: 0.2; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 30px rgba(46,230,193,0.8)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 50px rgba(46,230,193,1)) drop-shadow(0 0 80px rgba(255,77,166,0.5)); }
        }
        @keyframes blobRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        @keyframes barScan {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(400%); }
        }
        @keyframes rippleOut {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(30); opacity: 0; }
        }
        .duration-1400 { transition-duration: 1400ms; }
      `}</style>
    </>
  )
}
