'use client'

import CustomCursor from "@/components/ui/CustomCursor"
import CursorSelector from "@/components/ui/CursorSelector"
import { useCursor } from "@/hooks/use-cursor"
import { useEffect, useState } from "react"

export default function CursorSystem() {
  const { variant, setVariant } = useCursor()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
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
      {!isMobile && <CursorSelector currentCursor={variant} onCursorChange={setVariant} />}
    </>
  )
}