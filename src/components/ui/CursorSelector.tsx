'use client'

import { useState } from 'react'
import { Palette } from 'lucide-react'

const cursorOptions = [
  { id: 'none', name: 'Default Arrow', description: 'Standard system cursor' },
  { id: 'default', name: 'Classic Glow', description: 'Glowing dot with ring' },
  { id: 'neon', name: 'Neon', description: 'Glowing cyberpunk style' },
  { id: 'particle', name: 'Particle', description: 'Floating particles trail' },
  { id: 'magnetic', name: 'Magnetic', description: 'Rotating magnetic field' },
  { id: 'morphing', name: 'Morphing', description: 'Shape-shifting cursor' },
  { id: 'geometric', name: 'Geometric', description: 'Triangle and square combo' },
  { id: 'liquid', name: 'Liquid', description: 'Fluid blob effect' },
]

type CursorVariant = 'none' | 'default' | 'neon' | 'particle' | 'magnetic' | 'morphing' | 'geometric' | 'liquid'

interface CursorSelectorProps {
  onCursorChange: (cursor: CursorVariant) => void
  currentCursor: CursorVariant
}

export default function CursorSelector({ onCursorChange, currentCursor }: CursorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/10"
        title="Change Cursor Style"
      >
        <Palette className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl shadow-primary/20 min-w-64">
          <h3 className="text-white font-semibold mb-3 text-sm">Cursor Style</h3>
          <div className="space-y-2">
            {cursorOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onCursorChange(option.id as CursorVariant)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentCursor === option.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="font-medium text-sm">{option.name}</div>
                <div className="text-xs opacity-70">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}