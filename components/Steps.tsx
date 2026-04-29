import { Children, ReactNode, isValidElement, cloneElement } from 'react'

interface StepsProps {
  children: ReactNode
}

interface StepProps {
  title?: string
  children: ReactNode
  number?: number
}

export function Steps({ children }: StepsProps) {
  const items = Children.toArray(children).filter(isValidElement)
  return (
    <ol className="steps">
      {items.map((child, i) =>
        isValidElement<StepProps>(child)
          ? cloneElement(child, { number: i + 1, key: i })
          : child
      )}
      <style jsx>{`
        .steps {
          list-style: none;
          padding: 0;
          margin: 28px 0;
          counter-reset: step;
          position: relative;
        }
        .steps::before {
          content: '';
          position: absolute;
          left: 17px;
          top: 18px;
          bottom: 18px;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(255, 122, 89, 0.5),
            rgba(127, 127, 127, 0.18) 40%,
            rgba(127, 127, 127, 0.18) 60%,
            rgba(255, 122, 89, 0.5)
          );
        }
      `}</style>
    </ol>
  )
}

export function Step({ title, children, number }: StepProps) {
  const numStr = String(number ?? 1).padStart(2, '0')
  return (
    <li className="step">
      <div className="step-marker">
        <span className="step-num">{numStr}</span>
      </div>
      <div className="step-body">
        {title && <h3 className="step-title">{title}</h3>}
        <div className="step-content">{children}</div>
      </div>
      <style jsx>{`
        .step {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 18px;
          padding: 8px 0 28px;
          position: relative;
        }
        .step:last-child { padding-bottom: 0; }
        .step-marker {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 122, 89, 0.1);
          border: 1px solid rgba(255, 122, 89, 0.35);
          color: #ff7a59;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-variant-numeric: tabular-nums;
          z-index: 1;
        }
        .step-num { line-height: 1; }
        .step-body { padding-top: 5px; min-width: 0; }
        .step-title {
          margin: 0 0 8px;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }
        .step-content {
          font-size: 15px;
          line-height: 1.7;
        }
        .step-content :global(p):first-child { margin-top: 0; }
        .step-content :global(pre) { margin: 12px 0; }
      `}</style>
    </li>
  )
}
