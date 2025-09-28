'use client'

import { useState, useEffect } from 'react'

interface TypingEffectProps {
  texts: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
  className?: string
  cursorClassName?: string
  loop?: boolean
}

export default function TypingEffect({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = '',
  cursorClassName = '',
  loop = true
}: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')
  useEffect(() => {
    const currentText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentCharIndex < currentText.length) {
          setDisplayText(currentText.slice(0, currentCharIndex + 1))
          setCurrentCharIndex(prev => prev + 1)
        } else {
          // Finished typing current text
          if (loop && texts.length > 1) {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        }
      } else {
        // Deleting
        if (currentCharIndex > 0) {
          setDisplayText(currentText.slice(0, currentCharIndex - 1))
          setCurrentCharIndex(prev => prev - 1)
        } else {
          // Finished deleting
          setIsDeleting(false)
          setCurrentTextIndex(prev => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [currentTextIndex, currentCharIndex, isDeleting, texts, typeSpeed, deleteSpeed, pauseTime, loop])

  return (
    <span className={className}>
      {displayText}
      <span 
        className={`inline-block typing-cursor ${cursorClassName}`}
      >
        |
      </span>
    </span>
  )
}