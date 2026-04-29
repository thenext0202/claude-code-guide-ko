import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  variant?: 'up' | 'left' | 'right' | 'fade' | 'zoom'
  threshold?: number
  once?: boolean
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  style,
  variant = 'up',
  threshold = 0.12,
  once = true
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) obs.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [mounted, threshold, once])

  if (!mounted) {
    return (
      <div className={`reveal-static ${className}`} style={style}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}
