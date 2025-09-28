'use client'

import CustomCursor from "@/components/ui/CustomCursor"
import CursorSelector from "@/components/ui/CursorSelector"
import { useCursor } from "@/hooks/use-cursor"

export default function CursorSystem() {
  const { variant, setVariant } = useCursor()

  return (
    <>
      <CustomCursor variant={variant} />
      <CursorSelector currentCursor={variant} onCursorChange={setVariant} />
    </>
  )
}