import { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'note' | 'success' | 'tip'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const palette: Record<CalloutType, { tint: string; border: string; accent: string; label: string }> = {
  info:    { tint: 'rgba(89, 140, 255, 0.06)',  border: 'rgba(89, 140, 255, 0.35)',  accent: '#5A8CFF', label: 'INFO' },
  warning: { tint: 'rgba(232, 179, 51, 0.06)',  border: 'rgba(232, 179, 51, 0.4)',   accent: '#E8B333', label: 'WARNING' },
  note:    { tint: 'rgba(127, 127, 127, 0.05)', border: 'rgba(127, 127, 127, 0.28)', accent: '#9aa0a6', label: 'NOTE' },
  success: { tint: 'rgba(74, 187, 122, 0.06)',  border: 'rgba(74, 187, 122, 0.35)',  accent: '#4ABB7A', label: 'SUCCESS' },
  tip:     { tint: 'rgba(255, 122, 89, 0.06)',  border: 'rgba(255, 122, 89, 0.35)',  accent: '#FF7A59', label: 'TIP' }
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const c = palette[type]
  return (
    <aside className="callout" data-type={type}>
      <div className="callout-rail" />
      <div className="callout-body">
        <div className="callout-head">
          <span className="callout-label">{c.label}</span>
          {title && <span className="callout-title">{title}</span>}
        </div>
        <div className="callout-content">{children}</div>
      </div>
      <style jsx>{`
        .callout {
          display: flex;
          gap: 16px;
          margin: 24px 0;
          padding: 18px 22px 18px 18px;
          border-radius: 10px;
          border: 1px solid ${c.border};
          background: ${c.tint};
          position: relative;
          overflow: hidden;
        }
        .callout-rail {
          width: 3px;
          flex: 0 0 3px;
          background: ${c.accent};
          border-radius: 3px;
          align-self: stretch;
          opacity: 0.85;
        }
        .callout-body { flex: 1; min-width: 0; }
        .callout-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }
        .callout-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          color: ${c.accent};
          text-transform: uppercase;
        }
        .callout-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--callout-title, inherit);
        }
        .callout-content {
          font-size: 15px;
          line-height: 1.7;
        }
        .callout-content :global(p) { margin: 0 0 8px; }
        .callout-content :global(p:last-child) { margin-bottom: 0; }
        .callout-content :global(code) {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
        }
      `}</style>
    </aside>
  )
}
