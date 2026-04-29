import { ReactNode } from 'react'

interface PageIntroProps {
  description?: string | ReactNode
  readTime?: string
  level?: '입문' | '기초' | '실전' | '심화'
  takeaways?: string[]
  prerequisites?: string | ReactNode
}

export function PageIntro({
  description,
  readTime,
  level,
  takeaways,
  prerequisites
}: PageIntroProps) {
  const hasMeta = readTime || level
  return (
    <div className="page-intro">
      {description && <p className="page-intro-desc">{description}</p>}
      {hasMeta && (
        <div className="page-intro-meta">
          {level && (
            <span className="meta-chip">
              <span className="meta-chip-key">난이도</span>
              <span className="meta-chip-val">{level}</span>
            </span>
          )}
          {readTime && (
            <span className="meta-chip">
              <span className="meta-chip-key">읽기</span>
              <span className="meta-chip-val">{readTime}</span>
            </span>
          )}
        </div>
      )}
      {prerequisites && (
        <div className="page-intro-prereq">
          <span className="prereq-label">사전 지식</span>
          <span className="prereq-val">{prerequisites}</span>
        </div>
      )}
      {takeaways && takeaways.length > 0 && (
        <div className="page-intro-takeaways">
          <span className="takeaways-eyebrow">이 페이지에서 배우는 것</span>
          <ul className="takeaways-list">
            {takeaways.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
        .page-intro {
          margin: 8px 0 36px;
          padding: 22px 26px;
          border-radius: 14px;
          border: 1px solid rgba(127, 127, 127, 0.18);
          background: linear-gradient(
            180deg,
            rgba(255, 122, 89, 0.04) 0%,
            rgba(127, 127, 127, 0.02) 100%
          );
        }
        .page-intro-desc {
          margin: 0 0 14px;
          font-size: 15.5px;
          line-height: 1.75;
          opacity: 0.86;
        }
        .page-intro-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0 0 14px;
        }
        .page-intro-meta:last-child { margin-bottom: 0; }
        .meta-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(127, 127, 127, 0.2);
          border-radius: 999px;
        }
        :global(.dark) .meta-chip {
          background: rgba(255, 255, 255, 0.04);
        }
        .meta-chip-key {
          font-weight: 600;
          letter-spacing: 0.5px;
          opacity: 0.6;
        }
        .meta-chip-val {
          font-weight: 700;
          letter-spacing: -0.1px;
        }
        .page-intro-prereq {
          display: flex;
          gap: 10px;
          align-items: baseline;
          font-size: 13.5px;
          margin: 0 0 14px;
          padding: 0 0 14px;
          border-bottom: 1px dashed rgba(127, 127, 127, 0.18);
        }
        .page-intro-takeaways:last-child .takeaways-list { margin-bottom: 0; }
        .prereq-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: rgba(127, 127, 127, 0.85);
          text-transform: uppercase;
          flex: 0 0 auto;
        }
        .prereq-val { opacity: 0.85; }
        .page-intro-takeaways {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .takeaways-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          color: #ff7a59;
          text-transform: uppercase;
        }
        .takeaways-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .takeaways-list :global(li) {
          font-size: 14px;
          line-height: 1.6;
          padding-left: 20px;
          position: relative;
          opacity: 0.88;
        }
        .takeaways-list :global(li::before) {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 12px;
          height: 1px;
          background: #ff7a59;
        }
      `}</style>
    </div>
  )
}
