import { useRef, ReactNode, MouseEvent, CSSProperties } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  max?: number
  scale?: number
}

export function TiltCard({
  children,
  className = '',
  style,
  max = 6,
  scale = 1.015
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * max
    const ry = (px - 0.5) * max
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
      el.style.setProperty('--tilt-mx', `${px * 100}%`)
      el.style.setProperty('--tilt-my', `${py * 100}%`)
    })
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    el.style.transform = ''
    el.style.setProperty('--tilt-mx', '50%')
    el.style.setProperty('--tilt-my', '50%')
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
