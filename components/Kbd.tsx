import { ReactNode } from 'react'

interface KbdProps {
  children: ReactNode
}

export function Kbd({ children }: KbdProps) {
  return (
    <kbd className="kbd">
      {children}
      <style jsx>{`
        .kbd {
          display: inline-block;
          padding: 2px 7px;
          margin: 0 2px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.2px;
          color: inherit;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(127, 127, 127, 0.35);
          border-radius: 5px;
          box-shadow: inset 0 -1px 0 rgba(127, 127, 127, 0.18);
          vertical-align: 0.05em;
        }
        :global(.dark) .kbd {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
        }
      `}</style>
    </kbd>
  )
}
