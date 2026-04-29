import Link from 'next/link'

interface NextStep {
  href: string
  title: string
  description?: string
  label?: string
}

interface NextStepsProps {
  title?: string
  items: NextStep[]
}

export function NextSteps({ title = '다음으로', items }: NextStepsProps) {
  return (
    <section className="next-steps">
      <div className="next-steps-head">
        <span className="next-steps-eyebrow">CONTINUE</span>
        <h3 className="next-steps-title">{title}</h3>
      </div>
      <div className="next-steps-grid">
        {items.map((item, i) => (
          <Link key={i} href={item.href} className="next-step-card">
            {item.label && <span className="next-step-label">{item.label}</span>}
            <span className="next-step-title">{item.title}</span>
            {item.description && <span className="next-step-desc">{item.description}</span>}
            <span className="next-step-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .next-steps {
          margin: 56px 0 0;
          padding-top: 36px;
          border-top: 1px solid rgba(127, 127, 127, 0.18);
        }
        .next-steps-head {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 18px;
        }
        .next-steps-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.6px;
          color: rgba(127, 127, 127, 0.7);
        }
        .next-steps-title {
          margin: 0;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.4px;
        }
        .next-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 14px;
        }
        .next-step-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 18px 20px 16px;
          border-radius: 12px;
          border: 1px solid rgba(127, 127, 127, 0.22);
          background: rgba(127, 127, 127, 0.03);
          text-decoration: none;
          color: inherit;
          position: relative;
          transition: border-color 0.25s ease,
                      transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1),
                      background 0.25s ease,
                      box-shadow 0.25s ease;
        }
        .next-step-card:hover {
          border-color: rgba(255, 122, 89, 0.5);
          transform: translateY(-2px);
          background: rgba(255, 122, 89, 0.04);
          box-shadow: 0 14px 32px -16px rgba(255, 122, 89, 0.4);
        }
        .next-step-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          color: #ff7a59;
          text-transform: uppercase;
        }
        .next-step-title {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }
        .next-step-desc {
          font-size: 13.5px;
          line-height: 1.55;
          opacity: 0.7;
        }
        .next-step-arrow {
          position: absolute;
          top: 18px;
          right: 18px;
          font-size: 16px;
          opacity: 0.4;
          transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.25s ease, color 0.25s;
        }
        .next-step-card:hover .next-step-arrow {
          transform: translateX(4px);
          opacity: 1;
          color: #ff7a59;
        }
      `}</style>
    </section>
  )
}
