'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type CursorVariant = 'none' | 'default' | 'neon' | 'particle' | 'magnetic' | 'morphing' | 'geometric' | 'liquid'

interface CursorContextType {
  variant: CursorVariant
  setVariant: (variant: CursorVariant) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('none')

  return (
    <CursorContext.Provider value={{ variant, setVariant }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}