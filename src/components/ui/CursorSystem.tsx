'use client'

import CustomCursor from "@/components/ui/CustomCursor"
import CursorSelector from "@/components/ui/CursorSelector"
import { useCursor } from "@/hooks/use-cursor"
import { useEffect, useState } from "react"

export default function CursorSystem() {
  const { variant, setVariant } = useCursor()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <CustomCursor variant={variant} />
      {mounted && !isMobile && <CursorSelector currentCursor={variant} onCursorChange={setVariant} />}
    </>
  )
}